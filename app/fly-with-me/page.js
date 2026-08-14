import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PackageCard from '../components/PackageCard'

export const metadata = {
  title: 'Mountain Flying Instruction and Pre-Trip Briefings for Colorado',
  description:
    'Pre-trip briefings and mountain flying instruction for owner-pilots flying their own airplane into Aspen, Eagle, Steamboat and Telluride. From a CFI and former Denver ARTCC controller based at KLMO.',
  alternates: {
    canonical: '/fly-with-me',
  },
  openGraph: {
    title: 'Mountain Flying Instruction and Pre-Trip Briefings for Colorado',
    description:
      'For the owner-pilot taking their own airplane into the Colorado mountains for the first time. Briefings and instruction from a former Denver ARTCC controller.',
    url: 'https://www.flight-levels.com/fly-with-me',
    type: 'website',
  },
}

const GROUND_PACKAGES = [
  {
    id: 'pass-briefing',
    name: 'The Pass Briefing',
    tagline: 'Your trip, worked out before you fly it',
    price: '$300',
    priceNote: 'flat',
    badge: 'No airplane needed',
    badgeTone: 'gray',
    body: 'We take the trip you are actually planning and work it start to finish: which route, which passes, and what the terrain tends to do in the wind you are likely to get. Which cameras and AWOS are worth watching the morning you go, and which ones tell you nothing useful. What ATC will do with you, where the radio coverage falls apart, and where it comes back.',
    includes: [
      'Route recommendation for your airplane and your date',
      'The weather sources that matter on that route, and how to read them',
      'What to expect from Denver Center, and where you will lose them',
      'Divert options, and the conditions that should send you to one',
    ],
  },
]

const FLYING_PACKAGES = [
  {
    id: 'cleared-into-aspen',
    name: 'Cleared Into Aspen',
    tagline: 'Or Eagle, Steamboat, Telluride, wherever you are headed',
    price: 'From $1,200',
    priceNote: 'one day',
    badge: 'Flown in your airplane',
    badgeTone: 'blue',
    featured: true,
    body: 'We fly into the airport you actually want to take your family to, on the arrival you will actually be given, and land there. We will put down at a field or two on the way, so your destination is not the first mountain runway you see that day. Aspen is the one most pilots are quietly afraid of and it earns that, but the day works the same way whichever field you have in mind.',
    includes: [
      'The ground briefing, same morning or ahead of time, whichever suits you',
      'Two or three mountain fields across the day, finishing at your destination',
      'The real arrival and approach, and the departure, which is the half most people have not thought about',
      'What the controller is doing with you and why, from someone who did the job',
    ],
  },
  {
    id: 'colorado-loop',
    name: 'The Colorado Loop',
    tagline: 'The high country, not one airport',
    price: 'From $2,400',
    priceNote: 'two days',
    badge: 'Flown in your airplane',
    badgeTone: 'blue',
    body: 'A circuit rather than a single destination. Something along the lines of Steamboat, Eagle County, Aspen and Gunnison with an overnight in the middle, built around whichever fields you care about. Two days buys you something one cannot: different terrain, different field elevations, and the same mountains behaving differently in the morning than they do in the afternoon.',
    includes: [
      'The ground briefing, covering the whole circuit rather than one arrival',
      'Four or more mountain airports across two days',
      'Morning and afternoon conditions, which are genuinely different problems',
      'An overnight at a mountain field, and the next-morning departure that follows it',
    ],
  },
]

