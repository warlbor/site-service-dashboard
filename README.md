# Quantix — Site Service Dashboard

A production-style **Site Services** procurement dashboard covering **Facility, General Affairs (GA), IT, and Safety** — built with React 18 + Vite, zero UI libraries (all charts and icons are hand-rolled inline SVG).

**Live:** https://warlbor.github.io/site-service-dashboard/

![Dashboard](https://warlbor.github.io/site-service-dashboard/)

## Features

- 📊 **Dashboard** — Overview KPIs, WO/TR sparkline tiles, Europe request map with heat clusters, Key Sites breakdown, category spend table, invoice/discount chart
- 🗂 **7 real pages** — Dashboard, Facility, GA, IT, Safety, Assets & Inventory, Reports & Analytics — each with its own KPIs and category data
- 🔀 **Functional filters** — Daily / Weekly / Monthly / Yearly swap real datasets; chart ↔ table view toggle
- 🌓 **Dark mode** — persisted to `localStorage`
- 📱 **Responsive** — hamburger nav, horizontal-scroll table, adaptive layout (tested at 390 / 768 / 1440)
- 🔍 **Search overlay** — quickly jump to any page
- ♿ **Accessible** — aria-labels, focus rings, keyboard-friendly menus

## Quick Start

```bash
npm install
npm run dev      # local dev → http://localhost:5173
```

## Deploy

Deploys `dist/` to the `gh-pages` branch (site updates in ~1 min):

```bash
npm run deploy
```

## Editing Data

All labels, figures, and datasets live in **one file**: [`src/data.js`](src/data.js).
Edit values there — the UI reads everything from it.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build → `dist/` |
| `npm run deploy` | Build + publish to GitHub Pages |
| `node scripts/responsive-audit.mjs` | Static overflow-risk check |

## Structure

```
src/
├── data.js          # single source of truth for all copy/figures
├── App.jsx          # layout + page components
├── charts.jsx       # SVG sparklines, map, bar charts
├── icons.jsx        # inline SVG icon set
├── index.css        # theme tokens
├── dashboard.css    # layout, tiles, table
├── promo.css        # banner, menus, overlays, dark mode
└── responsive.css   # breakpoints
```

## Progress

See [`PROGRESS.md`](PROGRESS.md) for the full step-by-step build log.
