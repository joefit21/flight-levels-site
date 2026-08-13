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
  title: 'Steamboat Springs (SBS): Mountain Flying Route Guide',
  description:
    'North and south routes into Steamboat Springs/Bob Adams Field from the Front Range: which passes to use, which weather cameras and AWOS to check, and precautionary stops along the way.',
  alternates: {
    canonical: '/mountains/hdn-sbs',
  },
  openGraph: {
    title: 'Steamboat Springs (SBS): Mountain Flying Route Guide',
    description:
      'North and south routes into Steamboat Springs from the Front Range, with the exact cameras and AWOS to check before you go.',
    url: 'https://www.flight-levels.com/mountains/hdn-sbs',
    type: 'article',
  },
}

const FAQ = [
  {
    q: 'Which route should I fly from the Front Range to Steamboat Springs?',
    a: 'The south route is primary: Rollins or Berthoud Pass, then Granby and Kremmling, then Rabbit Ears Pass at 9,426 feet into Steamboat. It is well covered by cameras and AWOS but crosses higher, near 11,700 feet. The north alternate follows the foothills past Fort Collins, up the Poudre Canyon over Cameron Pass at 10,276 feet, then over Rabbit Ears. It crosses lower but has a real gap in weather coverage.',
  },
  {
    q: 'Where is the weather coverage gap flying to Steamboat Springs?',
    a: 'On the north route over Cameron Pass. There is no AWOS at the pass itself, and Jackson County (K33V) is the closest reporting station despite being some distance away. The south route by contrast has Dakota Hill, Empire, Granby, Kremmling and Walton Peak along the way.',
  },
  {
    q: 'What frequency will I use flying into Steamboat Springs?',
    a: 'On the south route: Denver Approach on 126.1 until Rollins or Berthoud, Denver Center on 128.65 off Kremmling, then Denver Center on 126.5 off the Rabbit Ears transmitter once abeam Kremmling airport. On the north route: Denver Approach on 134.85 out of Denver, then Denver Center on 126.5 once abeam Fort Collins-Loveland, all the way to Steamboat.',
  },
]

const RELATED = [
  {
    href: '/mountains/mtj',
    label: 'Montrose Regional (MTJ)',
    note: 'Its north route shares the Rollins and Berthoud crossings before turning southwest.',
  },
  {
    href: '/mountains/ase',
    label: 'Aspen-Pitkin County (ASE)',
    note: 'Also reached over Rollins or Berthoud, then west through Kremmling and Eagle County.',
  },
]

export default function HdnSbsPage() {
  const jsonLd = guideSchema({
    headline: 'Steamboat Springs (SBS): Mountain Flying Route Guide',
    description:
      'North and south routes into Steamboat Springs from the Front Range, the passes on each, and which weather cameras and AWOS to check before you go.',
    url: 'https://www.flight-levels.com/mountains/hdn-sbs',
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
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mt-2 mb-2 leading-tight">Steamboat Springs</h1>
          <div className="font-mono text-2xl font-bold text-[#1d4ed8] mb-2">SBS</div>
          <p className="font-mono text-sm text-gray-500 mb-4">6,882&#39; MSL</p>
          <p className="text-lg text-gray-600 leading-relaxed">
            There&rsquo;s no low way in from the Front Range. The south route is well covered by cameras and AWOS but crosses higher, near 11,700&#39; at Rollins or Berthoud. The north route crosses lower, at 10,276&#39; over Cameron Pass, but has a real gap in weather coverage along the way.
          </p>
        </div>

        <RouteProvider>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 mb-14">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8] mb-3 block">
              02 &middot; Getting There from the Front Range
            </span>
            <p className="text-gray-600 mb-4">
              Two ways in. Pick one before you leave the ground: both routes top out above 10,000&#39; MSL, so give some thought to supplemental oxygen if you&rsquo;ll be up there a while.
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
            <AtcComms guide="hdn-sbs" />
          </div>
        </RouteProvider>

        <RelatedGuides items={RELATED} />

        <GuideCta guide="hdn-sbs" />
      </article>

      <Footer />
    </main>
  )
}
