# ThodaSa — retail therapy for India, without the bill

**Live: [thodasa.com](https://thodasa.com)** · no login, nothing is actually sold

*Thoda sa treat toh banta hai.*

Retail therapy is a real habit — people browse Myntra, Amazon and Nykaa, fill a
cart, feel the little hit of choosing things, and never check out. ThodaSa is
that experience on purpose: a **reels-style shopping feed** where you swipe one
product per screen, add whatever you like, "order" it, watch it ship — and pay
nothing, because nothing is real.

Think Instagram Reels crossed with Myntra. Built as a React SPA with **no
backend at all**: the recommender, the cart, the orders and the gamification all
live in your browser.

---

## What's interesting about it

### A recommendation engine with no server
Every product is embedded as a feature vector (category one-hot, price bucket,
deal flag, rating flag). Your taste profile is a running weighted sum of the
vectors of things you engage with, decayed 15% per session so recent behaviour
dominates. Ranking is **cosine similarity** between profile and product, plus
jitter, minus a seen-fatigue penalty. About 100 lines, no ML dependency, and the
whole profile is one array in `localStorage`.

Signals are weighted by intent — purchase +10, add-to-cart +8, wishlist +5,
share +4, long dwell +2, quick skip −1 — with dwell measured by an
`IntersectionObserver` at a 60% visibility threshold. Every third feed slot is
reserved for a low-affinity pick, because pure exploitation collapses into an
echo chamber within about twenty swipes.

**Where it breaks down:** it can never do collaborative filtering — "people like
you also liked" needs cross-user data, which is exactly what client-only cannot
have. Past roughly 20k products the `localStorage` ceiling and per-load scoring
cost stop being viable.

### Real Indian tax and customs modelling
Every price breaks down into where the money actually goes. A ₹55,00,000 BMW is
₹20,00,000 of car and ₹34,00,000 of government:

| | |
|---|---|
| Product value (CIF, landed) | ₹20,71,563 |
| Basic customs duty @ 70% | ₹14,50,094 |
| Social welfare surcharge @ 10% of duty | ₹1,45,009 |
| GST compensation cess @ 22% | ₹8,06,667 |
| IGST @ 28% | ₹10,26,667 |

Real slabs per goods type — 70% duty on cars and toys, 2.5% on private
aircraft, 3% GST on jewellery, 28% on cars, and **0% on printed books** because
they are genuinely exempt. Indian MRP is tax-inclusive by law, so every figure
is *extracted* from the listed price rather than added to it.

### Genuinely real product data where it exists
- **Groceries and snacks** — real packs, brands and photographs from
  [Open Food Facts](https://world.openfoodfacts.org) (Parle-G, Britannia
  Bourbon, Maggi, Amul, Thums Up, Balaji Wafers, Bisleri)
- **Books** — real covers via the [Open Library](https://openlibrary.org) ISBN API
- **K-pop albums** — real album art via the public iTunes Search API
- **Everything else** — curated stock photography, every image eyeballed against
  its product name

### The rest
- **Progressive unlocks** — coins earned by browsing buy access to the absurd
  tiers (Art 150 → Real Estate 2500), so coins finally have a sink
- **Order tracking** with per-category delivery estimates: groceries arrive
  tomorrow, K-pop merch ships from Korea in ~3 weeks, private jets are built to
  order over ~11 months
- **Typo-tolerant search** — exact substring first, then a length-scaled
  Levenshtein pass (`chps` → Potato Chips, `airpds` → AirPods Pro 2)
- **Shareable state** — `/?c=beauty&p=396` restores the category and scrolls to
  the product; a haul can be shared as a generated receipt card
- Guilt-free cart meter, daily drops, streaks, spin-to-win, dark mode, and
  ~5,900 SKUs across 24 categories from ₹5 biscuits to ₹650 crore jets

---

## Stack

React 18 · Vite 6 · Tailwind v4 · no backend, no database, no auth · deployed
as static files to GitHub Pages

```bash
npm install
npm run dev      # dev server
npm run build    # bundle + generate static share pages and sitemap
npm run reel     # render a demo reel with Playwright
```

`npm run build` also emits ~750 static per-product pages with Open Graph and
JSON-LD for link unfurls and search.

---

## Honest notes

Nothing is for sale and no payment is ever taken — product sheets link out to an
Amazon search if you want the real thing. Real brand names appear for
recognisability in a non-commercial demo. The tax and duty figures are
indicative: real landed cost also carries freight, insurance and importer
margin, which the breakdown bundles into "product value".

Built in public by [Bhaumik Tandan](https://github.com/Bhaumik-Tandan) ·
[@TandanBhaumik](https://x.com/TandanBhaumik)
