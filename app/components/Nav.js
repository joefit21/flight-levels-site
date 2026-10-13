'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { trackEvent } from '../lib/analytics'
import { PRODUCTS } from '../lib/products'

// Ordered by who is looking: someone flying into Colorado, someone after
// instruction at KLMO, then the rest. The online tools live in their own menu.
const LINKS = [
  { href: '/mountains', label: 'Colorado Guides' },
  { href: '/#services', label: 'Fly With Me' },
]
const LINKS_AFTER = [
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

function trackProductClick(productId) {
  trackEvent('product_link_click', { product: productId, link_location: 'nav' })
}

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const toolsRef = useRef(null)

  // Close the tools menu on outside click or Escape.
  useEffect(() => {
    if (!toolsOpen) return
    const onDown = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) setToolsOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setToolsOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [toolsOpen])

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

          <div className="relative" ref={toolsRef}>
            <button
              type="button"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              onClick={() => setToolsOpen((o) => !o)}
              className="flex items-center gap-1.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg transition"
            >
              Practice Tools
              <svg className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute right-0 top-full mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-2">
                {PRODUCTS.map((p) => (
                  <a
                    key={p.id}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackProductClick(p.id)
                      setToolsOpen(false)
                    }}
                    className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition"
                  >
                    <span className="text-xl leading-none mt-0.5">{p.icon}</span>
                    <span className="flex-1">
                      <span className="flex items-center gap-2 text-gray-900 font-semibold">
                        {p.label}
                        {p.badge === 'New' && <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">NEW</span>}
                      </span>
                      <span className="block text-xs text-gray-500 font-normal mt-0.5">{p.blurb}</span>
                    </span>
                  </a>
                ))}
                <Link
                  href="/#ai-tools"
                  onClick={() => setToolsOpen(false)}
                  className="block text-center text-[#1d4ed8] hover:bg-blue-50 rounded-xl px-3 py-2.5 mt-1 border-t border-gray-100"
                >
                  Compare all tools &rarr;
                </Link>
              </div>
            )}
          </div>

          {LINKS_AFTER.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#1e3a5f] transition">
              {l.label}
            </Link>
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
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Practice Tools</div>
            {PRODUCTS.map((p) => (
              <a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProductClick(p.id)}
                className="text-[#1d4ed8] hover:text-[#1e40af] flex items-center gap-2"
              >
                {p.label}
                {p.badge === 'New' && <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">NEW</span>}
              </a>
            ))}
            <Link href="/#ai-tools" onClick={() => setMobileMenuOpen(false)} className="text-gray-500">
              Compare all tools &rarr;
            </Link>
          </div>
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
            {LINKS_AFTER.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1e3a5f]">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
