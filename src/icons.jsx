// Tiny inline icon set (stroke = currentColor), keeps deps at zero.
const P = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = {
  folder: (s = 16) => (
    <svg {...P} width={s} height={s}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
  ),
  grid: (s = 16) => (
    <svg {...P} width={s} height={s}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
  ),
  share: (s = 16) => (
    <svg {...P} width={s} height={s}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" /></svg>
  ),
  headset: (s = 16) => (
    <svg {...P} width={s} height={s}><path d="M4 13a8 8 0 0 1 16 0" /><rect x="3" y="13" width="4" height="6" rx="2" /><rect x="17" y="13" width="4" height="6" rx="2" /><path d="M21 17v1a3 3 0 0 1-3 3h-4" /></svg>
  ),
  gear: (s = 16) => (
    <svg {...P} width={s} height={s}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>
  ),
  logout: (s = 16) => (
    <svg {...P} width={s} height={s}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>
  ),
  search: (s = 16) => (
    <svg {...P} width={s} height={s}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
  ),
  refresh: (s = 14) => (
    <svg {...P} width={s} height={s}><path d="M21 12a9 9 0 1 1-2.6-6.4" /><path d="M21 3v6h-6" /></svg>
  ),
  download: (s = 14) => (
    <svg {...P} width={s} height={s}><path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M5 21h14" /></svg>
  ),
  shareArrow: (s = 14) => (
    <svg {...P} width={s} height={s}><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" /><path d="M12 15V3" /><path d="M7 8l5-5 5 5" /></svg>
  ),
  arrowUpRight: (s = 12) => (
    <svg {...P} width={s} height={s}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>
  ),
  sun: (s = 14) => (
    <svg {...P} width={s} height={s}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
  ),
  moon: (s = 14) => (
    <svg {...P} width={s} height={s}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" /></svg>
  ),
  bell: (s = 14) => (
    <svg {...P} width={s} height={s}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
  ),
  dots: (s = 14) => (
    <svg {...P} width={s} height={s} fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
  ),
  barChart: (s = 12) => (
    <svg {...P} width={s} height={s}><path d="M6 20V10M12 20V4M18 20v-7" /></svg>
  ),
  table: (s = 12) => (
    <svg {...P} width={s} height={s}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 10v10" /></svg>
  ),
}

// Brand glyph: three stacked curved slats (abstract "S")
export function BrandGlyph({ size = 26, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={color}>
      <path d="M6 8.5C10.5 4.5 18 3.5 24 6c-4.5 0.6-8 2.2-10.5 4.4L6 8.5z" />
      <path d="M5.2 15.2c6-3.6 14.5-4.2 21.3-1.2-5.5 0.3-10.3 1.9-13.6 4.4l-7.7-3.2z" />
      <path d="M4.4 22c6.8-3.4 15.8-3.6 22.4 0.4-6 0.4-11.2 2.1-15 4.6L4.4 22z" />
    </svg>
  )
}
