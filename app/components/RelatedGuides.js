import Link from 'next/link'

// Contextual links between guides that actually share routes, passes or frequencies.
// The note explains the relationship, which is more useful to a reader than a bare
// link and gives search engines real anchor context.
export default function RelatedGuides({ items }) {
  return (
    <div className="border-t border-gray-100 pt-8 mb-14">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4 block">Related Guides</span>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-200 hover:shadow-sm transition block"
          >
            <div className="font-semibold text-[#1e3a5f] text-sm mb-1">{item.label}</div>
            <p className="text-xs text-gray-500 leading-relaxed">{item.note}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
