'use client'
import { useState } from 'react'
import Link from 'next/link'
import { trackEvent } from '../lib/analytics'

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#guides', label: 'Guides' },
  { href: '/#services', label: 'Services' },
  { href: '/#contact', label: 'Contact' },
]

// One shared treatment rather than three competing brand colors. The per-product
// colors still do useful work on the Services cards, where they sit in context.
const PRODUCTS = [
  { href: 'https://practice.flight-levels.com', label: 'ATC Trainer', id: 'atc_trainer' },
  { href: 'https://checkride.flight-levels.com', label: 'Checkride Prep', id: 'checkride_prep' },
  { href: 'https://flightreview.flight-levels.com', label: 'Flight Review Prep', id: 'flight_review_prep' },
]

const PRODUCT_DESKTOP_CLASS =
  'border border-gray-200 text-gray-700 hover:border-[#1d4ed8] hover:text-[#1d4ed8] px-4 py-2 rounded-lg transition'

function trackProductClick(productId) {
  trackEvent('product_link_click', { product: productId, link_location: 'nav' })
}

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <Link href="/">
          <div className="text-xl font-bold text-[#1e3a5f]">Flight Levels</div>
          <div className="text-xs text-gray-500 tracking-wide">Joe Mattison · KLMO</div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#1e3a5f] transition">
              {l.label}
            </Link>
          ))}
          {PRODUCTS.map((p) => (
            <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" onClick={() => trackProductClick(p.id)} className={PRODUCT_DESKTOP_CLASS}>
              {p.label}
            </a>
          ))}
        </div>
        <button className="md:hidden text-gray-600 hover:text-[#1e3a5f]" onClick={() => setMobileMenuOpen((o) => !o)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-8 py-4 flex flex-col gap-4 text-sm font-medium text-gray-600 z-40">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1e3a5f]">
              {l.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
            {PRODUCTS.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProductClick(p.id)}
                className="text-[#1d4ed8] hover:text-[#1e40af]"
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
