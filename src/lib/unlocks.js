// Progressive category unlocks — the coin sink the game was missing.
//
// Coins were earned for everything (scrolls, adds, orders, streaks, spins) and
// spendable on nothing, so the loop never closed. The everyday catalog is free;
// the absurd tail is locked behind coins, priced so the first unlock lands in
// the first session and the last one takes real dedication. Everything stays
// client-side in localStorage — no backend.

const KEY = 'thodasa.unlocks'

// cost by category — ordered as a progression ladder
export const LOCKS = {
  art: 150,
  watches: 250,
  jewels: 250,
  shoes: 200,
  luxe: 400,
  bikes: 500,
  cars: 800,
  jets: 1500,
  realty: 2500,
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

// next cheapest thing still locked — for "N coins to your next unlock" nudges
export const nextUnlock = (unlocked = loadUnlocked()) => {
  const remaining = Object.entries(LOCKS).filter(([c]) => !unlocked.has(c)).sort((a, b) => a[1] - b[1])
  return remaining.length ? { category: remaining[0][0], cost: remaining[0][1] } : null
}
