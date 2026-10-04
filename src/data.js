// ============================================================
// Quantix — Site Service Dashboard data
// All copy & figures live here for single-source editing.
// Domains: Facility, GA (General Affairs), IT, Safety
// All metrics are OPERATIONAL (WOs, tickets, SLA, response times).
// Sites: Indonesian company locations.
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
  { value: '96.8%', delta: '-0.2%', dir: 'down', label: 'SLA Compliance' },
]

export const SPARK_TILES = [
  {
    id: 'wo',
    title: 'WO Count',
    value: '3,209',
    delta: '-0.28K',
    dir: 'down',
    color: 'red',
    points: [0.55, 0.4, 0.62, 0.48, 0.7, 0.58, 0.75, 0.62, 0.68, 0.5, 0.56, 0.44, 0.5, 0.38, 0.42, 0.3],
  },
  {
    id: 'tr',
    title: 'TR Count',
    value: '2,956',
    delta: '+0.11K',
    dir: 'up',
    color: 'green',
    points: [0.25, 0.35, 0.3, 0.45, 0.4, 0.55, 0.48, 0.62, 0.58, 0.7, 0.66, 0.78, 0.74, 0.86, 0.9, 0.95],
  },
]

export const MAP_TIPS = [
  { title: '1,120 Requests', sub: 'Jakarta HQ', top: '34%', left: '58%' },
  { title: '486 Requests', sub: 'Cikarang Plant', top: '20%', left: '38%' },
]

export const KEY_SITES = {
  totalLabel: 'Total Requests',
  totalValue: '1,248',
  bars: [
    { label: 'Jakarta HQ', pct: '38%', h: 0.72 },
    { label: 'Cikarang Plant', pct: '24%', h: 0.5 },
    { label: 'Surabaya Office', pct: '17%', h: 0.38 },
    { label: 'Others', pct: '21%', h: 0.58, hi: true },
  ],
}

export const TABLE_PERIODS = ['All', 'Daily', 'Weekly', 'Monthly', 'Yearly']

// gauge: pos = dot position 0..1 along the line, hue = red | amber | green
// All metrics operational: volume, first-response, resolution, SLA.
export const TICKETS_BY_PERIOD = {
  All: [
    { category: 'HVAC / Climate', volume: 1023, sla: '94.2%', responseH: '1.2 hrs', resolveH: '11 hrs', techs: 83, gauge: { pos: 0.85, hue: 'red' } },
    { category: 'Electrical', volume: 1019, sla: '97.1%', responseH: '0.8 hrs', resolveH: '8 hrs', techs: 21, gauge: { pos: 0.62, hue: 'amber' } },
    { category: 'IT Hardware', volume: 820, sla: '98.4%', responseH: '0.3 hrs', resolveH: '2 hrs', techs: 28, gauge: { pos: 0.14, hue: 'green' } },
    { category: 'Safety / EHS', volume: 735, sla: '91.6%', responseH: '1.5 hrs', resolveH: '11 hrs', techs: 112, gauge: { pos: 0.85, hue: 'red' } },
    { category: 'Janitorial / GA', volume: 624, sla: '98.9%', responseH: '0.6 hrs', resolveH: '7 hrs', techs: 16, gauge: { pos: 0.5, hue: 'amber' } },
  ],
  Daily: [
    { category: 'HVAC / Climate', volume: 34, sla: '94.0%', responseH: '1.1 hrs', resolveH: '9 hrs', techs: 12, gauge: { pos: 0.72, hue: 'red' } },
    { category: 'Electrical', volume: 31, sla: '97.2%', responseH: '0.8 hrs', resolveH: '7 hrs', techs: 8, gauge: { pos: 0.58, hue: 'amber' } },
    { category: 'IT Hardware', volume: 28, sla: '98.5%', responseH: '0.3 hrs', resolveH: '2 hrs', techs: 11, gauge: { pos: 0.15, hue: 'green' } },
    { category: 'Safety / EHS', volume: 22, sla: '91.8%', responseH: '1.4 hrs', resolveH: '10 hrs', techs: 19, gauge: { pos: 0.8, hue: 'red' } },
    { category: 'Janitorial / GA', volume: 19, sla: '99.0%', responseH: '0.5 hrs', resolveH: '6 hrs', techs: 6, gauge: { pos: 0.45, hue: 'amber' } },
  ],
  Weekly: [
    { category: 'HVAC / Climate', volume: 238, sla: '94.4%', responseH: '1.2 hrs', resolveH: '10 hrs', techs: 31, gauge: { pos: 0.78, hue: 'red' } },
    { category: 'Electrical', volume: 231, sla: '97.0%', responseH: '0.8 hrs', resolveH: '8 hrs', techs: 14, gauge: { pos: 0.6, hue: 'amber' } },
    { category: 'IT Hardware', volume: 187, sla: '98.4%', responseH: '0.3 hrs', resolveH: '2 hrs', techs: 18, gauge: { pos: 0.14, hue: 'green' } },
    { category: 'Safety / EHS', volume: 166, sla: '91.7%', responseH: '1.5 hrs', resolveH: '11 hrs', techs: 44, gauge: { pos: 0.84, hue: 'red' } },
    { category: 'Janitorial / GA', volume: 141, sla: '98.8%', responseH: '0.6 hrs', resolveH: '7 hrs', techs: 9, gauge: { pos: 0.48, hue: 'amber' } },
  ],
  Monthly: [
    { category: 'HVAC / Climate', volume: 961, sla: '94.2%', responseH: '1.2 hrs', resolveH: '11 hrs', techs: 58, gauge: { pos: 0.85, hue: 'red' } },
    { category: 'Electrical', volume: 942, sla: '97.1%', responseH: '0.8 hrs', resolveH: '8 hrs', techs: 19, gauge: { pos: 0.62, hue: 'amber' } },
    { category: 'IT Hardware', volume: 764, sla: '98.4%', responseH: '0.3 hrs', resolveH: '2 hrs', techs: 24, gauge: { pos: 0.14, hue: 'green' } },
    { category: 'Safety / EHS', volume: 681, sla: '91.6%', responseH: '1.5 hrs', resolveH: '11 hrs', techs: 87, gauge: { pos: 0.86, hue: 'red' } },
    { category: 'Janitorial / GA', volume: 578, sla: '98.9%', responseH: '0.6 hrs', resolveH: '7 hrs', techs: 14, gauge: { pos: 0.5, hue: 'amber' } },
  ],
  Yearly: [
    { category: 'HVAC / Climate', volume: 1023, sla: '94.2%', responseH: '1.2 hrs', resolveH: '11 hrs', techs: 83, gauge: { pos: 0.85, hue: 'red' } },
    { category: 'Electrical', volume: 1019, sla: '97.1%', responseH: '0.8 hrs', resolveH: '8 hrs', techs: 21, gauge: { pos: 0.62, hue: 'amber' } },
    { category: 'IT Hardware', volume: 820, sla: '98.4%', responseH: '0.3 hrs', resolveH: '2 hrs', techs: 28, gauge: { pos: 0.14, hue: 'green' } },
    { category: 'Safety / EHS', volume: 735, sla: '91.6%', responseH: '1.5 hrs', resolveH: '11 hrs', techs: 112, gauge: { pos: 0.85, hue: 'red' } },
    { category: 'Janitorial / GA', volume: 624, sla: '98.9%', responseH: '0.6 hrs', resolveH: '7 hrs', techs: 16, gauge: { pos: 0.5, hue: 'amber' } },
  ],
}

