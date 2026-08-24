// Clarity events, defined in code rather than by CSS selector.
//
// The dashboard's selector-based "smart events" broke silently when the card
// and sheet markup was rewritten: Clarity reported 15 "Begin checkout" sessions
// against 1 "Add to cart", which is impossible — you cannot check out an empty
// cart. Selector-defined events are only as stable as the class names they
// happen to match, so the funnel was unmeasurable exactly when it mattered.
//
// These fire from the same handlers that mutate state, so they cannot drift
// from the behaviour they describe. No PII: product ids and categories only.
const send = (name, tags) => {
  try {
    if (!window.clarity) return // localhost, or blocked by a tracker blocker
    if (tags) for (const [k, v] of Object.entries(tags)) window.clarity('set', k, String(v).slice(0, 100))
    window.clarity('event', name)
  } catch { /* never let analytics break the app */ }
}

export const trackAddToCart = (p) => send('add_to_cart', { product: p.baseName, category: p.category })
export const trackRemoveFromCart = () => send('remove_from_cart')
export const trackWishlist = (p) => send('add_to_wishlist', { category: p.category })
export const trackBeginCheckout = (total, count) => send('begin_checkout', { cart_value: total, cart_items: count })
export const trackPurchase = (total, count) => send('purchase', { order_value: total, order_items: count })
export const trackOutbound = (p) => send('outbound_amazon', { category: p.category })
// Share is the only action that is both a retention trigger and an acquisition
// channel, and it was the one event defined here that nothing ever called — so
// every share across five surfaces was invisible. Channel and surface are
// tagged because "who shares, and from where" is the whole question.
export const trackShare = (channel, surface, category = '') =>
  send('share', { channel, surface, category })
export const trackUnlock = (cat, cost) => send('category_unlocked', { category: cat, cost })
export const trackDutyOpen = (p) => send('duty_breakdown_opened', { category: p.category })
export const trackSearch = (q) => send('search', { has_query: q ? 'yes' : 'no' })
export const trackInstallPrompt = (action) => send('install_prompt_' + action)
