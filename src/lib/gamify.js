// Client-side gamification: coins, daily streak, XP/levels, spin-to-win,
// achievements — all in localStorage, no backend. The dopamine layer.
const KEY = 'thodasa.game'

const fresh = () => ({
  coins: 0,
  xp: 0,
  streak: 0,
  lastVisit: null,
  spinDate: null, // last date the daily spin was used
  scrolls: 0,
  adds: 0,
  wishes: 0,
  orders: 0,
  shares: 0,
  ach: {}, // unlocked achievement ids -> true
})

export const load = () => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...fresh(), ...JSON.parse(raw) } : fresh()
  } catch {
    return fresh()
  }
}
const save = (g) => { try { localStorage.setItem(KEY, JSON.stringify(g)) } catch { /* ignore */ } }

const today = () => new Date().toISOString().slice(0, 10)

// ——— Levels: XP thresholds + fun Hinglish titles ———
export const LEVELS = [
  { min: 0, name: 'Window Shopper', emoji: '🪟' },
  { min: 100, name: 'Cart Curious', emoji: '👀' },
  { min: 300, name: 'Scroll Addict', emoji: '📱' },
  { min: 700, name: 'Deal Hunter', emoji: '🎯' },
  { min: 1500, name: 'Sasta Connoisseur', emoji: '💫' },
  { min: 3000, name: 'Big Spender', emoji: '👑' },
  { min: 6000, name: 'Certified Shopaholic', emoji: '🛍️' },
  { min: 12000, name: 'ThodaSa Legend', emoji: '🏆' },
]
export const levelFor = (xp) => {
  let cur = LEVELS[0], next = null
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) { cur = LEVELS[i]; next = LEVELS[i + 1] ?? null }
  }
  const base = cur.min
  const ceil = next ? next.min : cur.min
  const pct = next ? Math.round(((xp - base) / (ceil - base)) * 100) : 100
  return { level: cur, next, pct, xp }
}

// ——— Achievements ———
export const ACHIEVEMENTS = [
  { id: 'first_scroll', emoji: '👋', name: 'Welcome!', desc: 'Aa gaye. Shuru karo.', test: (g) => g.scrolls >= 1 },
  { id: 'scroll_25', emoji: '📜', name: 'Pachees Paar', desc: '25 products scroll kiye', test: (g) => g.scrolls >= 25 },
  { id: 'scroll_100', emoji: '🌀', name: 'Doom Scroller', desc: '100 scroll. Kaam kab karoge?', test: (g) => g.scrolls >= 100 },
  { id: 'first_add', emoji: '🛒', name: 'Pehli Baar', desc: 'Pehla item cart mein', test: (g) => g.adds >= 1 },
  { id: 'add_10', emoji: '🧺', name: 'Trolley Bhar Gaya', desc: '10 items. Budget ka kya?', test: (g) => g.adds >= 10 },
  { id: 'wish_5', emoji: '❤️', name: 'Baad Mein Lenge', desc: '5 cheezein wishlist mein', test: (g) => g.wishes >= 5 },
  { id: 'first_order', emoji: '📦', name: 'Order Ho Gaya', desc: 'Pehla (nakli) order', test: (g) => g.orders >= 1 },
  { id: 'streak_3', emoji: '🔥', name: 'Teen Din Se', desc: 'Teen din lagatar', test: (g) => g.streak >= 3 },
  { id: 'streak_7', emoji: '⚡', name: 'Aadat Ho Gayi', desc: 'Poora hafta. Respect.', test: (g) => g.streak >= 7 },
  { id: 'share_1', emoji: '📤', name: 'Dost Ko Bheja', desc: 'Kuch share kiya', test: (g) => g.shares >= 1 },
  { id: 'coins_1000', emoji: '🪙', name: 'Hazaar Ka Aankda', desc: '1,000 coins kama liye', test: (g) => g.coins >= 1000 },
  { id: 'level_big', emoji: '👑', name: 'Kharcha Pani', desc: 'Big Spender level tak', test: (g) => g.xp >= 3000 },
]

// pending toasts (coins earned / achievement unlocked) — drained by the UI
let listeners = []
export const onReward = (fn) => { listeners.push(fn); return () => { listeners = listeners.filter((l) => l !== fn) } }
const emit = (payload) => listeners.forEach((l) => l(payload))

const grant = (g, coins, xp) => { g.coins += coins; g.xp += xp }

const checkAch = (g) => {
  for (const a of ACHIEVEMENTS) {
    if (!g.ach[a.id] && a.test(g)) {
      g.ach[a.id] = true
      grant(g, 50, 50) // achievement bonus
      emit({ type: 'achievement', achievement: a })
    }
  }
}

// Call once per app mount: handle daily streak + streak reward.
export const startDay = () => {
  const g = load()
  const t = today()
  if (g.lastVisit !== t) {
    const yst = new Date(Date.now() - 864e5).toISOString().slice(0, 10)
    g.streak = g.lastVisit === yst ? g.streak + 1 : 1
    g.lastVisit = t
    const bonus = 20 + g.streak * 10 // grows with streak
    grant(g, bonus, 20)
    emit({ type: 'coins', amount: bonus, reason: `Day ${g.streak} streak 🔥` })
  }
  checkAch(g)
  save(g)
  return g
}

const REWARDS = {
  scroll: { coins: 1, xp: 1, key: 'scrolls' },
  add: { coins: 15, xp: 20, key: 'adds' },
  wish: { coins: 8, xp: 10, key: 'wishes' },
  share: { coins: 12, xp: 15, key: 'shares' },
  order: { coins: 100, xp: 150, key: 'orders' },
}

export const action = (type) => {
  const r = REWARDS[type]
  if (!r) return
  const g = load()
  g[r.key] = (g[r.key] || 0) + 1
  grant(g, r.coins, r.xp)
  if (type !== 'scroll' && type !== 'add') emit({ type: 'coins', amount: r.coins, reason: '+' + r.coins + ' coins' })
  checkAch(g)
  save(g)
}

// ——— Daily spin-to-win ———
export const canSpin = (g = load()) => g.spinDate !== today()
export const SPIN_PRIZES = [
  { coins: 50, label: '50 🪙' },
  { coins: 100, label: '100 🪙' },
  { coins: 25, label: '25 🪙' },
  { coins: 250, label: '250 🪙' },
  { coins: 75, label: '75 🪙' },
  { coins: 500, label: 'JACKPOT 500 🪙' },
  { coins: 40, label: '40 🪙' },
  { coins: 150, label: '150 🪙' },
]
// deterministic-ish prize by date so it's not manipulable by reload
export const spin = () => {
  const g = load()
  if (!canSpin(g)) return null
  const seed = Number(today().replace(/-/g, '')) + g.orders * 7 + g.adds * 3
  const idx = seed % SPIN_PRIZES.length
  const prize = SPIN_PRIZES[idx]
  g.spinDate = today()
  grant(g, prize.coins, 30)
  save(g)
  emit({ type: 'coins', amount: prize.coins, reason: prize.label })
  return { idx, prize }
}

// Spend coins (category unlocks etc). Returns false if the balance is short.
export const spendCoins = (amount) => {
  const g = load()
  if (g.coins < amount) return false
  g.coins -= amount
  save(g)
  return true
}

export const summary = () => {
  const g = load()
  return { ...g, ...levelFor(g.xp), achievements: ACHIEVEMENTS.map((a) => ({ ...a, unlocked: !!g.ach[a.id] })) }
}
