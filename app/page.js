'use client'
import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://www.flight-levels.com/#joe',
        name: 'Joe Mattison',
        jobTitle: 'Certified Flight Instructor',
        description: 'CFI and working Denver ARTCC air traffic controller based at KLMO in Longmont, Colorado. Specializes in mountain flying instruction, flight reviews, IPCs, and destination pilot orientation for pilots flying into Colorado.',
        url: 'https://www.flight-levels.com',
        sameAs: ['https://www.youtube.com/@Flight-Levels'],
      },
      {
        '@type': 'WebSite',
        url: 'https://www.flight-levels.com',
        name: 'Flight Levels',
        description: 'Aviation training and tools by Joe Mattison — CFI and Denver ARTCC controller based in Longmont, Colorado.',
        author: { '@id': 'https://www.flight-levels.com/#joe' },
      },
      {
        '@type': 'Service',
        name: 'Mountain Flying Instruction',
        provider: { '@id': 'https://www.flight-levels.com/#joe' },
        description: 'Mountain flying orientation and instruction based at KLMO, Longmont CO. Density altitude, terrain flying, Rocky Mountain ATC procedures, and high-altitude airport operations.',
        areaServed: { '@type': 'State', name: 'Colorado' },
      },
      {
        '@type': 'Service',
        name: 'Flight Review (BFR)',
        provider: { '@id': 'https://www.flight-levels.com/#joe' },
        description: 'FAA flight review from a CFI with 21+ years of experience and active Denver ARTCC controller. Based at KLMO, Longmont CO.',
        offers: { '@type': 'Offer', price: '100', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'HOUR' } },
      },
      {
        '@type': 'Service',
        name: 'Instrument Proficiency Check (IPC)',
        provider: { '@id': 'https://www.flight-levels.com/#joe' },
        description: 'IPC from a CFII with deep knowledge of Rocky Mountain IFR operations and Denver Center/Approach procedures.',
        offers: { '@type': 'Offer', price: '100', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'HOUR' } },
      },
      {
        '@type': 'Service',
        name: 'Mock Oral Checkride',
        provider: { '@id': 'https://www.flight-levels.com/#joe' },
        description: 'Simulated FAA oral checkride via FaceTime or Teams. Private, instrument, and commercial certificates.',
        offers: { '@type': 'Offer', price: '100', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'HOUR' } },
      },
    ],
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div>
          <div className="text-xl font-bold text-[#1e3a5f]">Flight Levels</div>
          <div className="text-xs text-gray-500 tracking-wide">Joe Mattison · KLMO</div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#about" className="hover:text-[#1e3a5f] transition">About</a>
          <a href="#colorado" className="hover:text-[#1e3a5f] transition">Colorado Flying</a>
          <a href="#services" className="hover:text-[#1e3a5f] transition">Services</a>
          <a href="#youtube" className="hover:text-[#1e3a5f] transition">YouTube</a>
          <a href="#contact" className="hover:text-[#1e3a5f] transition">Contact</a>
          <a href="https://practice.flight-levels.com" target="_blank" className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg transition">ATC Trainer</a>
          <a href="https://checkride.flight-levels.com" target="_blank" className="bg-[#0f766e] hover:bg-[#0d6460] text-white px-4 py-2 rounded-lg transition">Checkride Prep</a>
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden text-gray-600 hover:text-[#1e3a5f]" onClick={() => setMobileMenuOpen(o => !o)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-8 py-4 flex flex-col gap-4 text-sm font-medium text-gray-600 z-40">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1e3a5f]">About</a>
          <a href="#colorado" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1e3a5f]">Colorado Flying</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1e3a5f]">Services</a>
          <a href="#youtube" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1e3a5f]">YouTube</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1e3a5f]">Contact</a>
          <a href="https://practice.flight-levels.com" target="_blank" className="text-[#1d4ed8]">ATC Trainer</a>
          <a href="https://checkride.flight-levels.com" target="_blank" className="text-[#0f766e]">Checkride Prep</a>
        </div>
      )}

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2044] to-[#1d4ed8] text-white px-8 py-28 text-center">
        <div className="inline-block bg-white/10 border border-white/20 text-blue-200 text-sm px-4 py-1 rounded-full mb-6">
          CFI · Denver ARTCC Controller · Based at KLMO, Longmont CO
        </div>
        <h1 className="text-5xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight mb-6">
          Both Sides of <span className="text-blue-300">the Radio</span>
        </h1>
        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
          21 years as a flight instructor. A working air traffic controller over the Rocky Mountains. If you're flying in Colorado — or planning to — there's no substitute for someone who knows this airspace from both seats.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <a href="#colorado" className="bg-white text-[#1e3a5f] hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition">
            Flying in Colorado?
          </a>
          <a href="#services" className="border border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg text-lg transition">
            See All Services
          </a>
          <a href="https://checkride.flight-levels.com/demo" target="_blank" className="border border-teal-400/50 hover:border-teal-400 text-teal-300 hover:text-teal-200 px-8 py-4 rounded-lg text-lg transition">
            Try Checkride Prep Free
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 py-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-4">
            <img src="/joe-plane.png" alt="Joe Mattison with his aircraft at KLMO" className="w-full object-cover object-center rounded-2xl shadow-lg" />
            <img src="/joe-cockpit.png" alt="Joe Mattison in the cockpit" className="w-full object-cover object-center rounded-2xl shadow-lg" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6">Hi, I'm Joe</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I've been a certificated flight instructor since 2005 — over 21 years of teaching pilots to fly safely and confidently. I hold a Commercial certificate with single-engine land, single-engine sea, and multi-engine land ratings, plus CFI and CFII credentials. I'm based at Longmont Municipal Airport (KLMO), elevation 5,000 MSL, with the Front Range and Rocky Mountains immediately to the west.
              </p>
              <p>
                I'm also a working air traffic controller at Denver ARTCC — the facility that manages IFR traffic over some of the most complex mountain terrain in the country. That means when I talk about Colorado airspace, ATC expectations, or Rocky Mountain IFR operations, I'm not reading from a textbook. I'm describing what I see from the other side of the scope every time I work a shift.
              </p>
              <p>
                That combination — active CFI and working ARTCC controller — is uncommon. Most instructors teach what ATC wants. I can show you exactly how controllers think, what they expect, and where pilots most often create problems for themselves in this airspace.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { number: '21+', label: 'Years Instructing' },
                { number: 'ARTCC', label: 'Denver Center' },
                { number: '5,000', label: 'MSL — KLMO' },
                { number: '5', label: 'Certificates & Ratings' },
              ].map((stat, i) => (
                <div key={i} className="text-center bg-blue-50 rounded-xl p-4">
                  <div className="text-xl font-bold text-[#1d4ed8]">{stat.number}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Colorado Flying */}
      <section id="colorado" className="bg-[#0f2044] text-white px-8 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-white/10 border border-white/20 text-blue-200 text-sm px-4 py-1 rounded-full mb-4">
              Based at KLMO · Longmont, Colorado
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flying in Colorado Is Different</h2>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Density altitude that robs performance before you leave the ground. Mountain weather that doesn't follow the textbook. ATC procedures shaped by terrain that most pilots never train for. Whether you're based here or flying in from out of state, this environment demands local knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-3xl mb-4">🏔️</div>
              <h3 className="text-xl font-bold mb-3">Terrain and Density Altitude</h3>
              <p className="text-blue-100 leading-relaxed">
                KLMO sits at 5,000 MSL. On a warm summer afternoon, density altitude can push well above 8,000 feet before you've left the valley. Mountain airports like Eagle, Aspen, Telluride, and Steamboat add elevation, short runways, and one-way traffic patterns to the equation. I fly and instruct in this environment regularly — it's not a special occasion.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-3xl mb-4">📡</div>
              <h3 className="text-xl font-bold mb-3">Rocky Mountain ATC — From the Inside</h3>
              <p className="text-blue-100 leading-relaxed">
                Denver ARTCC manages IFR traffic over and through some of the highest terrain in the lower 48. Complex sector boundaries, terrain-avoidance restrictions, military operating areas, and transition procedures that catch unfamiliar pilots off guard. I work this airspace from the controller's side. I know what causes delays, what gets pilots busted, and what makes a pilot easy to work with.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-3xl mb-4">⛅</div>
              <h3 className="text-xl font-bold mb-3">Mountain Weather Decision-Making</h3>
              <p className="text-blue-100 leading-relaxed">
                Afternoon convective activity builds fast along the Front Range and over the Divide. Mountain wave can make a smooth 9,000-foot crossing into a handful in minutes. Valley winds, orographic lift, and rapid visibility changes are part of the routine. I'll teach you how to read what Colorado weather is telling you — and when it's telling you to stay on the ground.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-3xl mb-4">✈️</div>
              <h3 className="text-xl font-bold mb-3">Destination Pilots Flying into Colorado</h3>
              <p className="text-blue-100 leading-relaxed">
                You planned the trip, reserved the airplane or brought your own, and now you're flying into one of the most demanding environments in the country — probably for the first time. I offer pre-trip orientation, a local guide flight on arrival, or both. You'll leave knowing the terrain, the airspace, and exactly what ATC expects from you on that routing.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/60 to-blue-800/40 border border-blue-500/30 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Flying into Colorado this season?</h3>
              <p className="text-blue-200">Let's connect before your trip. A one-hour conversation with someone who knows this airspace from both sides of the radio is worth more than any YouTube briefing.</p>
            </div>
            <a href="#contact" className="bg-white text-[#1e3a5f] hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition whitespace-nowrap">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-gray-50 px-8 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1e3a5f] text-center mb-4">Services</h2>
          <p className="text-gray-500 text-center mb-16">In-person instruction based at KLMO and online tools available to pilots everywhere.</p>

          {/* In-Person Services */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">In-Person · KLMO, Longmont CO</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
                <div className="text-4xl mb-4">🏔️</div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">Mountain Flying</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  Density altitude operations, terrain flying technique, Rocky Mountain weather decision-making, and high-altitude airport procedures. Taught by someone who flies and works this terrain every week.
                </p>
                <div className="text-sm text-gray-400 mb-4">$100 / hour · KLMO and beyond</div>
                <a href="#contact" className="block text-center border border-[#1d4ed8] text-[#1d4ed8] hover:bg-blue-50 px-4 py-2.5 rounded-lg text-sm font-medium transition">
                  Book a Flight
                </a>
              </div>

              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">Destination Pilot Guide</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  Flying into Colorado from out of state? I'll serve as your local guide — pre-trip airspace briefing, on-arrival orientation flight, or both. Learn the terrain, the ATC expectations, and the mountain airports on your itinerary before you're on your own.
                </p>
                <div className="text-sm text-gray-400 mb-4">$100 / hour · Contact for packages</div>
                <a href="#contact" className="block text-center border border-[#1d4ed8] text-[#1d4ed8] hover:bg-blue-50 px-4 py-2.5 rounded-lg text-sm font-medium transition">
                  Plan Your Trip
                </a>
              </div>

              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">Flight Review (BFR)</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  Your required biennial flight review from a CFI who covers what actually matters — not just the minimum requirements. We'll talk through any areas where you want to sharpen up, and I'll give you an honest debrief at the end.
                </p>
                <div className="text-sm text-gray-400 mb-4">$100 / hour · Typically 1–2 hours</div>
                <a href="#contact" className="block text-center border border-[#1d4ed8] text-[#1d4ed8] hover:bg-blue-50 px-4 py-2.5 rounded-lg text-sm font-medium transition">
                  Schedule Your BFR
                </a>
              </div>

              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">Instrument Proficiency Check</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  An IPC from a CFII who works Rocky Mountain IFR airspace regularly. We'll cover the procedures you'll actually use in Colorado — not just the approaches at your home airport. If you're current on paper but not in practice, this is where to start.
                </p>
                <div className="text-sm text-gray-400 mb-4">$100 / hour · Contact for availability</div>
                <a href="#contact" className="block text-center border border-[#1d4ed8] text-[#1d4ed8] hover:bg-blue-50 px-4 py-2.5 rounded-lg text-sm font-medium transition">
                  Get Current
                </a>
              </div>

            </div>
          </div>

          {/* Online Services + Apps */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Online & AI Training Tools</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
                <div className="text-4xl mb-4">👨‍✈️</div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">Mock Oral Checkrides</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  One-on-one oral exam simulation via FaceTime or Teams. I'll ask the questions a real DPE asks, follow up on weak answers, and give you direct feedback — so the actual checkride feels familiar.
                </p>
                <div className="text-sm text-gray-400 mb-4">$100 / hour · Online</div>
                <a href="#contact" className="block text-center border border-[#1d4ed8] text-[#1d4ed8] hover:bg-blue-50 px-4 py-2.5 rounded-lg text-sm font-medium transition">
                  Book a Session
                </a>
              </div>

              <div className="bg-white rounded-2xl p-7 shadow-sm border border-teal-100 hover:shadow-md transition flex flex-col relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">AI</div>
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">Checkride Prep AI</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  Practice your oral exam on-demand with an AI examiner trained to think like a real DPE. Private, Instrument, and Commercial. Voice-enabled. Available at 11pm the night before your checkride.
                </p>
                <div className="text-sm text-gray-400 mb-4">$29 / month · Cancel anytime</div>
                <a href="https://checkride.flight-levels.com/demo" target="_blank" className="block text-center bg-[#0f766e] hover:bg-[#0d6460] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition">
                  Try Free Demo
                </a>
              </div>

              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
                <div className="text-4xl mb-4">🎙️</div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">ATC Trainer App</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  AI-generated ATC scenarios for practicing ground control and IFR clearance readbacks. Built with authentic ATC knowledge — because I wrote it from the controller's chair.
                </p>
                <div className="text-sm text-gray-400 mb-4">$29 / month · Cancel anytime</div>
                <a href="https://practice.flight-levels.com" target="_blank" className="block text-center bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition">
                  Try Free Demo
                </a>
              </div>

            </div>
          </div>

          {/* Bundle callout */}
          <div className="mt-10 bg-gradient-to-r from-[#1e1b4b] to-[#312e81] border border-purple-500/40 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-block bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">BUNDLE DEAL</div>
              <h3 className="text-xl font-bold text-white mb-1">Get Both AI Tools — ATC Trainer + Checkride Prep</h3>
              <p className="text-purple-200 text-sm">One subscription. Full access to both products. Save $9/month vs. buying separately.</p>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$49<span className="text-lg text-purple-300">/mo</span></div>
                <div className="text-xs text-purple-400">vs. $58 separately</div>
              </div>
              <a href="https://checkride.flight-levels.com/signup?bundle=1" target="_blank" className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap">
                Get the Bundle
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* YouTube */}
      <section id="youtube" className="px-8 py-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6">Free Aviation Content on YouTube</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I share what I know — for free. On my YouTube channel I cover tips for flying in the national airspace system, behind-the-scenes looks at how ATC works, Colorado flying topics, and honest advice for pilots at every level.
              </p>
              <p>
                With over 1,600 subscribers and growing, it's become a place where pilots come to finally understand the controller's perspective — and what it actually looks like to fly in Rocky Mountain airspace.
              </p>
            </div>
            <a href="https://www.youtube.com/@Flight-Levels" target="_blank" className="inline-flex items-center gap-3 mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition">
              <span className="text-xl">▶</span> Visit the Channel
            </a>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📺</div>
            <div className="text-4xl font-bold text-red-600 mb-2">1,600+</div>
            <div className="text-gray-500">Subscribers</div>
            <div className="mt-6 text-sm text-gray-400">
              Mountain Flying · ATC Insights · Colorado Airspace · Cockpit Perspective
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gray-50 px-8 py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1e3a5f] text-center mb-4">Get in Touch</h2>
          <p className="text-gray-500 text-center mb-12">Whether you're planning a Colorado trip, due for a flight review, or looking to sharpen your instrument skills — send me a message and I'll get back to you.</p>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What brings you here?</label>
              <select
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a topic...</option>
                <option value="Mountain Flying Instruction">Mountain Flying Instruction</option>
                <option value="Destination Pilot — Flying into Colorado">Destination Pilot — Flying into Colorado</option>
                <option value="Flight Review (BFR)">Flight Review (BFR)</option>
                <option value="Instrument Proficiency Check (IPC)">Instrument Proficiency Check (IPC)</option>
                <option value="Mock Oral Checkride">Mock Oral Checkride</option>
                <option value="Flight Instruction">Flight Instruction (General)</option>
                <option value="ATC Trainer">ATC Trainer App</option>
                <option value="Checkride Prep">Checkride Prep AI</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell me about your goals, your trip plans, or what you're working on..."
              />
            </div>
            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] disabled:bg-blue-300 text-white px-8 py-4 rounded-lg font-semibold transition"
            >
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {formStatus === 'success' && (
              <p className="text-green-600 text-center font-medium">Message sent! I'll get back to you soon.</p>
            )}
            {formStatus === 'error' && (
              <p className="text-red-500 text-center">Something went wrong. Please email me directly at joe@flight-levels.com</p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>© 2026 Flight Levels · Joe Mattison · KLMO, Longmont CO · All views expressed are my own.</p>
        <div className="flex justify-center gap-6 mt-3 flex-wrap">
          <a href="https://www.youtube.com/@Flight-Levels" target="_blank" className="hover:text-gray-600 transition">YouTube</a>
          <a href="https://practice.flight-levels.com" target="_blank" className="hover:text-gray-600 transition">ATC Trainer</a>
          <a href="https://checkride.flight-levels.com" target="_blank" className="hover:text-gray-600 transition">Checkride Prep</a>
          <a href="mailto:joe@flight-levels.com" className="hover:text-gray-600 transition">joe@flight-levels.com</a>
        </div>
      </footer>

    </main>
  )
}
