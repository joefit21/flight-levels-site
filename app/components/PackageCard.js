'use client'
import Link from 'next/link'
import { trackEvent } from '../lib/analytics'

export default function PackageCard({ pkg }) {
  const badgeClass =
    pkg.badgeTone === 'blue' ? 'bg-blue-50 text-[#1d4ed8]' : 'bg-gray-100 text-gray-600'

  return (
    <div
      className={`rounded-2xl p-7 md:p-8 border transition ${
        pkg.featured ? 'border-[#1d4ed8] shadow-md bg-white' : 'border-gray-100 shadow-sm bg-white'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-[#1e3a5f]">{pkg.name}</h3>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${badgeClass}`}>{pkg.badge}</span>
          </div>
          <p className="text-gray-500 text-sm">{pkg.tagline}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold text-[#1e3a5f]">{pkg.price}</div>
          <div className="text-xs text-gray-400">{pkg.priceNote}</div>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-5">{pkg.body}</p>

      <ul className="space-y-2 mb-6">
        {pkg.includes.map((line) => (
          <li key={line} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
            <span className="text-[#1d4ed8] flex-shrink-0 mt-0.5">&#10003;</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/#contact"
        onClick={() => trackEvent('package_inquiry_click', { package: pkg.id })}
        className={`inline-block px-6 py-3 rounded-lg font-semibold text-sm transition ${
          pkg.featured
            ? 'bg-[#1d4ed8] hover:bg-[#1e40af] text-white'
            : 'border border-[#1d4ed8] text-[#1d4ed8] hover:bg-blue-50'
        }`}
      >
        Ask about this
      </Link>
    </div>
  )
}
