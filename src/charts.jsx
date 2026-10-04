// Lightweight SVG charts — sparklines, pin map, mini bars, SLA bars.

const W = 300
const H = 90

export function Sparkline({ points, color }) {
  const stroke = color === 'red' ? '#e05252' : '#35c27a'
  const max = Math.max(...points)
  const min = Math.min(...points)
  const px = (i) => (i / (points.length - 1)) * W
  const py = (v) => H - 8 - ((v - min) / (max - min || 1)) * (H - 20)
  const d = points.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ')
  const area = `${d} L${W},${H} L0,${H} Z`
  const gid = `sg-${color}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="bars-svg" preserveAspectRatio="none" style={{ height: 54 }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

// Stylized Indonesia archipelago with heat cluster over Jakarta & pins.
const MAP_W = 640
const MAP_H = 400

const PINS = [
  // Jakarta cluster (west Java)
  { x: 268, y: 262, r: 10 },
  { x: 256, y: 250, r: 7 },
  { x: 280, y: 250, r: 8 },
  { x: 274, y: 274, r: 6 },
  { x: 260, y: 268, r: 6 },
  { x: 288, y: 262, r: 7 },
  { x: 248, y: 258, r: 5 },
  // Cikarang / Bandung area
  { x: 292, y: 276, r: 6 },
  { x: 300, y: 268, r: 5 },
  // Surabaya (east Java)
  { x: 356, y: 270, r: 7 },
  { x: 366, y: 262, r: 5 },
]

function Pin({ x, y, r }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d={`M0,0 C${-r},${-r * 1.1} ${-r},${-r * 2.6} 0,${-r * 2.6} C${r},${-r * 2.6} ${r},${-r * 1.1} 0,0 Z`}
        transform={`translate(0, ${-r * 0.2})`}
        fill="#171517"
        stroke="#fbfaf9"
        strokeWidth="1.4"
      />
      <circle cx="0" cy={-r * 1.9} r={r * 0.32} fill="#fbfaf9" />
    </g>
  )
}

export function EuropeMap() {
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="map-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="heat" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4505c" stopOpacity="0.75" />
          <stop offset="55%" stopColor="#f4505c" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f4505c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* base landmass: Sumatra, Kalimantan, Sulawesi, Papua (outer tone) */}
      <g fill="#c9c7c4">
        {/* Sumatra */}
        <path d="M60,60 Q110,90 150,140 Q185,185 205,235 Q212,258 195,262 Q160,250 120,200 Q80,150 55,95 Q45,65 60,60 Z" />
        {/* Kalimantan */}
        <path d="M250,60 Q320,40 380,70 Q430,100 425,155 Q415,205 360,220 Q300,228 262,190 Q235,140 240,95 Z" />
        {/* Sulawesi */}
        <path d="M470,80 Q500,95 512,140 Q525,180 515,215 Q508,240 492,236 Q478,225 472,185 Q462,130 462,98 Z" />
        {/* Papua hint */}
        <path d="M560,150 Q600,140 628,165 Q636,190 615,205 Q580,215 560,195 Q548,170 560,150 Z" />
      </g>

      {/* lighter overlay islands with white borders: Java chain + inner tones */}
      <g fill="#dedcd9" stroke="#ffffff" strokeWidth="2">
        {/* Java: Banten-Jakarta-West → Central → East */}
        <path d="M205,268 Q240,252 285,258 Q330,258 372,266 Q400,270 398,282 Q394,294 360,292 Q310,290 268,286 Q228,284 206,282 Q196,274 205,268 Z" />
        {/* Bali + Lombok nubs */}
        <path d="M404,272 Q424,270 434,278 Q432,288 416,288 Q404,284 404,272 Z" />
        {/* Madura */}
        <path d="M378,252 Q400,248 412,254 Q410,262 394,262 Q382,260 378,252 Z" />
      </g>

      {/* heat glow over Jakarta / west Java */}
      <circle cx="272" cy="266" r="78" fill="url(#heat)" />
      <circle cx="300" cy="272" r="52" fill="url(#heat)" />

      {/* pins */}
      {PINS.map((p, i) => (
        <Pin key={i} {...p} />
      ))}
    </svg>
  )
}

// Key Sites mini bars
export function SiteBars({ bars }) {
  return (
    <div className="sites-bars">
      {bars.map((b) => (
        <div key={b.label} className={`site-bar${b.hi ? ' hi' : ''}`}>
          <div className="bar-val">{b.pct}</div>
          <div className="bar-fill" style={{ height: `${b.h * 100}%` }} />
          <div className="bar-lbl">{b.label}</div>
        </div>
      ))}
    </div>
  )
}

// SLA compliance trend bars (%) with red caps + annotation line
const CW = 460
const CH = 220
const PADL = 44
const PADB = 26

export function SlaBars({ labels, values, annotation, ymin = 80, ymax = 100 }) {
  const iw = CW - PADL - 10
  const ih = CH - PADB - 12
  const bw = iw / labels.length
  const y = (v) => 12 + ih - ((v - ymin) / (ymax - ymin)) * ih

  const annIdx = annotation.index ?? 0
  const ax = PADL + annIdx * bw + bw / 2

  // zig-zag annotation line between bar tops
  const linePts = values.map((v, i) => `${PADL + i * bw + bw / 2},${y(v) - 14}`).join(' ')

  // gridlines at nice % steps within [ymin, ymax]
  const step = (ymax - ymin) / 4
  const gridVals = [0, 1, 2, 3, 4].map((i) => ymin + i * step)

  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="bars-svg">
      <defs>
        <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a7477" />
          <stop offset="100%" stopColor="#3a3638" />
        </linearGradient>
      </defs>

      {/* gridlines + y labels */}
      {gridVals.map((v) => (
        <g key={v}>
          <line x1={PADL} x2={CW - 8} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x={PADL - 8} y={y(v) + 3.5} textAnchor="end" fontSize="9" fill="#9b979a">
            {v.toFixed(0)}%
          </text>
        </g>
      ))}

      {/* bars */}
      {values.map((v, i) => {
        const x = PADL + i * bw + bw * 0.22
        const w = bw * 0.56
        const top = y(v)
        return (
          <g key={i}>
            <rect x={x} y={top} width={w} height={12 + ih - top} rx="3" fill="url(#barG)" />
            <rect x={x} y={top} width={w} height="3" rx="1.5" fill="#f4505c" />
          </g>
        )
      })}

      {/* annotation */}
      <polyline points={linePts} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeDasharray="none" />
      <text x={ax} y={y(values[annIdx]) - 22} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#ffffff">
        {annotation.label}
      </text>

      {/* x labels */}
      {labels.map((m, i) => (
        <text key={m} x={PADL + i * bw + bw / 2} y={CH - 8} textAnchor="middle" fontSize="9" fill="#9b979a">
          {m}
        </text>
      ))}
    </svg>
  )
}
