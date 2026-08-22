# Distribution drafts — ThodaSa

Nothing here is posted. Review, edit the voice to sound like you, then post.

**Rule that matters more than the copy:** post, then stay in the thread for the
first 2 hours and reply to every comment. Engagement in the first hour is what
these algorithms rank on. A great post you abandon does worse than an average
post you nurse.

**Best times (IST):** Reddit US-heavy subs → 6:30–8:30 PM. Indian subs → 9–11 PM.
Show HN → 6:00–7:30 PM IST (weekday morning US Pacific).

Do **not** post to all of these on the same day. One per day, spaced out — and
never cross-post the same text simultaneously; several of these subs auto-flag it.

---

## ⛔ r/InternetIsBeautiful — DO NOT POST. Checked the rules; it is disqualified.

I originally recommended this as the best fit. That was wrong — I hadn't read
their rules. **Rule 5, "No Stores or Demos":**

> We do not allow any sites that are online stores, sites that serve only to sell
> a specific product, or paid services. Free demos or freemium tiered services
> where the full version or key functionality requires payment are also not
> allowed.

ThodaSa hits this twice: it presents as an online store, and it is a demo.

The real risk isn't just removal — that sub **bans domains permanently** (they
have a pinned announcement, "New Banned Domain: Vercel.app"). Posting could get
`thodasa.com` blacklisted there forever. Skip it.

Title/copy kept below only in case a future non-store project reuses it.

