'use client'
import Link from 'next/link'
import { trackEvent } from '../lib/analytics'

export default function HighCountryCta({ page }) {
  return (
    <div className="bg-[#0f2044] text-white rounded-2xl px-8 py-8">
      <h3 className="text-xl font-bold mb-2">Flying in for the first time?</h3>
      <p className="text-blue-100 text-sm leading-relaxed mb-5">
        I worked this airspace at Denver Center before I instructed in it. If you want the arrival walked through
        against your actual trip, your direction of flight, and the weather you&rsquo;re likely to get, that&rsquo;s
        something I do two ways: a pre-trip briefing on the ground, or riding right seat as your destination guide
        while you fly your airplane.
      </p>
      <Link
        href="/#contact"
        onClick={() => trackEvent('highcountry_contact_click', { page })}
        className="inline-block bg-white text-[#0f2044] hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition"
      >
        Talk About Your Trip
      </Link>
    </div>
  )
}
