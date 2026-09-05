// Dubai vs India price comparisons — the data and the tax model for both sides.
//
// Why this page type exists: the jet niche we rank for turned out to be real
// but tiny (3-8 searches/week per query). "iphone price in dubai vs india" is
// the same intent — "how much of what I pay is the government" — at orders of
// magnitude more volume, answered today by stale forum threads. Our angle is
// the only honest one: the gap IS the tax, and we compute BOTH sides, including
// the part every blog skips — what Indian customs takes when you bring it back.
//
// UAE model (kept simple and true):
//   * 5% VAT on consumer goods, and displayed retail prices are VAT-INCLUSIVE
//     by UAE regulation — so VAT is extracted from the shelf price (price×5/105),
//     exactly like extracting GST from Indian MRP.
//   * Tourists can reclaim VAT on departure via the Planet Tax Free scheme:
//     85% of the VAT, less a small per-tag fee. We credit 85% and say so.
//   * No excise on the goods listed here (UAE excise hits tobacco, energy
//     drinks, carbonated drinks and vapes — none of which a tourist hauls back).
//
// India re-entry (the part nobody computes):
//   * Residents returning get a ₹50,000 duty-free baggage allowance; above it,
//     baggage is charged a flat 35% + 10% surcharge on the duty = 38.5% of the
//     excess. Declared honestly, this eats most of the famous "Dubai saving".
//
// FX: AED is pegged to the dollar; ₹/AED drifts with ₹/$. One stated rate,
// used everywhere and printed on the page so the arithmetic is checkable.
export const AED_INR = 23

export const UAE_VAT = 5 // %
export const REFUND_SHARE = 0.85 // Planet Tax Free pays ~85% of the VAT
export const BAGGAGE_ALLOWANCE = 50000 // ₹, returning resident
export const BAGGAGE_RATE = 38.5 // % on the excess (35% + 10% surcharge on duty)

// Indicative launch/list prices, both sides. India figures match the catalog
// where the product exists there. `goods` maps to the calculator's goods table
// for the India-side duty story on the product page.
export const VS_DUBAI = [
  { name: 'iPhone 16 Pro Max (256GB)', slug: 'iphone-16-pro-max', inr: 144900, aed: 5099, goods: 'phone' },
  { name: 'iPhone 16 Pro (128GB)', slug: 'iphone-16-pro', inr: 119900, aed: 4299, goods: 'phone' },
  { name: 'iPhone 16 (128GB)', slug: 'iphone-16', inr: 79900, aed: 3399, goods: 'phone' },
  { name: 'MacBook Air 13 (M4)', slug: 'macbook-air-13', inr: 99900, aed: 4199, goods: 'laptop' },
  { name: 'MacBook Pro 14 (M4)', slug: 'macbook-pro-14', inr: 169900, aed: 6499, goods: 'laptop' },
  { name: 'iPad Pro 11 (M4)', slug: 'ipad-pro-11', inr: 99900, aed: 3999, goods: 'phone' },
  { name: 'AirPods Pro 2', slug: 'airpods-pro-2', inr: 24900, aed: 949, goods: 'audio' },
  { name: 'Apple Watch Ultra 2', slug: 'apple-watch-ultra-2', inr: 89900, aed: 3199, goods: 'watch' },
  { name: 'Samsung Galaxy S24 Ultra', slug: 'galaxy-s24-ultra', inr: 129999, aed: 4599, goods: 'phone' },
  { name: 'PlayStation 5 (Disc)', slug: 'playstation-5', inr: 54990, aed: 2099, goods: 'audio' },
  { name: 'Sony WH-1000XM5', slug: 'sony-wh-1000xm5', inr: 29990, aed: 1099, goods: 'audio' },
  { name: 'Dyson V15 Detect', slug: 'dyson-v15', inr: 62900, aed: 2699, goods: 'homeware' },
  { name: 'Chanel No. 5 (100ml EDP)', slug: 'chanel-no-5', inr: 16500, aed: 620, goods: 'perfume' },
  // Real India boutique retail, NOT the catalog's concept-demo price — the
  // catalog lists the Submariner at ₹1.25cr for theatre, and comparing a real
  // Dubai price against a fantasy Indian one produced a "₹1.12 crore saving"
  // that would have torched this page's credibility on sight.
  { name: 'Rolex Submariner Date', slug: 'rolex-submariner', inr: 1050000, aed: 41500, goods: 'watch' },
]

// The whole comparison, one place, one set of rules. Everything the page
// prints comes out of this function so page and reality cannot drift.
export const compareDubai = (item) => {
  const dubaiInr = Math.round(item.aed * AED_INR)
  const vatInside = Math.round((dubaiInr * UAE_VAT) / (100 + UAE_VAT))
  const refund = Math.round(vatInside * REFUND_SHARE)
  const dubaiAfterRefund = dubaiInr - refund
  const naiveSaving = item.inr - dubaiInr

  // declared honestly at Indian customs on the way home
  const excess = Math.max(0, dubaiAfterRefund - BAGGAGE_ALLOWANCE)
  const baggageDuty = Math.round((excess * BAGGAGE_RATE) / 100)
  const landedHome = dubaiAfterRefund + baggageDuty
  const honestSaving = item.inr - landedHome

  return { dubaiInr, vatInside, refund, dubaiAfterRefund, naiveSaving, baggageDuty, landedHome, honestSaving }
}
