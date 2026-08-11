import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'The Return Rule: Mountain Flying Decision-Making',
  description:
    'If conditions are unfavorable anywhere along a mountain route, go back the way you came. Why this rule works, when it doesn’t apply, and how it holds up over years of flying Colorado terrain.',
  alternates: {
    canonical: '/mountains/return-rule',
  },
  openGraph: {
    title: 'The Return Rule: Mountain Flying Decision-Making',
    description:
      'If conditions are unfavorable anywhere along a mountain route, go back the way you came. Why this rule works, and the one narrow exception to it.',
    url: 'https://www.flight-levels.com/mountains/return-rule',
    type: 'article',
  },
}

export default function ReturnRulePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Return Rule: Mountain Flying Decision-Making',
    description:
      'If conditions are unfavorable anywhere along a mountain route, go back the way you came.',
    author: { '@type': 'Person', name: 'Joe Mattison', url: 'https://www.flight-levels.com' },
    publisher: { '@type': 'Person', name: 'Joe Mattison' },
    datePublished: '2026-08-06',
    mainEntityOfPage: 'https://www.flight-levels.com/mountains/return-rule',
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
          The Return Rule
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          This is the single most useful thing I can teach you about flying Colorado&rsquo;s mountains, and it isn&rsquo;t a technique. It&rsquo;s a decision rule. It applies to every pass, on every route, in every airplane I fly with a student.
        </p>

        <div className="bg-gradient-to-br from-[#0f2044] to-[#1d4ed8] text-white rounded-2xl px-8 py-10 mb-12">
          <p className="text-2xl md:text-3xl font-bold leading-snug">
            If conditions are unfavorable at any point along your route, return the way you came.
          </p>
          <p className="text-blue-100 mt-4">
            Not around it. Not through it. Not down to the nearest strip to wait it out. Back the way you came.
          </p>
        </div>

        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <h2 className="text-2xl font-bold text-[#1e3a5f] pt-4">Why your options only go one direction</h2>
          <p>
            Out over flat terrain, when the weather ahead looks bad, your options expand. Deviate thirty degrees. Pick your way around a cell. Land at any one of a dozen airports along your track. Every mile you fly gives you more choices than you had before.
          </p>
          <p>
            In the mountains it&rsquo;s the opposite. Your options contract. That valley off your wingtip doesn&rsquo;t go where you think it goes. That notch in the ridge ahead might be a pass, or it might be a box canyon that ends in granite. Every mile deeper into terrain, you have fewer places to go and less room to change your mind.
          </p>
          <p>
            The only airspace you have verified, first-hand, current information about is the airspace behind you. You just flew through it. You know what the ceiling was there. You know what the ride was like. You know for a fact there&rsquo;s a way out, because that&rsquo;s how you got in. Everything ahead is a guess.
          </p>

          <h2 className="text-2xl font-bold text-[#1e3a5f] pt-4">Why it isn&rsquo;t &ldquo;land and wait&rdquo;</h2>
          <p>
            Landing short to sit out bad weather feels like the conservative choice. Most of the time, it isn&rsquo;t. Mountain pass weather does not change on the timescale you&rsquo;re hoping for. The wind and cloud pattern sitting over a pass at nine in the morning is very often still sitting there at noon.
          </p>
          <p>
            So now you&rsquo;re on the ground at an unfamiliar airport, it&rsquo;s getting later, density altitude is climbing, and afternoon convection is building. You haven&rsquo;t improved your situation. You&rsquo;ve made it worse, and added a deadline you didn&rsquo;t have an hour ago.
          </p>

          <h2 className="text-2xl font-bold text-[#1e3a5f] pt-4">The precondition: you shouldn&rsquo;t be surprised</h2>
          <p>
            This rule only works if you did the first half of the job. Colorado is one of the best-instrumented mountain environments in the country. Before you start the engine, you can pull up a weather camera pointed at the exact ridge you&rsquo;re planning to cross, and often an AWOS sitting near the top of the pass itself.
          </p>
          <p>
            If you get up there and you&rsquo;re surprised, that surprise is information. It means your preflight picture was wrong. And a pilot whose plan just came apart is exactly the wrong person to be inventing a new one, at eleven thousand feet, in terrain, with the fuel burning. Turn around.
          </p>

          <h2 className="text-2xl font-bold text-[#1e3a5f] pt-4">The one exception</h2>
          <p>
            Landing short to wait is reasonable when you have a specific, positive reason to expect improvement: a front moving through behind you, a morning inversion you know will burn off. Something you can name, that you understood before you launched.
          </p>
          <p>
            What doesn&rsquo;t count: <em>&ldquo;it might get better.&rdquo;</em> Hope isn&rsquo;t a forecast. If you can&rsquo;t name the mechanism that&rsquo;s going to change the weather, and roughly when, you don&rsquo;t have a reason to wait. You have a wish.
          </p>

          <h2 className="text-2xl font-bold text-[#1e3a5f] pt-4">The part that actually matters</h2>
          <p>
            Turning around feels like failure. You planned this trip. Somebody&rsquo;s expecting you. Maybe you don&rsquo;t want to be the pilot who couldn&rsquo;t make it.
          </p>
          <p>
            Reframe that. The flight home is not the trip failing. It&rsquo;s the plan working exactly the way you designed it. You picked a route with an exit. You checked conditions. You went and had a look. The conditions weren&rsquo;t there. You used the exit. That&rsquo;s not a washout. That&rsquo;s a pilot doing the job correctly.
          </p>
          <p className="font-medium text-[#1e3a5f]">
            Those passes have been there a few million years. They&rsquo;ll wait.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-4">
          <Link href="/mountains/oxygen-rule" className="block bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl p-6 transition">
            <div className="text-sm text-gray-400 mb-1">Also read</div>
            <div className="text-lg font-bold text-[#1e3a5f]">The Mountain Pass Oxygen Rule &rarr;</div>
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
