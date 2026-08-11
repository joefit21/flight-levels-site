'use client'
import { trackEvent } from '../lib/analytics'

function trackClick(guide) {
  trackEvent('mid_guide_cta_click', { product: 'atc_trainer', location: 'atc_comms_section', guide })
}

export default function AtcTrainerCta({ guide }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-4 flex-wrap bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
      <p className="text-sm text-gray-600">Want to drill handoffs like these before you fly? ATC Trainer practices IFR clearance readbacks with AI scoring.</p>
      <a
        href="https://practice.flight-levels.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick(guide)}
        className="text-sm font-semibold text-[#1d4ed8] hover:text-[#1e40af] transition whitespace-nowrap"
      >
        Try ATC Trainer &rarr;
      </a>
    </div>
  )
}
