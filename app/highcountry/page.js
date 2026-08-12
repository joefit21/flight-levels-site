import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import HighCountryCta from '../components/HighCountryCta'

export const metadata = {
  title: 'High Country IFR: Colorado Mountain Airport Arrivals, Departures and Clearances',
  description:
    'What ATC will actually assign you into and out of Colorado’s mountain airports, based on your direction of flight. Written by a former Denver Center controller for pilots flying turbine and high-performance singles.',
  alternates: {
    canonical: '/highcountry',
  },
  openGraph: {
    title: 'High Country IFR: Colorado Mountain Airport Arrivals, Departures and Clearances',
    description:
      'The routes ATC will actually give you into Colorado’s mountain airports, from a former Denver Center controller.',
    url: 'https://www.flight-levels.com/highcountry',
    type: 'website',
  },
}

const AIRPORTS = [
  {
    href: '/highcountry/aspen',
    code: 'ASE',
    name: 'Aspen / Pitkin County',
    description:
      'Which arrival you get based on your direction of flight, why you get taken so far around the airport before turning in, the LINDZ departure gates, why they launch into the face of arrivals, and how to get a clearance when the tower is closed.',
  },
]

const COMING_SOON = [
  { code: 'EGE', name: 'Eagle County' },
  { code: 'TEX', name: 'Telluride Regional' },
  { code: 'HDN', name: 'Yampa Valley' },
]

export default function HighCountryIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'High Country IFR',
    description:
      'IFR arrival, departure and clearance guidance for Colorado’s mountain airports, from a former Denver Center controller.',
    url: 'https://www.flight-levels.com/highcountry',
    author: { '@type': 'Person', name: 'Joe Mattison' },
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <section className="bg-gradient-to-br from-[#0f2044] to-[#1d4ed8] text-white px-8 py-20 text-center">
        <div className="inline-block bg-white/10 border border-white/20 text-blue-200 text-sm px-4 py-1 rounded-full mb-6">
          Former Denver ARTCC Controller &middot; CFI &middot; Based at KLMO
        </div>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight mb-6">High Country IFR</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          What ATC is actually going to give you into and out of Colorado&rsquo;s mountain airports, and why. For
          pilots flying turbines and high-performance singles into terrain they don&rsquo;t see every week.
        </p>
      </section>

      <section className="px-8 py-16 max-w-3xl mx-auto">
        <p className="text-gray-600 leading-relaxed mb-4">
          Most of what&rsquo;s written about these airports tells you what&rsquo;s charted. That&rsquo;s the part you
          can already look up. What&rsquo;s harder to find is what the controller is going to do with you: which
          arrival you&rsquo;ll be assigned before you file, where you&rsquo;ll be taken before anyone turns you toward
          the field, and which gate you&rsquo;ll leave through on the way out.
        </p>
        <p className="text-gray-600 leading-relaxed">
          I worked this airspace at Denver Center. These pages are the part that isn&rsquo;t on the chart.
        </p>
      </section>

      <section className="px-8 pb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Available Now</h2>
        <div className="grid gap-6">
          {AIRPORTS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition block"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-xl font-bold text-[#1d4ed8]">{a.code}</span>
                <h3 className="text-lg font-bold text-[#1e3a5f]">{a.name}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{a.description}</p>
              <span className="text-[#1d4ed8] text-sm font-semibold mt-4 block">Read the guide &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">More Airports Coming</h2>
          <p className="text-gray-500 mb-6">Same treatment: arrivals by direction, departure gates, and clearance mechanics.</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {COMING_SOON.map((a) => (
              <div key={a.code} className="bg-white border border-gray-100 rounded-xl px-4 py-3">
                <div className="font-mono text-sm font-bold text-gray-400">{a.code}</div>
                <div className="text-sm text-gray-600">{a.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-16 max-w-3xl mx-auto">
        <HighCountryCta page="index" />
      </section>

      <Footer />
    </main>
  )
}
