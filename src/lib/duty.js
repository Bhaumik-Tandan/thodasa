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

import { gstRate, cessRate } from './tax.js'

// Brands manufactured/assembled in India — GST only, no customs.
// Imported-or-not used to be decided by an allowlist of DOMESTIC brands, which
// meant anything unlisted was treated as imported and charged 20% basic customs
// duty. 230 of 315 brands fell through — almost all of them the invented Indian
// ones (Slurpp, Doodhwala, MasalaGhar, Namkeen Bros, PowerPeti), so most of the
// catalog showed inflated tax. An allowlist of domestic brands can never keep
// up either, because the daily cron invents new Indian names every morning.
//
// Inverted: foreign brands are the finite, knowable set. Everything else is
// Indian by default, which is also the right default for the Indian FMCG that
// Open Food Facts feeds in.
const FOREIGN = new Set([
  // cars & bikes
  'BMW', 'BMW Motorrad', 'Audi', 'Mercedes-Benz', 'Mercedes-AMG', 'Porsche', 'Ferrari',
  'Lamborghini', 'Bugatti', 'Pagani', 'Koenigsegg', 'McLaren', 'Rolls-Royce', 'Toyota',
  'Ducati', 'Harley-Davidson', 'Kawasaki', 'KTM', 'Yamaha',
  // aircraft
  'Airbus', 'Bombardier', 'Cessna', 'Dassault', 'Embraer', 'Gulfstream', 'HondaJet', 'Pilatus',
  'Beechcraft', 'Daher', 'Piper', 'Cirrus', 'Diamond', 'Robinson', 'Bell', 'Leonardo', 'Sikorsky',
  // electronics & appliances
  'Apple', 'Samsung', 'Sony', 'JBL', 'Dyson', 'Xiaomi', 'LG', 'Philips', 'Bosch', 'Casio',
  'iRobot', 'Honeywell', '70mai', 'DDPAI', 'Instant', 'LEGO', 'Hot Wheels',
  'Dell', 'Lenovo', 'MSI', 'HP',
  // watches & luxury
  'Rolex', 'Omega', 'TAG Heuer', 'Tissot', 'Richard Mille', 'Patek Philippe', 'Hublot',
  'Seiko', 'Louis Vuitton', 'Hermès', 'Chanel', 'Gucci',
  'Prada', 'Dior', 'Balenciaga', 'Versace',
  // fashion & footwear
  'Nike', 'Adidas', 'Puma', 'New Balance', 'Converse', 'Crocs', 'Birkenstock', 'Levi\'s',
  'Steve Madden', 'Zara', 'H&M', 'Uniqlo', 'SHEIN', 'Forever 21', 'Vero Moda', 'ONLY',
  'Accessorize',
  // beauty
  'MAC', 'NARS', 'Maybelline', 'Neutrogena', 'Cetaphil', 'The Ordinary', 'Huda Beauty',
  'Charlotte Tilbury', 'Fenty Beauty', 'Rare Beauty', 'e.l.f.', 'Sephora Collection',
  // food & drink brands that are genuinely imported
  'Red Bull', 'Hershey\'s', 'Kellogg\'s', 'Lay\'s', 'Cadbury', 'Kitkat', 'Passendale',
  'American garden', 'Bird\'s', 'Dongsuh Foods Corp', 'Faber-Castell',
  // k-pop merch ships from Korea
  'BTS', 'BLACKPINK', 'Stray Kids', 'SEVENTEEN', 'TWICE', 'NewJeans', 'aespa', 'ENHYPEN',
  'EXO', 'LE SSERAFIM',
  // imported property developers
  'Emaar', 'Damac', 'Nakheel',
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

export const isImported = (p) => {
  if (p.category === 'realty') return false // buildings do not clear customs
  return FOREIGN.has(p.brand)
}

// The arithmetic, on plain rates rather than on a catalog product.
//
//   MRP = A·(1 + b + 0.1b)·(1 + g + c)
// so A = MRP / ((1 + 1.1b)·(1 + g + c))
//
// Split out from landedBreakdown so the standalone calculator at /duty/ and the
// product cards run the SAME function. Two copies of this formula would drift,
// and a tax figure that disagrees with itself across two pages of the same site
// is worse than not showing one at all.
export const landedFrom = ({ mrp, bcdRate = 0, gstRate = 0, cessRate = 0 }) => {
  const b = bcdRate / 100
  const g = gstRate / 100
  const c = cessRate / 100

  const assessable = mrp / ((1 + 1.1 * b) * (1 + g + c))
  const bcd = assessable * b
  const sws = bcd * 0.1
  const taxBase = assessable + bcd + sws
  const igst = taxBase * g
  const cess = taxBase * c

  const r = Math.round
  return {
    mrp: r(mrp),
    assessable: r(assessable),
    bcd: r(bcd),
    bcdRate: Math.round(b * 1000) / 10,
    sws: r(sws),
    igst: r(igst),
    igstRate: Math.round(g * 1000) / 10,
    cess: r(cess),
    cessRate: Math.round(c * 1000) / 10,
    govtTotal: r(bcd + sws + igst + cess),
    govtShare: mrp > 0 ? Math.round(((bcd + sws + igst + cess) / mrp) * 100) : 0,
  }
}

// Goods types for the standalone calculator, keyed to the same BCD and GST
// tables the catalog uses. `imported` decides whether customs applies at all.
// Rates are the indicative headline slabs — real classification runs on an
// 8-digit HSN code and the page says so.
export const GOODS = [
  { id: 'phone', label: 'Phone or tablet', cat: 'gadgets', gst: 18, bcd: 20 },
  { id: 'laptop', label: 'Laptop or computer', cat: 'gadgets', gst: 18, bcd: 20 },
  { id: 'audio', label: 'Headphones, speakers, wearables', cat: 'gadgets', gst: 18, bcd: 20 },
  { id: 'camera', label: 'Camera or lens', cat: 'gadgets', gst: 18, bcd: 20 },
  { id: 'watch', label: 'Wristwatch', cat: 'watches', gst: 18, bcd: 20 },
  { id: 'jewellery', label: 'Gold or silver jewellery', cat: 'jewels', gst: 3, bcd: 20 },
  { id: 'bag', label: 'Handbag, luggage, leather goods', cat: 'luxe', gst: 18, bcd: 20 },
  { id: 'perfume', label: 'Perfume or cosmetics', cat: 'beauty', gst: 18, bcd: 20 },
  { id: 'clothing', label: 'Clothing (above ₹1,000)', cat: 'fashion', gst: 12, bcd: 20 },
  { id: 'footwear', label: 'Footwear (above ₹1,000)', cat: 'shoes', gst: 18, bcd: 20 },
  { id: 'car', label: 'Car (fully built import)', cat: 'cars', gst: 28, bcd: 70, cess: 22 },
  { id: 'bike', label: 'Motorcycle', cat: 'bikes', gst: 28, bcd: 50, cess: 3 },
  { id: 'toy', label: 'Toys and games', cat: 'toys', gst: 12, bcd: 70 },
  { id: 'book', label: 'Printed books', cat: 'books', gst: 0, bcd: 0 },
  { id: 'stationery', label: 'Stationery', cat: 'stationery', gst: 12, bcd: 10 },
  { id: 'homeware', label: 'Homeware and kitchen', cat: 'home', gst: 18, bcd: 20 },
  { id: 'food', label: 'Packaged food and snacks', cat: 'snacks', gst: 12, bcd: 30 },
  { id: 'softdrink', label: 'Aerated or energy drink', cat: 'snacks', gst: 28, bcd: 30, cess: 12 },
  { id: 'staples', label: 'Kitchen staples (atta, dal, rice)', cat: 'grocery', gst: 5, bcd: 30 },
]

// Break an inclusive MRP into duty, surcharge, cess, GST and what's left.
export const landedBreakdown = (product, qty = 1) => {
  const imported = isImported(product)
  return {
    imported,
    ...landedFrom({
      mrp: product.price * qty,
      bcdRate: imported ? (BCD[product.category] ?? 20) : 0,
      gstRate: gstRate(product),
      cessRate: imported ? (CESS[product.category] ?? 0) : cessRate(product),
    }),
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