**Title** (their format is strict — describe the thing, don't sell it):
```
A shopping site where products are a vertical feed you scroll like reels
```

**First comment** (post this yourself right after submitting):
```
I built this because I noticed I'd scroll reels for 40 minutes but abandon a
shopping app in 40 seconds. So I inverted it — one product per screen, swipe up
for the next, no grid, no filters, no search unless you ask for it.

Two things I didn't expect while building it:

- The feed learns what you like entirely in the browser. Every product is a
  small feature vector, your taste is a running weighted sum of what you engage
  with, and ranking is cosine similarity. No backend, no database, no account —
  the profile is a single array in localStorage. Dwell time is the main signal:
  linger 4s on a card and it counts as interest, flick past in under 1.2s and it
  counts against.
- Every third card is deliberately a random pick from categories you've ignored,
  otherwise it collapses into an echo chamber within about 20 swipes.

It's a demo — nothing is actually for sale, no login, no tracking beyond
anonymous analytics. ~5,000 products across cars, real estate, K-pop merch,
LEGO, groceries and more.

Happy to go into the recommender in more detail if anyone's curious.
```

---

## 1. Show HN  ← START HERE (rules verified: demos explicitly welcome)

Verified against news.ycombinator.com/showhn.html. ThodaSa qualifies:
"Show HN is for something you've made that other people can play with" and
"make it easy for users to try your thing out, ideally without barriers such as
signups" — you have no login, so this is a clean fit. Early-stage work is fine.

HN rewards a technical angle and punishes marketing language. Lead with the
constraint, not the product.

**Title:**
```
Show HN: A reels-style shopping feed with a recommender that runs entirely client-side
```

**Text:**
```
I wanted to see how far a recommendation feed could go with no backend at all.

Every product is embedded as a small feature vector (category one-hot, price
bucket, deal flag, rating flag). The user profile is a running weighted sum of
the vectors of items they engage with, decayed 15% each session so recent
behaviour dominates. Ranking is cosine similarity between profile and product,
plus jitter, minus a seen-fatigue penalty. All of it lives in localStorage —
about 100 lines, no ML dependency.

Signals are weighted by intent: purchase +10, add-to-cart +8, wishlist +5,
share +4, long dwell +2, quick skip -1. Dwell is measured with an
IntersectionObserver at a 60% visibility threshold.

Things I got wrong and had to fix:

- Cold start is brutal. Under 3 signals there's no meaningful vector direction,
  so cosine returns noise. It falls back to curated picks until then.
- Pure exploitation collapses fast. Every third slot is now reserved for a
  low-affinity pick.
- 5,000 SKUs meant scoring the full catalog on every render. Fixed with batched
  rendering (30 cards at a time) and windowed image loading (±2 cards).

Where it breaks down: this can never do collaborative filtering — "people like
you also liked" needs cross-user data, which is exactly what client-only can't
have. Past roughly 20k products the localStorage ceiling and per-load scoring
cost stop being viable. So it's a real technique with a hard ceiling, which I
think is the interesting part.

Analytics after launch also taught me something blunt: the second-most-clicked
element on the site was a non-interactive div — the full-bleed product photo had
no click handler, and people trained on Instagram kept tapping it. 12.8% dead
clicks until I made it open the product.

Source: https://github.com/Bhaumik-Tandan/thodasa
Live: https://thodasa.com
```

---

## 2. r/SideProject  (rules NOT verified — Reddit blocks automated fetching, so read the sidebar yourself before posting)

Casual, builder-to-builder. Numbers and honesty do well here.

**Title:**
```
I built a shopping app that scrolls like Instagram reels — 5,000 products, no backend
```

**Text:**
```
Live: https://thodasa.com (no login, nothing actually for sale)

Stack: React + Vite + Tailwind, deployed on GitHub Pages. No server, no
database, no auth. The whole thing is static.

What's in it:
- ~5,000 products across 22 categories — cars, private jets, Dubai real estate,
  K-pop merch (real album art via the iTunes API), LEGO, groceries, books (real
  covers via Open Library)
- A recommender that learns from your scrolling and runs fully in the browser
- Coins, levels, streaks, a spin wheel — the full dopamine stack

The honest part: I launched, got 39 sessions, and 0% of them came back. Scroll
depth was 100% — everyone who arrives does engage — but nobody returns. Building
more features didn't fix that, and I kept doing it anyway for about a week
before I looked at the analytics properly.

So this is me finally doing distribution instead of adding a 23rd category.
Happy to answer anything about the recommender or the client-side-only approach.
```

---

## 3. r/developersIndia  (rules NOT verified — check the sidebar first)

Indian dev audience — the Hinglish copy and the ₹ pricing land here.

**Title:**
```
Made a reels-style shopping feed for the Indian market — recommender runs fully client-side
```

**Text:**
```
https://thodasa.com

Built it as a "what if shopping felt like reels" experiment. Everything is
Hinglish, prices are in ₹ with Indian formatting, and the products are the stuff
you'd actually impulse-buy — chips, chai, squishies — alongside absurd stuff like
Pagani hypercars and Dubai islands.

Technically the interesting bit is there's no backend. The taste engine embeds
each product as a feature vector and ranks by cosine similarity against a
profile built from your dwell time and taps, all in localStorage. Deployed as
static files on GitHub Pages, so hosting cost is ₹0.

Would genuinely like feedback on whether the feed feels addictive or annoying —
I'm too close to it to tell anymore.
```

---

## 4. Reply template for the inevitable comments

**"Is this real / can I actually buy?"**
> No — it's a concept demo, nothing ships. I wanted to test the interaction
> pattern, not run a store.

**"Why real brand names?"**
> Fictional brands made the feed feel obviously fake in testing, which killed the
> illusion the whole thing depends on. It's a non-commercial demo, but fair
> criticism and I've thought about it.

**"How is the recommender not just random?"**
> Fair question. Open the Rewards sheet → it shows your learned category mix. Or
> scroll only one category for 20 cards and reload — the feed visibly reorders.
> Under 3 interactions it genuinely *is* curated-random, because there's no
> signal to work with yet.

**"localStorage recommender doesn't scale"**
> Completely agree, and that's the point of the experiment. Hard ceiling around
> 20k products, and it can never do collaborative filtering. Client-only buys you
> privacy and zero infra; it costs you cross-user signal.
