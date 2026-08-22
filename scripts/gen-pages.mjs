// Generates a static share page per product template into dist/p/<slug>/.
// Each page carries its own OG tags (so WhatsApp/X unfurl THAT product),
// Product JSON-LD for Google, crawlable text, and a JS redirect into the app
// (#p=<templateId> opens the product's variant sheet). Also rebuilds the
// sitemap with every product URL. Runs automatically after `vite build`.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TEMPLATE_HEROES } from '../src/data/products.js'

const SITE = 'https://thodasa.com'
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

const page = (p) => {
  const url = `${SITE}/p/${p.slug}/`
  const og = p.img.replace('w=800&h=1400', 'w=1200&h=630')
  const title = `${p.baseName} — ₹${p.price}${p.variantCount > 1 ? ' onwards' : ''} | ThodaSa`
  const desc = `${p.desc} ${p.rating}★ (${p.reviews} ratings)${p.deal ? ` · deal: ₹${p.price} (was ₹${p.mrp})` : ''} · Free delivery over ₹499. Scroll more finds on ThodaSa — shopping that feels like reels.`
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
    brand: { '@type': 'Brand', name: p.brand },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews },
    offers: { '@type': 'Offer', priceCurrency: 'INR', price: p.price, availability: 'https://schema.org/InStock', url },
  })}</script>
<script>location.replace('/#p=${p.templateId}')</script>
</head>
<body>
<h1>${esc(p.baseName)}</h1>
<p>${esc(p.desc)}</p>
<p>₹${p.price}${p.deal ? ` (deal — was ₹${p.mrp})` : ''} · ${p.rating}★ · ${p.reviews} ratings · category: ${p.category}</p>
<p><a href="/#p=${p.templateId}">Open in ThodaSa — shopping that scrolls like reels</a></p>
</body>
</html>`
}

let count = 0
for (const p of TEMPLATE_HEROES) {
  const dir = path.join(dist, 'p', p.slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), page(p))
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
