// Minimal hash router — works on GitHub Pages (no server rewrites needed).
// Routes: #/dashboard, #/facility, #/ga, #/it, #/safety, #/assets-inventory, #/reports
import { useState, useEffect } from 'react'
import { NAV_ITEMS } from './data.js'

const SLUGS = {
  'Dashboard': 'dashboard',
  'Facility': 'facility',
  'GA': 'ga',
  'IT': 'it',
  'Safety': 'safety',
  'Assets & Inventory': 'assets-inventory',
  'Reports & Analytics': 'reports',
}
const NAMES = Object.fromEntries(Object.entries(SLUGS).map(([n, s]) => [s, n]))

function readHash() {
  const slug = window.location.hash.replace(/^#\/?/, '').toLowerCase()
  return NAMES[slug] ?? 'Dashboard'
}

export function useRoute() {
  const [page, setPage] = useState(readHash)

  useEffect(() => {
    const onHash = () => setPage(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (name) => {
    const slug = SLUGS[name] ?? 'dashboard'
    if (readHash() === name) return
    window.location.hash = `/${slug}`
  }

  return { page, navigate }
}
