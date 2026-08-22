---
title: I built a TikTok-style shopping feed with a recommender system — in pure client-side JS
published: true
tags: javascript, react, webdev, sideproject
canonical_url: https://thodasa.com
---

**TL;DR:** I built [ThodaSa](https://thodasa.com) — a reels-style impulse-shopping demo for the Indian market. You scroll products like Instagram reels, and the feed *learns your taste* — with no backend, no login, and no tracking servers. The whole recommender is ~150 lines of client-side JavaScript. [Code is on GitHub](https://github.com/Bhaumik-Tandan/thodasa).

## The idea

Quick-commerce apps in India (Blinkit, Zepto, Meesho) figured out something interesting: shopping *is* entertainment. I wanted to push that to its logical end — what if the store was literally a reels feed? One product per screen, full-bleed photo, swipe up for the next dopamine hit, everything under ₹499.

And because a feed is boring if it's the same for everyone, it needed a recommender system. The catch: this is a static site on GitHub Pages. No servers. So the recommender had to live entirely in the browser.

## Products as vectors

Every product gets embedded as a 13-dimensional feature vector — no ML libraries, just an array:

```js
// [0..7] category one-hot (snacks, beauty, gadgets, home, ...)
// [8..10] price bucket one-hot (low ≤150, mid 151–300, high >300)
// [11] deal flag
// [12] highly-rated flag (≥4.5)
export const vecOf = (p) => {
  const v = new Array(13).fill(0)
  v[CATS.indexOf(p.category)] = 1
  v[p.price <= 150 ? 8 : p.price <= 300 ? 9 : 10] = 1
  if (p.deal) v[11] = 1
  if (p.rating >= 4.5) v[12] = 1
  return v
}
```

## The taste profile

The user's taste is a weighted running sum of the vectors they engage with, persisted in `localStorage`:

| Signal | Weight |
|---|---|
| Purchase | +10 |
| Add to cart | +8 |
| Wishlist | +5 |
| Share | +4 |
| Dwell > 4s on a card | +2 |
| Flick past in < 1.2s | −1 |
| Un-wishlist | −3 |

Dwell time comes from an `IntersectionObserver` on the snap-scroll feed — if you pause on a card, that's a signal; if you flick past it instantly, that's a signal too. Every new session decays the profile by 0.85, so recent taste dominates.

## Ranking = cosine similarity + deliberate randomness

On each visit, every product is scored:

```js
score = cosine(profile, vecOf(product))
      + Math.random() * 0.15                    // jitter
      - Math.min(seenCount, 5) * 0.06           // fatigue penalty
```

Then the feed interleaves: two "exploit" cards (best matches, badged ✨ For you) for every one "explore" card (random from the long tail, badged 🎲 Fresh find). Pure exploitation makes an echo chamber; the exploration slots keep the feed a discovery machine.

Cold start (fewer than 3 signals) falls back to a hand-curated launch order.

## The fun parts

- **Guilt-free meter:** the cart judges you. Under ₹300 → "Totally fine 😌". Over ₹700 → "Okay big spender 👀". This is everyone's favorite feature.
- **1000+ SKUs from ~115 templates:** products expand into variants (flavour × size × colour) exactly like real q-commerce catalogs — the feed dedupes to one hero card per product, and a bottom sheet handles variant picking.
- **Performance:** the feed renders in batches of 30 and images load in a ±2-card window around the viewport — a cold visitor downloads 3 images, not 45.

## What I learned

1. `scroll-snap-type: y mandatory` + one `100dvh` card per product gets you TikTok-feel scrolling with zero JS scroll handlers.
2. An `IntersectionObserver` is a shockingly good implicit-feedback sensor.
3. A recommender doesn't need a GPU or even a server. For a catalog of ~1000 items, cosine similarity over 13-dim vectors runs in microseconds on a phone.
4. localStorage as a "user model" is genuinely private-by-design — the taste profile never leaves the device.

## Try it

- Demo: [thodasa.com](https://thodasa.com) (free, no login — it's a concept demo, nothing real is sold)
- Code: [github.com/Bhaumik-Tandan/thodasa](https://github.com/Bhaumik-Tandan/thodasa)

Scroll a few beauty products and reload — watch the feed rearrange itself. Then check the "Your vibe" widget in the wishlist to see what it learned about you.

Roast the code, star the repo, or tell me what you'd impulse-buy under ₹499.
