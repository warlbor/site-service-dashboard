// Verification for the work-order todo API (src/api.js)
// Run: node scripts/verify-todo-api.mjs
// Shims localStorage, then exercises create/status/delete/persistence.

const store = new Map()
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
}

const api = await import('../src/api.js')
const fail = (msg) => { console.error('FAIL:', msg); process.exit(1) }

// 1. Seeds
let wos = await api.fetchWorkOrders()
if (wos.length !== 6) fail(`expected 6 seeds, got ${wos.length}`)
const seedIds = wos.map((w) => w.id)
console.log('seeds:', seedIds.join(', '))

// 2. Create 3 — ids must be unique and NOT collide with seeds
const a = await api.createWorkOrder({ title: 'Test A', site: 'Jakarta HQ', domain: 'IT', category: 'IT Hardware', priority: 'Low' })
const b = await api.createWorkOrder({ title: 'Test B', site: 'Jakarta HQ', domain: 'Facility', category: 'Plumbing', priority: 'Medium' })
const c = await api.createWorkOrder({ title: 'Test C', site: 'Cikarang Plant', domain: 'Safety', category: 'Fire & Suppression', priority: 'High' })
const newIds = [a.id, b.id, c.id]
console.log('created:', newIds.join(', '))
if (new Set(newIds).size !== 3) fail('duplicate ids among created WOs')
for (const id of newIds) if (seedIds.includes(id)) fail(`created id ${id} collides with a seed`)

// 3. Status toggle
await api.setWorkOrderStatus(a.id, 'done')
wos = await api.fetchWorkOrders()
const aRow = wos.find((w) => w.id === a.id)
if (!aRow || aRow.status !== 'done') fail(`status toggle failed for ${a.id}`)
console.log(`toggled: ${a.id} → ${aRow.status}`)

// 4. Delete
await api.deleteWorkOrder(b.id)
wos = await api.fetchWorkOrders()
if (wos.some((w) => w.id === b.id)) fail(`delete failed for ${b.id}`)
console.log(`deleted: ${b.id}; count now ${wos.length}`)

// 5. Persistence across a fresh read (same shimmed storage)
wos = await api.fetchWorkOrders()
if (!wos.some((w) => w.id === a.id && w.status === 'done')) fail('persistence lost for toggled WO')
if (wos.some((w) => w.id === b.id)) fail('persistence resurrected deleted WO')
console.log('persisted count:', wos.length)

console.log('ALL TODO API TESTS PASSED')
