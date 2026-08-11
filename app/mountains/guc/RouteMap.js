// North-up orientation: west is on the left, east (Front Range) is on the right,
// so travel runs right-to-left across the graphic. The north route continues
// past Montrose to Gunnison, so its path doubles back east at the end.
const SOUTH_POINTS = [
  { x: 440, y: 98, label: 'FRONT RANGE', type: 'end', anchor: 'end' },
  { x: 365, y: 55, label: 'Kenosha', sub: "10,001'", type: 'pass' },
  { x: 285, y: 68, label: 'Trout Creek', sub: "9,346'", type: 'pass' },
  { x: 245, y: 96, label: 'AEJ', type: 'airport' },
  { x: 215, y: 96, label: 'ANK', type: 'airport' },
  { x: 155, y: 40, label: 'Monarch', sub: "11,312'", type: 'pass' },
  { x: 80, y: 92, label: 'GUNNISON', type: 'end', anchor: 'middle' },
]

const NORTH_POINTS = [
  { x: 440, y: 98, label: 'FRONT RANGE', type: 'end', anchor: 'end' },
  { x: 372, y: 38, label: 'Rollins', sub: "11,676'", type: 'pass' },
  { x: 310, y: 96, label: 'GNB', type: 'airport' },
  { x: 260, y: 96, label: '20V', type: 'airport' },
  { x: 200, y: 88, label: 'EGE', type: 'airport' },
  { x: 150, y: 80, label: 'Cottonwood', sub: "8,280'", type: 'pass' },
  { x: 20, y: 96, label: 'MTJ', type: 'airport' },
  { x: 80, y: 92, label: 'GUNNISON', type: 'end', anchor: 'middle' },
]

export default function RouteMap({ route }) {
  const points = route === 'south' ? SOUTH_POINTS : NORTH_POINTS
  const pathD = 'M ' + points.map((p) => `${p.x} ${p.y}`).join(' L ')

  return (
    <svg
      viewBox="0 0 460 140"
      role="img"
      aria-label={`Stylized elevation profile of the ${route} route from the Front Range to Gunnison, oriented north-up`}
      className="w-full h-auto mb-4"
    >
      <line x1="12" y1="100" x2="448" y2="100" stroke="#e5e7eb" strokeWidth="1" />
      <path d={pathD} fill="none" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
      {points.map((p, i) => {
        if (p.type === 'end') {
          return (
            <text key={i} x={p.x} y="118" fontSize="7" fontFamily="ui-monospace, monospace" fill="#9ca3af" textAnchor={p.anchor} letterSpacing="0.5">
              {p.label}
            </text>
          )
        }
        if (p.type === 'pass') {
          return (
            <g key={i}>
              <polygon points={`${p.x},${p.y - 7} ${p.x + 7},${p.y + 7} ${p.x - 7},${p.y + 7}`} fill="#b45309" />
              <text x={p.x} y={p.y - 17} fontSize="7" fontFamily="ui-monospace, monospace" fontWeight="600" fill="#1e3a5f" textAnchor="middle">
                {p.label}
              </text>
              <text x={p.x} y={p.y - 9} fontSize="7" fontFamily="ui-monospace, monospace" fill="#6b7280" textAnchor="middle">
                {p.sub}
              </text>
            </g>
          )
        }
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="none" stroke="#1d4ed8" strokeWidth="1.4" />
            <circle cx={p.x} cy={p.y} r="1.3" fill="#1d4ed8" />
            <text x={p.x} y={p.y + 16} fontSize="7" fontFamily="ui-monospace, monospace" fill="#374151" textAnchor="middle">
              {p.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
