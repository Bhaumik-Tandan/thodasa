// Fills the empty image carousel for the ~740 products that only ever had one
// photo.
//
// fetch-angles.mjs searches for a SPECIFIC model ("Mahindra Thar") and gets
// four shots of the same object. That only works for things that exist. Roughly
// half this catalog is invented brands — there is no second photo of a Glowuh
// serum — so those products get TYPE photos instead: more pictures of the same
// kind of thing. The hero was already a stock photo of the type, so this is
// consistent with what the card always claimed.
//
// Source: Openverse, not Wikimedia directly. Two earlier attempts failed here
// and the reason is worth recording. Wikimedia free-text search for "lipstick
// cosmetic" returns a Nepali bride and a Bharatanatyam dancer; its curated
// CATEGORIES are no better, with a WWII poster filed under "Frying pans" and
// .ogg pronunciation files under "Wristwatches". Commons is an encyclopedia
// repository, not a product library. Openverse aggregates Flickr and museum
// collections too, so a query returns ~240 candidates instead of eight, which
// is the volume that makes the aggressive filtering below survivable.
//
// Every filter below exists because something specific got through:
//   * KEYWORD    — "Sandals Negril" put a resort swimming pool in the shoes
//                  pool, so the keyword must appear as a whole word in the title
//   * BRANDS     — MAC, LG, Converse, Vans and Tefal product shots must never
//                  land on an invented brand's card
//   * NOT_PHOTO  — a "Lipstick lesbian Pride Flag" SVG is not a lipstick
//   * HISTORICAL — a 5th-century BC copper pan is not cookware anyone can buy
//   * PEOPLE     — portraits of someone applying lipstick are not product shots
//   * size       — every URL is fetched, must be 200, and must be under 500KB;
//                  hero images run 17-60KB and a 2MB extra angle is not worth it
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const UA = { 'User-Agent': 'thodasa/1.0 (https://thodasa.com; catalog imagery)' }
const MAX_BYTES = 500 * 1024
const PER_CATEGORY = 12

// ThodaSa category -> queries. The first word of each query is the keyword that
// must appear in the result's title.
const TERMS = {
  beauty: ['lipstick', 'perfume bottle', 'nail polish', 'cosmetics jar', 'eyeshadow palette'],
  fashion: ['kurta', 'saree', 'jeans denim', 'shirt clothing', 'hoodie'],
  books: ['book cover', 'books stack', 'paperback'],
  realty: ['apartment interior', 'livingroom', 'kitchen interior', 'bedroom interior'],
  accessories: ['sunglasses', 'wallet leather', 'backpack', 'belt leather'],
  stationery: ['notebook', 'pencils', 'pen writing', 'eraser'],
  home: ['lamp table', 'cushion pillow', 'clock wall', 'vase', 'towel'],
  kitchen: ['pan cooking', 'knife kitchen', 'bottle water', 'bowl ceramic', 'kettle'],
  toys: ['teddy bear', 'blocks toy', 'puzzle', 'dice game'],
  shoes: ['shoes leather', 'boots', 'slippers', 'heels shoe'],
  gadgets: ['headphones', 'smartwatch', 'speaker audio', 'keyboard computer', 'charger cable'],
  art: ['painting canvas', 'poster print', 'sculpture'],
  jewels: ['necklace', 'earrings', 'bracelet', 'ring jewellery'],
  luxe: ['handbag', 'suitcase', 'scarf silk'],
  icecream: ['icecream', 'gelato', 'sundae'],
  quirky: ['mug ceramic', 'keychain', 'sticker'],
  kpop: ['vinyl record', 'cassette tape', 'cd disc'],
}

const BRANDS = new RegExp([
  'dior', 'chanel', 'gucci', 'prada', 'nike', 'adidas', 'puma', 'reebok', 'rolex', 'omega',
  'apple', 'iphone', 'macbook', 'samsung', 'sony', 'lg\\b', 'huawei', 'xiaomi', 'oneplus',
  'louis.?vuitton', 'hermes', 'hermès', 'versace', 'balenciaga', 'burberry', 'kate.?spade',
  'zara', 'levis', "levi's", 'casio', 'titan', 'lego', 'starbucks', 'coca.?cola', 'pepsi',
  'amul', 'maybelline', 'lakme', "l'oreal", 'loreal', 'sephora', 'fenty', 'huda', 'avon',
  'converse', 'vans\\b', 'tefal', 'ikea', 'd&g', 'dolce', 'mac\\b', 'bose', 'jbl', 'philips',
  'nintendo', 'playstation', 'xbox', 'google', 'android', 'microsoft', 'dell', 'hp\\b', 'asus',
].join('|'), 'i')

