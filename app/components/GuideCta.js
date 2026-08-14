'use client'
import Link from 'next/link'
import { trackEvent } from '../lib/analytics'

function trackContactClick(guide) {
  trackEvent('guide_contact_click', { guide })
}

export default function GuideCta({ guide }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-lg font-bold text-[#1e3a5f] mb-1">Want a second opinion before you go?</h3>
        <p className="text-gray-600 text-sm">I offer pre-trip briefings and mountain flying instruction based at KLMO.</p>
      </div>
      <Link
        href="/fly-with-me"
        onClick={() => trackContactClick(guide)}
        className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap"
      >
        Fly With Me
      </Link>
    </div>
  )
}
