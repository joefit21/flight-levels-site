'use client'
import { useState, useEffect } from 'react'
import { useRoute } from './RouteContext'
import RouteMap from './RouteMap'

const DATA = {
  south: {
    label: 'South · Primary',
    track: ['Front Range', "Kenosha Pass 10,001'", "Trout Creek Pass 9,346'", 'Buena Vista', "Monarch Pass 11,312'", 'Gunnison', 'Montrose'],
    cams: [
      { label: 'Bald Mtn cam', href: 'https://weathercams.faa.gov/map/-106.68323,38.43831,-104.82655,39.15859/cameraSite/50/details/camera' },
      { label: 'Monarch cam', href: 'https://weathercams.faa.gov/map/-106.55226,38.31631,-105.62392,38.67798/cameraSite/77/details/camera' },
      { label: 'Gunnison cam', href: 'https://weathercams.faa.gov/map/-107.39718,38.17513,-105.5405,38.89806/cameraSite/540/details/camera' },
    ],
    awos: [
      { label: 'Bald Mtn AWOS', metar: 'K7BM', href: 'https://aviationweather.gov/data/metar/?ids=K7BM&hours=3' },
      { label: 'Monarch AWOS', metar: 'KMYP', href: 'https://aviationweather.gov/data/metar/?ids=KMYP&hours=3' },
      { label: 'Gunnison AWOS', metar: 'KGUC', href: 'https://aviationweather.gov/data/metar/?ids=KGUC&hours=3' },
      { label: 'Montrose AWOS', metar: 'KMTJ', href: 'https://aviationweather.gov/data/metar/?ids=KMTJ&hours=3' },
    ],
    bailouts: [
      { label: 'AEJ', metar: 'KAEJ', href: 'https://aviationweather.gov/data/metar/?ids=KAEJ&hours=3' },
      { label: 'ANK', metar: 'KANK', href: 'https://aviationweather.gov/data/metar/?ids=KANK&hours=3' },
      { label: 'GUC', metar: 'KGUC', href: 'https://aviationweather.gov/data/metar/?ids=KGUC&hours=3' },
    ],
  },
  north: {
    label: 'North · Alternate',
    track: ['Front Range', "Rollins 11,676' (or Berthoud 11,315')", 'Kremmling', 'Eagle County (overfly)', "Cottonwood 8,280' (Gypsum)", 'Montrose'],
    cams: [
      { label: 'Dakota Hill cam', href: 'https://weathercams.faa.gov/map/-106.01767,39.51337,-104.16099,40.22272/cameraSite/66/details/camera' },
      { label: 'Berthoud cam', href: 'https://weathercams.faa.gov/map/-106.22806,39.43852,-104.37138,40.14864/cameraSite/54/details/camera' },
      { label: 'Granby cam', href: 'https://weathercams.faa.gov/map/-106.37734,39.73375,-104.52066,40.44083/cameraSite/577/details/camera' },
      { label: 'Kremmling cam', href: 'https://weathercams.faa.gov/map/-106.83854,39.70167,-104.98186,40.40908/cameraSite/69/details/camera' },
      { label: 'Eagle Co. cam', href: 'https://weathercams.faa.gov/map/-107.3826,39.28872,-105.52592,40.00037/cameraSite/543/details/camera' },
    ],
    awos: [
      { label: 'Dakota Hill AWOS', metar: 'KC99', href: 'https://aviationweather.gov/data/metar/?ids=KC99&hours=3' },
      { label: 'Empire AWOS (Berthoud backup)', metar: 'K0CO', href: 'https://aviationweather.gov/data/metar/?ids=K0CO&hours=3' },
      { label: 'Granby AWOS', metar: 'KGNB', href: 'https://aviationweather.gov/data/metar/?ids=KGNB&hours=3' },
      { label: 'Kremmling AWOS', metar: 'K20V', href: 'https://aviationweather.gov/data/metar/?ids=K20V&hours=3' },
      { label: 'Eagle Co. AWOS', metar: 'KEGE', href: 'https://aviationweather.gov/data/metar/?ids=KEGE&hours=3' },
      { label: 'Sunlight Mtn AWOS', metar: 'K5SM', href: 'https://aviationweather.gov/data/metar/?ids=K5SM&hours=3' },
      { label: 'Montrose AWOS', metar: 'KMTJ', href: 'https://aviationweather.gov/data/metar/?ids=KMTJ&hours=3' },
    ],
    bailouts: [
      { label: 'GNB', metar: 'KGNB', href: 'https://aviationweather.gov/data/metar/?ids=KGNB&hours=3' },
      { label: '20V', metar: 'K20V', href: 'https://aviationweather.gov/data/metar/?ids=K20V&hours=3' },
      { label: 'EGE', metar: 'KEGE', href: 'https://aviationweather.gov/data/metar/?ids=KEGE&hours=3' },
      { label: 'RIL', metar: 'KRIL', href: 'https://aviationweather.gov/data/metar/?ids=KRIL&hours=3' },
    ],
  },
}

