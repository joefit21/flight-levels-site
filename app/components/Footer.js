'use client'
import { trackEvent } from '../lib/analytics'

const PRODUCTS = [
  { href: 'https://practice.flight-levels.com', label: 'ATC Trainer', id: 'atc_trainer' },
  { href: 'https://checkride.flight-levels.com', label: 'Checkride Prep', id: 'checkride_prep' },
  { href: 'https://flightreview.flight-levels.com', label: 'Flight Review Prep', id: 'flight_review_prep' },
]

function trackProductClick(productId) {
  trackEvent('product_link_click', { product: productId, link_location: 'footer' })
}

export default function Footer() {
  return (
    <footer className="px-8 py-8 border-t border-gray-100 text-center text-gray-400 text-sm">
      <p>© 2026 Flight Levels · Joe Mattison · KLMO, Longmont CO · All views expressed are my own.</p>
      <div className="flex justify-center gap-6 mt-3 flex-wrap">
        <a href="https://www.youtube.com/@Flight-Levels" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">YouTube</a>
        {PRODUCTS.map((p) => (
          <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" onClick={() => trackProductClick(p.id)} className="hover:text-gray-600 transition">
            {p.label}
          </a>
        ))}
        <a href="mailto:joe@flight-levels.com" className="hover:text-gray-600 transition">joe@flight-levels.com</a>
      </div>
    </footer>
  )
}
