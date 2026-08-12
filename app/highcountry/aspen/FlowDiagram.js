// North-up schematic of the ASE traffic flow. Not to scale and not a navigation
// reference: it shows direction of circulation and which gate feeds from where.
// Arrivals circulate counterclockwise. Departures leave off runway 33 and turn
// right for SXW and JNETT, or left for SLOLM and HBU.

const CX = 180
const CY = 170
const R = 110

function Field() {
  return (
    <g>
      {/* Runway 15/33, northwest to southeast. Each number sits at its own
          threshold: 15 at the northwest end, 33 at the southeast end. */}
      <line x1="158" y1="148" x2="202" y2="192" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <text x="150" y="142" fontSize="8" fontFamily="ui-monospace, monospace" fill="#6b7280" textAnchor="end">15</text>
      <text x="210" y="200" fontSize="8" fontFamily="ui-monospace, monospace" fill="#6b7280">33</text>
      <text x={CX} y={CY + 40} fontSize="10" fontFamily="ui-monospace, monospace" fontWeight="700" fill="#1e3a5f" textAnchor="middle">
        ASE
      </text>
    </g>
  )
}

function Ring() {
  return <circle cx={CX} cy={CY} r={R} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 5" />
}

function Gate({ x, y, label, sub, anchor = 'middle' }) {
  return (
    <g>
      <text x={x} y={y} fontSize="10" fontFamily="ui-monospace, monospace" fontWeight="700" fill="#1e3a5f" textAnchor={anchor}>
        {label}
      </text>
      {sub && (
        <text x={x} y={y + 11} fontSize="7.5" fontFamily="ui-monospace, monospace" fill="#94a3b8" textAnchor={anchor}>
          {sub}
        </text>
      )}
    </g>
  )
}

// The neighbouring fields that shape where Aspen's arrival gates sit.
function Neighbour({ x, y, label, labelY }) {
  return (
    <g>
      <circle cx={x} cy={y} r="3" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
      <text x={x} y={labelY} fontSize="7" fontFamily="ui-monospace, monospace" fill="#cbd5e1" textAnchor="middle">
        {label}
      </text>
    </g>
  )
}

export function ArrivalFlow() {
  return (
    <svg
      viewBox="0 0 360 350"
      role="img"
      aria-label="North-up schematic of Aspen arrivals. MMARY enters from the east, LOYYD from the southwest, and HAREI from the south and southeast. All three circulate counterclockwise around the airport before turning southeast onto final for runway 15. Eagle County lies to the north and Rifle to the west."
      className="w-full h-auto max-w-sm mx-auto"
    >
      <Ring />

      {/* Neighbouring traffic the arrivals are designed to stay clear of */}
      <Neighbour x={180} y={46} label="EGE" labelY={36} />
      <Neighbour x={54} y={150} label="RIL" labelY={142} />

      {/* Counterclockwise direction arrows on the ring */}
      <polygon points="290,157 285,168 295,168" fill="#1d4ed8" />
      <polygon points="167,60 179,55 179,65" fill="#1d4ed8" />
      <polygon points="73,196 64,187 74,183" fill="#1d4ed8" />
      <polygon points="193,280 181,275 181,285" fill="#1d4ed8" />

      {/* Entry feeds from each arrival gate */}
      <line x1="322" y1="170" x2="296" y2="170" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="86" y1="264" x2="106" y2="244" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="268" y1="258" x2="256" y2="246" stroke="#94a3b8" strokeWidth="1.5" />

      <Gate x={326} y={167} label="MMARY" sub="east" anchor="start" />
      <Gate x={80} y={276} label="LOYYD" sub="southwest" anchor="end" />
      <Gate x={272} y={274} label="HAREI" sub="S · SE" anchor="start" />

      {/* Final approach: released northwest of the field, tracking southeast to runway 15 */}
      <line x1="112" y1="102" x2="150" y2="140" stroke="#059669" strokeWidth="2" strokeDasharray="4 3" />
      <polygon points="156,146 145,142 149,131" fill="#059669" />
      <text x="106" y="94" fontSize="8" fontFamily="ui-monospace, monospace" fill="#059669" textAnchor="end">
        cleared approach
      </text>

      <Field />
    </svg>
  )
}

export function DepartureFlow() {
  return (
    <svg
      viewBox="0 0 360 350"
      role="img"
      aria-label="North-up schematic of Aspen departures. Departures leave off runway 33 to the northwest, then turn right for the SXW or JNETT gates, or left for the SLOLM or HBU gates."
      className="w-full h-auto max-w-sm mx-auto"
    >
      <Ring />

      {/* LINDZ sits off the departure end of runway 33, on the extended centerline.
          Every gate is reached by turning from here, so nothing is drawn as a default track. */}
      <circle cx="112" cy="102" r="4" fill="#b45309" />
      <text x="102" y="96" fontSize="9" fontFamily="ui-monospace, monospace" fontWeight="700" fill="#b45309" textAnchor="end">
        LINDZ
      </text>

      {/* Right turn on course: SXW and JNETT */}
      <path d="M 118 98 Q 152 68 176 54" fill="none" stroke="#1d4ed8" strokeWidth="1.8" />
      <polygon points="183,50 176,58 172,52" fill="#1d4ed8" />
      <path d="M 120 106 Q 210 110 284 158" fill="none" stroke="#1d4ed8" strokeWidth="1.8" />
      <polygon points="291,163 280,160 284,153" fill="#1d4ed8" />
      <text x="212" y="82" fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="700" fill="#1d4ed8" textAnchor="middle">
        right turn
      </text>

      {/* Left turn on course: SLOLM and HBU */}
      <path d="M 108 110 Q 82 130 72 158" fill="none" stroke="#7c3aed" strokeWidth="1.8" />
      <polygon points="69,166 68,155 77,158" fill="#7c3aed" />
      <path d="M 112 114 Q 108 220 170 274" fill="none" stroke="#7c3aed" strokeWidth="1.8" />
      <polygon points="176,280 165,276 171,269" fill="#7c3aed" />
      <text x="74" y="212" fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="700" fill="#7c3aed" textAnchor="middle">
        left turn
      </text>

      <Gate x={326} y={167} label="JNETT" sub="east" anchor="start" />
      <Gate x={180} y={34} label="SXW" sub="north · JESIE RLG" />
      <Gate x={48} y={167} label="SLOLM" sub="west" anchor="end" />
      <Gate x={180} y={312} label="HBU" sub="south" />

      <Field />
    </svg>
  )
}
