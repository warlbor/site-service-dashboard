import { useMemo, useState } from 'react'
import { Icon, BrandGlyph } from './icons.jsx'
import { Sparkline, EuropeMap, SiteBars, InvoiceBars } from './charts.jsx'
import {
  NAV_ITEMS,
  OVERVIEW_KPIS,
  SPARK_TILES,
  MAP_TIPS,
  KEY_SITES,
  TABLE_PERIODS,
  CATEGORY_ROWS,
  INVOICE_PERIODS,
  INVOICE_BARS,
  PROMO,
} from './data.js'
import './dashboard.css'
import './promo.css'
import './responsive.css'

/* ---------- Top navigation ---------- */

function TopNav({ dark, setDark }) {
  const [active, setActive] = useState('Dashboard')
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
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="nav-right">
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

function TitleRow() {
  return (
    <div className="title-row">
      <button className="search-btn" aria-label="Search">{Icon.search(18)}</button>
      <h1>Site Service Dashboard</h1>
      <div className="title-actions">
        <button className="refresh-pill">{Icon.refresh(13)} Refresh</button>
        <button className="icon-btn" aria-label="Download report">{Icon.download()}</button>
        <button className="icon-btn" aria-label="Share dashboard">{Icon.shareArrow()}</button>
      </div>
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

function Gauge({ hue, pos }) {
  return (
    <div className="gauge">
      <i style={{ left: `${pos * 100}%`, background: HUE_COLORS[hue] }} />
    </div>
  )
}

function CategoryPanel() {
  const [period, setPeriod] = useState('Monthly')
  const [mode, setMode] = useState('chart')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState(1)

  const rows = useMemo(() => {
    if (!sortKey) return CATEGORY_ROWS
    return [...CATEGORY_ROWS].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'number') return (av - bv) * sortDir
      return String(av).localeCompare(String(bv)) * sortDir
    })
  }, [sortKey, sortDir])

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
                <button className="row-menu" aria-label={`More actions for ${r.category}`}>{Icon.dots()}</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

function InvoicePanel() {
  const [period, setPeriod] = useState('Yearly')
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
      <div className="chart-wrap">
        <InvoiceBars {...INVOICE_BARS} />
      </div>
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

/* ---------- App ---------- */

export default function App() {
  const [dark, setDark] = useState(false)
  if (typeof document !== 'undefined') document.body.classList.toggle('dark', dark)

  return (
    <div className="app-shell">
      <div className="app-card">
        <TopNav dark={dark} setDark={setDark} />
        <TitleRow />
        <div className="dash-grid">
          <SideRail />
          <main className="main-col">
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
          </main>
        </div>
      </div>
    </div>
  )
}
