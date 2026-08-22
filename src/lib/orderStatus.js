// Order progress, derived purely from how long ago the order was placed.
// No backend, no timers, no stored state — just a function of elapsed time,
// so it survives reloads and works offline.
//
// The cadence is deliberately compressed (minutes, not days) so that a visitor
// actually sees the status advance while they are still on the site. The ETA
// date shown alongside is the realistic one.

const STEPS = [
  { key: 'confirmed', label: 'Order confirmed',    detail: 'Seller has your order',        afterMin: 0 },
  { key: 'packed',    label: 'Packed',             detail: 'Sealed at the warehouse',      afterMin: 1 },
  { key: 'shipped',   label: 'Dispatched',         detail: 'Left the fulfilment centre',   afterMin: 3 },
  { key: 'out',       label: 'Out for delivery',   detail: 'Rider is on the way to you',   afterMin: 8 },
  { key: 'delivered', label: 'Delivered',          detail: 'Left at your door',            afterMin: 15 },
]

export const ORDER_STEPS = STEPS

const minutesSince = (iso) => (Date.now() - new Date(iso).getTime()) / 60000

export const orderProgress = (order) => {
  const mins = minutesSince(order.date)
  let idx = 0
  for (let i = 0; i < STEPS.length; i++) if (mins >= STEPS[i].afterMin) idx = i
  const step = STEPS[idx]
  const next = STEPS[idx + 1] ?? null
  return {
    index: idx,
    step,
    next,
    delivered: step.key === 'delivered',
    // realistic delivery date, independent of the demo's fast status cadence
    eta: new Date(new Date(order.date).getTime() + 3 * 864e5),
    minsToNext: next ? Math.max(0, Math.ceil(next.afterMin - mins)) : null,
  }
}

// The most recent order still worth surfacing on the feed. Once an order has
// been delivered for a while there's no reason to keep nagging about it.
export const activeOrder = (orders) => {
  if (!orders?.length) return null
  const latest = orders[orders.length - 1]
  const mins = minutesSince(latest.date)
  return mins < 60 ? latest : null
}

export const etaText = (d) =>
  d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
