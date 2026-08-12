import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import HighCountryCta from '../../components/HighCountryCta'
import { ArrivalFlow, DepartureFlow } from './FlowDiagram'

export const metadata = {
  title: 'Aspen (ASE) IFR Arrivals and Departures: What ATC Will Actually Give You',
  description:
    'Which STAR you get into Aspen based on your direction of flight, how the arrival and departure flow actually works, the LINDZ climb gradient, why they launch into the face of arrivals, and when to divert to Rifle.',
  alternates: {
    canonical: '/highcountry/aspen',
  },
  openGraph: {
    title: 'Aspen (ASE) IFR Arrivals and Departures: What ATC Will Actually Give You',
    description:
      'The arrival you should expect into Aspen based on where you are coming from, from a former Denver Center controller.',
    url: 'https://www.flight-levels.com/highcountry/aspen',
    type: 'article',
  },
}

const ARRIVALS = [
  {
    star: 'MMARY',
    from: 'East',
    note: 'Coming from the Front Range and everything east of the Divide.',
  },
  {
    star: 'LOYYD',
    from: 'Southwest',
    note: 'Traffic from Utah and the western slope, and from the Four Corners direction.',
  },
  {
    star: 'HAREI',
    from: 'South and southeast',
    note: 'From the San Luis Valley and the New Mexico side.',
  },
]

const GATES = [
  { fix: 'JNETT', dir: 'East', turn: 'Right turn', note: 'Back toward the Front Range and everything beyond it.' },
  { fix: 'SXW', dir: 'North', turn: 'Right turn', note: 'The route will always carry JESIE and RLG with it.' },
  { fix: 'SLOLM', dir: 'West', turn: 'Left turn', note: 'Toward Utah and the western slope.' },
  { fix: 'HBU', dir: 'South', turn: 'Left turn', note: 'Toward the San Luis Valley and the New Mexico side.' },
]

