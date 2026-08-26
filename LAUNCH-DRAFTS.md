# Launch post drafts — 24 Aug 2026

Angle for all of these: **lead with the duty calculator, not the storefront.**
The store is the marketing; the landed-cost engine is the thing a stranger
would actually bookmark. Your own data says so — the duty content outperformed
everything else ~100×, and today's deep sessions all arrived with intent.

---

## 1. Show HN

**Title** (80 char limit; this is 74)

    Show HN: I calculated how much of every Indian price is tax and duty

**URL**

    https://thodasa.com

**First comment** (post immediately after submitting — this is what people read)

> I kept seeing "why is the iPhone so expensive in India" threads where nobody
> could actually answer with numbers, so I built the calculator and then wrapped
> a storefront around it to make it browsable.
>
> The arithmetic is the interesting part. Indian MRP is tax-inclusive, so you
> can't add tax to a price — you have to extract it. For an imported good the
> assessable value solves backwards out of
>
>     A = MRP / ((1 + 1.1b)(1 + g + c))
>
> where b is basic customs duty, the 1.1 is the 10% social welfare surcharge
> levied on the duty (not the goods), g is IGST and c is compensation cess.
> Get the order wrong and you overstate the tax by a wide margin.
>
> Some results that surprised me: an iPhone 16 Pro Max at ₹1,44,900 carries
> ₹44,247 of duty and IGST — 31% of what you pay. A Rolex Submariner is also
> 31%. An aerated drink is 28% GST *plus* a 12% compensation cess, so a ₹40
> bottle is taxed harder than a ₹40,000 laptop.
>
> No backend — it's static files on GitHub Pages. The recommender embeds each
> product as a feature vector and ranks by cosine similarity against a profile
> built from your dwell time, all in localStorage. Cost to run: zero.
>
> The GST slabs are indicative and I'd genuinely like corrections — the food
> categories were the hardest to get right and I've already had to fix noodles
> vs spices once.

---

## 2. r/india  (or r/IndiaTax / r/personalfinanceindia — see note below)

**Title**

    I worked out how much of what you pay is actually tax — iPhone 16 Pro Max is 31%, a cold drink is 40%

**Body** — *no link in the body; put thodasa.com in the first comment*

> Indian MRP includes tax, which means the number on the sticker already has
> GST baked in. You can't add 18% to find the tax — you have to work backwards
> out of the price. For imported stuff it's worse, because the 10% social
> welfare surcharge is charged on the customs duty rather than on the goods.
>
> Some things I found once I actually did the arithmetic:
>
> - **iPhone 16 Pro Max, ₹1,44,900** — ₹44,247 is customs duty + surcharge +
>   IGST. **31%**.
> - **Rolex Submariner, ₹12,50,000** — also **31%**. Luxury goods aren't taxed
>   as differently as you'd think.
> - **Mahindra Thar, ₹11,00,000** — ₹2,40,625 GST at 28%, so **22%** of the
>   on-road price. Made in India, so no duty.
> - **A cold drink** — 28% GST *plus* 12% compensation cess. Proportionally
>   taxed harder than a laptop.
>
> I built it out as a browsable thing for ~900 products because I wanted to
> check my own numbers against categories I don't buy from. Slabs are
> indicative and I've already had to correct one (masala noodles are 12%, not
> the 5% staples rate — they're noodles, not spices). Corrections welcome,
> genuinely.

**Note on subreddit choice:** r/india removes most link posts. r/IndiaTax and
r/personalfinanceindia are smaller but far more receptive to this specific
content, and the audience is closer to the intent we want. Start there.

---

## 3. Indie Hackers

**Title**

    Zero backend, 893 pages, ₹0 hosting — what a static site can still do in 2026

**Body**

> ThodaSa is a reels-style shopping feed for India with no server at all. Worth
> writing up because the constraint turned out to be more interesting than
> limiting.
>
> - **Recommender in the browser.** Each product is a feature vector; the feed
>   ranks by cosine similarity against a taste profile built from dwell time
>   measured with an IntersectionObserver. Session decay 0.85. All localStorage.
> - **893 prerendered product pages** generated at build time, each with its own
>   Product JSON-LD and a real landed-cost table in the HTML. Google indexes
>   them fine — I checked, the rich results validate.
> - **Hosting cost: zero.** GitHub Pages, deployed from a daily GitHub Action
>   that also refreshes the catalog from Open Food Facts.
>
> The honest part: I measured the unit economics and they're brutal. At the
> current outbound click rate, affiliate commission works out to **₹0.055 per
> session** — you'd need 91,000 sessions a month to make ₹5,000. So I stopped
> optimising for traffic and started optimising for intent, because a session
> that arrived searching "import duty on iPhone in India" is worth ~10× a
> session that arrived from a funny tweet.
>
> Happy to go into the client-side recommender or the tax modelling if either
> is useful to anyone.
