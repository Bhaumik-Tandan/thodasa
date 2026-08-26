// "Find it for real" outbound links — the Pinterest model: the card is
// inspiration, the link takes you somewhere you can actually buy.
//
// These are SEARCH links, not product links, and deliberately so:
//   * a specific product URL needs a real ASIN/PID, which we have no reliable
//     way to obtain, and those links rot within months
//   * roughly half the catalog is fictional brands (Slurpp, Glowuh, DabbaDost)
//     that have no product page anywhere
// A search always resolves to something useful and never 404s.

// Brands in the catalog that genuinely exist, so it helps to include the brand
// name in the query. Everything not listed here is one of our invented brands
// and gets searched by product name alone — searching "Slurpp 2-Minute Masala
// Noodles" returns nothing, "2-Minute Masala Noodles" returns the real thing.
const REAL_BRANDS = new Set([
  // apparel & footwear
  'Van Heusen', 'Allen Solly', 'Peter England', 'Pantaloons', 'H&M', 'Rare Rabbit',
  'Louis Vuitton', 'Zara', 'Uniqlo', 'Levi\'s', 'Vero Moda', 'ONLY', 'Forever 21',
  'SHEIN', 'Urbanic', 'Roadster', 'FabIndia', 'Raymond', 'Balenciaga', 'Prada',
  'Versace', 'Gucci', 'Dior', 'Chanel', 'Hermès', 'Nike', 'Adidas', 'Puma',
  'Converse', 'New Balance', 'Crocs', 'Birkenstock', 'Bata', 'Relaxo', 'Metro',
  'Steve Madden',
  // beauty
  'Lakme', 'Maybelline', 'MAC', 'NARS', 'Huda Beauty', 'Fenty Beauty', 'Rare Beauty',
  'Charlotte Tilbury', 'e.l.f.', 'Sephora Collection', 'Kay Beauty', 'Mamaearth',
  'Forest Essentials', 'Kama Ayurveda', 'The Ordinary', 'Cetaphil', 'Neutrogena',
  'VLCC', 'Dyson',
  // electronics & home
  'Apple', 'Sony', 'JBL', 'Philips', 'Prestige', 'Preethi', 'Godrej', 'iRobot',
  'Nilkamal', 'Urban Ladder', 'Pepperfry', 'Wakefit', 'Jaipur Rugs', 'Chumbak',
  'Camel', 'Faber-Castell',
  // watches & jewellery
  'Titan', 'Casio', 'Rolex', 'Omega', 'TAG Heuer', 'Tissot', 'Pipa Bella',
  'Zaveri Pearls', 'Accessorize',
  // grocery
  'Amul', 'Mother Dairy', 'Epigamia', 'Nandini',
  // toys
  'LEGO', 'Hot Wheels',
  // k-pop (album/merch searches genuinely work)
  'BTS', 'BLACKPINK', 'Stray Kids', 'SEVENTEEN', 'TWICE', 'NewJeans', 'aespa',
  'EXO', 'ENHYPEN', 'LE SSERAFIM',
])

// Categories where an outbound shopping link is meaningless — you cannot buy a
// Pagani or a Dubai island on Amazon, and pretending otherwise looks silly.
const NO_LINK = new Set(['realty', 'jets', 'cars', 'bikes'])

export const canShop = (p) => !NO_LINK.has(p.category)

export const shopTarget = () => 'Amazon'

// product.name / baseName already begin with the brand, so strip it before
// deciding whether the brand belongs in the query — otherwise every search
// reads "LEGO LEGO Star Wars ..." and invented brands leak through.
const withoutBrand = (p) => {
  const name = p.baseName ?? p.name
  const bare = name.startsWith(p.brand) ? name.slice(p.brand.length).trim() : name
  // drop trailing qualifiers like "(Album)" that only add noise to a search
  return bare.replace(/\s*\([^)]*\)\s*$/, '').trim() || name
}

const query = (p) => {
  // Books: title + author is the highest-signal query available.
  if (p.category === 'books') {
    const author = /^by ([^·]+)·/.exec(p.desc)?.[1]?.trim()
    const title = withoutBrand(p)
    return author ? `${title} ${author}` : title
  }
  const bare = withoutBrand(p)
  return REAL_BRANDS.has(p.brand) ? `${p.brand} ${bare}` : bare
}

// Amazon Associates tracking id. Empty until the account is approved — every
// outbound click before this was set earned exactly nothing, which quietly made
// the whole affiliate model theoretical. Set it and the same clicks start
// paying; leave it empty and the links still work, just unattributed.
//
// Amazon India requires 3 qualifying sales within 180 days of signup or they
// close the account, so this is deliberately not filled in with a guess.
export const AMAZON_TAG = ''

// True only when we actually stand to earn from the link. The UI keys its
// disclosure off this, so the site never claims a commercial relationship it
// does not have — and never hides one it does.
export const isAffiliate = () => AMAZON_TAG.length > 0

// Amazon's /s?k= search endpoint is stable and well known. (Myntra would suit
// apparel better, but its search URL format is not something to guess at.)
export const shopUrl = (p) => {
  const url = `https://www.amazon.in/s?k=${encodeURIComponent(query(p))}`
  return AMAZON_TAG ? `${url}&tag=${encodeURIComponent(AMAZON_TAG)}` : url
}
