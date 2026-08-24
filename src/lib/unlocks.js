// Progressive category unlocks — the coin sink the game was missing.
//
// Coins were earned for everything (scrolls, adds, orders, streaks, spins) and
// spendable on nothing, so the loop never closed. The everyday catalog is free;
// the absurd tail is locked behind coins, priced so the first unlock lands in
// the first session and the last one takes real dedication. Everything stays
// client-side in localStorage — no backend.

const KEY = 'thodasa.unlocks'

// cost by category — ordered as a progression ladder.
//
// Repriced after watching a Twitter visitor spend 18 minutes and 104 clicks
// against a wall of nine padlocks (Clarity, Aug 23). A first session realistically
// banks ~85 coins: 30 from the day-1 streak, ~40 from scrolling, one add. The old
// ladder totalled 1,940 and put cars — the thing people arrive for — at 250, so
// the tier they came to see was unreachable on the visit they came on. Halved
// across the board and flattened at the top: the first unlock is nearly free,
// cars lands inside session one, and only realty asks for a second visit.
export const LOCKS = {
  art: 25,
  shoes: 40,
  jewels: 50,
  watches: 60,
  luxe: 80,
  bikes: 100,
  cars: 120,
  jets: 180,
  realty: 250,
}

export const isLockable = (cat) => cat in LOCKS

export const loadUnlocked = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || '[]'))
  } catch {
    return new Set()
  }
}

export const saveUnlocked = (set) => {
  try { localStorage.setItem(KEY, JSON.stringify([...set])) } catch { /* private mode */ }
}

export const isLocked = (cat, unlocked = loadUnlocked()) => isLockable(cat) && !unlocked.has(cat)

// One eye-catching product per locked tier, to seed the feed with teasers.
// Hiding locked categories entirely meant a visitor never learned that cars,
// jets or Dubai real estate existed at all — and since ~85% of browsing happens
// in the All feed, the locked chips off-screen in a 24-chip scroll were never
// discovered. Showing a blurred teaser is how the lock creates desire instead
// of just removing content.
export const lockedTeasers = (products, unlocked = loadUnlocked()) => {
  const out = []
  for (const cat of Object.keys(LOCKS)) {
    if (unlocked.has(cat)) continue
    // priciest item in the tier — the most arresting thing to tease with
    let best = null
    for (const p of products) {
      if (p.category !== cat) continue
      if (!best || p.price > best.price) best = p
    }
    if (best) out.push({ ...best, locked: true, lockCost: LOCKS[cat] })
  }
  return out
}

// next cheapest thing still locked — for "N coins to your next unlock" nudges
export const nextUnlock = (unlocked = loadUnlocked()) => {
  const remaining = Object.entries(LOCKS).filter(([c]) => !unlocked.has(c)).sort((a, b) => a[1] - b[1])
  return remaining.length ? { category: remaining[0][0], cost: remaining[0][1] } : null
}
