import { useEffect, useMemo, useState, useCallback } from 'react'
import { Icon, BrandGlyph } from './icons.jsx'
import { Sparkline, EuropeMap, SiteBars, SlaBars } from './charts.jsx'
import { useRoute } from './router.js'
import { useAsync } from './useAsync.js'
import { Skeleton, ErrorNote } from './async.jsx'
import { fetchTickets, fetchSla, fetchWorkOrders, createWorkOrder, setWorkOrderStatus, deleteWorkOrder } from './api.js'
import {
  NAV_ITEMS,
  OVERVIEW_KPIS,
  SPARK_TILES,
  MAP_TIPS,
  KEY_SITES,
  TABLE_PERIODS,
  TICKETS_BY_PERIOD,
  SLA_PERIODS,
  SLA_BY_PERIOD,
  PROMO,
  DOMAIN_PAGES,
} from './data.js'
import './dashboard.css'
import './promo.css'
import './responsive.css'

/* ---------- Top navigation ---------- */

function TopNav({ dark, setDark, active, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (item) => {
    onNavigate(item)
    setMenuOpen(false)
  }

  return (
    <nav className="topnav">
      <div className="brand-mark"><BrandGlyph size={28} /></div>
      <div className="nav-links" role="tablist">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            role="tab"
            aria-selected={active === item}
            className={`nav-link${active === item ? ' active' : ''}`}
            onClick={() => go(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="nav-right">
        <button
          className="hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? Icon.close(16) : Icon.menu(16)}
        </button>
        <div className="theme-pill" role="group" aria-label="Theme">
          <button className={`theme-btn${!dark ? ' on' : ''}`} aria-label="Light mode" onClick={() => setDark(false)}>
            {Icon.sun(13)}
          </button>
          <button className={`theme-btn${dark ? ' on' : ''}`} aria-label="Dark mode" onClick={() => setDark(true)}>
            {Icon.moon(13)}
          </button>
        </div>
        <button className="bell-btn" aria-label="Notifications">
          {Icon.bell(14)}
          <span className="bell-dot" />
        </button>
        <div className="avatar" title="Gian Aprima">GA</div>
      </div>
      {menuOpen && (
        <div className="mobile-menu" role="menu">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              role="menuitem"
              className={`mobile-menu-link${active === item ? ' active' : ''}`}
              onClick={() => go(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ---------- Side rail ---------- */

function SideRail({ onNavigate, onNewWO }) {
  return (
    <aside className="side-rail">
      <button className="rail-btn" aria-label="New work order" title="New work order" onClick={onNewWO}>{Icon.wrench()}</button>
      <button className="rail-btn" aria-label="Assets & Inventory" title="Assets & Inventory" onClick={() => onNavigate('Assets & Inventory')}>{Icon.box()}</button>
      <button className="rail-btn" aria-label="Reports & Analytics" title="Reports & Analytics" onClick={() => onNavigate('Reports & Analytics')}>{Icon.report()}</button>
      <button className="rail-btn" aria-label="Settings" title="Settings">{Icon.gear()}</button>
      <div className="rail-spacer" />
      <button className="rail-btn exit" aria-label="Log out">{Icon.logout()}</button>
    </aside>
  )
}

/* ---------- Work-order to-do modal ---------- */

const WO_SITES = ['Jakarta HQ', 'Cikarang Plant', 'Surabaya Office']
const WO_DOMAINS = ['Facility', 'GA', 'IT', 'Safety']
const WO_CATEGORIES = {
  Facility: ['HVAC / Climate', 'Electrical', 'Plumbing', 'Elevators & Access', 'Handyman'],
  GA: ['Fleet & Transport', 'Office Services', 'Events & Catering', 'Janitorial / GA'],
  IT: ['IT Hardware', 'Software & Licenses', 'Network & Cloud', 'Service Desk'],
  Safety: ['Fire & Suppression', 'Signage & Barriers', 'Training & Certification'],
}
const WO_PRIORITIES = ['Low', 'Medium', 'High']

function TodoModal({ onClose }) {
  const remote = useAsync(() => fetchWorkOrders(), [])
  const [busyId, setBusyId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState({ title: '', site: WO_SITES[0], domain: 'Facility', category: WO_CATEGORIES.Facility[0], priority: 'Medium' })
  const [saving, setSaving] = useState(false)

  const rows = remote.data ?? []
  const open = rows.filter((w) => w.status === 'open')
  const done = rows.filter((w) => w.status === 'done')

  const submit = async (e) => {
    e.preventDefault()
    if (!draft.title.trim() || saving) return
    setSaving(true)
    try {
      await createWorkOrder({ ...draft, title: draft.title.trim() })
      setShowForm(false)
      setDraft((d) => ({ ...d, title: '' }))
      remote.retry()
    } finally {
      setSaving(false)
    }
  }

  const toggle = async (wo) => {
    setBusyId(wo.id)
    try {
      await setWorkOrderStatus(wo.id, wo.status === 'open' ? 'done' : 'open')
      remote.retry()
    } finally {
      setBusyId(null)
    }
  }

  const remove = async (wo) => {
    setBusyId(wo.id)
    try {
      await deleteWorkOrder(wo.id)
      remote.retry()
    } finally {
      setBusyId(null)
    }
  }

  const setDomain = (domain) => setDraft((d) => ({ ...d, domain, category: WO_CATEGORIES[domain][0] }))

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="todo-box" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Work order to-do list">
        <div className="todo-head">
          <span className="todo-title">Work Orders — To Do</span>
          <div className="todo-head-actions">
            <button className="todo-add" onClick={() => setShowForm((v) => !v)}>{showForm ? 'Cancel' : '+ New'}</button>
            <button className="search-close" aria-label="Close" onClick={onClose}>{Icon.close(14)}</button>
          </div>
        </div>

        {showForm && (
          <form className="todo-form" onSubmit={submit}>
            <input
              className="todo-input"
              placeholder="What needs to be done?"
              value={draft.title}
              autoFocus
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            />
            <div className="todo-form-row">
              <select value={draft.site} onChange={(e) => setDraft((d) => ({ ...d, site: e.target.value }))}>
                {WO_SITES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select value={draft.domain} onChange={(e) => setDomain(e.target.value)}>
                {WO_DOMAINS.map((d) => <option key={d}>{d}</option>)}
              </select>
              <select value={draft.category} onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}>
                {WO_CATEGORIES[draft.domain].map((c) => <option key={c}>{c}</option>)}
              </select>
              <select value={draft.priority} onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value }))}>
                {WO_PRIORITIES.map((p) => <option key={p}>{p}</option>)}
              </select>
              <button className="todo-submit" disabled={saving || !draft.title.trim()}>
                {saving ? 'Saving…' : 'Add'}
              </button>
            </div>
          </form>
        )}

        <div className="todo-list">
          {remote.loading && <Skeleton rows={4} />}
          {remote.error && <ErrorNote error={remote.error} onRetry={remote.retry} />}
          {!remote.loading && !remote.error && (
            <>
              {open.length === 0 && done.length === 0 && <div className="search-empty">No work orders yet — add one above.</div>}
              {open.map((wo) => (
                <TodoRow key={wo.id} wo={wo} busy={busyId === wo.id} onToggle={toggle} onDelete={remove} />
              ))}
              {done.length > 0 && (
                <div className="todo-done-label">Completed · {done.length}</div>
              )}
              {done.map((wo) => (
                <TodoRow key={wo.id} wo={wo} busy={busyId === wo.id} onToggle={toggle} onDelete={remove} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function TodoRow({ wo, busy, onToggle, onDelete }) {
  const isDone = wo.status === 'done'
  return (
    <div className={`todo-row${isDone ? ' done' : ''}`}>
      <button
        className="todo-check"
        aria-label={isDone ? `Reopen ${wo.id}` : `Mark ${wo.id} done`}
        disabled={busy}
        onClick={() => onToggle(wo)}
      >
        {isDone ? '✓' : ''}
      </button>
      <div className="todo-main">
        <div className="todo-text">{wo.title}</div>
        <div className="todo-meta">
          <span className="todo-id">{wo.id}</span>
          <span>{wo.site}</span>
          <span>·</span>
          <span>{wo.domain}</span>
          <span>·</span>
          <span>{wo.category}</span>
          <span className={`todo-prio p-${wo.priority.toLowerCase()}`}>{wo.priority}</span>
        </div>
      </div>
      <button className="todo-del" aria-label={`Delete ${wo.id}`} disabled={busy} onClick={() => onDelete(wo)}>
        {Icon.close(12)}
      </button>
    </div>
  )
}

/* ---------- Title row ---------- */

function TitleRow({ title, onNavigate, onRefresh, refreshing }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const results = query.trim()
    ? NAV_ITEMS.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : NAV_ITEMS

  return (
    <div className="title-row">
      <button className="search-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>{Icon.search(18)}</button>
      <h1>{title}</h1>
      <div className="title-actions">
        <button className={`refresh-pill${refreshing ? ' spinning' : ''}`} onClick={onRefresh} disabled={refreshing}>
          {Icon.refresh(13)} {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
        <button className="icon-btn" aria-label="Download report">{Icon.download()}</button>
        <button className="icon-btn" aria-label="Share dashboard">{Icon.shareArrow()}</button>
      </div>
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-box" onClick={(e) => e.stopPropagation()}>
            <div className="search-input-row">
              {Icon.search(16)}
              <input
                autoFocus
                placeholder="Search pages…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
              />
              <button className="search-close" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                {Icon.close(14)}
              </button>
            </div>
            <div className="search-results">
              {results.length === 0 && <div className="search-empty">No matches for “{query}”</div>}
              {results.map((item) => (
                <button
                  key={item}
                  className="search-result"
                  onClick={() => { onNavigate(item); setSearchOpen(false) }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- Band 1: KPIs / map / key sites ---------- */

function OverviewTile() {
  return (
    <div className="tile">
      <div className="tile-title">Overview</div>
      <div className="overview-kpis">
        {OVERVIEW_KPIS.map((k) => (
          <div className="kpi" key={k.label}>
            <div className="kpi-value">
              {k.value}
              <span className={`kpi-delta ${k.dir}`}>{k.delta}</span>
            </div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SparkTile({ tile }) {
  return (
    <div className="tile spark-tile">
      <div className="spark-head">
        <span className="tile-title">{tile.title}</span>
        <button className="corner-btn" aria-label={`Open ${tile.title}`}>{Icon.arrowUpRight()}</button>
      </div>
      <div className="spark-value">
        {tile.value}
        <span className={`spark-delta ${tile.dir}`}>{tile.delta}</span>
      </div>
      <Sparkline points={tile.points} color={tile.color} />
    </div>
  )
}

function MapPanel() {
  return (
    <div className="map-panel">
      <EuropeMap />
      {MAP_TIPS.map((t) => (
        <div key={t.title} className="map-tip" style={{ top: t.top, left: t.left }}>
          <b>{t.title}</b>
          {t.sub}
          <span className="tip-stem" style={{ left: '18px' }} />
        </div>
      ))}
    </div>
  )
}

function KeySitesTile() {
  return (
    <div className="tile">
      <div className="spark-head">
        <div>
          <div className="tile-title" style={{ fontSize: 15, color: 'var(--tile-ink)' }}>Key Sites</div>
          <div className="sites-sub"><b>{KEY_SITES.totalValue}</b> {KEY_SITES.totalLabel}</div>
        </div>
        <button className="corner-btn" aria-label="Open key sites">{Icon.arrowUpRight()}</button>
      </div>
      <SiteBars bars={KEY_SITES.bars} />
    </div>
  )
}

/* ---------- Band 2: table + chart ---------- */

const HUE_COLORS = { red: '#e05252', amber: '#e0a352', green: '#35c27a' }

// "⋯" action menu for a table row
function RowMenu({ category }) {
  const [open, setOpen] = useState(false)
  const actions = ['View SLA detail', 'Open tickets', 'Export CSV']
  return (
    <div className="row-menu-wrap">
      <button className="row-menu" aria-label={`More actions for ${category}`} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {Icon.dots()}
      </button>
      {open && (
        <div className="row-menu-pop" role="menu">
          {actions.map((a) => (
            <button key={a} role="menuitem" className="row-menu-item" onClick={() => setOpen(false)}>
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Gauge({ hue, pos }) {
  return (
    <div className="gauge">
      <i style={{ left: `${pos * 100}%`, background: HUE_COLORS[hue] }} />
    </div>
  )
}

function CategoryPanel({ rowsSource }) {
  const [period, setPeriod] = useState('Monthly')
  const [mode, setMode] = useState('table')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState(1)

  // Static rows passed in (domain pages) skip the API; the dashboard fetches.
  const remote = useAsync(
    useCallback(() => fetchTickets(period), [period]),
    [period],
  )
  const liveRows = rowsSource ?? remote.data ?? TICKETS_BY_PERIOD[period]
  const loading = !rowsSource && remote.loading

  const rows = useMemo(() => {
    if (!sortKey) return liveRows
    return [...liveRows].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'number') return (av - bv) * sortDir
      return String(av).localeCompare(String(bv)) * sortDir
    })
  }, [sortKey, sortDir, liveRows])

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => -d)
    else { setSortKey(key); setSortDir(1) }
  }

  const cols = [
    ['category', 'Category'],
    ['volume', 'Volume'],
    ['sla', 'SLA %'],
    ['responseH', 'First Response'],
    ['resolveH', 'Resolution'],
  ]

  return (
    <div className="tile">
      <div className="panel-head">
        <span className="panel-title">Tickets by Category</span>
        <div className="seg-group">
          <button className={`seg-btn${mode === 'chart' ? ' on' : ''}`} onClick={() => setMode('chart')} aria-label="Chart view">{Icon.barChart()}</button>
          <button className={`seg-btn${mode === 'table' ? ' on' : ''}`} onClick={() => setMode('table')} aria-label="Table view">{Icon.table()}</button>
          <span className="seg-sep" />
          {TABLE_PERIODS.map((p) => (
            <button key={p} className={`seg-btn${period === p ? ' on' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
          ))}
        </div>
      </div>
      {loading ? (
        <Skeleton rows={5} />
      ) : remote.error && !rowsSource ? (
        <ErrorNote error={remote.error} onRetry={remote.retry} />
      ) : mode === 'table' ? (
        <div className="table-scroll">
          <table className="cat-table">
            <thead>
              <tr>
                {cols.map(([key, label]) => (
                  <th key={key} onClick={() => toggleSort(key)}>
                    {label}
                    <span className="caret">{sortKey === key ? (sortDir === 1 ? '▲' : '▼') : '⇅'}</span>
                  </th>
                ))}
                <th aria-label="actions" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.category}>
                  <td>{r.category}</td>
                  <td className="td-num">{r.volume}</td>
                  <td className="td-num">
                    {r.sla} <span className="td-pct">{r.resolveH}</span>
                  </td>
                  <td className="td-num">{r.responseH}</td>
                  <td>
                    <div className="cycle">
                      <Gauge hue={r.gauge.hue} pos={r.gauge.pos} />
                      <span className="cycle-days">{r.techs} techs</span>
                    </div>
                  </td>
                  <td>
                    <RowMenu category={r.category} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <CategoryChart rows={baseRows} />
      )}
    </div>
  )
}

// Simple horizontal bar visualization used when the panel is in chart mode.
function CategoryChart({ rows }) {
  const max = Math.max(...rows.map((r) => r.volume))
  return (
    <div className="cat-chart">
      {rows.map((r) => (
        <div key={r.category} className="cat-chart-row">
          <span className="cat-chart-label">{r.category}</span>
          <div className="cat-chart-track">
            <div
              className="cat-chart-fill"
              style={{ width: `${(r.volume / max) * 100}%` }}
            />
          </div>
          <span className="cat-chart-num">{r.volume}</span>
        </div>
      ))}
    </div>
  )
}

function SlaPanel() {
  const [period, setPeriod] = useState('Yearly')
  const remote = useAsync(
    useCallback(() => fetchSla(period), [period]),
    [period],
  )
  const data = remote.data ?? SLA_BY_PERIOD[period]
  return (
    <div className="tile">
      <div className="panel-head">
        <span className="panel-title">SLA Compliance %</span>
        <div className="seg-group">
          {SLA_PERIODS.map((p) => (
            <button key={p} className={`seg-btn${period === p ? ' on' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
          ))}
        </div>
      </div>
      {remote.loading ? (
        <Skeleton rows={4} />
      ) : remote.error ? (
        <ErrorNote error={remote.error} onRetry={remote.retry} />
      ) : (
        <div className="chart-wrap">
          <SlaBars {...data} />
        </div>
      )}
    </div>
  )
}

function Promo() {
  return (
    <div className="promo">
      <span>{PROMO.text}</span>
      <button className="get-pro">{PROMO.cta}</button>
    </div>
  )
}

/* ---------- Domain pages (Facility / GA / IT / Safety / ...) ---------- */

function DomainPage({ name }) {
  const page = DOMAIN_PAGES[name]
  if (!page) return null
  return (
    <div className="domain-page">
      <p className="domain-tagline">{page.tagline}</p>
      <section className="band1 domain-band">
        <div className="tile">
          <div className="tile-title">{name} Overview</div>
          <div className="overview-kpis">
            {page.kpis.map((k) => (
              <div className="kpi" key={k.label}>
                <div className="kpi-value">
                  {k.value}
                  <span className={`kpi-delta ${k.dir}`}>{k.delta}</span>
                </div>
                <div className="kpi-label">{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="band2">
        <CategoryPanel rowsSource={page.rows} />
        <div>
          <SlaPanel />
          <Promo />
        </div>
      </section>
    </div>
  )
}

/* ---------- App ---------- */

export default function App() {
  const { page, navigate } = useRoute()
  const [refreshing, setRefreshing] = useState(false)
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('ssd-theme') === 'dark' } catch { return false }
  })

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
    try { localStorage.setItem('ssd-theme', dark ? 'dark' : 'light') } catch { /* private mode */ }
  }, [dark])

  const refresh = () => {
    if (refreshing) return
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1200)
  }

  const [todoOpen, setTodoOpen] = useState(false)

  const isDashboard = page === 'Dashboard'
  const title = isDashboard ? 'Site Service Dashboard' : page

  return (
    <div className="app-shell">
      <div className="app-card">
        <TopNav dark={dark} setDark={setDark} active={page} onNavigate={navigate} />
        <TitleRow title={title} onNavigate={navigate} onRefresh={refresh} refreshing={refreshing} />
        <div className="dash-grid">
          <SideRail onNavigate={navigate} onNewWO={() => setTodoOpen(true)} />
          <main className="main-col">
            {isDashboard ? (
              <>
                <section className="band1">
                  <div className="kpi-stack">
                    <OverviewTile />
                    {SPARK_TILES.map((t) => <SparkTile key={t.id} tile={t} />)}
                  </div>
                  <MapPanel />
                  <KeySitesTile />
                </section>
                <section className="band2">
                  <CategoryPanel />
                  <div>
                    <SlaPanel />
                    <Promo />
                  </div>
                </section>
              </>
            ) : (
              <DomainPage name={page} />
            )}
          </main>
        </div>
        {todoOpen && <TodoModal onClose={() => setTodoOpen(false)} />}
      </div>
    </div>
  )
}
