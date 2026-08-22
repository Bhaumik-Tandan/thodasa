// Daily catalog growth. Pulls genuinely NEW real products from Open Food Facts
// and appends them to src/data/daily.json, deduped by barcode against
// everything already imported.
//
// Why this exists: "12 new today" was a lie. The daily-drop chip rotated a
// FIXED catalog by date, so a returning visitor saw the same products
// reshuffled and had no reason to come back twice. This makes new actually new.
//
// Runs from a GitHub Action on a cron — no backend, no runtime API dependency.
// The app only ever reads a committed JSON file.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(root, 'src/data/daily.js')
const WANT = Number(process.env.DAILY_COUNT || 15)
const UA = { 'User-Agent': 'ThodaSa/1.0 (github.com/Bhaumik-Tandan/thodasa; daily catalog sync)' }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function get(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(30000) })
      if (r.ok) return await r.json()
    } catch { /* transient — OFF 503s regularly */ }
    await sleep(4000 + i * 3000)
  }
  return null
}

// ---- quality gate: crowd-sourced data is noisy, and a junk row looks worse
// than no row at all (we have already shipped "68YN5T 400ml" style names) ----
const GROC = /\bsalt\b|\batta\b|\bdal\b|\brice\b|oats|cereal|corn flakes|\boil\b|ghee|butter|sugar|flour|honey|jam\b|ketchup|sauce|mayonnaise|muesli|masala|spice/i
const ICE = /ice cream|icecream|kulfi|frozen dessert/i
const BLOCKED = new RegExp([
  // short words need BOTH boundaries: 'gin' alone matched "Virgin Mojito",
  // which is a non-alcoholic drink
  '\\bbeer', '\\blager', '\\bwine', 'whisk', 'vodka', '\\brum\\b', 'cognac', 'brandy',
  '\\bgin\\b', 'tequila', 'liqueur', 'liquor', 'alcohol', '\\bcider\\b', 'absinthe',
  'champagne', 'prosecco', 'vermouth', '\\bsake\\b', '\\bmead\\b', 'shandy', 'breezer',
  'cigarett', 'tobacco', 'vape', 'nicotine', 'paan masala', 'gutkha',
].join('|'), 'i')

const clean = (raw, brand) => {
  let n = String(raw).replace(/\s+/g, ' ').trim().replace(/^[-.,]+|[-.,]+$/g, '')
  if (n === n.toUpperCase() || n === n.toLowerCase()) {
    n = n.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
  }
  // strip a leading brand repeat only when the remainder still stands alone
  if (brand && n.toLowerCase().startsWith(brand.toLowerCase())) {
    const rest = n.slice(brand.length).replace(/^[\s-–]+/, '')
    if (rest.length >= 8 && rest.includes(' ')) n = rest[0].toUpperCase() + rest.slice(1)
  }
  return n
}

