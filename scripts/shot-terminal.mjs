// Renders terminal output as a shareable PNG (ANSI colours mapped to CSS).
import { chromium } from 'playwright'
import { execSync } from 'node:child_process'

const raw = execSync('node /tmp/blocktest.mjs', { encoding: 'utf8' })
const COL = { '31': '#f87171', '32': '#4ade80', '90': '#6b7280' }
const html = raw
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/\x1b\[(\d+)m/g, (_, c) => (c === '0' ? '</span>' : `<span style="color:${COL[c] || '#e5e7eb'}">`))

const page = await (await chromium.launch()).newPage({
  viewport: { width: 900, height: 470 }, deviceScaleFactor: 3,
})
await page.setContent(`<!doctype html><meta charset="utf-8">
<style>
  body{margin:0;background:#0b0b0d;font-family:ui-monospace,'SF Mono',Menlo,monospace}
  .win{margin:22px;border-radius:10px;overflow:hidden;box-shadow:0 24px 60px #0009;background:#141417}
  .bar{display:flex;align-items:center;gap:7px;padding:11px 14px;background:#1e1e22}
  .dot{width:11px;height:11px;border-radius:50%}
  .t{margin-left:10px;color:#8b8b93;font-size:12px}
  pre{margin:0;padding:18px 20px 22px;color:#e5e7eb;font-size:14.5px;line-height:1.75;white-space:pre-wrap}
</style>
<div class="win">
  <div class="bar">
    <span class="dot" style="background:#ff5f57"></span>
    <span class="dot" style="background:#febc2e"></span>
    <span class="dot" style="background:#28c840"></span>
    <span class="t">node scripts/fetch-daily.mjs — thodasa</span>
  </div>
  <pre>${html}</pre>
</div>`, { waitUntil: 'load' })
await page.waitForTimeout(500)
await page.screenshot({ path: 'reels/promo-blocklist.png' })
console.log('wrote reels/promo-blocklist.png')
process.exit(0)
