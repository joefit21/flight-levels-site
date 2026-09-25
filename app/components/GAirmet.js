'use client'
import { useState, useEffect } from 'react'

const TZ = 'America/Denver'
const AWC_LINK = 'https://aviationweather.gov/gfa/#gairmet'

// Sierra/Tango/Zulu carry distinct tints so the type reads at a glance,
// and the same colours drive the dots on the period strip.
const PRODUCT_TONE = {
  SIERRA: 'bg-amber-50 border-amber-200',
  TANGO: 'bg-blue-50 border-blue-200',
  ZULU: 'bg-gray-50 border-gray-200',
}
const PRODUCT_DOT = {
  SIERRA: 'bg-amber-400',
  TANGO: 'bg-blue-400',
  ZULU: 'bg-gray-400',
}

function hourLabel(iso) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric' }).format(new Date(iso))
}

function dayLabel(iso) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short' }).format(new Date(iso))
}

function fullTimeLabel(iso) {
  if (!iso) return ''
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

// One dot per distinct product active in the period, so the strip shows the
// shape of the day rather than a yes/no.
function PeriodDots({ advisories, selected }) {
  if (!advisories.length) {
    return (
      <span className={`block text-[11px] mt-1 ${selected ? 'text-blue-200' : 'text-gray-300'}`}>
        clear
      </span>
    )
  }
  const products = [...new Set(advisories.map((a) => a.product))]
  return (
    <span className="flex items-center justify-center gap-1 mt-1.5" aria-hidden="true">
      {products.map((p) => (
        <span key={p} className={`inline-block w-1.5 h-1.5 rounded-full ${PRODUCT_DOT[p] || 'bg-gray-400'}`} />
      ))}
      <span className={`text-[11px] ml-0.5 ${selected ? 'text-blue-100' : 'text-gray-500'}`}>
        {advisories.length}
      </span>
    </span>
  )
}

export default function GAirmet() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [selected, setSelected] = useState(0)

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

  if (status === 'error' || !data?.periods?.length) {
    return (
      <div className="border border-gray-200 rounded-md px-3 py-4 text-xs text-gray-500">
        G-AIRMET data unavailable right now. {fullProductLink}
      </div>
    )
  }

  const periods = data.periods
  const period = periods[Math.min(selected, periods.length - 1)]
  const advisories = period.advisories

  return (
    <div>
      {/* Period strip: local hour, plus a dot per product active in that period */}
      <div className="flex gap-1.5 mb-3" role="tablist" aria-label="G-AIRMET forecast period">
        {periods.map((p, i) => {
          const isSelected = selected === i
          const count = p.advisories.length
          return (
            <button
              key={p.validTime}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={`${fullTimeLabel(p.validTime)}: ${count === 0 ? 'no advisories' : `${count} advisor${count === 1 ? 'y' : 'ies'}`}`}
              onClick={() => setSelected(i)}
              className={`flex-1 text-xs font-semibold px-1 py-2 rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isSelected
                  ? 'bg-[#1d4ed8] text-white border-[#1d4ed8]'
                  : count > 0
                    ? 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
              }`}
            >
              {hourLabel(p.validTime)}
              <PeriodDots advisories={p.advisories} selected={isSelected} />
            </button>
          )
        })}
      </div>

      <div className="text-[11px] text-gray-400 mb-2">
        Valid at {fullTimeLabel(period.validTime)}
        {dayLabel(periods[0].validTime) !== dayLabel(periods[periods.length - 1].validTime) &&
          ' (strip crosses midnight)'}
      </div>

      {advisories.length === 0 ? (
        <div className="border border-gray-200 rounded-md px-3 py-3">
          <div className="text-xs text-gray-600 mb-1">
            No G-AIRMETs are active over the Colorado high country at this time.
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
                </div>
              )
            })}
          </div>
          <div className="text-[11px] text-gray-400 mt-2">
            Active anywhere within 37&ndash;41&deg;N, 104&ndash;109&deg;W, not necessarily over your route.{' '}
            {fullProductLink}
          </div>
        </>
      )}
    </div>
  )
}
