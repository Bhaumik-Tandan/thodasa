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

// A single rate per category is too coarse for food, and this app's whole claim
// is that the tax figure is real. Within `snacks` alone the true slabs run from
// 5% (spices, tea) through 12% (namkeen, noodles) and 18% (biscuits, chocolate)
// to 28% plus a 12% compensation cess (aerated drinks). Limca was showing 12%.
//
// Tokens are word-bounded with an optional plural: earlier passes over this
// catalog were bitten repeatedly by substring matches - /lassi/ hit "Classics",
// /salt/ hit "Salted", /gin/ hit "Virgin", and a trailing \b broke every plural.
const FOOD_SLABS = [
  // 28% + 12% cess: aerated and caffeinated energy drinks
  [/\bcolas?\b|\bsodas?\b|aerated|carbonated|sprite|limca|fanta|pepsi|thums ?up|mirinda|mountain dew|7up|appy fizz|energy drink|red bull|\bsting\b|monster/, 28],
  // 18%: sugar confectionery, baked goods, bottled water, ice cream, cereal
  [/biscuits?\b|cookies?\b|chocolates?\b|candy|candies|toffee|cakes?\b|pastry|rusk|jams?\b|\bwaters?\b|mineral|bisleri|kinley|aquafina|ice ?cream|kulfi|custard|cornflakes|muesli|granola|munch|kitkat|oreo|bourbon|marie|jimjam|good day|monaco|krackjack/, 18],
  // 12% BEFORE the 5% staples band on purpose: "Masala Noodles" and "Masala Sev"
  // are noodles and namkeen with a masala flavour, not spices, and the earlier
  // ordering taxed them at 5%. Product type has to win over flavour words.
  [/namkeen|bhujia|\bsevs?\b|farsan|murmura|noodles?\b|pasta|vermicelli|wafers?\b|\bchips\b|lays?\b|kurkure|bingo|pringles|chipps|\bbutter\b(?! ?milk)|cheese|\bjuices?\b|nectar|squash|frooti|maaza|\bslice\b|ketchup|kissan|sauces?\b|pickle|chutney|honey|\boats?\b|soya|sticks?\b/, 12],
  // 5%: kitchen staples, dairy drinks, tea and coffee
  [/\bteas?\b|coffee|cofe\b|\bmilks?\b|\bdahi\b|curd|yoghurt|yogurt|paneer|\blassi\b|butter ?milk|chaas\b|\bspices?\b|\bmasalas?\b|\bsalts?\b|\bsugars?\b|\battas?\b|\bdals?\b|\brice\b|\bflours?\b|besan|poha|suji|maida|papad|\bghee\b/, 5],
]

const FOOD_CATEGORIES = new Set(['snacks', 'grocery', 'icecream'])

export const gstRate = (product) => {
  const base = RATES[product.category] ?? 18
  // the two slabs that genuinely depend on price point
  if (product.category === 'fashion') return product.price <= 1000 ? 5 : 12
  if (product.category === 'shoes') return product.price <= 1000 ? 12 : 18
  if (FOOD_CATEGORIES.has(product.category)) {
    const hay = `${product.brand} ${product.baseName ?? product.name ?? ''}`.toLowerCase()
    for (const [re, rate] of FOOD_SLABS) if (re.test(hay)) return rate
  }
  return base
}

// Compensation cess, charged on top of GST. Aerated drinks carry 12%; the
// vehicle rates already live in lib/duty.js for imported goods.
export const cessRate = (product) => {
  if (!FOOD_CATEGORIES.has(product.category)) return 0
  const hay = `${product.brand} ${product.baseName ?? product.name ?? ''}`.toLowerCase()
  return /\bcolas?\b|\bsodas?\b|aerated|carbonated|sprite|limca|fanta|pepsi|thums ?up|mirinda|mountain dew|7up|appy fizz|energy drink|red bull|\bsting\b|monster/.test(hay) ? 12 : 0
}

// Price is tax-inclusive, so back out the components.
export const taxBreakdown = (items) => {
  let taxable = 0, gst = 0, cess = 0
  const bySlab = {}
  for (const { product, qty } of items) {
    const gross = product.price * qty
    const rate = gstRate(product)
    const cRate = cessRate(product)
    // MRP is inclusive of both GST and any compensation cess
    const net = gross / (1 + rate / 100 + cRate / 100)
    const tax = net * (rate / 100)
    const cs = net * (cRate / 100)
    taxable += net
    gst += tax
    cess += cs
    bySlab[rate] = (bySlab[rate] || 0) + tax
  }
  return {
    taxable: Math.round(taxable),
    gst: Math.round(gst),
    cess: Math.round(cess),
    bySlab: Object.entries(bySlab)
      .map(([rate, amt]) => ({ rate: Number(rate), amount: Math.round(amt) }))
      .filter((x) => x.amount > 0)
      .sort((a, b) => a.rate - b.rate),
  }
}
