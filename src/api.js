// ============================================================
// Mock API layer — the ONLY place components touch data.
// Swap any function body for a real `fetch('/api/...')` later;
// components won't change.
// ============================================================

import {
  TICKETS_BY_PERIOD,
  INVOICE_BY_PERIOD,
  DOMAIN_PAGES,
} from './data.js'

const LATENCY_MS = 150
const delay = (ms = LATENCY_MS) => new Promise((r) => setTimeout(r, ms))

// GET /api/tickets?period=Monthly
export async function fetchTickets(period) {
  await delay()
  const rows = TICKETS_BY_PERIOD[period]
  if (!rows) throw new Error(`Unknown period: ${period}`)
  return rows
}

// GET /api/invoice?period=Yearly
export async function fetchInvoice(period) {
  await delay()
  const data = INVOICE_BY_PERIOD[period]
  if (!data) throw new Error(`Unknown period: ${period}`)
  return data
}

// GET /api/pages/:name
export async function fetchDomainPage(name) {
  await delay()
  return DOMAIN_PAGES[name] ?? null
}