const NOT_PHOTO = /\b(svg|clipart|illustration|sticker|vector|logo|flag|icon|drawing|cartoon|poster art|diagram|chart|png|transparent|psd|template|mockup|font|emoji)\b/i
const HISTORICAL = /\b(century|museum|archaeolog|cycladic|minoan|ancient|roman|medieval|neolithic|bronze age|bc\b|ad\b|excavat|artefact|artifact|antiquit|dynasty|tomb|MET\b|louvre|relic)\b/i
const PEOPLE = /\b(woman|women|man\b|men\b|girl|boy|model|wearing|worn|portrait|pride|bride|groom|lady|ladies|selfie|face|hand|hands|lips|people|person|child|kid|she|he)\b/i
const OK_LICENCE = /^(cc0|by|by-sa|pdm)$/i

// Only providers whose URLs can be resized deterministically, so a carousel
// never pulls a 4MB original onto a phone on Indian mobile data.
const sized = (u) => {
  const wm = u.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/(.+)$/)
  if (wm) return `https://upload.wikimedia.org/wikipedia/commons/thumb/${wm[1]}/${wm[2]}/${wm[3]}/960px-${wm[3]}`
  if (/^https:\/\/live\.staticflickr\.com\//.test(u)) return u.replace(/_[a-z]\.(jpg|png)$/i, '_c.$1')
  return null
}

const search = async (q, page) => {
  const url = 'https://api.openverse.org/v1/images/?' + new URLSearchParams({
    q, license_type: 'commercial', size: 'large', page_size: '50', page: String(page), mature: 'false',
  })
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) })
      if (r.status === 429) { await new Promise((s) => setTimeout(s, 2000 * (attempt + 1))); continue }
      if (!r.ok) return []
      return (await r.json()).results ?? []
    } catch { await new Promise((s) => setTimeout(s, 1000 * (attempt + 1))) }
  }
  return []
}

const verify = async (u) => {
  try {
    const r = await fetch(u, { method: 'HEAD', headers: UA, signal: AbortSignal.timeout(15000) })
    if (!r.ok) return false
    const len = Number(r.headers.get('content-length') || 0)
    return len > 0 && len <= MAX_BYTES
  } catch { return false }
}

const pool = {}
const credits = []
const seen = new Set()

for (const [category, queries] of Object.entries(TERMS)) {
  pool[category] = []
  for (const q of queries) {
    if (pool[category].length >= PER_CATEGORY) break
    const key = q.split(' ')[0].toLowerCase()
    const kw = new RegExp(`\\b${key}s?\\b`, 'i')

    const candidates = []
    for (let page = 1; page <= 3 && candidates.length < 24; page++) {
      for (const it of await search(q, page)) {
        const title = it.title ?? ''
        const hay = `${title} ${it.creator ?? ''}`
        if (!kw.test(title)) continue                    // relevance
        if (BRANDS.test(hay)) continue                   // trademark
        if (NOT_PHOTO.test(hay)) continue                // not a photograph
        if (HISTORICAL.test(hay)) continue               // museum piece
        if (PEOPLE.test(title)) continue                 // portrait, not product
        if (!OK_LICENCE.test(it.license ?? '')) continue
        const url = sized(it.url ?? '')
        if (!url || seen.has(url)) continue
        seen.add(url)
        candidates.push({ url, title, it })
      }
    }

    const ok = await Promise.all(candidates.map(async (c) => ((await verify(c.url)) ? c : null)))
    for (const c of ok) {
      if (!c || pool[category].length >= PER_CATEGORY) continue
      pool[category].push(c.url)
      credits.push({
        what: `${category} · ${key}`,
        title: c.title.slice(0, 70),
        creator: (c.it.creator || 'Unknown').slice(0, 50),
        licence: `CC ${(c.it.license || '').toUpperCase()} ${c.it.license_version || ''}`.trim(),
        source: c.it.foreign_landing_url || c.it.url,
      })
    }
    process.stderr.write(`${category}/${q}: ${pool[category].length}\n`)
  }
}

fs.writeFileSync(
  path.join(root, 'src/data/typePhotos.js'),
  '// GENERATED by scripts/fetch-type-photos.mjs — do not edit by hand.\n' +
  '// category -> pool of freely licensed photos OF THAT KIND OF THING.\n' +
  '// Not photos of the specific product: half the catalog is invented brands.\n' +
  'export default ' + JSON.stringify(pool, null, 1) + '\n',
)
fs.writeFileSync(
  path.join(root, 'src/data/typeCredits.js'),
  '// GENERATED by scripts/fetch-type-photos.mjs — do not edit by hand.\n' +
  'export default ' + JSON.stringify(credits, null, 1) + '\n',
)
console.log('\npool:', Object.entries(pool).map(([c, v]) => `${c}:${v.length}`).join(' '))
console.log('total:', Object.values(pool).reduce((a, v) => a + v.length, 0), 'credits:', credits.length)
