// Active G-AIRMETs intersecting a lat/lon box, from aviationweather.gov.
// Default box is the Colorado high country: 37-41N, 104-109W.
// Purely a geographic filter, with no judgement about whether any given advisory
// matters for a given flight.

const DEFAULT_BOX = { south: 37, north: 41, west: -109, east: -104 }

// TURB-HI lives above FL180 and is noise for piston mountain flying.
const EXCLUDED_HAZARDS = new Set(['TURB-HI'])

const HAZARD_LABELS = {
  MT_OBSC: 'Mountain Obscuration',
  IFR: 'IFR Conditions',
  'TURB-LO': 'Turbulence (low level)',
  SFC_WND: 'Strong Surface Winds',
  LLWS: 'Low-Level Wind Shear',
  ICE: 'Icing',
  FZLVL: 'Freezing Level',
}

// VFR-relevant hazards sort to the top
const HAZARD_ORDER = ['MT_OBSC', 'IFR', 'TURB-LO', 'SFC_WND', 'LLWS', 'ICE', 'FZLVL']

function pointInBox(p, box) {
  return p.lat >= box.south && p.lat <= box.north && p.lon >= box.west && p.lon <= box.east
}

function pointInPolygon(point, poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].lon
    const yi = poly[i].lat
    const xj = poly[j].lon
    const yj = poly[j].lat
    const crosses =
      yi > point.lat !== yj > point.lat &&
      point.lon < ((xj - xi) * (point.lat - yi)) / (yj - yi) + xi
    if (crosses) inside = !inside
  }
  return inside
}

function orientation(a, b, c) {
  const v = (b.lat - a.lat) * (c.lon - b.lon) - (b.lon - a.lon) * (c.lat - b.lat)
  if (Math.abs(v) < 1e-12) return 0
  return v > 0 ? 1 : 2
}

function segmentsIntersect(p1, q1, p2, q2) {
  const o1 = orientation(p1, q1, p2)
  const o2 = orientation(p1, q1, q2)
  const o3 = orientation(p2, q2, p1)
  const o4 = orientation(p2, q2, q1)
  return o1 !== o2 && o3 !== o4
}

// A polygon counts as intersecting the box if any vertex is inside the box,
// any box corner is inside the polygon, or any pair of edges cross. The third
// case catches bands that pass through without a vertex or corner inside.
function polygonIntersectsBox(coords, box) {
  if (!coords?.length) return false
  if (coords.some((p) => pointInBox(p, box))) return true

  const corners = [
    { lat: box.south, lon: box.west },
    { lat: box.south, lon: box.east },
    { lat: box.north, lon: box.east },
    { lat: box.north, lon: box.west },
  ]
  if (corners.some((c) => pointInPolygon(c, coords))) return true

  for (let i = 0; i < corners.length; i++) {
    const c1 = corners[i]
    const c2 = corners[(i + 1) % corners.length]
    for (let j = 0, k = coords.length - 1; j < coords.length; k = j++) {
      if (segmentsIntersect(c1, c2, coords[k], coords[j])) return true
    }
  }
  return false
}

function num(v) {
  const n = parseInt(v, 10)
  return Number.isNaN(n) ? null : n
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const box = {
    south: parseFloat(searchParams.get('south') ?? DEFAULT_BOX.south),
    north: parseFloat(searchParams.get('north') ?? DEFAULT_BOX.north),
    west: parseFloat(searchParams.get('west') ?? DEFAULT_BOX.west),
    east: parseFloat(searchParams.get('east') ?? DEFAULT_BOX.east),
  }

  try {
    const res = await fetch('https://aviationweather.gov/api/data/gairmet?format=json', {
      next: { revalidate: 600 },
    })
    if (!res.ok) {
      console.error('aviationweather.gov gairmet error:', res.status)
      return Response.json({ error: 'Failed to fetch G-AIRMET data' }, { status: 502 })
    }

    const all = await res.json()
    if (!Array.isArray(all)) {
      return Response.json({ error: 'Unexpected G-AIRMET response' }, { status: 502 })
    }

    const advisories = all
      .filter((r) => !EXCLUDED_HAZARDS.has(r.hazard))
      .filter((r) => polygonIntersectsBox(r.coords, box))
      .map((r) => ({
        tag: r.tag,
        hazard: r.hazard,
        label: HAZARD_LABELS[r.hazard] || r.hazard,
        product: r.product,
        severity: r.severity || null,
        dueTo: r.due_to && r.due_to !== r.hazard ? r.due_to : null,
        base: num(r.base),
        top: num(r.top),
        fzlBase: num(r.fzlbase),
        fzlTop: num(r.fzltop),
        validTime: r.validTime,
      }))
      .sort((a, b) => {
        const ai = HAZARD_ORDER.indexOf(a.hazard)
        const bi = HAZARD_ORDER.indexOf(b.hazard)
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
      })

    return Response.json({ advisories, box, fetchedAt: new Date().toISOString() })
  } catch (error) {
    console.error('G-AIRMET proxy error:', error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
