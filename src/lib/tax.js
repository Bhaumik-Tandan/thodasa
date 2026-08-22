// GST, the way Indian retail actually does it.
//
// Critical detail: in India the displayed price (MRP) is INCLUSIVE of GST by
// law. So tax is never added on top at checkout — it is extracted from the
// price for the invoice breakdown. Adding it on top would be wrong, and would
// make the app look less real, not more.
//
// Rates below are the real slabs for each goods type.
const RATES = {
  grocery: 5,      // staples: atta, dal, rice, milk
  snacks: 12,      // namkeen, biscuits, packaged food
  icecream: 18,
  beauty: 18,
  gadgets: 18,
  home: 18,
  kitchen: 18,
  stationery: 12,
  quirky: 18,
  accessories: 12,
  fashion: 12,     // apparel: 5% under Rs1000, 12% above (handled below)
  shoes: 18,       // footwear: 12% under Rs1000, 18% above
  watches: 18,
  luxe: 18,
  jewels: 3,       // gold/silver/imitation jewellery
  art: 12,
  books: 0,        // printed books are GST-exempt
  toys: 12,
  kpop: 18,
  bikes: 28,
  cars: 28,
  jets: 18,
  realty: 5,       // under-construction property
}

export const gstRate = (product) => {
  const base = RATES[product.category] ?? 18
  // the two slabs that genuinely depend on price point
  if (product.category === 'fashion') return product.price <= 1000 ? 5 : 12
  if (product.category === 'shoes') return product.price <= 1000 ? 12 : 18
  return base
}

// Price is tax-inclusive, so back out the components.
export const taxBreakdown = (items) => {
  let taxable = 0, gst = 0
  const bySlab = {}
  for (const { product, qty } of items) {
    const gross = product.price * qty
    const rate = gstRate(product)
    const net = gross / (1 + rate / 100)
    const tax = gross - net
    taxable += net
    gst += tax
    bySlab[rate] = (bySlab[rate] || 0) + tax
  }
  return {
    taxable: Math.round(taxable),
    gst: Math.round(gst),
    bySlab: Object.entries(bySlab)
      .map(([rate, amt]) => ({ rate: Number(rate), amount: Math.round(amt) }))
      .filter((x) => x.amount > 0)
      .sort((a, b) => a.rate - b.rate),
  }
}