export default function AspenIfrPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Aspen (ASE) IFR Arrivals and Departures: What ATC Will Actually Give You',
    description:
      'Which STAR you get into Aspen based on your direction of flight, how the arrival and departure flow works, the LINDZ climb gradient, and when to divert to Rifle.',
    author: { '@type': 'Person', name: 'Joe Mattison', url: 'https://www.flight-levels.com' },
    publisher: { '@type': 'Person', name: 'Joe Mattison' },
    datePublished: '2026-08-11',
    mainEntityOfPage: 'https://www.flight-levels.com/highcountry/aspen',
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <article className="px-8 py-20 max-w-3xl mx-auto">
        <Link href="/highcountry" className="text-sm font-semibold text-[#1d4ed8] hover:text-[#1e40af] transition">
          &larr; High Country IFR
        </Link>

        <div className="mt-4 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">01 &middot; At a Glance</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mt-2 mb-2 leading-tight">Aspen / Pitkin County</h1>
          <div className="font-mono text-2xl font-bold text-[#1d4ed8] mb-2">ASE</div>
          <p className="font-mono text-sm text-gray-500 mb-4">7,820&#39; MSL</p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Aspen has a reputation and it has earned every bit of it. But most of what makes it hard is knowable
            before you go. The arrival you&rsquo;ll be assigned is decided by the direction you&rsquo;re coming from,
            the departure is a certainty rather than a guess, and the things that surprise first-timers here surprise
            them mainly because nobody told them in advance.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-3 block">
            02 &middot; How the Flow Actually Works
          </span>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Think of arrivals as a bowl draining counterclockwise. Whichever arrival you&rsquo;re on, you get flown
            around the airport in a counterclockwise circulation until you&rsquo;re essentially straight north of the
            runway. Only then do you get turned back toward the field and cleared for the approach, pointed south at
            runway 15.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            There&rsquo;s a reason the three arrival gates sit where they do. Eagle County is just north of Aspen and
            Rifle is just west, both with their own traffic. Feeding Aspen from the east, southwest and south keeps
            arrivals clear of both.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Departures don&rsquo;t mirror that. Everyone goes north out of the valley on the LINDZ, and then it
            splits: right turn on course for the SXW and JNETT gates, left turn for SLOLM and HBU.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3 text-center">
                Arrivals &middot; counterclockwise
              </div>
              <ArrivalFlow />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3 text-center">
                Departures &middot; LINDZ, then split
              </div>
              <DepartureFlow />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            North up. Schematic only: it shows direction of circulation and which gate feeds from where, not tracks or distances.
          </p>
        </div>

        <div className="border-t border-gray-100 pt-8 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-4 block">
            03 &middot; Which Arrival You&rsquo;ll Get
          </span>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Three arrivals feed Aspen, split by where you&rsquo;re coming from. There is no real ambiguity here, so
            you can brief the one you&rsquo;re going to get before you ever pick up the clearance.
          </p>
          <div className="divide-y divide-gray-100">
            {ARRIVALS.map((a) => (
              <div key={a.star} className="py-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-lg font-bold text-[#1e3a5f] font-mono">{a.star}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wide bg-blue-50 text-[#1d4ed8] px-2 py-0.5 rounded">
                    {a.from}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{a.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-4 block">
            04 &middot; Two Numbers to Accept Before You Commit
          </span>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Both of these are yours to accept or decline, and both are easier to think about on the ground than on
              the approach.
            </p>
            <p>
              <span className="font-semibold text-[#1e3a5f]">Tailwind.</span> Runway 15 is the primary arrival runway,
              and landing that direction frequently means landing with a tailwind. There&rsquo;s 8,000 feet of
              pavement, which sounds like plenty right up until you work out what a tailwind component does to your
              ground roll. Decide what you&rsquo;re willing to take before you start the approach, not while
              you&rsquo;re flying it.
            </p>
            <p>
              <span className="font-semibold text-[#1e3a5f]">Climb gradient on the miss.</span> The missed approach
              asks only for the standard 200 feet per nautical mile, which looks unremarkable written down. What makes
              it different here is that the whole gradient is flown above 10,000 feet. You&rsquo;re asking your
              airplane for that number in thin air, possibly on a hot summer afternoon, possibly with de-ice running
              and whatever that costs you. The requirement is ordinary. The conditions you&rsquo;d be meeting it in
              are not.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-4 block">
            05 &middot; They Launch Into the Face of Arrivals
          </span>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Most airports don&rsquo;t depart airplanes toward the ones that are landing. Aspen does it routinely,
              and if nobody warns you it is a genuinely startling thing to watch from the arrival.
            </p>
            <p>
              The field regularly runs opposite direction operations: landing south on runway 15 while departing north
              on runway 33. The controller times the departure to go out while an arrival is inbound. So there will be
              moments on final where you can see an airplane rolling and lifting off pointed more or less at you.
            </p>
            <p>
              That&rsquo;s the system working as designed, not somebody improvising. The LINDZ is built for it. The
              departure track offsets from the arrival course and climbs above it, so the separation comes from the
              procedure itself rather than from the controller sorting it out in the moment. Knowing that before you
              see it is the difference between a normal approach and a very uncomfortable one.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-4 block">
            06 &middot; When It Doesn&rsquo;t Work, Go to Rifle
          </span>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              If you can&rsquo;t get into Aspen, the answer is usually{' '}
              <span className="font-mono font-semibold text-[#1e3a5f]">RIL</span>. Rifle has substantially lower
              approach minimums, so on a day when Aspen is out, Rifle is often comfortably in.
            </p>
            <p>
              It also has the infrastructure to make the diversion an inconvenience rather than a crisis: a good FBO,
              and a straightforward drive up Interstate 70 to finish the trip on the ground if it comes to that.
            </p>
            <p>
              The catch is that every other pilot knows this too. Weather bad enough to send you to Rifle is bad
              enough to send everyone else there as well, so plan for the possibility of congestion getting in, and
              getting back out again.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-4 block">
            07 &middot; Departures and the Gates
          </span>
          <p className="text-gray-600 mb-4 leading-relaxed">
            You will get the <span className="font-mono font-semibold text-[#1e3a5f]">LINDZ</span> departure. Not
            usually, not most of the time. Every IFR departure off Aspen flies it, so brief it as a certainty rather
            than a possibility. It takes you north out of the valley, and which way you turn on course from there
            depends on your gate.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-5">
            <p className="text-sm text-amber-900 leading-relaxed">
              <span className="font-semibold">The gradient is the gate.</span> The LINDZ asks for 465 feet per
              nautical mile up to 10,600, then the standard 200 above that. Going IFR, you either meet that number or
              you request a VFR climb from clearance delivery. Decide which one you&rsquo;re doing before you key the
              mic, not after you&rsquo;ve been read a clearance.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {GATES.map((g) => (
              <div key={g.fix} className="border border-gray-200 rounded-lg px-4 py-3">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <span className="font-mono font-bold text-[#1e3a5f]">{g.fix}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{g.dir}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      g.turn === 'Right turn' ? 'bg-blue-50 text-[#1d4ed8]' : 'bg-purple-50 text-[#7c3aed]'
                    }`}
                  >
                    {g.turn}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{g.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-4 block">
            08 &middot; Getting Your Clearance on the Ground
          </span>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Between 0700 and 2000 local, the tower is open and this is unremarkable. Call clearance delivery the way
              you would at any towered field.
            </p>
            <p>
              Outside those hours it catches people out, because there&rsquo;s nobody in the tower to call. Get your
              clearance from Denver Center on{' '}
              <span className="font-mono font-semibold text-[#1e3a5f]">119.85</span>. That&rsquo;s the same Aspen
              transmitter that covers a good deal of the high terrain around here, and it works on the ground at the
              airport.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-10 leading-relaxed">
          Procedure names here are given without their revision numbers on purpose, since the number changes every
          time a chart is amended and the name does not. This page describes what to expect, not what to navigate by.
          Fly the current charts.
        </p>

        <HighCountryCta page="aspen" />
      </article>

      <Footer />
    </main>
  )
}
