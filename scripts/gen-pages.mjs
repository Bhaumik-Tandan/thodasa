// Generates a static share page per product template into dist/p/<slug>/.
// Each page carries its own OG tags (so WhatsApp/X unfurl THAT product),
// Product JSON-LD for Google, crawlable text, and a JS redirect into the app
// (#p=<templateId> opens the product's variant sheet). Also rebuilds the
// sitemap with every product URL. Runs automatically after `vite build`.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TEMPLATE_HEROES, inr, WM_CREDITS, CATEGORIES, resized } from '../src/data/products.js'
import TYPE_CREDITS from '../src/data/typeCredits.js'
import { AIRCRAFT_CREDITS } from '../src/data/aircraft.js'
import { landedBreakdown as duty } from '../src/lib/duty.js'
import { landedFrom, GOODS } from '../src/lib/duty.js'
import { dutyPage, BROWSER_MATH } from './lib/duty-page.mjs'

const SITE = 'https://thodasa.com'
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

// Catalog category -> the closest goods type in the calculator, so the link
// from a product page arrives pre-filled rather than on a blank form.
const GOODS_BY_CAT = {
  gadgets: 'phone', watches: 'watch', jewels: 'jewellery', luxe: 'bag', beauty: 'perfume',
  fashion: 'clothing', shoes: 'footwear', cars: 'car', bikes: 'bike', toys: 'toy',
  books: 'book', stationery: 'stationery', home: 'homeware', kitchen: 'homeware',
  snacks: 'food', icecream: 'food', grocery: 'staples', accessories: 'bag',
  art: 'stationery', kpop: 'homeware', quirky: 'homeware',
}
const dutyGoods = (cat) => GOODS_BY_CAT[cat] ?? 'phone'

