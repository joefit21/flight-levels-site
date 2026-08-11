'use client'
import { useRoute } from './RouteContext'
import RouteMap from './RouteMap'
import AtcTrainerCta from '../../components/AtcTrainerCta'

const COMMS = {
  south: [
    {
      freq: '126.1',
      facility: 'Denver Approach',
      transmitter: 'Denver',
      note: 'From departure.',
      color: '#1d4ed8',
      x1: 440,
      x2: 375,
    },
    {
      freq: '119.85',
      facility: 'Denver Center',
      transmitter: 'Denver and Aspen',
      note: 'Starting about 10 miles before Kenosha Pass. Expect degraded reception below 16,000’ from beyond Kenosha through Monarch. That’s a known coverage gap, not a bad radio.',
      color: '#f59e0b',
      weak: true,
      x1: 375,
      x2: 155,
    },
    {
      freq: '124.5',
      facility: 'Denver Center',
      transmitter: 'Gunnison Airport',
      note: 'Once past Monarch Pass. Strong reception here.',
      color: '#059669',
      x1: 155,
      x2: 75,
    },
    {
      freq: '127.1',
      facility: 'Denver Center',
      transmitter: 'Montrose Airport',
      note: 'From about halfway between Gunnison and Montrose.',
      color: '#0891b2',
      x1: 75,
      x2: 65,
    },
    {
      freq: '125.35',
      facility: 'Denver Center',
      transmitter: 'Telluride',
      note: 'About 15 miles south of MTJ, over the Cones VOR (ETL) and on to Telluride. Strong reception the rest of the way.',
      color: '#7c3aed',
      x1: 65,
      x2: 20,
    },
  ],
  north: [
    {
      freq: '126.1',
      facility: 'Denver Approach',
      transmitter: 'Denver',
      note: 'From departure.',
      color: '#1d4ed8',
      x1: 440,
      x2: 372,
    },
    {
      freq: '128.65',
      facility: 'Denver Center',
      transmitter: 'Kremmling',
      note: 'Once past Rollins or Corona Pass. Stay on this through the Eagle County overflight: Denver Center is working Eagle Co arrivals and departures and has the best traffic picture there.',
      color: '#7c3aed',
      x1: 372,
      x2: 200,
    },
    {
      freq: '123.8',
      facility: 'Aspen Approach',
      transmitter: 'Red Table Mountain',
      note: 'After Cottonwood Pass. Strong reception here.',
      color: '#db2777',
      x1: 200,
      x2: 75,
    },
    {
      freq: '127.1',
      facility: 'Denver Center',
      transmitter: 'Montrose Airport',
      note: 'From about halfway between Cottonwood Pass and Montrose.',
      color: '#0891b2',
      x1: 75,
      x2: 65,
    },
    {
      freq: '125.35',
      facility: 'Denver Center',
      transmitter: 'Telluride',
      note: 'About 15 miles south of MTJ, over the Cones VOR (ETL) and on to Telluride. Strong reception the rest of the way.',
      color: '#0d9488',
      x1: 65,
      x2: 20,
    },
  ],
}

function CommsStrip({ route }) {
  const zones = COMMS[route]

  return (
    <svg
      viewBox="0 0 460 36"
      role="img"
      aria-label={`Frequency handoff points along the ${route} route, aligned with the pass map above, Front Range on the right and Telluride on the left`}
      className="w-full h-auto mb-2"
    >
      <defs>
        <pattern id="weakSignal" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#f59e0b" fillOpacity="0.35" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="#b45309" strokeWidth="1.5" />
        </pattern>
      </defs>

      {zones.map((z, i) => (
        <g key={i}>
          <rect
            x={Math.min(z.x1, z.x2)}
            y="10"
            width={Math.abs(z.x1 - z.x2)}
            height="16"
            fill={z.weak ? 'url(#weakSignal)' : z.color}
          />
          {i > 0 && <line x1={z.x1} y1="6" x2={z.x1} y2="30" stroke="#ffffff" strokeWidth="2" />}
        </g>
      ))}
      <rect x="12" y="10" width="436" height="16" fill="none" stroke="#d1d5db" strokeWidth="1" />
    </svg>
  )
}

export default function AtcComms({ guide }) {
  const { route } = useRoute()
  const zones = COMMS[route]

  return (
    <div>
      <p className="text-xs text-gray-400 mb-4">
        Showing the {route === 'south' ? 'South · Primary' : 'North · Alternate'} route. Same pass positions as the
        map below, so you can line up exactly where each frequency change happens.
      </p>
      <RouteMap route={route} />
      <CommsStrip route={route} />
      <p className="text-xs text-gray-400 mb-5">Hatched segment: known weak or gap reception below 16,000&#39;.</p>

      <div className="space-y-3">
        {zones.map((z, i) => (
          <div key={i} className="border border-gray-200 rounded-md px-3 py-2.5 flex gap-3">
            <span
              className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
              style={{ backgroundColor: z.weak ? '#f59e0b' : z.color }}
            />
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-mono font-bold text-[#1e3a5f]">{z.freq}</span>
                <span className="text-sm text-gray-700">{z.facility}</span>
                <span className="text-xs text-gray-400">&middot; {z.transmitter} transmitter</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{z.note}</p>
            </div>
          </div>
        ))}
      </div>
      <AtcTrainerCta guide={guide} />
    </div>
  )
}
