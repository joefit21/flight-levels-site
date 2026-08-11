import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'The Mountain Pass Oxygen Rule: 91.211 for Colorado Crossings',
  description:
    'There is no low-altitude route across the Colorado Rockies. Every pass crossing puts you above 12,500’ MSL. Here’s how 14 CFR 91.211 actually applies to a mountain flight.',
  alternates: {
    canonical: '/mountains/oxygen-rule',
  },
  openGraph: {
    title: 'The Mountain Pass Oxygen Rule: 91.211 for Colorado Crossings',
    description:
      'There is no low-altitude route across the Colorado Rockies. Here’s how the FAA’s supplemental oxygen rule actually applies to a mountain pass crossing.',
    url: 'https://www.flight-levels.com/mountains/oxygen-rule',
    type: 'article',
  },
}

export default function OxygenRulePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Mountain Pass Oxygen Rule',
    description:
      'Every pass crossing in the Colorado Rockies requires flying above 12,500’ MSL. Here’s how 14 CFR 91.211 applies in practice.',
    author: { '@type': 'Person', name: 'Joe Mattison', url: 'https://www.flight-levels.com' },
    publisher: { '@type': 'Person', name: 'Joe Mattison' },
    datePublished: '2026-08-06',
    mainEntityOfPage: 'https://www.flight-levels.com/mountains/oxygen-rule',
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <article className="px-8 py-20 max-w-3xl mx-auto">
        <Link href="/mountains" className="text-sm font-semibold text-[#1d4ed8] hover:text-[#1e40af] transition">
          &larr; Mountain Flying Guides
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mt-4 mb-6 leading-tight">
          The Mountain Pass Oxygen Rule
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          This applies to every route in this guide. There is no low-altitude way across the Front Range and the Divide: every crossing puts you above 12,500&rsquo; MSL, which means 14 CFR 91.211 is not a footnote, it&rsquo;s part of the flight plan.
        </p>

        <div className="bg-gradient-to-br from-[#0f2044] to-[#1d4ed8] text-white rounded-2xl px-8 py-10 mb-12">
          <p className="text-2xl md:text-3xl font-bold leading-snug">
            No supplemental oxygen required for the first 30 minutes above 12,500&rsquo; (up to 14,000&rsquo;).
          </p>
          <p className="text-blue-100 mt-4">
            After that 30 minutes, the required flight crew must be on oxygen for the remainder of the time above 12,500&rsquo;. At or above 15,000&rsquo;, every occupant must be provided supplemental oxygen.
          </p>
        </div>

        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <h2 className="text-2xl font-bold text-[#1e3a5f] pt-4">Plan the crossing time, not just the altitude</h2>
          <p>
            Passes like Monarch (11,312&rsquo;), Rollins (11,676&rsquo;), and Berthoud (11,315&rsquo;) all require a crossing altitude that puts you into the 91.211 window for reasonable terrain clearance. That&rsquo;s not a technicality to work around. It&rsquo;s a real physiological constraint that belongs in your planning the same way fuel and weather do.
          </p>
          <p>
            Time your 30 minutes from the point you climb above 12,500&rsquo;, not from engine start. On a route with a long climb to altitude followed by a quick crossing, you may use very little of that window. On a route where you level off early and cruise across at altitude, you can burn through it faster than expected.
          </p>

          <h2 className="text-2xl font-bold text-[#1e3a5f] pt-4">Don&rsquo;t treat &ldquo;duck under for a few minutes&rdquo; as a loophole</h2>
          <p>
            Some pilots plan to dip below 12,500&rsquo; periodically to reset the clock. That only works if the terrain actually gives you somewhere to do it. Mountain terrain frequently doesn&rsquo;t: you can be above 12,500&rsquo; for the entire useful crossing with no lower altitude available that still clears the ridge. Have an honest answer for where you&rsquo;d descend to before you rely on that strategy.
          </p>

          <h2 className="text-2xl font-bold text-[#1e3a5f] pt-4">Have oxygen with you, even if you don&rsquo;t plan to need it</h2>
          <p>
            Weather and routing rarely go exactly as planned in this terrain. A pilot who carries supplemental oxygen has more options if a crossing takes longer than expected, if a reroute pushes the altitude up, or if a passenger feels the effects of altitude sooner than the pilot does. This is cheap insurance for a trip you&rsquo;ve already decided is worth flying.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-4">
          <Link href="/mountains/return-rule" className="block bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl p-6 transition">
            <div className="text-sm text-gray-400 mb-1">Also read</div>
            <div className="text-lg font-bold text-[#1e3a5f]">The Return Rule &rarr;</div>
          </Link>
          <Link href="/mountains" className="block bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl p-6 transition">
            <div className="text-sm text-gray-400 mb-1">Browse</div>
            <div className="text-lg font-bold text-[#1e3a5f]">All Mountain Flying Guides &rarr;</div>
          </Link>
        </div>

        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-[#1e3a5f] mb-1">Want a second opinion before you go?</h3>
            <p className="text-gray-600 text-sm">I offer pre-trip briefings and mountain flying instruction based at KLMO.</p>
          </div>
          <Link href="/#contact" className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap">
            Get in Touch
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  )
}
