'use client'
import { useRoute } from './RouteContext'

const PASSES = [
  {
    route: 'south',
    name: 'Kenosha Pass',
    elevation: "10,001' MSL",
    road: 'US-285',
    body: 'The most forgiving crossing on either route: a broad, largely flat summit with gentle grades on both approaches.',
    source: 'No nearby AWOS.',
  },
  {
    route: 'south',
    name: 'Trout Creek Pass',
    elevation: "9,346' MSL",
    road: 'US-24/US-285, concurrent',
    body: 'The lowest crossing on the south route, at the Park/Chaffee county line.',
    source: 'Bald Mountain cam and AWOS, near Buena Vista at the base of the west side.',
  },
  {
    route: 'south',
    name: 'Monarch Pass',
    elevation: "11,312' MSL",
    road: 'US-50',
    body: 'On the Continental Divide between Chaffee and Gunnison counties. The crux of the south route: a weather station at the summit holds Colorado’s all-time recorded wind gust, 148 mph, and downdrafts here can outrun a normally aspirated single’s climb even in nothing worse than moderate wind.',
    source: 'Monarch cam and AWOS.',
  },
  {
    route: 'north',
    name: 'Rollins Pass',
    altName: 'Corona Pass',
    elevation: "11,676' MSL",
    road: null,
    body: 'On the Continental Divide in the Front Range, southwest of Boulder. Expect strong downdrafts whenever winds aloft exceed 30 knots.',
    source: 'Dakota Hill cam and AWOS.',
  },
  {
    route: 'north',
    name: 'Berthoud Pass',
    elevation: "11,315' MSL",
    road: 'US-40',
    body: 'On the Continental Divide between Empire and Winter Park. Same downdraft caution as the other high crossings in moderate to strong wind.',
    source: 'Empire AWOS, the Berthoud backup.',
  },
  {
    route: 'north',
    name: 'Cottonwood Pass',
    location: '(Gypsum)',
    elevation: "8,280' MSL",
    road: 'Eagle County Road 10A',
    body: 'Southwest of Gypsum. By far the lowest pass on either route, and the easy stretch before continuing on past Montrose to Telluride. Not to be confused with the higher Cottonwood Pass near Buena Vista, a different crossing entirely.',
    source: 'Sunlight Mountain AWOS.',
  },
]

export default function PassesInDetail() {
  const { route } = useRoute()
  const passes = PASSES.filter((p) => p.route === route)

  return (
    <div>
      <p className="text-xs text-gray-400 mb-4">
        Showing the {route === 'south' ? 'South · Primary' : 'North · Alternate'} route.
      </p>
      <div className="divide-y divide-gray-100">
        {passes.map((p) => (
          <div key={p.name} className="py-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <h3 className="text-lg font-bold text-[#1e3a5f]">
                {p.name}
                {p.altName && <span className="text-gray-400 font-normal text-base"> ({p.altName})</span>}
                {p.location && <span className="text-gray-400 font-normal text-base"> {p.location}</span>}
              </h3>
              <span className="font-mono text-sm text-gray-500">{p.elevation}</span>
              {p.road && (
                <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{p.road}</span>
              )}
            </div>
            <p className="text-gray-600 leading-relaxed mb-2">{p.body}</p>
            <p className="text-xs text-gray-400">Weather source: {p.source}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
