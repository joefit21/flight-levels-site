import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import RouteToggle from './RouteToggle'
import PassesInDetail from './PassesInDetail'
import AtcComms from './AtcComms'
import { RouteProvider } from './RouteContext'
import GuideCta from '../../components/GuideCta'
import RelatedGuides from '../../components/RelatedGuides'
import { guideSchema } from '../../lib/schema'

export const metadata = {
  title: 'Aspen-Pitkin County (ASE): Mountain Flying Route Guide',
  description:
    'North and south routes into Aspen-Pitkin County/Sardy Field from the Front Range: which passes to use, which weather cameras and AWOS to check, and precautionary stops along the way.',
  alternates: {
    canonical: '/mountains/ase',
  },
  openGraph: {
    title: 'Aspen-Pitkin County (ASE): Mountain Flying Route Guide',
    description:
      'North and south routes into Aspen from the Front Range, with the exact cameras and AWOS to check before you go.',
    url: 'https://www.flight-levels.com/mountains/ase',
    type: 'article',
  },
}

const FAQ = [
  {
    q: 'Which route should I fly from the Front Range to Aspen?',
    a: 'The north route is primary, because it reaches Aspen directly: Rollins or Berthoud Pass, Kremmling, an Eagle County overflight, Cottonwood Pass near Gypsum, then Carbondale and up the Roaring Fork Valley. The south route is the alternate and runs all the way to Montrose before doubling back north up the valley, which makes it considerably longer.',
  },
  {
    q: 'When do I switch to Aspen Approach flying into Aspen?',
    a: 'On the north route, Aspen Approach on 123.8 off Red Table Mountain after Cottonwood Pass, and you stay with them until they hand you to tower. On the south route you pick up 123.8 about 40 miles north of Montrose, then on through Carbondale and up the valley.',
  },
  {
    q: 'Which passes do I cross flying to Aspen?',
    a: 'On the north route: Rollins Pass at 11,676 feet or Berthoud at 11,315, then Cottonwood Pass near Gypsum at 8,280 feet. On the south route: Kenosha at 10,001, Trout Creek at 9,346, and Monarch at 11,312. Both routes cross above 12,500 feet, so plan supplemental oxygen either way.',
  },
]

const RELATED = [
  {
    href: '/highcountry/aspen',
    label: 'Aspen (ASE): IFR Arrivals and Departures',
    note: 'The same airport from the IFR side: which STAR you get by direction, the LINDZ departure gates, and clearance when the tower is closed.',
  },
  {
    href: '/mountains/mtj',
    label: 'Montrose Regional (MTJ)',
    note: 'You overfly Montrose on the south route, and it is a useful bail-out on the way.',
  },
]

export default function AsePage() {
  const jsonLd = guideSchema({
    headline: 'Aspen-Pitkin County (ASE): Mountain Flying Route Guide',
    description:
      'North and south routes into Aspen from the Front Range, the passes on each, and which weather cameras and AWOS to check before you go.',
    url: 'https://www.flight-levels.com/mountains/ase',
    datePublished: '2026-08-07',
    faq: FAQ,
  })

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <article className="px-8 py-20 max-w-3xl mx-auto">
        <Link href="/mountains" className="text-sm font-semibold text-[#1d4ed8] hover:text-[#1e40af] transition">
          &larr; Mountain Flying Guides
        </Link>

        <div className="mt-4 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">01 &middot; At a Glance</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mt-2 mb-2 leading-tight">Aspen-Pitkin County</h1>
          <div className="font-mono text-2xl font-bold text-[#1d4ed8] mb-2">ASE</div>
          <p className="font-mono text-sm text-gray-500 mb-4">7,820&#39; MSL</p>
          <p className="text-lg text-gray-600 leading-relaxed">
            There&rsquo;s no low way in from the Front Range: both routes cross above 12,500&#39;. Well-covered by cameras and AWOS either way.
          </p>
        </div>

        <RouteProvider>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 mb-14">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-3 block">
              02 &middot; Getting There from the Front Range
            </span>
            <p className="text-gray-600 mb-4">
              Two ways in. Pick one before you leave the ground: both routes cross above 12,500&#39; MSL, so plan your oxygen accordingly. Both finish by turning north up the Roaring Fork Valley, over Carbondale, to Aspen.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/mountains/return-rule" className="text-sm font-mono bg-blue-50 text-[#1d4ed8] px-3 py-1.5 rounded-md hover:bg-blue-100 transition">
                &rarr; The Return Rule
              </Link>
              <Link href="/mountains/oxygen-rule" className="text-sm font-mono bg-blue-50 text-[#1d4ed8] px-3 py-1.5 rounded-md hover:bg-blue-100 transition">
                &rarr; The Mountain Pass Oxygen Rule
              </Link>
            </div>
            <RouteToggle />
          </div>

          <div className="border-t border-gray-100 pt-8 mb-14">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-4 block">
              03 &middot; The Passes in Detail
            </span>
            <PassesInDetail />
          </div>

          <div className="border-t border-gray-100 pt-8 mb-14">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-4 block">
              04 &middot; Setting Your Own Limits
            </span>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                This guide gives you the real-time sources: the cameras, the AWOS, and what each pass tends to do in certain wind directions. The Return Rule tells you what to do once you don&rsquo;t like what you see. What it deliberately doesn&rsquo;t do is hand you a wind limit, a ceiling minimum, or a turbulence threshold to fly by.
              </p>
              <p>
                That&rsquo;s not an oversight. Two pilots crossing the same pass in the same conditions are flying genuinely different flights: different aircraft performance, different currency, different comfort with terrain. A number that&rsquo;s conservative for one pilot in one airplane can be reckless for another. Setting a universal limit here would mean substituting my judgment about your risk tolerance for your own, and that&rsquo;s not a substitution either of us should want.
              </p>
              <p>
                You are the pilot in command. Under 14 CFR 91.3, the decision to go, and the decision to turn around, is yours alone: built from your own experience, your airplane&rsquo;s actual performance rather than book numbers on a good day, and an honest read on what you&rsquo;re willing to fly into. This guide&rsquo;s job is making sure you have the real picture before you decide. Deciding is still yours.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 mb-14">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-4 block">
              05 &middot; ATC &amp; Comms
            </span>
            <AtcComms guide="ase" />
          </div>
        </RouteProvider>

        <RelatedGuides items={RELATED} />

        <GuideCta guide="ase" />
      </article>

      <Footer />
    </main>
  )
}
