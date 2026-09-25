// Winds and temperatures aloft (FB product) from aviationweather.gov.
// Returns the three standard forecast periods, decoded, with UTC timestamps.
// Formatting into local time happens client-side so DST is handled by Intl.

const LEVELS = [3000, 6000, 9000, 12000, 18000, 24000, 30000, 34000, 39000]
const FORECASTS = ['06', '12', '24']

// FB lines omit levels at or near the station's own elevation, and those are
// always the lowest ones, so groups right-align against the level list.
function parseStationLine(line) {
  const parts = line.trim().split(/\s+/)
  const groups = parts.slice(1)
  const offset = LEVELS.length - groups.length
  if (offset < 0) return null

  const levels = {}
  groups.forEach((group, i) => {
    levels[LEVELS[offset + i]] = decodeGroup(group)
  })
  return { station: parts[0], levels }
}

function decodeGroup(group) {
  if (!group || group.length < 4) return null

  const temp = decodeTemp(group.slice(4))
  if (group.slice(0, 4) === '9900') {
    return { lightVariable: true, direction: null, speed: null, temp }
  }

  let direction = parseInt(group.slice(0, 2), 10)
  let speed = parseInt(group.slice(2, 4), 10)
  if (Number.isNaN(direction) || Number.isNaN(speed)) return null

  // Directions above 36 encode winds over 100 kt
  if (direction > 36) {
    direction -= 50
    speed += 100
  }

  return { lightVariable: false, direction: direction * 10, speed, temp }
}

function decodeTemp(rest) {
  if (!rest) return null
  const value = parseInt(rest, 10)
  if (Number.isNaN(value)) return null
  // Above 24,000 the sign is dropped and the temperature is always negative
  return /^[+-]/.test(rest) ? value : -Math.abs(value)
}

// FB headers carry a day-of-month but no month or year.
function zuluToDate(day, hour, minute, now) {
  let year = now.getUTCFullYear()
  let month = now.getUTCMonth()
  const today = now.getUTCDate()
  if (day < today - 15) month += 1
  else if (day > today + 15) month -= 1
  return new Date(Date.UTC(year, month, day, hour, minute))
}

// The "FOR USE" window gives times without a day. The valid time always falls
// inside the window, so anchor each end to its nearest occurrence.
function anchorToValid(hour, minute, validDate) {
  return [-1, 0, 1]
    .map((dayOffset) => {
      const d = new Date(validDate)
      d.setUTCDate(d.getUTCDate() + dayOffset)
      d.setUTCHours(hour, minute, 0, 0)
      return d
    })
    .reduce((best, candidate) =>
      Math.abs(candidate - validDate) < Math.abs(best - validDate) ? candidate : best
    )
}

function parseReport(text, stations, now) {
  const validMatch = text.match(/VALID\s+(\d{2})(\d{2})(\d{2})Z/)
  const useMatch = text.match(/FOR USE\s+(\d{2})(\d{2})-(\d{2})(\d{2})Z/)
  if (!validMatch) return null

  const validAt = zuluToDate(+validMatch[1], +validMatch[2], +validMatch[3], now)

  let useStart = null
  let useEnd = null
  if (useMatch) {
    useStart = anchorToValid(+useMatch[1], +useMatch[2], validAt)
    useEnd = anchorToValid(+useMatch[3], +useMatch[4], validAt)
  }

  const wanted = new Set(stations)
  const byStation = {}
  for (const line of text.split('\n')) {
    const id = line.trim().split(/\s+/)[0]
    if (!wanted.has(id)) continue
    const parsed = parseStationLine(line)
    if (parsed) byStation[parsed.station] = parsed.levels
  }

  return {
    validAt: validAt.toISOString(),
    useStart: useStart?.toISOString() ?? null,
    useEnd: useEnd?.toISOString() ?? null,
    stations: byStation,
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const stations = (searchParams.get('stations') || 'DEN,GJT')
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
  const region = searchParams.get('region') || 'slc'

  try {
    const now = new Date()

    const reports = await Promise.all(
      FORECASTS.map(async (fcst) => {
        const res = await fetch(
          `https://aviationweather.gov/api/data/windtemp?region=${encodeURIComponent(region)}&level=low&fcst=${fcst}`,
          { next: { revalidate: 1800 } }
        )
        if (!res.ok) {
          console.error('aviationweather.gov windtemp error:', fcst, res.status)
          return null
        }
        const parsed = parseReport(await res.text(), stations, now)
        return parsed ? { fcst, ...parsed } : null
      })
    )

    const periods = reports.filter(Boolean)
    if (!periods.length) {
      return Response.json({ error: 'No winds aloft data available' }, { status: 502 })
    }

    return Response.json({ periods, fetchedAt: new Date().toISOString() })
  } catch (error) {
    console.error('Winds aloft proxy error:', error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
