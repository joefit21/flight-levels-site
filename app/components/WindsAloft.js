'use client'
import { useState, useEffect } from 'react'

// Colorado routes: show times in mountain local regardless of where the
// viewer is planning from, since that's the time zone they'll be flying in.
const TZ = 'America/Denver'
const SHOW_LEVELS = [9000, 12000, 18000]

function timeLabel(iso, withZone = false) {
  if (!iso) return null
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    hour: 'numeric',
    minute: '2-digit',
    ...(withZone ? { timeZoneName: 'short' } : {}),
  }).format(new Date(iso))
}

function dayLabel(iso) {
  if (!iso) return null
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'short',
  }).format(new Date(iso))
}

function windText(wind) {
  if (!wind) return '–'
  if (wind.lightVariable) return 'Light & variable'
  const dir = String(wind.direction).padStart(3, '0')
  return `${dir}° @ ${wind.speed} kt`
}

function WindCell({ wind }) {
  if (!wind) {
    return <div className="font-mono text-xs text-gray-300">–</div>
  }
  return (
    <div>
      <div className="font-mono text-xs text-gray-700">{windText(wind)}</div>
      {wind.temp !== null && (
        <div className="font-mono text-[11px] text-gray-400">
          {wind.temp > 0 ? '+' : ''}
          {wind.temp}&deg;C
        </div>
      )}
    </div>
  )
}

export default function WindsAloft({ stations = ['DEN', 'GJT'], labels = {} }) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/winds?stations=${stations.join(',')}`)
      .then((res) => {
        if (!res.ok) throw new Error('bad response')
        return res.json()
      })
      .then((json) => {
        if (cancelled) return
        setData(json)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations.join(',')])

  if (status === 'loading') {
    return (
      <div className="border border-gray-200 rounded-md px-3 py-4 text-xs text-gray-500">
        Fetching winds aloft&hellip;
      </div>
    )
  }

  if (status === 'error' || !data?.periods?.length) {
    return (
      <div className="border border-gray-200 rounded-md px-3 py-4 text-xs text-gray-500">
        Winds aloft unavailable right now.{' '}
        <a
          href="https://aviationweather.gov/data/windtemp/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1d4ed8] hover:underline"
        >
          Check aviationweather.gov &#8599;
        </a>
      </div>
    )
  }

  const period = data.periods[Math.min(selected, data.periods.length - 1)]

  return (
    <div>
      {/* Period toggle, labelled by the local window each forecast covers */}
      <div className="flex gap-2 mb-3" role="tablist" aria-label="Forecast period">
        {data.periods.map((p, i) => {
          const start = timeLabel(p.useStart)
          const end = timeLabel(p.useEnd)
          return (
            <button
              key={p.fcst}
              type="button"
              role="tab"
              aria-selected={selected === i}
              onClick={() => setSelected(i)}
              className={`flex-1 text-xs font-semibold px-2 py-2 rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                selected === i
                  ? 'bg-[#1d4ed8] text-white border-[#1d4ed8]'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {start && end ? `${start} – ${end}` : `${p.fcst} hr`}
              <span className={`block font-normal ${selected === i ? 'text-blue-200' : 'text-gray-400'}`}>
                {dayLabel(p.useStart)}
              </span>
            </button>
          )
        })}
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
          <div className="text-xs text-gray-600">
            Valid{' '}
            <span className="font-semibold text-gray-800">{timeLabel(period.validAt, true)}</span>
            {period.useStart && period.useEnd && (
              <>
                {' '}&middot; for use {timeLabel(period.useStart)} &ndash;{' '}
                {timeLabel(period.useEnd, true)}
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2">
                  Station
                </th>
                {SHOW_LEVELS.map((lvl) => (
                  <th
                    key={lvl}
                    className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2 whitespace-nowrap"
                  >
                    {lvl.toLocaleString()} ft
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stations.map((id) => (
                <tr key={id} className="border-b border-gray-50 last:border-0">
                  <td className="px-3 py-2 align-top">
                    <div className="font-mono text-xs font-semibold text-gray-700">{id}</div>
                    {labels[id] && (
                      <div className="text-[11px] text-gray-400">{labels[id]}</div>
                    )}
                  </td>
                  {SHOW_LEVELS.map((lvl) => (
                    <td key={lvl} className="px-3 py-2 align-top">
                      <WindCell wind={period.stations?.[id]?.[lvl]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
