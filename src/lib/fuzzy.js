// Typo-tolerant product search.
//
// Exact substring matching is tried first and always wins — for a catalog this
// size it answers most queries and costs nothing. Fuzzy matching only kicks in
// when the exact pass finds little or nothing, which keeps the edit-distance
// work off the common path.

// Levenshtein with an early bail-out: once every cell in a row exceeds `max`
// the final distance cannot come back under it, so we stop.
export const lev = (a, b, max) => {
  if (a === b) return 0
  if (Math.abs(a.length - b.length) > max) return max + 1
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    let rowMin = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
      if (cur[j] < rowMin) rowMin = cur[j]
    }
    if (rowMin > max) return max + 1
    prev = cur
  }
  return prev[b.length]
}

// How wrong a word is allowed to be, scaled to its length. "chps"→"chips" is a
// fair correction; letting a 4-letter word match anything 3 edits away is not.
const tolerance = (len) => (len <= 3 ? 0 : len <= 4 ? 1 : len <= 7 ? 2 : 3)

const tokens = (s) => s.toLowerCase().split(/[^a-z0-9]+/i).filter((t) => t.length > 1)

// Score one product against one query token. Higher is better, 0 means no match.
const tokenScore = (needle, hay) => {
  for (const t of hay) {
    if (t === needle) return 60
    if (t.startsWith(needle)) return 45
    if (t.includes(needle)) return 30
  }
  const tol = tolerance(needle.length)
  if (!tol) return 0
  let best = 0
  for (const t of hay) {
    // only compare words of comparable length — cheap pre-filter
    if (Math.abs(t.length - needle.length) > tol) continue
    const d = lev(needle, t, tol)
    if (d <= tol) best = Math.max(best, 26 - d * 8)
  }
  return best
}

// Relevance scoring. The old version collected substring matches in catalog
// order, so searching "tub" surfaced a face wash ("...tube mein") and a table
// lamp ("...tubelight") above three products literally named Tub. Where the
// match lands now decides the rank.
const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const fieldScore = (q, p) => {
  const name = (p.baseName ?? p.name).toLowerCase()
  const brand = (p.brand || '').toLowerCase()
  const cat = (p.category || '').toLowerCase()
  const desc = (p.desc || '').toLowerCase()
  const word = new RegExp(`\\b${esc(q)}`)

  if (name.startsWith(q)) return 100
  if (word.test(name)) return 85            // whole word inside the name
  if (brand.startsWith(q)) return 70
  if (name.includes(q)) return 55           // mid-word in the name
  if (brand.includes(q)) return 45
  if (cat.includes(q)) return 40
  if (word.test(desc)) return 22            // whole word in the description
  if (desc.includes(q)) return 6            // mid-word in the description
  return 0
}

export const searchProducts = (term, products, limit = 30) => {
  const q = term.trim().toLowerCase()
  if (!q) return []

  const seen = new Set()
  const hits = []
  for (const p of products) {
    if (seen.has(p.templateId)) continue
    const sc = fieldScore(q, p)
    if (sc > 0) {
      seen.add(p.templateId)
      // nudge better-rated items up among equal-relevance matches
      hits.push({ p, score: sc + Math.min(4, (p.rating ?? 0) - 3) })
    }
  }

  // enough strong matches (name/brand level) — no need to fuzz
  if (hits.filter((h) => h.score >= 40).length >= 5) {
    hits.sort((a, b) => b.score - a.score)
    return hits.slice(0, limit).map((h) => h.p)
  }

  // typo tolerance for whatever is left
  const qTokens = tokens(q).length ? tokens(q) : [q]
  for (const p of products) {
    if (seen.has(p.templateId)) continue
    const hay = tokens(`${p.baseName} ${p.brand} ${p.category}`)
    let score = 0
    for (const t of qTokens) {
      const s = tokenScore(t, hay)
      if (!s) { score = 0; break }   // every query word must match something
      score += s
    }
    if (score > 0) {
      seen.add(p.templateId)
      hits.push({ p, score: score * 0.4 })   // never outrank a real match
    }
  }
  hits.sort((a, b) => b.score - a.score)
  return hits.slice(0, limit).map((h) => h.p)
}
