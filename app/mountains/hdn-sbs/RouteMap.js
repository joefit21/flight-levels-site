// North-up orientation: west (Steamboat) is on the left, east (Front Range) is on
// the right, so travel runs right-to-left across the graphic.
const SOUTH_POINTS = [
  { x: 440, y: 98, label: 'FRONT RANGE', type: 'end', anchor: 'end' },
  { x: 385, y: 38, label: 'Rollins', sub: "11,676'", type: 'pass' },
  { x: 345, y: 48, label: 'Berthoud', sub: "11,315'", type: 'pass' },
  { x: 280, y: 96, label: 'GNB', type: 'airport' },
  { x: 240, y: 96, label: '20V', type: 'airport' },
  { x: 110, y: 55, label: 'Rabbit Ears', sub: "9,426'", type: 'pass' },
  { x: 20, y: 92, label: 'STEAMBOAT', type: 'end', anchor: 'start' },
]

const NORTH_POINTS = [
  { x: 440, y: 98, label: 'FRONT RANGE', type: 'end', anchor: 'end' },
  { x: 390, y: 96, label: 'FNL', type: 'airport' },
  { x: 300, y: 45, label: 'Cameron', sub: "10,276'", type: 'pass' },
  { x: 250, y: 96, label: '33V', type: 'airport' },
  { x: 110, y: 55, label: 'Rabbit Ears', sub: "9,426'", type: 'pass' },
  { x: 20, y: 92, label: 'STEAMBOAT', type: 'end', anchor: 'start' },
]

export default function RouteMap({ route }) {
  const points = route === 'south' ? SOUTH_POINTS : NORTH_POINTS
  const pathD = 'M ' + points.map((p) => `${p.x} ${p.y}`).join(' L ')

  return (
    <svg
      viewBox="0 0 460 140"
      role="img"
      aria-label={`Stylized elevation profile of the ${route} route from the Front Range to Steamboat Springs, oriented north-up`}
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
