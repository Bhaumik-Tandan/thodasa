// Branded promo cards for the duty breakdown — rendered in ThodaSa's own
// design language (Playfair display, tracked caps, near-black ground) rather
// than a bare UI screenshot, so the image is unmistakably from thodasa.com.
import { chromium } from 'playwright'
import fs from 'node:fs'

const ROWS = [
  ['Product value', 'CIF, landed', '20,71,563', false],
  ['Basic customs duty', '@ 70%', '14,50,094', true],
  ['Social welfare surcharge', '@ 10% of duty', '1,45,009', true],
  ['Compensation cess', '@ 22%', '8,06,667', true],
  ['IGST', '@ 28%', '10,26,667', true],
]

const card = (w, h, headScale) => `
<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${w}px;height:${h}px;background:#0b0b0d;color:#fff;font-family:Inter,system-ui,sans-serif;overflow:hidden;position:relative}
  .pad{display:flex;flex-direction:column;height:100%}
  .grow{flex:1}
  .wash{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none}
  .w1{width:620px;height:620px;right:-180px;top:-200px;background:rgba(255,255,255,.10)}
  .w2{width:560px;height:560px;left:-200px;bottom:-220px;background:rgba(255,255,255,.06)}
  .pad{position:relative;padding:${Math.round(64*headScale)}px ${Math.round(66*headScale)}px}
  .caps{text-transform:uppercase;letter-spacing:.18em;font-weight:600}
  .brand{font-size:${Math.round(13*headScale)}px;color:rgba(255,255,255,.42)}
  h1{font-family:'Playfair Display',Georgia,serif;font-weight:500;font-size:${Math.round(58*headScale)}px;line-height:1.08;margin-top:${Math.round(26*headScale)}px;letter-spacing:-.015em}
  h1 em{font-style:italic;color:rgba(255,255,255,.62)}
  .sub{margin-top:${Math.round(18*headScale)}px;font-size:${Math.round(20*headScale)}px;color:rgba(255,255,255,.55);line-height:1.5}
  table{width:100%;border-collapse:collapse;margin-top:${Math.round(40*headScale)}px}
  td{padding:${Math.round(15*headScale)}px 0;border-bottom:1px solid rgba(255,255,255,.10);font-size:${Math.round(21*headScale)}px;vertical-align:baseline}
  td.hint{color:rgba(255,255,255,.34);font-size:${Math.round(15*headScale)}px;padding-left:10px}
  td.amt{text-align:right;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
  tr.tax td{color:#fca5a5}
  tr.tax td.amt{color:#f87171}
  tr.pay td{border-bottom:none;padding-top:${Math.round(26*headScale)}px;font-size:${Math.round(28*headScale)}px;font-weight:700}
  .pill{display:inline-block;margin-top:${Math.round(26*headScale)}px;background:#fff;color:#000;padding:${Math.round(13*headScale)}px ${Math.round(22*headScale)}px;font-size:${Math.round(15*headScale)}px}
  .foot{position:absolute;left:${Math.round(66*headScale)}px;bottom:${Math.round(48*headScale)}px;font-size:${Math.round(16*headScale)}px;color:rgba(255,255,255,.40)}
</style></head><body>
<div class="wash w1"></div><div class="wash w2"></div>
<div class="pad">
  <div class="caps brand">ThodaSa &nbsp;·&nbsp; Where your money goes</div>
  <h1>A ₹55,00,000 car<br>is a <em>₹20,00,000 car</em>.</h1>
  <div class="sub">The rest is duty, surcharge, cess and IGST.</div>
  <table>
    ${ROWS.map(([l, h, a, tax]) => `<tr class="${tax ? 'tax' : ''}"><td>${l}<span class="hint" style="color:rgba(255,255,255,.34);font-size:${Math.round(15*headScale)}px"> ${h}</span></td><td class="amt">₹${a}</td></tr>`).join('')}
    <tr class="pay"><td>You pay</td><td class="amt">₹55,00,000</td></tr>
  </table>
  <div class="caps pill">62% of the price is duty &amp; tax</div>
  <div class="grow"></div>
  <div style="margin-bottom:${Math.round(96*headScale)}px">
    <div style="display:flex;height:${Math.round(54*headScale)}px;overflow:hidden">
      <div style="width:38%;background:#fff;display:flex;align-items:center;justify-content:center">
        <span class="caps" style="color:#000;font-size:${Math.round(14*headScale)}px">38% car</span>
      </div>
      <div style="width:62%;background:#dc2626;display:flex;align-items:center;justify-content:center">
        <span class="caps" style="color:#fff;font-size:${Math.round(14*headScale)}px">62% government</span>
      </div>
    </div>
    <div style="margin-top:${Math.round(18*headScale)}px;font-size:${Math.round(15*headScale)}px;color:rgba(255,255,255,.38);line-height:1.5">
      Indicative slabs. MRP in India includes all taxes, so these are extracted<br>from the listed price — not added to it.
    </div>
  </div>
</div>
<div class="caps foot">thodasa.com</div>
</body></html>`

const browser = await chromium.launch()
fs.mkdirSync('reels', { recursive: true })
for (const [name, w, h, scale] of [['promo-duty-square', 1080, 1350, 1], ['promo-duty-wide', 1600, 900, 0.82]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 })
  await page.setContent(card(w, h, scale), { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `reels/${name}.png` })
  console.log('wrote reels/' + name + '.png')
  await page.close()
}
await browser.close()
