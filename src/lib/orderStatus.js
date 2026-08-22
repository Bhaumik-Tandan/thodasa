// Order progress, derived purely from how long ago the order was placed.
// No backend, no timers, no stored state — just a function of elapsed time,
// so it survives reloads and works offline.
//
// The cadence is deliberately compressed (minutes, not days) so that a visitor
// actually sees the status advance while they are still on the site. The ETA
// date shown alongside is the realistic one.

const STEPS = [
  { key: 'confirmed', label: 'Order confirmed',  detail: 'Seller has your order',      at: 0 },
  { key: 'packed',    label: 'Packed',           detail: 'Sealed at the warehouse',    at: 0.2 },
  { key: 'shipped',   label: 'Dispatched',       detail: 'Left the fulfilment centre', at: 0.45 },
  { key: 'out',       label: 'Out for delivery', detail: 'Rider is on the way',        at: 0.85 },
  { key: 'delivered', label: 'Delivered',        detail: 'Left at your door',          at: 1 },
]

export const ORDER_STEPS = STEPS

const minutesSince = (iso) => (Date.now() - new Date(iso).getTime()) / 60000

const orderEta = (order) => {
  const placed = new Date(order.date)
  let worst = null
  for (const it of order.items ?? []) {
    const est = deliveryEstimate(it.product, placed)
    if (est.kind !== 'possession' && (worst == null || est.days > worst)) worst = est.days
  }
  // no items, or an order of nothing but property: fall back to a sane default
  return new Date(placed.getTime() + (worst ?? 3) * 864e5)
}

// Amazon-style timeline: every step carries a real date, spread across the
// order's actual lead time. Steps in the past are done; steps in the future
// show their expected date.
export const orderTimeline = (order) => {
  const placed = new Date(order.date)
  const eta = orderEta(order)
  const span = Math.max(1, eta.getTime() - placed.getTime())
  const now = Date.now()
  return STEPS.map((st) => {
    const date = new Date(placed.getTime() + span * st.at)
    return { ...st, date, done: now >= date.getTime() }
  })
}

export const orderProgress = (order) => {
  const tl = orderTimeline(order)
  let idx = 0
  for (let i = 0; i < tl.length; i++) if (tl[i].done) idx = i
  const step = tl[idx]
  const next = tl[idx + 1] ?? null
  return {
    index: idx,
    step,
    next,
    timeline: tl,
    delivered: step.key === 'delivered',
    eta: orderEta(order),
  }
}

// The most recent order still worth surfacing on the feed. Once an order has
// been delivered for a while there's no reason to keep nagging about it.
export const activeOrder = (orders) => {
  if (!orders?.length) return null
  const latest = orders[orders.length - 1]
  const p = orderProgress(latest)
  // keep showing it until delivered, then for a short victory lap
  if (!p.delivered) return latest
  return Date.now() - p.eta.getTime() < 2 * 864e5 ? latest : null
}

export const etaText = (d) =>
  d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })

// ——— Pre-purchase delivery estimate ———
// Shown on the product before you buy, the way a real store does. Lead time
// varies by what you're actually buying: milk arrives tomorrow, a Pagani does
// not. Deterministic per product so the date doesn't jitter between renders.
const LEAD_DAYS = {
  grocery: [1, 1],
  snacks: [1, 2],
  beauty: [2, 4],
  kitchen: [2, 4],
  home: [3, 6],
  stationery: [2, 4],
  quirky: [3, 5],
  gadgets: [2, 5],
  accessories: [3, 5],
  fashion: [3, 6],
  shoes: [3, 6],
  jewels: [4, 7],
  books: [3, 6],
  toys: [4, 7],
  watches: [5, 9],
  luxe: [7, 14],
  art: [7, 14],
  kpop: [10, 21], // ships from Korea
  bikes: [21, 45],
  cars: [45, 90],
  jets: [180, 365],
  realty: [0, 0], // possession, not delivery
}

const addDays = (d, n) => new Date(d.getTime() + n * 864e5)

export const deliveryEstimate = (product, from = new Date()) => {
  const [lo, hi] = LEAD_DAYS[product.category] ?? [3, 6]
  if (lo === 0) return { kind: 'possession', label: 'Possession as per builder schedule' }
  // stable per product rather than random on every render
  const spread = hi - lo
  const days = lo + (spread ? (product.templateId * 7) % (spread + 1) : 0)
  const date = addDays(from, days)
  if (days >= 60) return { kind: 'long', days, date, label: `Built to order · ~${Math.round(days / 30)} months` }
  if (days >= 21) return { kind: 'long', days, date, label: `Ships in ~${Math.round(days / 7)} weeks` }
  return {
    kind: 'date',
    days,
    date,
    label: `Delivery by ${date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`,
  }
}
