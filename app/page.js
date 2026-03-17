'use client'
import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)

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

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div>
          <div className="text-xl font-bold text-[#1e3a5f]">Flight Levels</div>
          <div className="text-xs text-gray-500 tracking-wide">Joe Mattison</div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#about" className="hover:text-[#1e3a5f] transition">About</a>
          <a href="#services" className="hover:text-[#1e3a5f] transition">Services</a>
          <a href="#youtube" className="hover:text-[#1e3a5f] transition">YouTube</a>
          <a href="#contact" className="hover:text-[#1e3a5f] transition">Contact</a>
          <a href="https://practice.flight-levels.com" target="_blank" className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg transition">ATC Trainer</a>
          <a href="https://checkride.flight-levels.com" target="_blank" className="bg-[#0f766e] hover:bg-[#0d6460] text-white px-4 py-2 rounded-lg transition">Checkride Prep</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2044] to-[#1d4ed8] text-white px-8 py-28 text-center">
        <div>
        <div className="inline-block bg-white/10 border border-white/20 text-blue-200 text-sm px-4 py-1 rounded-full mb-6">
          Flight Instructor · Aviation Educator · ATC Systems Specialist · App Developer
        </div>
        <h1 className="text-5xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight mb-6">
          Both Sides of <span className="text-blue-300">the Radio</span>
        </h1>
        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
          21 years as a flight instructor. Years of experience working inside the air traffic control system. I bring a perspective most aviation educators simply can't offer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" className="bg-white text-[#1e3a5f] hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition">
            See What I Offer
          </a>
          <a href="https://practice.flight-levels.com" target="_blank" className="border border-white/30 hover:border-white/60 px-8 py-4 rounded-lg text-lg transition">
            Try ATC Trainer Free
          </a>
          <a href="https://checkride.flight-levels.com/demo" target="_blank" className="border border-teal-400/50 hover:border-teal-400 text-teal-300 hover:text-teal-200 px-8 py-4 rounded-lg text-lg transition">
            Try Checkride Prep Free
          </a>
        </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 py-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-4">
            <img src="/joe-plane.png" alt="Joe Mattison with his aircraft" className="w-full object-cover object-center rounded-2xl shadow-lg" />
            <img src="/joe-cockpit.png" alt="Joe Mattison in the cockpit" className="w-full object-cover object-center rounded-2xl shadow-lg" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6">Hi, I'm Joe</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I've been a certificated flight instructor since 2005 — that's over 21 years of helping pilots learn to fly safely and confidently. I hold a Commercial Pilot certificate with ratings in single-engine land, single-engine sea, and multi-engine land, along with CFI and CFII credentials.
              </p>
              <p>
                Beyond the cockpit, I've spent years working deep inside the air traffic control system — first as a controller at an Air Route Traffic Control Center, and now as an ATC systems specialist managing the automation that keeps controllers informed and airspace safe.
              </p>
              <p>
                That combination — flight instructor and ATC insider — shapes everything I teach. When I explain how controllers think, what they expect from pilots, and why proper readbacks matter, it's not textbook knowledge. It's lived experience from both ends of the frequency.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { number: '21+', label: 'Years Instructing' },
                { number: '5', label: 'Pilot Certificates & Ratings' },
                { number: '1,600+', label: 'YouTube Subscribers' },
              ].map((stat, i) => (
                <div key={i} className="text-center bg-blue-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#1d4ed8]">{stat.number}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-gray-50 px-8 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1e3a5f] text-center mb-4">How I Can Help You</h2>
          <p className="text-gray-500 text-center mb-16">Whether you're preparing for a checkride, sharpening your radio skills, or ready to solo — I've got you covered.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* ATC Trainer */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
              <div className="text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">ATC Trainer App</h3>
              <p className="text-gray-500 mb-6 flex-1">
                Practice ground control and IFR clearance readbacks with AI-generated scenarios and real-time scoring. Built from the ground up with authentic ATC knowledge.
              </p>
              <div className="text-sm text-gray-400 mb-4">$29 / month · Cancel anytime</div>
              <a href="https://practice.flight-levels.com" target="_blank" className="block text-center bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-6 py-3 rounded-lg font-medium transition">
                Try Free Demo
              </a>
            </div>

            {/* Checkride Prep AI */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-teal-100 hover:shadow-md transition flex flex-col relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</div>
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Checkride Prep AI</h3>
              <p className="text-gray-500 mb-6 flex-1">
                Practice your oral checkride on-demand with an AI examiner that thinks like a real DPE. Private, Instrument, and Commercial topics. Voice-enabled. Available 24/7.
              </p>
              <div className="text-sm text-gray-400 mb-4">$29 / month · Cancel anytime</div>
              <a href="https://checkride.flight-levels.com/demo" target="_blank" className="block text-center bg-[#0f766e] hover:bg-[#0d6460] text-white px-6 py-3 rounded-lg font-medium transition">
                Try Free Demo
              </a>
            </div>

            {/* Mock Oral */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
              <div className="text-4xl mb-4">👨‍✈️</div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Mock Oral Checkrides</h3>
              <p className="text-gray-500 mb-6 flex-1">
                Simulate the oral portion of your FAA checkride via FaceTime or Teams. I'll ask the questions, challenge your knowledge, and give you honest feedback — so the real thing feels familiar.
              </p>
              <div className="text-sm text-gray-400 mb-4">$100 / hour · Online via FaceTime or Teams</div>
              <a href="#contact" className="block text-center border border-[#1d4ed8] text-[#1d4ed8] hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition">
                Get in Touch
              </a>
            </div>

            {/* Flight Instruction */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
              <div className="text-4xl mb-4">🛩️</div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Flight Instruction</h3>
              <p className="text-gray-500 mb-6 flex-1">
                In-person flight instruction from a CFI who understands both sides of the radio. Whether you're working on your private, instrument rating, or proficiency, let's talk about your goals.
              </p>
              <div className="text-sm text-gray-400 mb-4">$100 / hour · Contact for availability</div>
              <a href="#contact" className="block text-center border border-[#1d4ed8] text-[#1d4ed8] hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition">
                Get in Touch
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
                I share what I know — for free. On my YouTube channel I cover tips for flying in the national airspace system, behind-the-scenes looks at how ATC works, commentary on current aviation events, and honest advice for pilots at every level.
              </p>
              <p>
                With over 1,600 subscribers and growing, it's become a place where pilots come to finally understand the controller's perspective.
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
              Tips · ATC Insights · Aviation News · Cockpit Perspective
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gray-50 px-8 py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1e3a5f] text-center mb-4">Get in Touch</h2>
          <p className="text-gray-500 text-center mb-12">Interested in a mock oral, flight instruction, or just have a question? Send me a message and I'll get back to you.</p>

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
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a topic...</option>
                <option value="Mock Oral Checkride">Mock Oral Checkride</option>
                <option value="Flight Instruction">Flight Instruction</option>
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
                placeholder="Tell me about your goals or what you're working on..."
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
        <p>© 2026 Flight Levels · Joe Mattison · All views expressed are my own.</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="https://www.youtube.com/@Flight-Levels" target="_blank" className="hover:text-gray-600 transition">YouTube</a>
          <a href="https://practice.flight-levels.com" target="_blank" className="hover:text-gray-600 transition">ATC Trainer</a>
          <a href="https://checkride.flight-levels.com" target="_blank" className="hover:text-gray-600 transition">Checkride Prep</a>
          <a href="mailto:joe@flight-levels.com" className="hover:text-gray-600 transition">joe@flight-levels.com</a>
        </div>
      </footer>

    </main>
  )
}
