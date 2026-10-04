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
- [x] `src/icons.jsx` — inline SVG icons + Quantix brand glyph
- [x] `src/charts.jsx` — Sparkline, IndonesiaMap (heat glows + pins), SiteBars, SlaBars
- [x] Top nav with active pill (coral), theme toggle, bell, avatar
- [x] Left icon rail — now Site Services quick actions (New WO, Assets, Reports, Settings, Logout)
- [x] Band 1: Overview KPIs · WO/TR sparkline tiles · Indonesia map with tooltips · Key Sites bars
- [x] Band 2: Tickets by Category table (sortable) + SLA Compliance % bar chart
- [x] Work-order summary banner (replaced the irrelevant "Get Pro" upsell): live "N open work orders · M high priority" + "Open to-do list" button, refreshes when the to-do modal closes
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
- [x] Row "⋯" dropdowns — View SLA detail / Open tickets / Export CSV
- [x] Side rail reworked to Site Services quick actions — New WO (wrench), Assets (box → `#/assets-inventory`), Reports (chart → `#/reports-analytics`), Settings; generic Documents/Apps/Ticket routing/Helpdesk removed
- [x] **Work-order to-do list** behind the 🔧 New WO rail button:
  - Modal checklist: seeded demo WOs, add form (title + site/domain/category/priority with cascading selects), done/reopen toggle, delete, "Completed" section
  - Mock CRUD in `src/api.js` persisted to `localStorage` (`ssd-work-orders`) — swap for real `fetch` later, components unchanged
  - Collision-proof ID generation (`nextId` = max existing suffix + 1)
  - `scripts/verify-todo-api.mjs` smoke test — seeds, unique IDs, toggle, delete, persistence: ALL PASSING
  - Verified in browser: open modal → add "Replace faulty keyboard — HR Office" (IT/IT Hardware) → appears as WO row → toggle done moves it to Completed
- [x] Theme persisted to localStorage (`ssd-theme`) — verified saving 'dark'
- [x] README.md for the repo
- [x] Build passes, responsive audit 8/8, all verified live in browser

### 6. Data & Routing — DONE
- [x] Mock API layer (`src/api.js`) — `fetchTickets` / `fetchInvoice` / `fetchDomainPage` with simulated latency; components consume via `useAsync` hook + shimmer `Skeleton` + `ErrorNote` retry UI. To go real: swap function bodies for `fetch('/api/...')` — components unchanged.
- [x] URL routing (`src/router.js`) — hash-based (`#/dashboard`, `#/safety`, `#/ga`, …): deep links, back/forward buttons, shareable URLs. Verified: nav click updates hash, `history.back()` returns to previous page, direct `#/safety` load renders Safety.
- [x] Verified live: Weekly toggle fetched new dataset through API
- [x] **Data model v2 — fully operational, zero financial metrics:**
  - Tickets table: Spend/Transactions/Suppliers/Proc. Cycle → **Volume / SLA % / First Response / Resolution / Techs** (gauge now = SLA health)
  - Invoice chart → **SLA Compliance % trend** (y-axis 80–100%, period-aware, annotation = best month 98.6%)
  - Europe map → **Indonesia archipelago** (Sumatra/Kalimantan/Sulawesi/Java/Papua), heat glow over Jakarta cluster
  - Key Sites: Jakarta HQ · Cikarang Plant · Surabaya Office · Others
  - Domain pages given real operational KPIs (Facility: PM Compliance, GA: Vendor SLA, IT: Avg. Resolution, Safety: Lost-Time Incidents = 0, Assets: SKUs/Low stock, Reports: WOs YTD)
  - Row menu: "View suppliers" → "View SLA detail"
- [ ] Optional future: toast notifications

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
| `src/api.js` | Mock API — swap bodies for real `fetch` calls |
| `src/router.js` | Hash router (`#/safety`, `#/ga`, …) |
| `src/useAsync.js` + `src/async.jsx` | Async state hook + Skeleton/Error UI |
| `src/App.jsx` | All layout components |
| `src/charts.jsx` | Sparkline, map, bars (pure SVG) |
| `src/icons.jsx` | Icon set + brand glyph |
| `src/index.css` | Theme tokens (light card, dark tiles, coral accent) |
| `src/dashboard.css` | Layout grid, tiles, table, chart |
| `src/promo.css` | Promo banner, dark mode, responsive breakpoints |