const page = (p, related) => {
  const url = `${SITE}/p/${p.slug}/`
  const og = resized(p.img, 1200, 630)
  const d = duty(p)
  // Search titles lead with the query people actually type, third revision,
  // each driven by Search Console rather than taste:
  //
  //   v1  "Mahindra Thar — ₹11,00,000 onwards"  — competed with CarDekho for a
  //       query we could never win. 3 days: 2 impressions, both the brand name.
  //   v2  "Import duty on <thing> in India"     — my guess at the query. It
  //       unlocked impressions (32 → 248/week, position ~19) but earned 1 click
  //       at 0.4% CTR, because the real query the pages surface for is
  //       "<thing> price in india" — jets above all (Honda Jet Elite 2: 21
  //       impressions, Gulfstream G650ER: 12), an empty niche nobody covers.
  //   v3  "<thing> price in India — N% of it is tax/GST" — the searcher's own
  //       words first, the number nobody else has as the reason to click.
  //
  // The h2 keeps the duty/GST phrasing so both query families stay on the page.
  const taxQuery = d.imported
    ? `Import duty on ${p.baseName} in India`
    : `GST on ${p.baseName}`
  const title = `${p.baseName} price in India — ${d.govtShare}% of it is ${d.imported ? 'duty & tax' : 'GST'} | ThodaSa`
  // Social keeps the product-first headline. These pages exist so a WhatsApp or
  // X unfurl shows THAT product; "Import duty on Rolex Submariner in India" is
  // the right thing for a search result and the wrong thing for a share card.
  const socialTitle = `${p.baseName} — ₹${inr(p.price)}${p.variantCount > 1 ? ' onwards' : ''} | ThodaSa`
  const desc = d.imported
    ? `${p.baseName} lists at ₹${inr(p.price)} in India. ₹${inr(d.govtTotal)} of that is customs duty, surcharge and IGST — ${d.govtShare}% of what you pay. Full landed-cost breakdown with the rates applied.`
    : `${p.baseName} lists at ₹${inr(p.price)}. ₹${inr(d.govtTotal)} of that is GST at ${d.igstRate}% — ${d.govtShare}% of what you pay. MRP in India includes tax, so this is extracted from the price, not added to it.`
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
<meta property="og:title" content="${esc(socialTitle)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(socialTitle)}">
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

  <h2>${esc(taxQuery)}</h2>
  <table>
    <tr><td>Product value${d.imported ? ' (CIF, landed)' : ''}</td><td>₹${inr(d.assessable)}</td></tr>
    ${d.bcd ? `<tr><td>Basic customs duty @ ${d.bcdRate}%</td><td>₹${inr(d.bcd)}</td></tr>` : ''}
    ${d.sws ? `<tr><td>Social welfare surcharge @ 10% of duty</td><td>₹${inr(d.sws)}</td></tr>` : ''}
    ${d.cess ? `<tr><td>Compensation cess @ ${d.cessRate}%</td><td>₹${inr(d.cess)}</td></tr>` : ''}
    <tr><td>${d.imported ? 'IGST' : 'GST'} @ ${d.igstRate}%</td><td>₹${inr(d.igst)}</td></tr>
    <tr><td><strong>You pay</strong></td><td><strong>₹${inr(p.price)}</strong></td></tr>
  </table>
  <p class="caps" style="margin-top:.7rem">${d.govtShare}% of this price is duty &amp; tax &middot;
    <a href="/duty/?price=${p.price}&amp;goods=${dutyGoods(p.category)}&amp;imported=${d.imported ? 1 : 0}">work it out for anything &rarr;</a></p>

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
    <p style="margin-top:.8rem"><a href="/">Open ThodaSa →</a> &middot; <a href="/duty/">Duty &amp; GST calculator</a> &middot; <a href="/browse/">Browse all products</a> &middot; <a href="/credits/">Photo credits</a></p>
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

// Redirect stubs for slugs that moved when daily-cron templateIds were
// rebased to 5000 (products.js, DAILY_ID_BASE). GitHub Pages cannot serve real
// 301s, so each old URL gets a zero-delay meta refresh plus a canonical to the
// new URL — the combination Google treats as a redirect. slug-freeze.json is
// the pre-rebase URL inventory; anything in it that no longer exists but whose
// product still does gets a stub. Daily pages had live rankings when this
// shipped (kitkat win gold at position 8), which is the whole reason not to
// just let them 404.
{
  const frozen = JSON.parse(fs.readFileSync(path.join(root, 'src/data/slug-freeze.json'), 'utf8'))
  const bySlug = new Set(TEMPLATE_HEROES.map((p) => p.slug))
  const byKey = new Map(TEMPLATE_HEROES.map((p) => [`${p.brand}\u0000${p.baseName}`, p.slug]))
  let stubs = 0
  for (const f of frozen) {
    if (bySlug.has(f.slug)) continue
    const target = byKey.get(`${f.brand}\u0000${f.baseName}`)
    if (!target) continue // product itself is gone; a 404 is honest
    const dir = path.join(dist, 'p', f.slug)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'),
      `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
      `<meta http-equiv="refresh" content="0;url=${SITE}/p/${target}/">` +
      `<link rel="canonical" href="${SITE}/p/${target}/">` +
      `<title>Moved</title></head><body><p>Moved to <a href="${SITE}/p/${target}/">${target}</a></p></body></html>`)
    stubs++
  }
  console.log(`redirect stubs for moved slugs: ${stubs}`)
}

// Landed-cost calculator at /duty/.
//
// The page carries its own copy of the formula so it works as a single static
// file with no module loading. That copy is a drift risk, so it is eval'd here
// and checked against lib/duty.js across a spread of rates and prices. If the
// two ever disagree the build fails rather than shipping a site whose tax
// figures contradict each other page to page.
{
  // eslint-disable-next-line no-eval
  const inline = eval(`(function(){${BROWSER_MATH}; return landed})()`)
  const cases = []
  for (const mrp of [0, 1, 999, 25000, 144900, 12500000]) {
    for (const g of GOODS) {
      cases.push([mrp, g.bcd, g.gst, g.cess ?? 0])
      cases.push([mrp, 0, g.gst, 0])
    }
  }
  for (const [mrp, b, g, c] of cases) {
    const a = inline(mrp, b, g, c)
    const e = landedFrom({ mrp, bcdRate: b, gstRate: g, cessRate: c })
    for (const k of ['mrp', 'assessable', 'bcd', 'sws', 'igst', 'cess', 'govtTotal', 'govtShare']) {
      if (a[k] !== e[k]) {
        console.error(`duty formula drift at mrp=${mrp} b=${b} g=${g} c=${c}: ${k} ${a[k]} !== ${e[k]}`)
        process.exit(1)
      }
    }
  }
  const dutyDir = path.join(dist, 'duty')
  fs.mkdirSync(dutyDir, { recursive: true })
  fs.writeFileSync(path.join(dutyDir, 'index.html'), dutyPage({ site: SITE, goods: GOODS }))
  console.log(`duty calculator: formula verified across ${cases.length} cases`)
}

// Photo credits page. Most catalog images are Unsplash (licence needs no
// attribution) but the Wikimedia Commons ones are CC BY / CC BY-SA, which do
// require crediting the author. They were used without credit before this.
const creditsPage = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Photo credits | ThodaSa</title>
<meta name="description" content="Image attribution for ThodaSa - Wikimedia Commons product photography under CC BY and CC BY-SA, plus Unsplash and Open Food Facts.">
<link rel="canonical" href="${SITE}/credits/">
<style>
  :root{color-scheme:dark}
  body{margin:0;background:#0b0b0d;color:#fff;font:16px/1.6 Inter,system-ui,sans-serif}
  .wrap{max-width:44rem;margin:0 auto;padding:3rem 1.5rem}
  h1{font-size:1.9rem;margin:.2rem 0 1rem;font-weight:600}
  h2{font-size:1.05rem;margin:2rem 0 .6rem;font-weight:600}
  .caps{text-transform:uppercase;letter-spacing:.12em;font-size:.7rem;color:rgba(255,255,255,.45)}
  a{color:#f0abfc}
  table{width:100%;border-collapse:collapse;font-size:.88rem;margin-top:.4rem}
  th,td{text-align:left;padding:.5rem .4rem;border-bottom:1px solid rgba(255,255,255,.09);vertical-align:top}
  th{color:rgba(255,255,255,.5);font-weight:500;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em}
  p{color:rgba(255,255,255,.72)}
  footer{margin-top:3rem;font-size:.8rem;color:rgba(255,255,255,.4)}
</style>
</head>
<body>
<div class="wrap">
  <p class="caps"><a href="/" style="text-decoration:none;color:inherit">ThodaSa</a></p>
  <h1>Photo credits</h1>
  <p>ThodaSa is a concept demo. Product photography comes from open sources, and
  the licences below are the reason each one can be used here.</p>

  <h2>Wikimedia Commons</h2>
  <p>CC BY and CC BY-SA require attribution. Each photo links to its file page,
  where the full licence text and author details live.</p>
  <table>
    <tr><th>Used for</th><th>Author</th><th>Licence</th></tr>
    ${WM_CREDITS.map((c) => `<tr><td><a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(c.file.replace(/ /g, '_'))}">${esc(c.what)}</a></td><td>${esc(c.author)}</td><td>${esc(c.licence)}</td></tr>`).join('\n    ')}
  </table>

  <h2>Wikimedia Commons — aircraft</h2>
  <p>The aviation catalog uses photographs of the actual aircraft models, all
  from Wikimedia Commons. Each links to its file page.</p>
  <table>
    <tr><th>Used for</th><th>Author</th><th>Licence</th></tr>
    ${AIRCRAFT_CREDITS.map((c) => `<tr><td><a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(c.file.replace(/ /g, '_'))}">${esc(c.what)}</a></td><td>${esc(c.author)}</td><td>${esc(c.licence)}</td></tr>`).join('\n    ')}
  </table>

  <h2>Wikimedia Commons — type photography</h2>
  <p>Around half this catalog is invented brands, so a second photograph of the
  specific product does not exist. Those cards borrow <em>type</em> photos
  instead: more pictures of the same kind of thing. These are credited here on
  the same terms as everything else.</p>
  <table>
    <tr><th>Used for</th><th>Author</th><th>Licence</th></tr>
    ${TYPE_CREDITS.map((c) => `<tr><td><a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(c.file.replace(/ /g, '_'))}">${esc(c.what)}</a></td><td>${esc(c.author)}</td><td>${esc(c.licence)}</td></tr>`).join('\n    ')}
  </table>

  <h2>Unsplash</h2>
  <p>Most catalog photography is from <a href="https://unsplash.com/license">Unsplash</a>,
  whose licence permits commercial use and hotlinking without attribution.
  Credit is not required, so individual photographers are not listed here.</p>

  <h2>Open Food Facts</h2>
  <p>Real Indian FMCG packshots and product data come from
  <a href="https://world.openfoodfacts.org/">Open Food Facts</a>, database under
  <a href="https://opendatacommons.org/licenses/odbl/1-0/">ODbL</a>, images under
  CC BY-SA. A GitHub Action refreshes these daily.</p>

  <h2>Brand names</h2>
  <p>Brand names appear as plain text to describe real products. No logos, brand
  artwork, or retailer photography are reproduced, and no affiliation or
  endorsement is implied. Nothing on ThodaSa is actually for sale.</p>

  <footer><p><a href="/">&larr; Back to ThodaSa</a></p></footer>
</div>
</body>
</html>
`
fs.mkdirSync(path.join(dist, 'credits'), { recursive: true })
fs.writeFileSync(path.join(dist, 'credits', 'index.html'), creditsPage)

// Crawlable HTML index of the whole catalog.
//
// URL Inspection reported "Referring page: None detected" for a product page,
// and the homepage contains zero <a> tags — so the one indexed page was a dead
// end and Google had no path into the catalog except the sitemap, which it does
// not prioritise for a new domain. Product pages interlink, but only with each
// other, so the whole cluster was unreachable. This is a plain HTML sitemap:
// visible, no cloaking, linked from the homepage and every product footer.
const byCatSorted = CATEGORIES.filter((c) => c.id !== 'all')
  .map((c) => ({ ...c, items: (byCat[c.id] ?? []).slice().sort((a, b) => b.price - a.price) }))
  .filter((c) => c.items.length)

const browsePage = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Browse all ${TEMPLATE_HEROES.length} products | ThodaSa</title>
<meta name="description" content="Every product on ThodaSa, by category - ${byCatSorted.map((c) => c.label).join(', ')}. Each one shows its GST and customs-duty breakdown.">
<link rel="canonical" href="${SITE}/browse/">
<style>
  :root{color-scheme:dark}
  body{margin:0;background:#0b0b0d;color:#fff;font:16px/1.6 Inter,system-ui,sans-serif}
  .wrap{max-width:60rem;margin:0 auto;padding:3rem 1.5rem}
  h1{font-size:1.9rem;margin:.2rem 0 .6rem;font-weight:600}
  h2{font-size:1.1rem;margin:2.2rem 0 .4rem;font-weight:600;border-bottom:1px solid rgba(255,255,255,.1);padding-bottom:.4rem}
  .caps{text-transform:uppercase;letter-spacing:.12em;font-size:.7rem;color:rgba(255,255,255,.45)}
  a{color:#f0abfc;text-decoration:none}
  a:hover{text-decoration:underline}
  ul{list-style:none;padding:0;margin:.6rem 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(15rem,1fr));gap:.15rem .9rem}
  li{font-size:.87rem;padding:.12rem 0}
  .p{color:rgba(255,255,255,.4);font-size:.8rem}
  p{color:rgba(255,255,255,.72)}
  footer{margin-top:3rem;font-size:.8rem;color:rgba(255,255,255,.4)}
</style>
</head>
<body>
<div class="wrap">
  <p class="caps"><a href="/" style="color:inherit">ThodaSa</a></p>
  <h1>Browse all ${TEMPLATE_HEROES.length} products</h1>
  <p>Every product in the catalog, grouped by category. Each page shows the GST
  and customs-duty breakdown behind its price. Nothing here is actually for sale.</p>
  ${byCatSorted.map((c) => `<h2>${esc(c.label)} <span class="p">${c.items.length}</span></h2>
  <ul>${c.items.map((x) => `<li><a href="/p/${x.slug}/">${esc(x.baseName)}</a> <span class="p">₹${inr(x.price)}</span></li>`).join('')}</ul>`).join('\n  ')}
  <footer><p><a href="/">&larr; Back to ThodaSa</a> &middot; <a href="/duty/">Duty &amp; GST calculator</a> &middot; <a href="/credits/">Photo credits</a></p></footer>
</div>
</body>
</html>
`
fs.mkdirSync(path.join(dist, 'browse'), { recursive: true })
fs.writeFileSync(path.join(dist, 'browse', 'index.html'), browsePage)

// /duty/ sits second on purpose. It is the only page here with a search query
// genuinely behind it, and sitemap order is a weak crawl-priority signal.
const urls = [`${SITE}/`, `${SITE}/duty/`, `${SITE}/browse/`, `${SITE}/credits/`, ...TEMPLATE_HEROES.map((p) => `${SITE}/p/${p.slug}/`)]
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u}</loc><changefreq>daily</changefreq></url>`).join('\n') +
    `\n</urlset>\n`,
)

console.log(`generated ${count} product pages + sitemap with ${urls.length} urls`)
