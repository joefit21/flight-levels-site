import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import MountainSignupForm from '../components/MountainSignupForm'

export const metadata = {
  title: 'Mountain Flying Guides: Colorado Passes, Airports & Weather Sources',
  description:
    'Free route guides for flying into Colorado’s mountain airports: which passes to use, which weather cameras and AWOS actually matter, and when to turn around.',
  alternates: {
    canonical: '/mountains',
  },
  openGraph: {
    title: 'Mountain Flying Guides: Colorado Passes, Airports & Weather Sources',
    description:
      'Free route guides for flying into Colorado’s mountain airports, from a CFI and former Denver ARTCC controller based at KLMO.',
    url: 'https://www.flight-levels.com/mountains',
    type: 'website',
  },
}

const GUIDES = [
  {
    href: '/mountains/return-rule',
    kicker: 'Decision-Making',
    title: 'The Return Rule',
    description: 'If conditions are unfavorable anywhere along your route, go back the way you came. The single most useful rule in this whole guide.',
  },
  {
    href: '/mountains/oxygen-rule',
    kicker: 'Decision-Making',
    title: 'The Mountain Pass Oxygen Rule',
    description: 'There is no low-altitude route across the Divide. How 14 CFR 91.211 actually applies to a Colorado crossing.',
  },
  {
    href: '/mountains/mtj',
    kicker: 'Airport Guide',
    title: 'Montrose Regional (MTJ)',
    description: 'North and south routes from the Front Range, the passes on each, and exactly which cameras and AWOS to check before you go.',
  },
  {
    href: '/mountains/hdn-sbs',
    kicker: 'Airport Guide',
    title: 'Steamboat Springs (SBS)',
    description: 'North and south routes from the Front Range, the passes on each, and exactly which cameras and AWOS to check before you go.',
  },
  {
    href: '/mountains/guc',
    kicker: 'Airport Guide',
    title: 'Gunnison-Crested Butte (GUC)',
    description: 'North and south routes from the Front Range, the passes on each, and exactly which cameras and AWOS to check before you go.',
  },
  {
    href: '/mountains/tex',
    kicker: 'Airport Guide',
    title: 'Telluride Regional (TEX)',
    description: 'North and south routes from the Front Range, the passes on each, and exactly which cameras and AWOS to check before you go.',
  },
  {
    href: '/mountains/ase',
    kicker: 'Airport Guide',
    title: 'Aspen-Pitkin County (ASE)',
    description: 'North and south routes from the Front Range, the passes on each, and exactly which cameras and AWOS to check before you go.',
  },
]

const COMING_SOON = [
  { code: 'EGE', name: 'Eagle County' },
  { code: 'RIL', name: 'Rifle' },
  { code: 'GJT', name: 'Grand Junction Regional' },
]

export default function MountainsIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Mountain Flying Guides',
    description: 'Free route guides for flying into Colorado’s mountain airports.',
    url: 'https://www.flight-levels.com/mountains',
    author: { '@type': 'Person', name: 'Joe Mattison' },
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <section className="bg-gradient-to-br from-[#0f2044] to-[#1d4ed8] text-white px-8 py-20 text-center">
        <div className="inline-block bg-white/10 border border-white/20 text-blue-200 text-sm px-4 py-1 rounded-full mb-6">
          Free · CFI &amp; Former Denver ARTCC Controller · Based at KLMO
        </div>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight mb-6">
          Mountain Flying Guides
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
          Local knowledge for flying into Colorado&rsquo;s mountain airports: which passes to use, which weather cameras and AWOS actually matter, and when the answer is &ldquo;not today.&rdquo;
        </p>
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg text-left">
          <p className="text-gray-900 font-semibold mb-1">Get notified as new airports go up</p>
          <p className="text-gray-500 text-sm mb-4">One email per new guide. No spam.</p>
          <MountainSignupForm />
        </div>
      </section>

      <section className="px-8 py-20 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-8">Available Now</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition flex flex-col"
            >
              <span className="text-xs font-semibold text-[#1d4ed8] uppercase tracking-wide mb-3">{g.kicker}</span>
              <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">{g.title}</h3>
              <p className="text-gray-500 text-sm flex-1">{g.description}</p>
              <span className="text-[#1d4ed8] text-sm font-semibold mt-4">Read the guide &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">More Airports Coming</h2>
          <p className="text-gray-500 mb-8">Same depth as the MTJ guide: routes, passes, weather sources, and bail-out options for each.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {COMING_SOON.map((a) => (
              <div key={a.code} className="bg-white border border-gray-100 rounded-xl px-4 py-3">
                <div className="font-mono text-sm font-bold text-gray-400">{a.code}</div>
                <div className="text-sm text-gray-600">{a.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-3">Want a second opinion before you fly?</h2>
        <p className="text-gray-600 mb-8">
          These guides are free and always will be. If you want a pre-trip briefing tailored to your airplane and your trip, or a guide flight on arrival, that&rsquo;s something I do in person out of KLMO.
        </p>
        <Link href="/#services" className="inline-block bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold transition">
          See Mountain Flying Instruction &amp; Destination Pilot Guide
        </Link>
      </section>

      <Footer />
    </main>
  )
}