const usable = (p) => {
  const name = (p.product_name || '').trim()
  const brand = (p.brands || '').split(',')[0].trim()
  if (!name || !brand || !p.image_front_url) return false
  // age-restricted goods: never, and check the OFF category tags too since a
  // product name alone ("VS", "Strong") often does not say what it is
  const hay = `${name} ${brand} ${(p.categories_tags || []).join(' ')}`
  if (BLOCKED.test(hay)) return false
  if (name.length < 6 || name.length > 55) return false
  if (brand.length < 2 || brand.length > 28) return false
  // reject mojibake / SKU-code names
  if (!/^[\w\s'\-&.,!()%+/]+$/.test(name)) return false
  if (/^[A-Z0-9]{5,}$/.test(name.replace(/\s/g, ''))) return false
  if (!/[aeiou]/i.test(name)) return false
  return true
}

const priceFor = (name, cats, qty) => {
  const t = `${name} ${cats}`.toLowerCase()
  const h = [...`${name}`].reduce((a, c) => a + c.charCodeAt(0), 0)
  if (/1\s*(kg|l\b|ltr|litre)/i.test(qty)) return 90 + (h % 160)
  const bands = [
    [/energy drink|red bull|sting/, 99, 30], [/biscuit|cookie|marie|bourbon|oreo|rusk/, 10, 40],
    [/wafer|chips|sev|namkeen|kurkure|bhujia|snack/, 10, 30], [/chocolate|dairy milk|kitkat|candy|toffee/, 10, 80],
    [/cola|sprite|soda|drink|juice|water|frooti|thums/, 20, 40], [/noodle|maggi|pasta|ramen|vermicelli/, 14, 40],
    [/oats|muesli|cereal|flakes/, 99, 120], [/salt|sugar|atta|dal|rice|flour/, 28, 70],
    [/ketchup|sauce|jam|spread|nutella|mayonnaise|pickle/, 60, 140], [/ice cream|kulfi/, 40, 160],
    [/tea|coffee/, 90, 200], [/milk|curd|paneer|cheese|butter|ghee/, 30, 120],
  ]
  for (const [re, lo, spread] of bands) if (re.test(t)) return lo + (h % spread)
  return 20 + (h % 80)
}

const EMOJI = [[/biscuit|cookie|rusk/, '🍪'], [/wafer|chips|sev|namkeen/, '🍟'], [/chocolate|candy|toffee/, '🍫'],
  [/cola|sprite|drink|juice|water|soda/, '🥤'], [/noodle|pasta|ramen/, '🍜'], [/oats|cereal|flakes/, '🥣'],
  [/salt|sugar|atta|dal|rice|flour/, '🌾'], [/ketchup|sauce|jam|spread/, '🍯'], [/ice cream|kulfi/, '🍦'],
  [/tea|coffee/, '☕'], [/milk|curd|paneer|cheese|butter|ghee/, '🥛']]
const emojiFor = (n) => (EMOJI.find(([re]) => re.test(n.toLowerCase())) || [null, '🛒'])[1]

const DESCS = [
  'Naya aaya hai. Asli pack, asli barcode.',
  'Fresh arrival — scanned from a real pack.',
  'Aaj ka naya find. Genuinely real product.',
  'Just landed. Real brand, real packaging.',
]

// ---------------------------------------------------------------- main
const existing = fs.existsSync(OUT)
  ? (await import(`file://${OUT}?t=${Date.now()}`)).default
  : []
const seenCodes = new Set(existing.map((p) => p.code))
const seenNames = new Set(existing.map((p) => `${p.brand}|${p.name}`.toLowerCase()))
console.log(`existing daily items: ${existing.length}`)

const today = new Date().toISOString().slice(0, 10)
const added = []

// OFF's v2 search caps an unfiltered query at ~5 pages, so page-walking the
// whole country feed hits 503s and returns nothing. A CATEGORY filter, however,
// exposes ~50 pages. So rotate categories by date and paginate inside them —
// that gives genuinely different products every run instead of the same top
// hits reshuffled.
const CATEGORIES = [
  'biscuits', 'beverages', 'chocolates', 'snacks', 'dairies', 'breakfast-cereals',
  'chips-and-fries', 'sweet-snacks', 'salty-snacks', 'fruit-juices', 'teas', 'coffees',
  'noodles', 'sauces', 'spreads', 'ice-creams', 'breads', 'cheeses', 'yogurts',
  'waters', 'sodas', 'candies', 'nuts', 'spices', 'vegetable-oils', 'rices',
  'flours', 'jams', 'honeys', 'pastas', 'cakes', 'wafers', 'pickles', 'legumes',
]

const dayNum = Math.floor(Date.now() / 864e5)
// walk a different slice of categories and a different page depth each day
const catOrder = CATEGORIES.map((c, i) => ({ c, k: (i * 7 + dayNum * 11) % CATEGORIES.length }))
  .sort((a, b) => a.k - b.k).map((x) => x.c)
const pageBase = 1 + ((dayNum * 3) % 12)

outer:
for (const cat of catOrder) {
  for (let page = pageBase; page < pageBase + 3; page++) {
    if (added.length >= WANT) break outer
    const url = 'https://world.openfoodfacts.org/api/v2/search?countries_tags_en=india'
      + `&categories_tags_en=${cat}`
      + '&fields=code,product_name,brands,image_front_url,quantity,categories_tags'
      + `&page_size=50&page=${page}&sort_by=unique_scans_n`
    const d = await get(url)
    if (!d?.products?.length) { console.log(`${cat} p${page}: unavailable`); continue }
    let fresh = 0
    for (const p of d.products) {
      if (added.length >= WANT) break
      if (!p.code || seenCodes.has(p.code) || !usable(p)) continue
      const brand = (p.brands || '').split(',')[0].trim()
      const name = clean(p.product_name, brand)
      const key = `${brand}|${name}`.toLowerCase()
      if (name.length < 6 || seenNames.has(key)) continue
      const cats = (p.categories_tags || []).join(' ')
      seenCodes.add(p.code); seenNames.add(key)
      added.push({
        code: p.code, brand, name,
        img: (p.image_front_url || '').replace(/\.400\.jpg$/, '.full.jpg'),
        qty: (p.quantity || '').trim().slice(0, 20) || 'Std pack',
        cat: ICE.test(`${name} ${cats}`) ? 'icecream' : GROC.test(`${name} ${cats}`) ? 'grocery' : 'snacks',
        price: priceFor(name, cats, p.quantity || ''),
        emoji: emojiFor(name),
        desc: DESCS[added.length % DESCS.length],
        addedOn: today,
      })
      fresh++
    }
    console.log(`${cat} p${page}: +${fresh} (${added.length}/${WANT})`)
    await sleep(2500)
  }
}

if (!added.length) {
  console.log('no new products found this run — leaving daily.js untouched')
  process.exit(0)
}

const merged = [...existing, ...added]
fs.writeFileSync(OUT,
  '// GENERATED by scripts/fetch-daily.mjs — do not edit by hand.\n'
  + '// Genuinely new real products, appended daily by a cron. A .js module\n'
  + '// rather than .json so both Vite and bare Node (gen-pages) can import it.\n'
  + 'export default ' + JSON.stringify(merged, null, 1) + '\n')
console.log(`\nadded ${added.length} new products (total ${merged.length})`)
for (const p of added) console.log(`  + ${p.brand} — ${p.name} (₹${p.price}, ${p.cat})`)
