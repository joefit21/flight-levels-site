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
      x2: 365,
    },
    {
      freq: '128.65',
      facility: 'Denver Center',
      transmitter: 'Kremmling',
      note: 'Once past Rollins or Berthoud Pass.',
      color: '#7c3aed',
      x1: 365,
      x2: 240,
    },
    {
      freq: '126.5',
      facility: 'Denver Center',
      transmitter: 'Rabbit Ears Pass',
      note: 'Once abeam Kremmling Airport. Strong reception the rest of the way to Steamboat.',
      color: '#0891b2',
      x1: 240,
      x2: 20,
    },
  ],
  north: [
    {
      freq: '134.85',
      facility: 'Denver Approach',
      transmitter: 'Denver',
      note: 'From departure, heading north.',
      color: '#f59e0b',
      x1: 440,
      x2: 390,
    },
    {
      freq: '126.5',
      facility: 'Denver Center',
      transmitter: 'Denver and Rabbit Ears Pass',
      note: 'Once abeam Fort Collins-Loveland Airport. Strong reception the rest of the way to Steamboat.',
      color: '#0891b2',
      x1: 390,
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
      aria-label={`Frequency handoff points along the ${route} route, aligned with the pass map above, Front Range on the right and Steamboat on the left`}
      className="w-full h-auto mb-2"
    >
      {zones.map((z, i) => (
        <g key={i}>
          <rect
            x={Math.min(z.x1, z.x2)}
            y="10"
            width={Math.abs(z.x1 - z.x2)}
            height="16"
            fill={z.color}
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

      <div className="space-y-3 mt-5">
        {zones.map((z, i) => (
          <div key={i} className="border border-gray-200 rounded-md px-3 py-2.5 flex gap-3">
            <span
              className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
              style={{ backgroundColor: z.color }}
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