export const SLA_PERIODS = ['All', 'Weekly', 'Monthly', 'Yearly']

// SLA compliance trend (%) — y-axis 80–100, no currency anywhere.
export const SLA_BY_PERIOD = {
  All: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [93.0, 94.5, 92.8, 95.2, 94.8, 96.5, 98.6, 95.4],
    annotation: { index: 6, label: '98.6%' },
    ymin: 80,
    ymax: 100,
  },
  Weekly: {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    values: [95.1, 94.2, 96.8, 95.5, 96.1, 93.2, 95.7, 96.9],
    annotation: { index: 2, label: '96.8%' },
    ymin: 80,
    ymax: 100,
  },
  Monthly: {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [92.8, 95.2, 94.8, 96.5, 98.6, 95.4],
    annotation: { index: 3, label: '98.6%' },
    ymin: 80,
    ymax: 100,
  },
  Yearly: {
    labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
    values: [91.2, 92.4, 93.8, 94.9, 98.6, 95.4],
    annotation: { index: 4, label: '98.6%' },
    ymin: 80,
    ymax: 100,
  },
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
      { category: 'HVAC / Climate', volume: 1023, sla: '94.2%', responseH: '1.2 hrs', resolveH: '11 hrs', techs: 83, gauge: { pos: 0.85, hue: 'red' } },
      { category: 'Electrical', volume: 1019, sla: '97.1%', responseH: '0.8 hrs', resolveH: '8 hrs', techs: 21, gauge: { pos: 0.62, hue: 'amber' } },
      { category: 'Plumbing', volume: 415, sla: '96.8%', responseH: '0.9 hrs', resolveH: '5 hrs', techs: 12, gauge: { pos: 0.35, hue: 'green' } },
      { category: 'Elevators & Access', volume: 208, sla: '98.1%', responseH: '0.7 hrs', resolveH: '9 hrs', techs: 7, gauge: { pos: 0.66, hue: 'amber' } },
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
      { category: 'Janitorial / GA', volume: 624, sla: '98.9%', responseH: '0.6 hrs', resolveH: '7 hrs', techs: 16, gauge: { pos: 0.5, hue: 'amber' } },
      { category: 'Fleet & Transport', volume: 342, sla: '97.6%', responseH: '0.4 hrs', resolveH: '4 hrs', techs: 9, gauge: { pos: 0.3, hue: 'green' } },
      { category: 'Office Services', volume: 511, sla: '95.4%', responseH: '0.5 hrs', resolveH: '3 hrs', techs: 22, gauge: { pos: 0.2, hue: 'green' } },
      { category: 'Events & Catering', volume: 128, sla: '95.9%', responseH: '0.8 hrs', resolveH: '6 hrs', techs: 11, gauge: { pos: 0.42, hue: 'amber' } },
    ],
  },
  IT: {
    tagline: 'End-user devices, network, licenses & service desk',
    kpis: [
      { value: '3,861', delta: '+11.2%', dir: 'up', label: 'IT Tickets' },
      { value: '1,240', delta: '+5.5%', dir: 'up', label: 'Devices Live' },
      { value: '2 hrs', delta: '-0.3h', dir: 'up', label: 'Avg. Resolution' },
    ],
    rows: [
      { category: 'IT Hardware', volume: 820, sla: '98.4%', responseH: '0.3 hrs', resolveH: '2 hrs', techs: 28, gauge: { pos: 0.14, hue: 'green' } },
      { category: 'Software & Licenses', volume: 512, sla: '96.8%', responseH: '0.2 hrs', resolveH: '1 hr', techs: 34, gauge: { pos: 0.1, hue: 'green' } },
      { category: 'Network & Cloud', volume: 296, sla: '96.9%', responseH: '0.4 hrs', resolveH: '3 hrs', techs: 15, gauge: { pos: 0.25, hue: 'green' } },
      { category: 'Service Desk', volume: 1104, sla: '99.2%', responseH: '0.1 hrs', resolveH: '2 hrs', techs: 5, gauge: { pos: 0.18, hue: 'green' } },
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
      { category: 'Safety / EHS', volume: 735, sla: '91.6%', responseH: '1.5 hrs', resolveH: '11 hrs', techs: 112, gauge: { pos: 0.85, hue: 'red' } },
      { category: 'Fire & Suppression', volume: 154, sla: '97.8%', responseH: '0.8 hrs', resolveH: '8 hrs', techs: 13, gauge: { pos: 0.6, hue: 'amber' } },
      { category: 'Signage & Barriers', volume: 263, sla: '96.2%', responseH: '0.9 hrs', resolveH: '5 hrs', techs: 18, gauge: { pos: 0.32, hue: 'green' } },
      { category: 'Training & Certification', volume: 97, sla: '98.5%', responseH: '1.0 hrs', resolveH: '4 hrs', techs: 8, gauge: { pos: 0.28, hue: 'green' } },
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
      { category: 'HVAC Units', volume: 322, sla: '94.2%', responseH: '1.4 hrs', resolveH: '14 hrs', techs: 24, gauge: { pos: 0.9, hue: 'red' } },
      { category: 'IT Devices', volume: 820, sla: '98.4%', responseH: '0.3 hrs', resolveH: '2 hrs', techs: 28, gauge: { pos: 0.14, hue: 'green' } },
      { category: 'PPE Stock', volume: 735, sla: '91.6%', responseH: '1.5 hrs', resolveH: '11 hrs', techs: 112, gauge: { pos: 0.85, hue: 'red' } },
      { category: 'GA Consumables', volume: 941, sla: '96.8%', responseH: '0.6 hrs', resolveH: '6 hrs', techs: 31, gauge: { pos: 0.44, hue: 'amber' } },
    ],
  },
  'Reports & Analytics': {
    tagline: 'Cross-domain trends, SLA & technician performance',
    kpis: [
      { value: '24,405', delta: '+8.9%', dir: 'up', label: 'Total WOs YTD' },
      { value: '98.6%', delta: '+0.3%', dir: 'up', label: 'Best SLA Month' },
      { value: '96.8%', delta: '-0.2%', dir: 'down', label: 'SLA Compliance' },
    ],
    rows: [
      { category: 'HVAC / Climate', volume: 1023, sla: '94.2%', responseH: '1.2 hrs', resolveH: '11 hrs', techs: 83, gauge: { pos: 0.85, hue: 'red' } },
      { category: 'Electrical', volume: 1019, sla: '97.1%', responseH: '0.8 hrs', resolveH: '8 hrs', techs: 21, gauge: { pos: 0.62, hue: 'amber' } },
      { category: 'IT Hardware', volume: 820, sla: '98.4%', responseH: '0.3 hrs', resolveH: '2 hrs', techs: 28, gauge: { pos: 0.14, hue: 'green' } },
      { category: 'Safety / EHS', volume: 735, sla: '91.6%', responseH: '1.5 hrs', resolveH: '11 hrs', techs: 112, gauge: { pos: 0.85, hue: 'red' } },
      { category: 'Janitorial / GA', volume: 624, sla: '98.9%', responseH: '0.6 hrs', resolveH: '7 hrs', techs: 16, gauge: { pos: 0.5, hue: 'amber' } },
    ],
  },
}
