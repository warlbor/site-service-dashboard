# Site Service Dashboard — Progress Tracker

> Step-by-step build log so we never lose track. Update the checkboxes as work proceeds.
> App: **Quantix — Site Service Dashboard** (Facility · GA · IT · Safety)
> Stack: React 18 + Vite 5, zero UI libraries (hand-rolled SVG charts, inline icons)

---

## ✅ Completed

### 1. Prompt & Design Spec
- [x] Full detail prompt derived from the Quantix reference image
- [x] Re-mapped all labels to Site Services taxonomy (Facility, GA, IT, Safety)
- [x] Preserved exact reference values (13,7K / 98,6K / 312% / 3,209 / 2,956 / 1,248 / 23-19-13-45)

### 2. Project Setup
- [x] Project created at `~/Projects/site-service-dashboard`, git initialized
- [x] Agent workspace moved to project root
- [x] Node.js v22.14.0 installed at `~/.local/node` (PATH in `~/.zshrc`)
- [x] Vite + React scaffolded (`package.json`, `vite.config.js`, `index.html`)

### 3. Implementation
- [x] `src/data.js` — single source of truth for every label/number (Facility/GA/IT/Safety)
- [x] `src/icons.jsx` — 18 inline SVG icons + Quantix brand glyph
- [x] `src/charts.jsx` — Sparkline, EuropeMap (heat glows + pins), SiteBars, InvoiceBars
- [x] Top nav with active pill (coral), theme toggle, bell, avatar
- [x] Left icon rail (Documents, Apps, Ticket Routing, Helpdesk, Settings, Logout)
- [x] Band 1: Overview KPIs · WO/TR sparkline tiles · EU map with tooltips · Key Sites bars
- [x] Band 2: Tickets by Category table (sortable) + Total Invoice/Discount % bar chart
- [x] Promo banner ("Get Pro")
- [x] Light/dark mode toggle (body class + CSS variables)
- [x] Production build passes (`npm run build` — 0 errors)
- [x] Dev server verified live at `http://localhost:5173` (HTTP 200)
- [x] Visual verification via browser screenshot — matches reference layout
- [x] Initial git commit: `feat: Quantix Site Service Dashboard (Facility/GA/IT/Safety)`

---

## 🔄 In Progress

### 4. Responsive Audit (any device) — DONE
- [x] Static audit script: `node scripts/responsive-audit.mjs` — 8/8 checks pass
- [x] Tested 390×844 (iPhone) — no horizontal page overflow, table scrolls internally
- [x] Tested 768×1024 (iPad portrait) — no overflow, 2-col band layout works
- [x] Desktop 1280/1440 unchanged (design target intact)
- [x] Fixes added in `src/responsive.css`:
  - `.table-scroll` wrapper — table scrolls horizontally on phones, page never overflows
  - `.overview-kpis` wraps to 2 rows instead of squishing
  - Side rail becomes a horizontal scrollable strip on ≤720px (no longer hidden)
  - Title row wraps; H1 drops to 22px on phones
  - Promo banner stacks vertically on mobile
  - Segmented controls wrap gracefully
- [x] Re-verified after fixes + built (0 errors)

**Breakpoints:** `1100px` (2-col bands, map full-width) · `720px` (single column, horizontal rail) · `420px` (compact type)

---

## ⏳ Backlog

### 5. Interactions & Polish — ALL DONE
- [x] Period toggles swap real datasets (Daily/Weekly/Monthly/Yearly) — tickets table + invoice chart
- [x] Chart/table segmented icons swap views (horizontal bar chart ↔ table)
- [x] Domain pages for Facility / GA / IT / Safety / Assets & Inventory / Reports & Analytics
- [x] Mobile hamburger menu (≤720px) — opens overlay, navigates + closes, aria-expanded
- [x] Search overlay — live filtering, Esc/backdrop/✕ to close, jumps to page (verified: "repo" → Reports & Analytics)
- [x] Refresh button — spinner + disabled state for 1.2s
- [x] Row "⋯" dropdowns — View suppliers / Open tickets / Export CSV
- [x] Theme persisted to localStorage (`ssd-theme`) — verified saving 'dark'
- [x] README.md for the repo
- [x] Build passes, responsive audit 8/8, all verified live in browser
- [ ] Optional future: toast notifications, URL routing (history API), mock API layer

### 7. Release — DONE
- [x] GitHub repo created: https://github.com/warlbor/site-service-dashboard (public, `main` branch)
- [x] GitHub CLI installed at `~/.local/gh-cli` (v2.67.0), authenticated as **warlbor**
- [x] Deploy pipeline: `npm run deploy` — builds with Pages base path, publishes `dist/` to `gh-pages`
- [x] GitHub Pages enabled (source: `gh-pages` branch, root)
- [x] **LIVE: https://warlbor.github.io/site-service-dashboard/** (verified HTTP 200)
- [ ] Optional: custom domain, README with screenshots, badge

---

## Deploy / Update the Live Site

```bash
cd ~/Projects/site-service-dashboard
npm run deploy     # rebuild + push dist/ to gh-pages (live in ~1 min)
```

## How to Run (local)

```bash
cd ~/Projects/site-service-dashboard
npm run dev      # → http://localhost:5173
npm run build    # production build to dist/
```

## File Map

| File | Purpose |
|---|---|
| `src/data.js` | All copy/figures — edit numbers here |
| `src/App.jsx` | All layout components |
| `src/charts.jsx` | Sparkline, map, bars (pure SVG) |
| `src/icons.jsx` | Icon set + brand glyph |
| `src/index.css` | Theme tokens (light card, dark tiles, coral accent) |
| `src/dashboard.css` | Layout grid, tiles, table, chart |
| `src/promo.css` | Promo banner, dark mode, responsive breakpoints |
