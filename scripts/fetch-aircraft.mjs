// Photo candidates for the aviation catalog expansion.
//
// Unlike the type-photo pool, these are searches for SPECIFIC real aircraft, a
// category where Wikimedia Commons is genuinely strong (planespotters upload
// obsessively). Even so, nothing here ships sight-unseen: this script only
// FETCHES and VERIFIES candidates and writes a contact sheet; a human eye picks
// the winner per model, and the curated result lands in src/data/aircraft.js.
// The photo history of this project (a Hublot search returning lingerie, a
// swimming pool filed under shoes) is why that step is not optional.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const UA = { 'User-Agent': 'thodasa/1.0 (https://thodasa.com; catalog imagery)' }

const MODELS = [
  ['Gulfstream', 'G700'], ['Gulfstream', 'G280'],
  ['Bombardier', 'Global 8000'], ['Bombardier', 'Challenger 350'], ['Bombardier', 'Challenger 650'],
  ['Dassault', 'Falcon 2000LXS'], ['Dassault', 'Falcon 900LX'], ['Dassault', 'Falcon 6X'],
  ['Embraer', 'Praetor 500'], ['Embraer', 'Phenom 300'], ['Embraer', 'Phenom 100'],
  ['Cessna', 'Citation M2'], ['Cessna', 'Citation CJ4'], ['Cessna', 'Citation XLS'],
  ['Cessna', 'Citation Latitude'], ['Cessna', 'Grand Caravan EX'],
  ['Beechcraft', 'King Air 360'], ['Beechcraft', 'King Air 260'],
  ['Pilatus', 'PC-12'], ['Daher', 'TBM 960'], ['Piper', 'M600'],
  ['Cirrus', 'SR22'], ['Cirrus', 'Vision Jet'], ['Diamond', 'DA62'],
  ['Robinson', 'R44'], ['Robinson', 'R66'],
  ['Bell', '407GXi'], ['Bell', '429'],
  ['Airbus', 'H125'], ['Airbus', 'H130'], ['Airbus', 'H145'],
  ['Leonardo', 'AW139'], ['Sikorsky', 'S-76'],
]

const FREE = /^(cc |public domain|cc0|pd|attribution)/i
const NOT_PHOTO = /\b(svg|drawing|logo|diagram|cutaway|cockpit|interior|seatmap|silhouette|3-view|model kit|toy)\b/i
const CRASH = /\b(crash|accident|wreck|damag|incident|fire)\b/i

const search = async (q) => {
  const url = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
    action: 'query', format: 'json',
    generator: 'search', gsrsearch: `filetype:bitmap ${q}`, gsrnamespace: '6', gsrlimit: '12',
    prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '1200',
  })
  for (let a = 0; a < 3; a++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(15000) })
      if (r.status === 429) { await new Promise((s) => setTimeout(s, 1500 * (a + 1))); continue }
      if (!r.ok) return []
      return Object.values((await r.json()).query?.pages ?? {})
    } catch { await new Promise((s) => setTimeout(s, 1000 * (a + 1))) }
  }
  return []
}

const ok200 = async (u) => {
  try {
    const r = await fetch(u, { method: 'HEAD', headers: UA, signal: AbortSignal.timeout(15000) })
    if (!r.ok) return false
    const len = Number(r.headers.get('content-length') || 0)
    return len > 0 && len <= 900 * 1024
  } catch { return false }
}

const out = {}
for (const [brand, model] of MODELS) {
  const key = `${brand} ${model}`
  // the model number must appear in the filename — "Citation" alone matches
  // every bizjet Cessna ever made
  const token = model.replace(/[^A-Za-z0-9]+/g, ' ').trim().split(' ').pop().toLowerCase()
  const pages = await search(`${brand} ${model} aircraft`)
  const cands = []
  for (const pg of pages) {
    const ii = pg.imageinfo?.[0]
    if (!ii?.thumburl) continue
    const file = pg.title.replace(/^File:/, '')
    const meta = ii.extmetadata ?? {}
    const lic = meta.LicenseShortName?.value ?? ''
    if (!FREE.test(lic)) continue
    if (NOT_PHOTO.test(file) || CRASH.test(file)) continue
    if (!file.toLowerCase().includes(token)) continue
    cands.push({
      url: ii.thumburl.split('?')[0],
      file,
      author: (meta.Artist?.value ?? '').replace(/<[^>]*>/g, '').trim().slice(0, 60) || 'Unknown',
      licence: lic,
    })
  }
  const alive = (await Promise.all(cands.map(async (c) => ((await ok200(c.url)) ? c : null)))).filter(Boolean)
  out[key] = alive.slice(0, 4)
  process.stderr.write(`${key}: ${out[key].length}\n`)
}

fs.writeFileSync(path.join(root, '/tmp-aircraft-candidates.json'), JSON.stringify(out, null, 1))

// contact sheet for the eyeball pass
let h = '<style>body{font:12px sans-serif;background:#111;color:#eee}h2{margin:16px 0 4px}div.g{display:flex;flex-wrap:wrap;gap:6px}figure{margin:0;width:190px}img{width:190px;height:126px;object-fit:cover;background:#333}figcaption{font-size:9px;opacity:.7;word-break:break-all}</style>'
for (const [key, cands] of Object.entries(out)) {
  h += `<h2>${key} (${cands.length})</h2><div class=g>`
  cands.forEach((c, i) => { h += `<figure><img src="${c.url}"><figcaption>[${i}] ${c.file.slice(0, 60)}</figcaption></figure>` })
  h += '</div>'
}
fs.writeFileSync('/tmp/aircraft-sheet.html', h)
console.log('candidates:', Object.values(out).reduce((a, v) => a + v.length, 0), '| sheet: /tmp/aircraft-sheet.html')