const ALL_METAR_IDS = Array.from(
  new Set(
    Object.values(DATA).flatMap((r) => [
      ...r.awos.map((a) => a.metar),
      ...r.bailouts.map((b) => b.metar).filter(Boolean),
    ])
  )
)

function Chip({ item, tone }) {
  const toneClasses =
    tone === 'amber'
      ? 'bg-amber-50 text-amber-900 decoration-amber-400 hover:bg-amber-100'
      : 'bg-gray-50 border border-gray-200 text-gray-600 decoration-gray-400 hover:bg-gray-100'

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-xs font-mono px-3 py-1.5 rounded-md underline underline-offset-2 transition ${toneClasses}`}
      >
        {item.label} &#8599;
      </a>
    )
  }
  return <span className={`text-xs font-mono px-3 py-1.5 rounded-md ${toneClasses}`}>{item.label}</span>
}

function MetarRow({ item, metars, status, tone }) {
  const text = metars?.[item.metar]
  const border = tone === 'amber' ? 'border-amber-200 bg-amber-50/50' : 'border-gray-200 bg-white'

  return (
    <div className={`border rounded-md px-3 py-2 ${border}`}>
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="text-xs font-semibold text-gray-700">{item.label}</span>
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#1d4ed8] hover:underline whitespace-nowrap"
          >
            Full report &#8599;
          </a>
        )}
      </div>
      <div className="font-mono text-xs text-gray-600 leading-relaxed break-all">
        {status === 'loading' && 'Fetching current conditions…'}
        {status === 'error' && 'Live conditions unavailable right now. Use the link above.'}
        {status === 'ready' && (text || 'No current report for this station.')}
      </div>
    </div>
  )
}

export default function RouteToggle() {
  const { route, setRoute } = useRoute()
  const [metars, setMetars] = useState(null)
  const [metarStatus, setMetarStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    fetch(`/api/metar?ids=${ALL_METAR_IDS.join(',')}`)
      .then((res) => {
        if (!res.ok) throw new Error('bad response')
        return res.json()
      })
      .then((json) => {
        if (cancelled) return
        setMetars(json.metars)
        setMetarStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setMetarStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const data = DATA[route]

  return (
    <div>
      <div className="flex gap-2 mb-6" role="tablist" aria-label="Route selection">
        {Object.entries(DATA).map(([key, val]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={route === key}
            onClick={() => setRoute(key)}
            className={`flex-1 text-sm font-semibold px-4 py-2.5 rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              route === key
                ? 'bg-[#1d4ed8] text-white border-[#1d4ed8]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      <RouteMap route={route} />
      <p className="text-xs text-gray-400 mb-4">North up &middot; Front Range (east) on the right, Montrose (west) on the left</p>

      <div className="flex flex-wrap items-center gap-x-1 gap-y-1 mb-5 font-mono text-sm text-gray-700">
        {data.track.map((step, i) => (
          <span key={i} className="flex items-center gap-1">
            {step}
            {i < data.track.length - 1 && <span className="text-gray-300">&rarr;</span>}
          </span>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Check before you go</div>
        <div className="flex flex-wrap gap-2 mb-3">
          {data.cams.map((c) => (
            <Chip key={c.label} item={c} tone="amber" />
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {data.awos.map((a) => (
            <MetarRow key={a.label} item={a} metars={metars} status={metarStatus} tone="amber" />
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Precautionary stops</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {data.bailouts.map((b) =>
            b.metar ? (
              <MetarRow key={b.label} item={b} metars={metars} status={metarStatus} tone="gray" />
            ) : (
              <Chip key={b.label} item={b} tone="gray" />
            )
          )}
        </div>
      </div>
    </div>
  )
}
