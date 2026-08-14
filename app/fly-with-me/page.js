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

const PACKAGES = [
  {
    id: 'pass-briefing',
    name: 'The Pass Briefing',
    tagline: 'Your trip, before you fly it',
    price: '$300',
    priceNote: 'flat',
    badge: 'No airplane needed',
    badgeTone: 'gray',
    body: 'We take the trip you are actually planning and work it start to finish: which route, which passes, and what the terrain does in the wind you are likely to get. Which cameras and AWOS are worth watching the morning you go, and which ones tell you nothing. What ATC will do with you, where the radio coverage falls apart, and where it comes back.',
    includes: [
      'Route recommendation for your airplane and your date',
      'The weather sources that matter on that route, and how to read them',
      'What to expect from Denver Center, and where you will lose them',
      'Divert options, and the conditions that should send you to one',
    ],
  },
  {
    id: 'first-crossing',
    name: 'The First Crossing',
    tagline: 'Your first time over the Divide, in your own airplane',
    price: '$1,000',
    priceNote: 'one day',
    badge: 'Flown in your airplane',
    badgeTone: 'blue',
    body: 'For the pilot with a capable airplane who has never taken it into the mountains. We fly a real route out of the Front Range, cross a real pass, land at a real mountain airport, and come back. You fly the entire time. I am there for the parts that do not come from a book: reading the terrain, picking the line, and knowing when the answer is to go home.',
    includes: [
      'Pre-flight planning session, the Pass Briefing built in',
      'A full day flying a real mountain route, you in the left seat',
      'Pass crossing, terrain reading, and route selection in practice',
      'Debrief, and a plan for the trip you are actually working toward',
    ],
  },
  {
    id: 'cleared-into-aspen',
    name: 'Cleared Into Aspen',
    tagline: 'Or Eagle, Steamboat, or Telluride',
    price: 'From $1,200',
    priceNote: 'one day',
    badge: 'Flown in your airplane',
    badgeTone: 'blue',
    featured: true,
    body: 'The destination checkout. We fly into the airport you actually want to take your family to, on the arrival you will actually be given, and land there. Aspen is the one most pilots are quietly afraid of, and it earns that. Eagle, Steamboat and Telluride work exactly the same way. By the time you do it with people in the back, you will have already done it once.',
    includes: [
      'Destination-specific briefing before we go',
      'The real arrival, the real approach, and a landing at the field',
      'What the controller is doing with you and why, from someone who did it',
      'The departure too, which is the half most first-timers have not thought about',
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
          itemListElement: PACKAGES.map((p) => ({
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
            You own or have access to a capable airplane, you are current and comfortable flying it, and the thing
            standing between you and a ski trip is terrain you have never flown into. That is a knowledge problem, not
            a skill problem, and it is a solvable one.
          </p>
          <p>
            I do not have a rental airplane, and I have come to think that is the right way round for this. We fly{' '}
            <span className="font-semibold text-[#1e3a5f]">your airplane</span>, from your field, on the route you
            will actually fly, at the weights you will actually carry. A checkout in a rented 172 you will never see
            again teaches you considerably less about what your airplane does at 12,000 feet on a warm afternoon.
          </p>
          <p>
            What I will not do is tell you your limits. You are the pilot in command and that decision stays yours.
            What I can do is make sure you have the real picture before you make it.
          </p>
        </div>
      </section>

      <section className="px-8 pb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">How we work together</h2>
        <p className="text-gray-500 mb-8">
          Flat pricing. No hourly clock to watch, for either of us.
        </p>
        <div className="grid gap-6">
          {PACKAGES.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-6 leading-relaxed">
          Day rates cover my time. Aircraft operating costs, fuel, and any landing or ramp fees are yours, and travel
          is billed separately if we are meeting somewhere other than the Front Range. If weather scrubs the day we
          reschedule, no charge.
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
