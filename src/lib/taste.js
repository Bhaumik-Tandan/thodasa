// Client-side taste engine — no backend, no ML libs, just vectors in localStorage.
//
// Every product is embedded as a 10-dim feature vector:
//   [0..4] category one-hot (quirky, phone, beauty, home, accessories)
//   [5..7] price bucket one-hot (low ≤150, mid 151–300, high >300)
//   [8]    deal flag
//   [9]    highly-rated flag (≥4.5)
//
// The user's taste profile is a running weighted sum of vectors of products
// they engaged with. Signal weights (how much each action says "I like this"):
//   purchase +10 · add-to-cart +8 · wishlist +5 · share +4
//   long dwell (>4s) +2 · medium dwell (2–4s) +1 · quick skip (<1.2s) −1
//   un-wishlist −3
// Each new session decays the profile by 0.85 so recent taste dominates.
//
// Ranking = cosine(profile, product) + jitter − seen-fatigue penalty,
// then every 3rd feed slot is an exploration pick from low-affinity
// categories so the feed stays a discovery tree, not an echo chamber.

import { LAUNCH_PICKS } from '../data/products'

const KEY = 'thodasa.taste'
const CATS = ['snacks', 'beauty', 'gadgets', 'home', 'kitchen', 'accessories', 'stationery', 'quirky']
const DIMS = CATS.length + 5 // categories one-hot + price buckets (3) + deal + high-rating

export const SIGNALS = {
  purchase: 10,
  addToCart: 8,
  wishlist: 5,
  share: 4,
  dwellLong: 2,
  dwellMedium: 1,
  skip: -1,
  unwishlist: -3,
}

export const vecOf = (p) => {
  const v = new Array(DIMS).fill(0)
  const ci = CATS.indexOf(p.category)
  if (ci >= 0) v[ci] = 1
  const base = CATS.length
  if (p.price <= 150) v[base] = 1
  else if (p.price <= 300) v[base + 1] = 1
  else v[base + 2] = 1
  if (p.deal) v[base + 3] = 1
  if (p.rating >= 4.5) v[base + 4] = 1
  return v
}

const emptyProfile = () => ({ v: new Array(DIMS).fill(0), seen: {}, events: 0, sessions: 0 })

export const loadProfile = () => {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyProfile()
    const p = JSON.parse(raw)
    if (!Array.isArray(p.v) || p.v.length !== DIMS) return emptyProfile()
    return { ...emptyProfile(), ...p }
  } catch {
    return emptyProfile()
  }
}

const saveProfile = (p) => {
  try { localStorage.setItem(KEY, JSON.stringify(p)) } catch { /* private mode etc. */ }
}

// Call once per app mount: decays old taste so recent behaviour wins.
export const startSession = () => {
  const p = loadProfile()
  p.v = p.v.map((x) => x * 0.85)
  p.sessions += 1
  saveProfile(p)
  return p
}

// Record an engagement signal. Mutates + persists the stored profile.
export const recordSignal = (product, signal) => {
  const w = SIGNALS[signal]
  if (!w) return
  const p = loadProfile()
  const v = vecOf(product)
  p.v = p.v.map((x, i) => x + w * v[i])
  p.events += 1
  if (signal !== 'skip') p.seen[product.id] = (p.seen[product.id] ?? 0) + 1
  saveProfile(p)
}

export const dwellSignal = (ms) => (ms > 4000 ? 'dwellLong' : ms > 2000 ? 'dwellMedium' : ms < 1200 ? 'skip' : null)

const cosine = (a, b) => {
  let dot = 0, na = 0, nb = 0
  for (let i = 0; i < DIMS; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i] }
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0
}

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Human-readable summary of the profile, for the "Your vibe" widget.
export const tasteSummary = (profile = loadProfile()) => {
  const cats = CATS.map((c, i) => ({ cat: c, score: Math.max(0, profile.v[i]) }))
  const total = cats.reduce((s, c) => s + c.score, 0)
  if (profile.events < 3 || total === 0) return null
  return cats
    .map((c) => ({ ...c, pct: Math.round((c.score / total) * 100) }))
    .filter((c) => c.pct > 0)
    .sort((a, b) => b.pct - a.pct)
}

// Rank the feed. Cold start (<3 signals) → curated launch picks, then shuffle.
// Warm → exploit by similarity, but keep every 3rd slot for exploration.
export const rankFeed = (products, profile = loadProfile()) => {
  if (profile.events < 3) {
    const picks = LAUNCH_PICKS.map((id) => products.find((p) => p.id === id)).filter(Boolean)
    const rest = shuffle(products.filter((p) => !LAUNCH_PICKS.includes(p.id)))
    return [...picks, ...rest].map((p) => ({ ...p, reason: null }))
  }

  const scored = products.map((p) => ({
    ...p,
    score:
      cosine(profile.v, vecOf(p)) +
      Math.random() * 0.15 - // jitter so reloads aren't identical
      Math.min(profile.seen[p.id] ?? 0, 5) * 0.06, // fatigue: stop over-showing the same items
  }))
  scored.sort((a, b) => b.score - a.score)

  const exploit = scored.slice(0, Math.ceil(scored.length / 2))
  const explore = shuffle(scored.slice(Math.ceil(scored.length / 2)))

  const feed = []
  let e = 0, x = 0
  for (let slot = 0; feed.length < scored.length; slot++) {
    const wantExplore = slot % 3 === 2 // every 3rd card = discovery
    if (wantExplore && x < explore.length) feed.push({ ...explore[x++], reason: 'fresh' })
    else if (e < exploit.length) feed.push({ ...exploit[e++], reason: e <= 5 ? 'forYou' : null })
    else if (x < explore.length) feed.push({ ...explore[x++], reason: 'fresh' })
  }
  return feed
}
