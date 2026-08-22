// Full Indian landed-cost model: customs duty, surcharge, cess and GST.
//
// Why this exists: a Pagani listed at ~$2.6M abroad sells for ~3x that in
// India, and people assume the shop is gouging. It isn't — it's duty. This
// module breaks an MRP down into what the government takes and what's left.
//
// The chain for an imported good:
//   assessable (CIF) value
//   + Basic Customs Duty (BCD)              — rate by goods type
//   + Social Welfare Surcharge (10% of BCD)
//   = value for tax
//   + IGST (the item's GST slab, on that value)
//   + GST Compensation Cess (luxury/demerit goods only)
//
// Domestic goods skip customs entirely and just carry GST.
//
// MRP is tax-inclusive in India, so everything here is *extracted* from the
// listed price, never added to it.

import { gstRate } from './tax.js'

// Brands manufactured/assembled in India — GST only, no customs.
const DOMESTIC = new Set([
  'Amul', 'Parle', 'Britannia', 'Mother Dairy', 'Tata', 'Maggi', 'Nestlé', 'Bisleri',
  'Thums up', 'Balaji', 'Balaji Wafers', 'Haldiram', 'Vadilal', 'Havmor', 'Naturals',
  'Arun', 'Cream Bell', 'Kwality Wall\'s', 'Epigamia', 'Nandini', 'Sting', 'Kissan',
  'Lakme', 'Mamaearth', 'Forest Essentials', 'Kama Ayurveda', 'VLCC', 'Kay Beauty',
  'Titan', 'FabIndia', 'Raymond', 'Peter England', 'Van Heusen', 'Allen Solly',
  'Pantaloons', 'Rare Rabbit', 'Urbanic', 'Roadster', 'Bata', 'Relaxo', 'Metro',
  'Godrej', 'Prestige', 'Preethi', 'Nilkamal', 'Urban Ladder', 'Pepperfry', 'Wakefit',
  'Jaipur Rugs', 'Chumbak', 'Royal Enfield', 'Bajaj', 'Mahindra', 'Maruti Suzuki',
  'Zaveri Pearls', 'Pipa Bella', 'Camel', 'Quaker',
])

// Basic Customs Duty by goods type (indicative real slabs).
const BCD = {
  cars: 70,        // CBU above the value threshold
  bikes: 50,
  toys: 70,        // duty was raised to 70% to push local manufacture
  jets: 2.5,       // private aircraft come in light
  snacks: 30,      // imported food preparations
  icecream: 30,
  grocery: 30,
  beauty: 20,
  gadgets: 20,
  luxe: 20,
  watches: 20,
  fashion: 20,
  shoes: 20,
  accessories: 20,
  jewels: 20,
  kpop: 20,
  home: 20,
  kitchen: 20,
  stationery: 10,
  quirky: 20,
  art: 10,
  books: 0,        // printed books enter duty-free
  realty: 0,       // not a physical import
}

// GST Compensation Cess — luxury and demerit goods.
const CESS = { cars: 22, bikes: 3 }

export const isImported = (p) =>
  !DOMESTIC.has(p.brand) && p.category !== 'realty' && !(p.brand === 'Generic' || p.brand === 'ThodaSa')

// Break an inclusive MRP into duty, surcharge, cess, GST and what's left.
//
//   MRP = A·(1 + b + 0.1b)·(1 + g + c)
// so A = MRP / ((1 + 1.1b)·(1 + g + c))
export const landedBreakdown = (product, qty = 1) => {
  const mrp = product.price * qty
  const imported = isImported(product)
  const g = gstRate(product) / 100
  const b = imported ? (BCD[product.category] ?? 20) / 100 : 0
  const c = imported ? (CESS[product.category] ?? 0) / 100 : 0

  const assessable = mrp / ((1 + 1.1 * b) * (1 + g + c))
  const bcd = assessable * b
  const sws = bcd * 0.1
  const taxBase = assessable + bcd + sws
  const igst = taxBase * g
  const cess = taxBase * c

  const r = Math.round
  return {
    imported,
    mrp,
    assessable: r(assessable),
    bcd: r(bcd),
    bcdRate: Math.round(b * 1000) / 10,
    sws: r(sws),
    igst: r(igst),
    igstRate: Math.round(g * 1000) / 10,
    cess: r(cess),
    cessRate: Math.round(c * 1000) / 10,
    govtTotal: r(bcd + sws + igst + cess),
    govtShare: Math.round(((bcd + sws + igst + cess) / mrp) * 100),
  }
}

// Aggregate across a basket, for the checkout invoice.
export const basketDuties = (items) => {
  let assessable = 0, bcd = 0, sws = 0, igst = 0, cess = 0, imported = 0
  for (const { product, qty } of items) {
    const d = landedBreakdown(product, qty)
    assessable += d.assessable
    bcd += d.bcd
    sws += d.sws
    igst += d.igst
    cess += d.cess
    if (d.imported) imported += 1
  }
  const r = Math.round
  return {
    assessable: r(assessable), bcd: r(bcd), sws: r(sws), igst: r(igst), cess: r(cess),
    hasImports: imported > 0,
    govtTotal: r(bcd + sws + igst + cess),
  }
}
