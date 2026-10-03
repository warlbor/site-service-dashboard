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
// One dataset per period so the segmented toggle swaps real data.
export const TICKETS_BY_PERIOD = {
  All: [
    { category: 'HVAC / Climate', spend: '$16,810,785', transactions: 1023, suppliers: 83, pct: '(7.1%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
    { category: 'Electrical', spend: '$15,032,214', transactions: 1019, suppliers: 21, pct: '(2.7%)', days: '8 days', gauge: { pos: 0.62, hue: 'amber' } },
    { category: 'IT Hardware', spend: '$15,012,107', transactions: 820, suppliers: 28, pct: '(2.8%)', days: '2 days', gauge: { pos: 0.14, hue: 'green' } },
    { category: 'Safety Gear', spend: '$13,235,325', transactions: 735, suppliers: 112, pct: '(9.4%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
    { category: 'Janitorial / GA', spend: '$12,095,103', transactions: 624, suppliers: 16, pct: '(1.8%)', days: '7 days', gauge: { pos: 0.5, hue: 'amber' } },
  ],
  Daily: [
    { category: 'HVAC / Climate', spend: '$54,220', transactions: 34, suppliers: 12, pct: '(7.0%)', days: '9 days', gauge: { pos: 0.72, hue: 'red' } },
    { category: 'Electrical', spend: '$49,105', transactions: 31, suppliers: 8, pct: '(2.5%)', days: '7 days', gauge: { pos: 0.58, hue: 'amber' } },
    { category: 'IT Hardware', spend: '$47,880', transactions: 28, suppliers: 11, pct: '(2.9%)', days: '2 days', gauge: { pos: 0.15, hue: 'green' } },
    { category: 'Safety Gear', spend: '$41,120', transactions: 22, suppliers: 19, pct: '(9.2%)', days: '10 days', gauge: { pos: 0.8, hue: 'red' } },
    { category: 'Janitorial / GA', spend: '$38,940', transactions: 19, suppliers: 6, pct: '(1.7%)', days: '6 days', gauge: { pos: 0.45, hue: 'amber' } },
  ],
  Weekly: [
    { category: 'HVAC / Climate', spend: '$381,760', transactions: 238, suppliers: 31, pct: '(7.2%)', days: '10 days', gauge: { pos: 0.78, hue: 'red' } },
    { category: 'Electrical', spend: '$344,300', transactions: 231, suppliers: 14, pct: '(2.6%)', days: '8 days', gauge: { pos: 0.6, hue: 'amber' } },
    { category: 'IT Hardware', spend: '$341,940', transactions: 187, suppliers: 18, pct: '(2.8%)', days: '2 days', gauge: { pos: 0.14, hue: 'green' } },
    { category: 'Safety Gear', spend: '$300,110', transactions: 166, suppliers: 44, pct: '(9.3%)', days: '11 days', gauge: { pos: 0.84, hue: 'red' } },
    { category: 'Janitorial / GA', spend: '$276,220', transactions: 141, suppliers: 9, pct: '(1.8%)', days: '7 days', gauge: { pos: 0.48, hue: 'amber' } },
  ],
  Monthly: [
    { category: 'HVAC / Climate', spend: '$1,528,430', transactions: 961, suppliers: 58, pct: '(7.1%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
    { category: 'Electrical', spend: '$1,376,110', transactions: 942, suppliers: 19, pct: '(2.7%)', days: '8 days', gauge: { pos: 0.62, hue: 'amber' } },
    { category: 'IT Hardware', spend: '$1,371,250', transactions: 764, suppliers: 24, pct: '(2.8%)', days: '2 days', gauge: { pos: 0.14, hue: 'green' } },
    { category: 'Safety Gear', spend: '$1,209,780', transactions: 681, suppliers: 87, pct: '(9.4%)', days: '11 days', gauge: { pos: 0.86, hue: 'red' } },
    { category: 'Janitorial / GA', spend: '$1,105,320', transactions: 578, suppliers: 14, pct: '(1.8%)', days: '7 days', gauge: { pos: 0.5, hue: 'amber' } },
  ],
  Yearly: [
    { category: 'HVAC / Climate', spend: '$16,810,785', transactions: 1023, suppliers: 83, pct: '(7.1%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
    { category: 'Electrical', spend: '$15,032,214', transactions: 1019, suppliers: 21, pct: '(2.7%)', days: '8 days', gauge: { pos: 0.62, hue: 'amber' } },
    { category: 'IT Hardware', spend: '$15,012,107', transactions: 820, suppliers: 28, pct: '(2.8%)', days: '2 days', gauge: { pos: 0.14, hue: 'green' } },
    { category: 'Safety Gear', spend: '$13,235,325', transactions: 735, suppliers: 112, pct: '(9.4%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
    { category: 'Janitorial / GA', spend: '$12,095,103', transactions: 624, suppliers: 16, pct: '(1.8%)', days: '7 days', gauge: { pos: 0.5, hue: 'amber' } },
  ],
}

export const INVOICE_PERIODS = ['All', 'Weekly', 'Monthly', 'Yearly']

// One dataset per period. y-max $300M; values in $M.
export const INVOICE_BY_PERIOD = {
  All: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [300, 155, 285, 195, 210, 90, 160, 275],
    annotation: { index: 6, label: '4.1%' },
  },
  Weekly: {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    values: [62, 48, 75, 55, 68, 30, 52, 70],
    annotation: { index: 2, label: '3.8%' },
  },
  Monthly: {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [285, 195, 210, 90, 160, 275],
    annotation: { index: 3, label: '4.4%' },
  },
  Yearly: {
    labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
    values: [210, 240, 265, 285, 300, 275],
    annotation: { index: 4, label: '4.1%' },
  },
}

export const PROMO = {
  text: 'Upgrade to access advanced site analytics',
  cta: 'Get Pro',
}

// ============================================================
// Domain pages (Facility / GA / IT / Safety / Assets / Reports)
// Each page: intro KPIs + a category breakdown table.
// ============================================================

export const DOMAIN_PAGES = {
  Facility: {
    tagline: 'Building operations, HVAC, electrical & maintenance',
    kpis: [
      { value: '4,812', delta: '+6.1%', dir: 'up', label: 'Facility WOs' },
      { value: '126', delta: '+2.0%', dir: 'up', label: 'Active Assets' },
      { value: '96.4%', delta: '+0.8%', dir: 'up', label: 'PM Compliance' },
    ],
    rows: [
      { category: 'HVAC / Climate', spend: '$16,810,785', transactions: 1023, suppliers: 83, pct: '(7.1%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
      { category: 'Electrical', spend: '$15,032,214', transactions: 1019, suppliers: 21, pct: '(2.7%)', days: '8 days', gauge: { pos: 0.62, hue: 'amber' } },
      { category: 'Plumbing', spend: '$6,412,900', transactions: 415, suppliers: 12, pct: '(3.2%)', days: '5 days', gauge: { pos: 0.35, hue: 'green' } },
      { category: 'Elevators & Access', spend: '$4,118,240', transactions: 208, suppliers: 7, pct: '(1.9%)', days: '9 days', gauge: { pos: 0.66, hue: 'amber' } },
    ],
  },
  GA: {
    tagline: 'General affairs — office services, fleet, vendors & travel',
    kpis: [
      { value: '2,143', delta: '+3.4%', dir: 'up', label: 'GA Requests' },
      { value: '38', delta: '-1.2%', dir: 'down', label: 'Vendors Managed' },
      { value: '98.1%', delta: '+0.4%', dir: 'up', label: 'Vendor SLA' },
    ],
    rows: [
      { category: 'Janitorial / GA', spend: '$12,095,103', transactions: 624, suppliers: 16, pct: '(1.8%)', days: '7 days', gauge: { pos: 0.5, hue: 'amber' } },
      { category: 'Fleet & Transport', spend: '$5,204,330', transactions: 342, suppliers: 9, pct: '(2.4%)', days: '4 days', gauge: { pos: 0.3, hue: 'green' } },
      { category: 'Office Supplies', spend: '$1,872,610', transactions: 511, suppliers: 22, pct: '(5.6%)', days: '3 days', gauge: { pos: 0.2, hue: 'green' } },
      { category: 'Catering & Events', spend: '$984,150', transactions: 128, suppliers: 11, pct: '(4.1%)', days: '6 days', gauge: { pos: 0.42, hue: 'amber' } },
    ],
  },
  IT: {
    tagline: 'End-user devices, network, licenses & service desk',
    kpis: [
      { value: '3,861', delta: '+11.2%', dir: 'up', label: 'IT Tickets' },
      { value: '1,240', delta: '+5.5%', dir: 'up', label: 'Devices Live' },
      { value: '2 days', delta: '-0.3d', dir: 'up', label: 'Avg. Resolution' },
    ],
    rows: [
      { category: 'IT Hardware', spend: '$15,012,107', transactions: 820, suppliers: 28, pct: '(2.8%)', days: '2 days', gauge: { pos: 0.14, hue: 'green' } },
      { category: 'Software & Licenses', spend: '$9,340,880', transactions: 512, suppliers: 34, pct: '(6.2%)', days: '1 day', gauge: { pos: 0.1, hue: 'green' } },
      { category: 'Network & Cloud', spend: '$7,215,400', transactions: 296, suppliers: 15, pct: '(3.1%)', days: '3 days', gauge: { pos: 0.25, hue: 'green' } },
      { category: 'Service Desk', spend: '$2,104,990', transactions: 1104, suppliers: 5, pct: '(1.2%)', days: '2 days', gauge: { pos: 0.18, hue: 'green' } },
    ],
  },
  Safety: {
    tagline: 'EHS — incidents, audits, PPE & compliance training',
    kpis: [
      { value: '732', delta: '-4.8%', dir: 'up', label: 'Safety TRs' },
      { value: '0', delta: '0', dir: 'up', label: 'Lost-Time Incidents' },
      { value: '99.2%', delta: '+0.6%', dir: 'up', label: 'Audit Pass Rate' },
    ],
    rows: [
      { category: 'Safety Gear (PPE)', spend: '$13,235,325', transactions: 735, suppliers: 112, pct: '(9.4%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
      { category: 'Fire & Suppression', spend: '$3,918,770', transactions: 154, suppliers: 13, pct: '(2.2%)', days: '8 days', gauge: { pos: 0.6, hue: 'amber' } },
      { category: 'Signage & Barriers', spend: '$1,204,310', transactions: 263, suppliers: 18, pct: '(3.8%)', days: '5 days', gauge: { pos: 0.32, hue: 'green' } },
      { category: 'Training & Certification', spend: '$892,540', transactions: 97, suppliers: 8, pct: '(1.5%)', days: '4 days', gauge: { pos: 0.28, hue: 'green' } },
    ],
  },
  'Assets & Inventory': {
    tagline: 'Asset registry, stock levels & procurement intake',
    kpis: [
      { value: '98,6K', delta: '+4.8%', dir: 'up', label: 'Assets Tracked' },
      { value: '1,842', delta: '+12.1%', dir: 'up', label: 'SKUs in Stock' },
      { value: '87', delta: '-6', dir: 'up', label: 'Items Low/Out' },
    ],
    rows: [
      { category: 'HVAC Units', spend: '$8,110,900', transactions: 322, suppliers: 24, pct: '(4.2%)', days: '14 days', gauge: { pos: 0.9, hue: 'red' } },
      { category: 'IT Devices', spend: '$15,012,107', transactions: 820, suppliers: 28, pct: '(2.8%)', days: '2 days', gauge: { pos: 0.14, hue: 'green' } },
      { category: 'PPE Stock', spend: '$13,235,325', transactions: 735, suppliers: 112, pct: '(9.4%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
      { category: 'Consumables / GA', spend: '$4,602,180', transactions: 941, suppliers: 31, pct: '(6.8%)', days: '6 days', gauge: { pos: 0.44, hue: 'amber' } },
    ],
  },
  'Reports & Analytics': {
    tagline: 'Cross-domain trends, savings & supplier performance',
    kpis: [
      { value: '$77.2M', delta: '+8.9%', dir: 'up', label: 'Total Spend YTD' },
      { value: '4.1%', delta: '+0.3%', dir: 'up', label: 'Avg. Discount' },
      { value: '312%', delta: '-0.2%', dir: 'down', label: 'SLA Index' },
    ],
    rows: [
      { category: 'HVAC / Climate', spend: '$16,810,785', transactions: 1023, suppliers: 83, pct: '(7.1%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
      { category: 'Electrical', spend: '$15,032,214', transactions: 1019, suppliers: 21, pct: '(2.7%)', days: '8 days', gauge: { pos: 0.62, hue: 'amber' } },
      { category: 'IT Hardware', spend: '$15,012,107', transactions: 820, suppliers: 28, pct: '(2.8%)', days: '2 days', gauge: { pos: 0.14, hue: 'green' } },
      { category: 'Safety Gear (PPE)', spend: '$13,235,325', transactions: 735, suppliers: 112, pct: '(9.4%)', days: '11 days', gauge: { pos: 0.85, hue: 'red' } },
      { category: 'Janitorial / GA', spend: '$12,095,103', transactions: 624, suppliers: 16, pct: '(1.8%)', days: '7 days', gauge: { pos: 0.5, hue: 'amber' } },
    ],
  },
}
