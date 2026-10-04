// ============================================================
// Mock API layer — the ONLY place components touch data.
// Swap any function body for a real `fetch('/api/...')` later;
// components won't change.
// ============================================================

import {
  TICKETS_BY_PERIOD,
  SLA_BY_PERIOD,
  DOMAIN_PAGES,
} from './data.js'

const LATENCY_MS = 150
const delay = (ms = LATENCY_MS) => new Promise((r) => setTimeout(r, ms))

// ============================================================
// Work-order to-do list (mock persistence in localStorage)
// Same shape as a real backend would return; swap the bodies
// for fetch() calls when the API exists.
// ============================================================

const WO_KEY = 'ssd-work-orders'

// Next ID = max existing numeric suffix + 1 (collision-proof against seeds & stored data)
function nextId(list) {
  const max = list.reduce(
    (m, w) => Math.max(m, parseInt(String(w.id).replace(/\D/g, ''), 10) || 0),
    1000,
  )
  return `WO-${max + 1}`
}

const SEED_WOS = [
  { id: 'WO-1001', title: 'AC not cooling — Meeting Room 3A', site: 'Jakarta HQ', domain: 'Facility', category: 'HVAC / Climate', priority: 'High', status: 'open', createdAt: '2026-10-03T09:12:00+07:00' },
  { id: 'WO-1002', title: 'Projector flickering in Training Room', site: 'Jakarta HQ', domain: 'IT', category: 'IT Hardware', priority: 'Medium', status: 'open', createdAt: '2026-10-03T10:05:00+07:00' },
  { id: 'WO-1003', title: 'Water dispenser leak — 2nd floor pantry', site: 'Cikarang Plant', domain: 'Facility', category: 'Plumbing', priority: 'Medium', status: 'done', createdAt: '2026-10-02T14:40:00+07:00' },
  { id: 'WO-1004', title: 'Fire extinguisher inspection overdue — Warehouse B', site: 'Cikarang Plant', domain: 'Safety', category: 'Fire & Suppression', priority: 'High', status: 'open', createdAt: '2026-10-03T08:20:00+07:00' },
  { id: 'WO-1005', title: 'Company car service booking — Avanza B 1234 XYZ', site: 'Surabaya Office', domain: 'GA', category: 'Fleet & Transport', priority: 'Low', status: 'open', createdAt: '2026-10-01T16:55:00+07:00' },
  { id: 'WO-1006', title: 'Replace broken window latch — Room 210', site: 'Jakarta HQ', domain: 'Facility', category: 'Handyman', priority: 'Low', status: 'done', createdAt: '2026-09-30T11:30:00+07:00' },
]

function readWos() {
  try {
    const raw = localStorage.getItem(WO_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* private mode / storage disabled */ }
  return null
}

function writeWos(list) {
  try { localStorage.setItem(WO_KEY, JSON.stringify(list)) } catch { /* ignore */ }
}

// GET /api/work-orders
export async function fetchWorkOrders() {
  await delay()
  return readWos() ?? SEED_WOS
}

// POST /api/work-orders
export async function createWorkOrder(draft) {
  await delay()
  const list = readWos() ?? [...SEED_WOS]
  const wo = {
    id: nextId(list),
    title: draft.title,
    site: draft.site,
    domain: draft.domain,
    category: draft.category,
    priority: draft.priority,
    status: 'open',
    createdAt: new Date().toISOString(),
  }
  writeWos([wo, ...list])
  return wo
}

// PATCH /api/work-orders/:id  { status }
export async function setWorkOrderStatus(id, status) {
  await delay()
  const list = readWos() ?? [...SEED_WOS]
  const next = list.map((w) => (w.id === id ? { ...w, status } : w))
  writeWos(next)
  return next.find((w) => w.id === id)
}

// DELETE /api/work-orders/:id
export async function deleteWorkOrder(id) {
  await delay()
  const list = readWos() ?? [...SEED_WOS]
  writeWos(list.filter((w) => w.id !== id))
  return { ok: true }
}

// GET /api/tickets?period=Monthly
export async function fetchTickets(period) {
  await delay()
  const rows = TICKETS_BY_PERIOD[period]
  if (!rows) throw new Error(`Unknown period: ${period}`)
  return rows
}

// GET /api/sla?period=Yearly
export async function fetchSla(period) {
  await delay()
  const data = SLA_BY_PERIOD[period]
  if (!data) throw new Error(`Unknown period: ${period}`)
  return data
}

// GET /api/pages/:name
export async function fetchDomainPage(name) {
  await delay()
  return DOMAIN_PAGES[name] ?? null
}
