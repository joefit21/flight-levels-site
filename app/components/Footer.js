export default function Footer() {
  return (
    <footer className="px-8 py-8 border-t border-gray-100 text-center text-gray-400 text-sm">
      <p>© 2026 Flight Levels · Joe Mattison · KLMO, Longmont CO · All views expressed are my own.</p>
      <div className="flex justify-center gap-6 mt-3 flex-wrap">
        <a href="https://www.youtube.com/@Flight-Levels" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">YouTube</a>
        <a href="https://practice.flight-levels.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">ATC Trainer</a>
        <a href="https://checkride.flight-levels.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">Checkride Prep</a>
        <a href="https://flightreview.flight-levels.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">Flight Review Prep</a>
        <a href="mailto:joe@flight-levels.com" className="hover:text-gray-600 transition">joe@flight-levels.com</a>
      </div>
    </footer>
  )
}
