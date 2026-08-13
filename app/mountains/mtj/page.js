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
  title: 'Montrose Regional (MTJ): Mountain Flying Route Guide',
  description:
    'North and south routes into Montrose Regional from the Front Range: which passes to use, which weather cameras and AWOS to check, and precautionary stops along the way.',
  alternates: {
    canonical: '/mountains/mtj',
  },
  openGraph: {
    title: 'Montrose Regional (MTJ): Mountain Flying Route Guide',
    description:
      'North and south routes into Montrose Regional from the Front Range, with the exact cameras and AWOS to check before you go.',
    url: 'https://www.flight-levels.com/mountains/mtj',
    type: 'article',
  },
}

const FAQ = [
  {
    q: 'Which route should I fly from the Front Range to Montrose Regional?',
    a: 'There are two, and you should pick one before you leave the ground. The south route is primary: Kenosha Pass at 10,001 feet, Trout Creek Pass at 9,346, then Monarch Pass at 11,312 before Gunnison and Montrose. The north route is the alternate: Rollins or Berthoud Pass, Kremmling, an Eagle County overflight, then Cottonwood Pass near Gypsum. Both cross above 12,500 feet, so plan supplemental oxygen either way.',
  },
  {
    q: 'What ATC frequency will I have crossing Monarch Pass into Montrose?',
    a: 'Denver Center on 119.85, off the Denver and Aspen transmitters, starting about 10 miles before Kenosha Pass. Expect degraded reception below 16,000 feet from beyond Kenosha through Monarch. That is a known coverage gap rather than a problem with your radio. Once past Monarch you switch to 124.5 off the Gunnison Airport transmitter.',
  },
  {
    q: 'Which pass is the hardest on the way to Montrose?',
    a: 'Monarch Pass at 11,312 feet, on the Continental Divide between Chaffee and Gunnison counties. A weather station at the summit holds Colorado’s all-time recorded wind gust of 148 mph, and downdrafts there can outrun a normally aspirated single’s climb in nothing worse than moderate wind.',
  },
  {
    q: 'Where can I stop if the weather turns on the way to Montrose?',
    a: 'On the south route, Buena Vista (AEJ), Salida (ANK) and Gunnison (GUC). On the north route, Granby (GNB), Kremmling (20V), Eagle County (EGE) and Rifle (RIL).',
  },
]

const RELATED = [
  {
    href: '/mountains/guc',
    label: 'Gunnison-Crested Butte (GUC)',
    note: 'Same south route as far as Gunnison, with one fewer frequency change at the end.',
  },
  {
    href: '/mountains/tex',
    label: 'Telluride Regional (TEX)',
    note: 'Continues past Montrose to Telluride on either route, over the Cones VOR.',
  },
  {
    href: '/mountains/ase',
    label: 'Aspen-Pitkin County (ASE)',
    note: 'Shares both routes, then turns north up the Roaring Fork Valley instead.',
  },
]

export default function MtjPage() {
  const jsonLd = guideSchema({
    headline: 'Montrose Regional (MTJ): Mountain Flying Route Guide',
    description:
      'North and south routes into Montrose Regional from the Front Range, the passes on each, and which weather cameras and AWOS to check before you go.',
    url: 'https://www.flight-levels.com/mountains/mtj',
    datePublished: '2026-08-06',
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
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mt-2 mb-2 leading-tight">Montrose Regional</h1>
          <div className="font-mono text-2xl font-bold text-[#1d4ed8] mb-2">MTJ</div>
          <p className="font-mono text-sm text-gray-500 mb-4">5,759&#39; MSL</p>
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
              Two ways in. Pick one before you leave the ground: both routes cross above 12,500&#39; MSL, so plan your oxygen accordingly.
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
            <AtcComms guide="mtj" />
          </div>
        </RouteProvider>

        <RelatedGuides items={RELATED} />

        <GuideCta guide="mtj" />
      </article>

      <Footer />
    </main>
  )
}
