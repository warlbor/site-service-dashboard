// ============================================================
// Quantix — Site Service Dashboard data
// All copy & figures live here for single-source editing.
// Domains: Facility, GA (General Affairs), IT, Safety
// ============================================================

export const NAV_ITEMS = [
  'Dashboard',
  'Facility',
  'GA',
  'IT',
  'Safety',
  'Assets & Inventory',
  'Reports & Analytics',
]

export const OVERVIEW_KPIS = [
  { value: '13,7K', delta: '+9.2%', dir: 'up', label: 'Work Orders' },
  { value: '98,6K', delta: '+4.8%', dir: 'up', label: 'Assets Tracked' },
  { value: '312%', delta: '-0.2%', dir: 'down', label: 'SLA Compliance Index' },
]

export const SPARK_TILES = [
  {
    id: 'wo',
    title: 'WO Count',
    value: '3,209',
    delta: '-0.28T',
    dir: 'down',
    color: 'red',
    // normalized 0..1 sparkline points
    points: [0.55, 0.4, 0.62, 0.48, 0.7, 0.58, 0.75, 0.62, 0.68, 0.5, 0.56, 0.44, 0.5, 0.38, 0.42, 0.3],
  },
  {
    id: 'tr',
    title: 'TR Count',
    value: '2,956',
    delta: '+0.11T',
    dir: 'up',
    color: 'green',
    points: [0.25, 0.35, 0.3, 0.45, 0.4, 0.55, 0.48, 0.62, 0.58, 0.7, 0.66, 0.78, 0.74, 0.86, 0.9, 0.95],
  },
]

export const MAP_TIPS = [
  { title: '217 Requests', sub: 'Germany (Frankfurt HQ)', top: '12%', left: '56%' },
  { title: '185 Requests', sub: 'France (Paris Office)', top: '22%', left: '34%' },
]

export const KEY_SITES = {
  totalLabel: 'Total Requests',
  totalValue: '1,248',
  bars: [
    { label: 'Germany', pct: '23%', h: 0.52 },
    { label: 'France', pct: '19%', h: 0.44 },
    { label: 'Luxembourg', pct: '13%', h: 0.34 },
    { label: 'Others', pct: '45%', h: 0.88, hi: true },
  ],
}

export const TABLE_PERIODS = ['All', 'Daily', 'Weekly', 'Monthly', 'Yearly']

// gauge: pos = dot position 0..1 along the line, hue = red | amber | green
export const CATEGORY_ROWS = [
  { category: 'HVAC / Climate', spend: '$16,810,785', transactions: 1023, suppliers: 83, pct: '(7.1%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
  { category: 'Electrical', spend: '$15,032,214', transactions: 1019, suppliers: 21, pct: '(2.7%)', days: '8 days', gauge: { pos: 0.62, hue: 'amber' } },
  { category: 'IT Hardware', spend: '$15,012,107', transactions: 820, suppliers: 28, pct: '(2.8%)', days: '2 days', gauge: { pos: 0.14, hue: 'green' } },
  { category: 'Safety Gear', spend: '$13,235,325', transactions: 735, suppliers: 112, pct: '(9.4%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
  { category: 'Janitorial / GA', spend: '$12,095,103', transactions: 624, suppliers: 16, pct: '(1.8%)', days: '7 days', gauge: { pos: 0.5, hue: 'amber' } },
]

export const INVOICE_PERIODS = ['All', 'Weekly', 'Monthly', 'Yearly']

// y-max $300M; values in $M, cap = discount % annotation month
export const INVOICE_BARS = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  values: [300, 155, 285, 195, 210, 90, 160, 275],
  annotation: { month: 'Jul', label: '4.1%' },
}

export const PROMO = {
  text: 'Upgrade to access advanced site analytics',
  cta: 'Get Pro',
}
