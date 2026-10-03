// Lightweight SVG charts — sparklines, pin map, mini bars, invoice bars.

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

// Simplified western-Europe silhouette map with two heat glows + pins.
const MAP_W = 640
const MAP_H = 400

const PINS = [
  { x: 300, y: 178, r: 7 },
  { x: 322, y: 158, r: 9 },
  { x: 345, y: 170, r: 6 },
  { x: 335, y: 192, r: 10 },
  { x: 360, y: 150, r: 7 },
  { x: 318, y: 205, r: 6 },
  { x: 355, y: 198, r: 8 },
  { x: 372, y: 176, r: 6 },
  { x: 340, y: 140, r: 5 },
  { x: 300, y: 210, r: 5 },
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

      {/* base landmass blobs */}
      <g fill="#c9c7c4">
        <path d="M60,140 Q120,90 200,110 Q260,90 320,110 Q300,170 250,190 Q180,210 130,190 Q80,175 60,140 Z" />
        <path d="M250,180 Q320,150 400,160 Q470,150 540,180 Q560,230 520,270 Q450,310 380,290 Q300,280 260,240 Z" />
        <path d="M420,90 Q500,70 570,100 Q590,140 560,170 Q480,190 430,160 Q410,120 420,90 Z" />
        <path d="M90,240 Q150,220 210,240 Q230,280 190,310 Q130,330 90,300 Q70,270 90,240 Z" />
      </g>
      {/* lighter country overlay shapes */}
      <g fill="#dedcd9" stroke="#ffffff" strokeWidth="2">
        <path d="M100,150 Q160,105 235,122 Q285,108 330,126 Q315,175 265,196 Q195,214 145,196 Q110,180 100,150 Z" />
        <path d="M262,190 Q330,162 405,172 Q468,164 528,190 Q545,235 508,272 Q442,305 378,288 Q305,278 270,242 Z" />
        <path d="M432,100 Q505,82 562,108 Q578,142 552,168 Q478,186 438,160 Q422,128 432,100 Z" />
      </g>

      {/* heat glows over France & Germany */}
      <circle cx="300" cy="185" r="90" fill="url(#heat)" />
      <circle cx="352" cy="168" r="75" fill="url(#heat)" />

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

// Invoice / discount bars with red caps + annotation line
const CW = 460
const CH = 220
const PADL = 44
const PADB = 26
const YMAX = 300

export function InvoiceBars({ labels, values, annotation }) {
  const iw = CW - PADL - 10
  const ih = CH - PADB - 12
  const bw = iw / labels.length
  const y = (v) => 12 + ih - (v / YMAX) * ih

  const annIdx = annotation.index ?? labels.indexOf(annotation.month)
  const ax = PADL + annIdx * bw + bw / 2

  // zig-zag annotation line between bar tops
  const linePts = values.map((v, i) => `${PADL + i * bw + bw / 2},${y(v) - 14}`).join(' ')

  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="bars-svg">
      <defs>
        <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a7477" />
          <stop offset="100%" stopColor="#3a3638" />
        </linearGradient>
      </defs>

      {/* gridlines + y labels */}
      {[0, 100, 200, 300].map((v) => (
        <g key={v}>
          <line x1={PADL} x2={CW - 8} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x={PADL - 8} y={y(v) + 3.5} textAnchor="end" fontSize="9" fill="#9b979a">
            {v === 0 ? '$0M' : `$${v}M`}
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
