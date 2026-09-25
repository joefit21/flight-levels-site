'use client'
import { useState, useEffect } from 'react'

const TZ = 'America/Denver'
const AWC_LINK = 'https://aviationweather.gov/gfa/#gairmet'

// Sierra/Tango/Zulu get distinct tints so the type reads at a glance
const PRODUCT_TONE = {
  SIERRA: 'bg-amber-50 border-amber-200',
  TANGO: 'bg-blue-50 border-blue-200',
  ZULU: 'bg-gray-50 border-gray-200',
}

function timeLabel(iso) {
  if (!iso) return null
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(iso))
}

function altitudeText(a) {
  if (a.hazard === 'FZLVL') {
    if (a.fzlBase === null && a.fzlTop === null) return null
    if (a.fzlBase !== null && a.fzlTop !== null) {
      return `${(a.fzlBase * 100).toLocaleString()}–${(a.fzlTop * 100).toLocaleString()} ft`
    }
    const only = a.fzlBase ?? a.fzlTop
    return `${(only * 100).toLocaleString()} ft`
  }
  if (a.base === null && a.top === null) return null
  const base = a.base === null ? 'SFC' : `${(a.base * 100).toLocaleString()} ft`
  const top = a.top === null ? '–' : `${(a.top * 100).toLocaleString()} ft`
  return `${base} – ${top}`
}

export default function GAirmet() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    fetch('/api/gairmet')
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
  }, [])

  const fullProductLink = (
    <a
      href={AWC_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#1d4ed8] hover:underline whitespace-nowrap"
    >
      All G-AIRMETs &#8599;
    </a>
  )

  if (status === 'loading') {
    return (
      <div className="border border-gray-200 rounded-md px-3 py-4 text-xs text-gray-500">
        Checking G-AIRMETs&hellip;
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="border border-gray-200 rounded-md px-3 py-4 text-xs text-gray-500">
        G-AIRMET data unavailable right now. {fullProductLink}
      </div>
    )
  }

  const advisories = data?.advisories ?? []

  return (
    <div>
      {advisories.length === 0 ? (
        <div className="border border-gray-200 rounded-md px-3 py-3">
          <div className="text-xs text-gray-600 mb-1">
            No G-AIRMETs are currently active over the Colorado high country.
          </div>
          <div className="text-[11px] text-gray-400">
            This covers 37&ndash;41&deg;N, 104&ndash;109&deg;W only, and G-AIRMETs are one product among
            many. {fullProductLink}
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-2 sm:grid-cols-2">
            {advisories.map((a, i) => {
              const alt = altitudeText(a)
              return (
                <div
                  key={`${a.tag}-${a.hazard}-${i}`}
                  className={`border rounded-md px-3 py-2 ${PRODUCT_TONE[a.product] || 'bg-white border-gray-200'}`}
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-800">{a.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-gray-400">
                      {a.product}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-gray-600 leading-relaxed">
                    {a.severity && <span className="mr-2">{a.severity}</span>}
                    {alt && <span className="mr-2">{alt}</span>}
                    {a.dueTo && <span className="text-gray-500">due to {a.dueTo}</span>}
                  </div>
                  {a.validTime && (
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      Valid {timeLabel(a.validTime)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="text-[11px] text-gray-400 mt-2">
            Active anywhere within 37&ndash;41&deg;N, 104&ndash;109&deg;W, not necessarily over your
            route. {fullProductLink}
          </div>
        </>
      )}
    </div>
  )
}
