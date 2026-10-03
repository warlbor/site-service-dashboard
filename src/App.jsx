import { useEffect, useMemo, useState, useCallback } from 'react'
import { Icon, BrandGlyph } from './icons.jsx'
import { Sparkline, EuropeMap, SiteBars, InvoiceBars } from './charts.jsx'
import { useRoute } from './router.js'
import { useAsync } from './useAsync.js'
import { Skeleton, ErrorNote } from './async.jsx'
import { fetchTickets, fetchInvoice } from './api.js'
import {
  NAV_ITEMS,
  OVERVIEW_KPIS,
  SPARK_TILES,
  MAP_TIPS,
  KEY_SITES,
  TABLE_PERIODS,
  TICKETS_BY_PERIOD,
  INVOICE_PERIODS,
  INVOICE_BY_PERIOD,
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

function SideRail() {
  return (
    <aside className="side-rail">
      <button className="rail-btn" aria-label="Documents">{Icon.folder()}</button>
      <button className="rail-btn" aria-label="Apps">{Icon.grid()}</button>
      <button className="rail-btn" aria-label="Ticket routing">{Icon.share()}</button>
      <button className="rail-btn" aria-label="Helpdesk">{Icon.headset()}</button>
      <button className="rail-btn" aria-label="Settings">{Icon.gear()}</button>
      <div className="rail-spacer" />
      <button className="rail-btn exit" aria-label="Log out">{Icon.logout()}</button>
    </aside>
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
  const actions = ['View suppliers', 'Open tickets', 'Export CSV']
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
    ['spend', 'Spend'],
    ['transactions', 'Transactions'],
    ['suppliers', 'Suppliers'],
    ['days', 'Proc. Cycle (avg.)'],
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
                  <td className="td-num">{r.spend}</td>
                  <td className="td-num">{r.transactions}</td>
                  <td className="td-num">
                    {r.suppliers} <span className="td-pct">{r.pct}</span>
                  </td>
                  <td>
                    <div className="cycle">
                      <Gauge hue={r.gauge.hue} pos={r.gauge.pos} />
                      <span className="cycle-days">{r.days}</span>
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
  const max = Math.max(...rows.map((r) => r.transactions))
  return (
    <div className="cat-chart">
      {rows.map((r) => (
        <div key={r.category} className="cat-chart-row">
          <span className="cat-chart-label">{r.category}</span>
          <div className="cat-chart-track">
            <div
              className="cat-chart-fill"
              style={{ width: `${(r.transactions / max) * 100}%` }}
            />
          </div>
          <span className="cat-chart-num">{r.transactions}</span>
        </div>
      ))}
    </div>
  )
}

function InvoicePanel() {
  const [period, setPeriod] = useState('Yearly')
  const remote = useAsync(
    useCallback(() => fetchInvoice(period), [period]),
    [period],
  )
  const data = remote.data ?? INVOICE_BY_PERIOD[period]
  return (
    <div className="tile">
      <div className="panel-head">
        <span className="panel-title">Total Invoice, Discount %</span>
        <div className="seg-group">
          {INVOICE_PERIODS.map((p) => (
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
          <InvoiceBars {...data} />
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
          <InvoicePanel />
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

  const isDashboard = page === 'Dashboard'
  const title = isDashboard ? 'Site Service Dashboard' : page

  return (
    <div className="app-shell">
      <div className="app-card">
        <TopNav dark={dark} setDark={setDark} active={page} onNavigate={navigate} />
        <TitleRow title={title} onNavigate={navigate} onRefresh={refresh} refreshing={refreshing} />
        <div className="dash-grid">
          <SideRail />
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
                    <InvoicePanel />
                    <Promo />
                  </div>
                </section>
              </>
            ) : (
              <DomainPage name={page} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
