'use client'
import { useRoute } from './RouteContext'

const PASSES = [
  {
    routes: ['south'],
    name: 'Rollins Pass',
    altName: 'Corona Pass',
    elevation: "11,676' MSL",
    road: null,
    body: 'On the Continental Divide in the Front Range, southwest of Boulder. Expect strong downdrafts whenever winds aloft exceed 30 knots.',
    source: 'Dakota Hill cam and AWOS.',
  },
  {
    routes: ['south'],
    name: 'Berthoud Pass',
    elevation: "11,315' MSL",
    road: 'US-40',
    body: 'On the Continental Divide between Empire and Winter Park. Same downdraft caution as the other high crossings in moderate to strong wind.',
    source: 'Empire AWOS, the Berthoud backup.',
  },
  {
    routes: ['north'],
    name: 'Cameron Pass',
    elevation: "10,276' MSL",
    road: 'CO-14',
    body: 'In the Poudre Canyon, on the Larimer/Jackson county line. The climb up from the east side is gradual, the west side is steeper.',
    source: "No AWOS at the pass itself. Jackson County is the closest reporting station, though it's some distance away.",
  },
  {
    routes: ['south', 'north'],
    name: 'Rabbit Ears Pass',
    elevation: "9,426' MSL",
    road: 'US-40',
    body: 'On the Continental Divide between Grand and Jackson counties, the last crossing before Steamboat Springs on either route. Rather than a sharp summit, the terrain holds near 10,000 feet for several miles before descending into the valley.',
    source: 'Walton Peak cam and AWOS.',
  },
]

export default function PassesInDetail() {
  const { route } = useRoute()
  const passes = PASSES.filter((p) => p.routes.includes(route))

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
