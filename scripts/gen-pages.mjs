// Generates a static share page per product template into dist/p/<slug>/.
// Each page carries its own OG tags (so WhatsApp/X unfurl THAT product),
// Product JSON-LD for Google, crawlable text, and a JS redirect into the app
// (#p=<templateId> opens the product's variant sheet). Also rebuilds the
// sitemap with every product URL. Runs automatically after `vite build`.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TEMPLATE_HEROES, inr } from '../src/data/products.js'
import { landedBreakdown as duty } from '../src/lib/duty.js'

const SITE = 'https://thodasa.com'
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

const page = (p, related) => {
  const url = `${SITE}/p/${p.slug}/`
  const og = p.img.replace('w=800&h=1400', 'w=1200&h=630')
  const title = `${p.baseName} — ₹${inr(p.price)}${p.variantCount > 1 ? ' onwards' : ''} | ThodaSa`
  const desc = `${p.desc} ${p.rating}★ (${p.reviews} ratings)${p.deal ? ` · ₹${inr(p.price)}, was ₹${inr(p.mrp)}` : ''}. See the full GST and customs-duty breakdown on ThodaSa — reels-style shopping for India.`
  const d = duty(p)
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="product">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="ThodaSa">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(p.desc)}">
<meta name="twitter:image" content="${og}">
<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.baseName,
    description: p.desc,
    image: og,
    category: p.category,
    brand: { '@type': 'Brand', name: p.brand },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews },
    offers: { '@type': 'Offer', priceCurrency: 'INR', price: p.price, availability: 'https://schema.org/InStock', url },
  })}</script>
<style>
  :root{color-scheme:dark}
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0d0d0f;color:#fff;font-family:Inter,system-ui,-apple-system,sans-serif;line-height:1.6}
  .wrap{max-width:44rem;margin:0 auto;padding:3rem 1.5rem 5rem}
  .caps{font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;color:rgba(255,255,255,.45)}
  h1{font-family:Georgia,serif;font-weight:500;font-size:clamp(1.9rem,5vw,2.6rem);line-height:1.15;margin:.8rem 0 0}
  .lede{color:rgba(255,255,255,.72);margin-top:.7rem}
  .price{font-family:Georgia,serif;font-size:2rem;margin-top:1.4rem}
  .mrp{font-size:1rem;color:rgba(255,255,255,.4);text-decoration:line-through;margin-left:.5rem}
  img.hero{width:100%;max-width:22rem;max-height:20rem;object-fit:cover;object-position:center;border-radius:.5rem;margin-top:1.6rem;display:block}
  table{width:100%;border-collapse:collapse;margin-top:.8rem;font-size:.9rem}
  td{padding:.55rem 0;border-bottom:1px solid rgba(255,255,255,.1)}
  td:last-child{text-align:right;font-variant-numeric:tabular-nums}
  .cta{display:inline-block;margin-top:2rem;background:#fff;color:#000;padding:.95rem 1.6rem;text-decoration:none;font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:700}
  h2{font-size:.95rem;margin-top:2.6rem;font-weight:700}
  ul{list-style:none;margin-top:.6rem}
  li{padding:.35rem 0}
  a{color:rgba(255,255,255,.75)}
  footer{margin-top:3rem;font-size:.8rem;color:rgba(255,255,255,.4)}
</style>
</head>
<body>
<div class="wrap">
  <p class="caps"><a href="/" style="text-decoration:none;color:inherit">ThodaSa</a> · ${esc(p.category)}${p.brand && p.brand !== 'Generic' ? ' · ' + esc(p.brand) : ''}</p>
  <h1>${esc(p.baseName)}</h1>
  <p class="lede">${esc(p.desc)}</p>
  <img class="hero" src="${esc(p.img)}" alt="${esc(p.baseName)}" loading="lazy">
  <p class="price">₹${inr(p.price)}${p.deal ? `<span class="mrp">₹${inr(p.mrp)}</span>` : ''}</p>
  <p class="caps" style="margin-top:.5rem">${p.rating}★ · ${inr(p.reviews)} ratings${p.variantCount > 1 ? ` · ${p.variantCount} options` : ''}</p>

  <h2>Where this price goes${d.imported ? ' — imported' : ''}</h2>
  <table>
    <tr><td>Product value${d.imported ? ' (CIF, landed)' : ''}</td><td>₹${inr(d.assessable)}</td></tr>
    ${d.bcd ? `<tr><td>Basic customs duty @ ${d.bcdRate}%</td><td>₹${inr(d.bcd)}</td></tr>` : ''}
    ${d.sws ? `<tr><td>Social welfare surcharge @ 10% of duty</td><td>₹${inr(d.sws)}</td></tr>` : ''}
    ${d.cess ? `<tr><td>Compensation cess @ ${d.cessRate}%</td><td>₹${inr(d.cess)}</td></tr>` : ''}
    <tr><td>${d.imported ? 'IGST' : 'GST'} @ ${d.igstRate}%</td><td>₹${inr(d.igst)}</td></tr>
    <tr><td><strong>You pay</strong></td><td><strong>₹${inr(p.price)}</strong></td></tr>
  </table>
  <p class="caps" style="margin-top:.7rem">${d.govtShare}% of this price is duty &amp; tax</p>

  <a class="cta" href="/?p=${p.templateId}">Open in ThodaSa</a>

  <h2>More in ${esc(p.category)}</h2>
  <ul>
    ${related.map((r) => `<li><a href="/p/${r.slug}/">${esc(r.baseName)} — ₹${inr(r.price)}</a></li>`).join('\n    ')}
  </ul>

  <footer>
    <p>ThodaSa is a free concept demo — reels-style shopping for India. Nothing is
    actually sold and no payment is ever taken. Indian MRP is inclusive of all
    taxes, so the figures above are extracted from the listed price, not added to
    it, and are indicative.</p>
    <p style="margin-top:.8rem"><a href="/">Browse 5,900+ finds on ThodaSa →</a></p>
  </footer>
</div>
</body>
</html>`
}

const byCat = {}
for (const p of TEMPLATE_HEROES) (byCat[p.category] ||= []).push(p)

let count = 0
for (const p of TEMPLATE_HEROES) {
  // interlink within the category so crawlers can walk the catalog instead of
  // finding 757 orphan pages reachable only from the sitemap
  const pool = byCat[p.category].filter((x) => x.templateId !== p.templateId)
  const start = (p.templateId * 5) % Math.max(1, pool.length)
  const related = [...pool.slice(start), ...pool.slice(0, start)].slice(0, 6)
  const dir = path.join(dist, 'p', p.slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), page(p, related))
  count++
}

const urls = [`${SITE}/`, ...TEMPLATE_HEROES.map((p) => `${SITE}/p/${p.slug}/`)]
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u}</loc><changefreq>daily</changefreq></url>`).join('\n') +
    `\n</urlset>\n`,
)

console.log(`generated ${count} product pages + sitemap with ${urls.length} urls`)