export default function FlyWithMePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Mountain Flying Instruction and Pre-Trip Briefings',
        serviceType: 'Flight instruction',
        description:
          'Pre-trip briefings and mountain flying instruction for owner-pilots flying their own airplane into Colorado mountain airports.',
        provider: { '@id': 'https://www.flight-levels.com/#joe' },
        areaServed: { '@type': 'State', name: 'Colorado' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Mountain flying packages',
          itemListElement: [...GROUND_PACKAGES, ...FLYING_PACKAGES].map((p) => ({
            '@type': 'Offer',
            name: p.name,
            description: p.tagline,
            priceCurrency: 'USD',
            price: p.price.replace(/[^0-9]/g, ''),
          })),
        },
      },
    ],
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <section className="bg-gradient-to-br from-[#0f2044] to-[#1d4ed8] text-white px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-white/10 border border-white/20 text-blue-200 text-sm px-4 py-1 rounded-full mb-6">
            CFI &middot; Former Denver ARTCC Controller &middot; Based at KLMO
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            The trip you take before the one with your family
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            You bought the airplane to go places. Aspen in February is one of them. The first time into these
            airports should not be the time your family is sitting behind you, and it does not have to be.
          </p>
        </div>
      </section>

      <section className="px-8 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-5">Who this is for</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            You own a capable airplane. You are current in it and comfortable flying it. What stands between you and
            a ski trip is terrain you have never flown into.
          </p>
          <p>
            That is a knowledge problem rather than a skill problem, and it is a solvable one.
          </p>
          <p>
            We fly <span className="font-semibold text-[#1e3a5f]">your airplane</span>, from your field, on the route
            you will actually fly, at the weights you will actually carry. A checkout in a rented 172 you will never
            see again teaches you very little about what your airplane does at 12,000 feet on a warm afternoon.
          </p>
          <p>
            What I will not do is tell you your limits. You are the pilot in command and that decision stays yours.
            What I can do is make sure you have the real picture before you make it.
          </p>
        </div>
      </section>

      <section className="px-8 pb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Two ways to do this</h2>
        <p className="text-gray-500 mb-10">
          Flat pricing, no hourly clock to watch for either of us. These are not steps in a sequence. Pick the one
          that fits.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
            You fly it yourself
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <div className="grid gap-6 mb-6">
          {GROUND_PACKAGES.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-12 leading-relaxed">
          This is a complete product on its own, not a first step toward anything. Plenty of pilots take the briefing,
          fly the trip themselves, and never need me in the airplane. That is a perfectly good outcome and I would
          rather you have the information than not.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
            I come with you
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Both of these include the ground briefing, whether we do it the same morning or a week ahead. No need to buy
          it separately.
        </p>
        <div className="grid gap-6">
          {FLYING_PACKAGES.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-6 leading-relaxed">
          Day rates cover my time. Aircraft operating costs, fuel, and any landing or ramp fees are yours. Travel is
          billed separately if we are meeting somewhere other than the Front Range, as is lodging on the two-day
          circuit. If weather scrubs a day we reschedule, no charge.
        </p>
      </section>

      <section className="bg-gray-50 px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-5">Why me and not any other CFI</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Plenty of instructors in Colorado can teach you mountain flying, and some of them have been doing it
              longer than I have. Here is the part that is harder to find: before I was teaching in this airspace, I
              was working it, as a controller at Denver ARTCC.
            </p>
            <p>
              That means I can tell you which arrival you are going to be assigned before you file, why the gates sit
              where they do, where you will lose Center and where you will get them back, and what the controller is
              trying to accomplish when they do something that seems strange. That is not something you learn from
              the other side of the radio, and it is most of what makes these trips feel unpredictable to a
              first-timer.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/mountains"
              className="text-sm font-mono bg-white border border-gray-200 text-[#1d4ed8] px-3 py-1.5 rounded-md hover:border-blue-200 transition"
            >
              &rarr; Free mountain flying guides
            </Link>
            <Link
              href="/highcountry"
              className="text-sm font-mono bg-white border border-gray-200 text-[#1d4ed8] px-3 py-1.5 rounded-md hover:border-blue-200 transition"
            >
              &rarr; Free High Country IFR guides
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4 leading-relaxed">
            The guides are free and staying that way. Read them first. If they answer your question completely, you
            do not need me, and that is a perfectly good outcome.
          </p>
        </div>
      </section>

      <section className="px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-3">Start with a conversation</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Tell me the airplane, the destination, and roughly when. I will tell you honestly whether this is worth
          your money, and which of the three above actually fits.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold transition"
        >
          Get in Touch
        </Link>
      </section>

      <Footer />
    </main>
  )
}
