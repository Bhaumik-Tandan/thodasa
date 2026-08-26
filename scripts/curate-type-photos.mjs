// Hand-curated allowlist for the type-photo pool.
//
// Three automated sourcing attempts all produced pools that were roughly half
// wrong, and the failures were not subtle: a "Sandals Negril" resort swimming
// pool filed under shoes, MAC and LG product shots that would have put real
// brands on invented brands' cards, a 5th-century BC copper pan under cookware,
// and a Pride flag under lipstick. So the automation fetches and verifies, and
// a human eye decides what ships.
//
// Then a second, worse mistake: the first version keyed photos to a CATEGORY,
// so every one of the 64 fashion products got kurta photos — including the
// blazers, the hoodies and the 511 slim jeans. Of 233 products given a carousel,
// only 22 were shown a photo of what they actually are. Verifying that a photo
// is a good photo of its type says nothing about whether that type matches the
// product it gets attached to.
//
// So photos are keyed to a SUBJECT, and a product only gets them if its own name
// says it is that subject. Coverage drops a long way. That is the honest number:
// one accurate photo beats three that look like placeholders, which is exactly
// what they looked like.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

// category -> subject -> { match, files }
//   match — tested against the product's own name
//   files — substrings of the Wikimedia filename, reviewed visually one by one
const KEEP = {
  beauty: {
    lipstick: {
      match: 'lipstick|lip crayon|lip balm|lip tint|lip gloss',
      files: [
        'Lipstick.jpg', 'Lipstick_army', 'Lipstick_and_lipgloss', 'Rows_of_lipstick',
        'Lipstick_in_the_shop', 'Violetta_Lipstick', 'Lipstick_(product)', 'Red_lipstick_gold_case',
      ],
    },
  },
  fashion: {
    kurta: {
      match: 'kurta|kurti|salwar|churidar',
      files: [
        'Kurta_traditional_front', 'Kurta_churidar_nehru_vest', 'Kurta_closeup_sandalwood',
        'Kurta_pajamas_for_men', 'Kurta_Indian_Dress_Women', 'Ladies_kurta_with_leggings',
        'Kurta_closeup_ornate', 'Kurta_closeup_side_open',
      ],
    },
  },
  gadgets: {
    smartwatch: {
      match: 'smartwatch|smart watch|fitness band|watch strap',
      files: ['Smartwatch.jpg', 'Smartwatches.jpeg', 'PineTime_smartwatch'],
    },
  },
  icecream: {
    'ice cream': {
      match: 'ice ?cream|kulfi|gelato|sundae|cone',
      files: ['superman_flavor', 'Ice_cream_cone_with_spoon', 'Sweet_Scoops_Ice_Cream', 'Gelato_ice_cream'],
    },
  },
  stationery: {
    pencil: {
      match: 'pencil|colour|color|crayon',
      files: ['Colouring_pencils', 'Pencil_sharpened', 'Pencil_3'],
    },
  },
  jewels: {
    necklace: {
      match: 'necklace|chain|pendant|haar',
      files: [
        'Gold_necklace_MET_DP122704', 'Gold_necklace_MET_DP336810', 'Gold_necklace_MET_GR540',
        'Gold_necklace_MET_sf2213965', 'Gold_Necklace_with_Ornaments', 'Gold_Necklace_with_Pendants',
      ],
    },
  },
}

// Dropped entirely, recorded so a later run does not quietly re-add them:
//   shoes       — Converse and Vans (brands) plus a Sandals resort swimming pool
//   books       — a French-flag book illustration, not a photograph
//   accessories — military ammunition pouches
//   realty      — "balcony" returned a theatre, a church and a Caillebotte painting
//   gadgets/keyboard — one usable photo, and a carousel needs at least two
//   home/toys/art/luxe/quirky — the fetch returned nothing usable at all

const load = (f) => {
  const raw = fs.readFileSync(path.join(root, 'src/data', f), 'utf8')
  return JSON.parse(raw.slice(raw.indexOf(raw.includes('export default [') ? '[' : '{')))
}

const pool = load('typePhotos.js')
const credits = load('typeCredits.js')

const kept = {}
const shipped = []
for (const [cat, subjects] of Object.entries(KEEP)) {
  const urls = pool[cat] ?? []
  const out = {}
  for (const [subject, { match, files }] of Object.entries(subjects)) {
    const found = []
    for (const pat of files) {
      const hit = urls.find((u) => decodeURIComponent(u).includes(pat))
      if (hit) found.push(hit)
      else process.stderr.write(`  MISSING ${cat}/${subject}: ${pat}\n`)
    }
    // Two extras plus the hero is the minimum that reads as a carousel.
    if (found.length >= 2) { out[subject] = { match, urls: found }; shipped.push(...found) }
    else process.stderr.write(`  dropped ${cat}/${subject} (only ${found.length})\n`)
  }
  if (Object.keys(out).length) kept[cat] = out
}

// Wikimedia page titles use spaces, the URLs that serve the same file use
// underscores, so matching credits to photos by raw filename silently dropped
// 69 of 74 attributions. CC BY and CC BY-SA both REQUIRE attribution, which
// makes a quiet miss here a licence breach rather than a cosmetic bug.
const norm = (f) => decodeURIComponent(f).replace(/_/g, ' ').trim().toLowerCase()
const keptFiles = new Set(shipped.map((u) => norm(u.split('/').pop().replace(/^\d+px-/, ''))))
const keptCredits = credits.filter((c) => keptFiles.has(norm(c.file)))
if (keptCredits.length !== shipped.length) {
  console.error(`ATTRIBUTION GAP: ${shipped.length} photos but ${keptCredits.length} credits`)
  process.exit(1)
}

fs.writeFileSync(
  path.join(root, 'src/data/typePhotos.js'),
  '// GENERATED by scripts/fetch-type-photos.mjs, then filtered by\n' +
  '// scripts/curate-type-photos.mjs — do not edit by hand.\n' +
  '//\n' +
  '// category -> subject -> { match, urls }. A product only borrows these if its\n' +
  '// OWN NAME matches `match`. Keying them to the category instead put kurtas on\n' +
  '// blazers and lipstick on shampoo across 211 products.\n' +
  'export default ' + JSON.stringify(kept, null, 1) + '\n',
)
fs.writeFileSync(
  path.join(root, 'src/data/typeCredits.js'),
  '// GENERATED — attribution for the curated type-photo pool.\n' +
  'export default ' + JSON.stringify(keptCredits, null, 1) + '\n',
)
console.log('kept:', Object.entries(kept).map(([c, v]) => `${c}(${Object.keys(v).join('/')})`).join(' '))
console.log('photos:', shipped.length, 'credits:', keptCredits.length)
