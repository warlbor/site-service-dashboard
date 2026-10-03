// Responsive audit — static checks for known horizontal-overflow risks.
// Run: node scripts/responsive-audit.mjs
import { readFileSync } from 'node:fs'

const files = ['src/index.css', 'src/dashboard.css', 'src/promo.css', 'src/responsive.css']
const css = files
  .map((f) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8'))
  .join('\n')

// presence = bad
const badPatterns = [
  { name: 'no fixed wide grid columns (>=400px)', re: /grid-template-columns:[^;]*\b[4-9]\d\dpx/ },
  { name: 'no hard fixed heights >=300px on layout (max-height allowed)', re: /[^-]height:\s*[3-9]\d{2}px/ },
  { name: 'no fixed widths >=500px on components (min/max-width allowed)', re: /[^-]width:\s*[5-9]\d{2}px/ },
]

// presence = good
const goodPatterns = [
  { name: 'map panel clips overflow', re: /\.map-panel\s*{[^}]*overflow:\s*hidden/ },
  { name: 'table wrapper allows mobile scroll', re: /\.table-scroll[^{]*{[^}]*overflow-x:\s*auto/ },
  { name: 'KPI row wraps instead of squishing', re: /\.overview-kpis\s*{[^}]*flex-wrap:\s*wrap/ },
  { name: 'side rail scrolls horizontally on phones', re: /@media \(max-width:\s*720px\)[\s\S]*\.side-rail[\s\S]*overflow-x:\s*auto/ },
  { name: 'viewport meta-friendly root sizing (no body min-width)', re: /^(?!.*min-width:\s*\d{3,}px\s*;?\s*})[\s\S]*$/ },
]

let fail = 0
for (const c of badPatterns) {
  const bad = c.re.test(css)
  if (bad) fail++
  console.log(`${bad ? 'FAIL' : 'PASS'}  ${c.name}`)
}
for (const c of goodPatterns) {
  const ok = c.re.test(css)
  if (!ok) fail++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.name}`)
}
console.log(fail ? `\n${fail} issue(s) found` : '\nAll responsive checks passed ✓')
process.exit(fail ? 1 : 0)
