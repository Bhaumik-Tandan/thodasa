# One-click submit links — ThodaSa

Generated 2026-08-22. Nothing is posted by these links;
each just opens the form pre-filled. You review and submit.

---

## 1. Show HN  ← do this first

Rules verified against news.ycombinator.com/showhn.html — demos are explicitly
welcome, and "no signups" is called out as a plus, which you satisfy.

Title (71 chars — HN's limit is 80, my first draft was 86 and would have failed):

    Show HN: Reels-style shopping feed with a fully client-side recommender

**Click to open the pre-filled form:**

https://news.ycombinator.com/submitlink?u=https%3A%2F%2Fthodasa.com&t=Show%20HN%3A%20Reels-style%20shopping%20feed%20with%20a%20fully%20client-side%20recommender

### IMPORTANT: HN allows a URL *or* body text, never both.

So submit the link above, then post this as your OWN FIRST COMMENT immediately:

```
I wanted to see how far a recommendation feed could go with no backend at all.

Every product is embedded as a small feature vector (category one-hot, price bucket, deal flag, rating flag). The user profile is a running weighted sum of the vectors of items they engage with, decayed 15% each session so recent behaviour dominates. Ranking is cosine similarity between profile and product, plus jitter, minus a seen-fatigue penalty. All of it lives in localStorage - about 100 lines, no ML dependency.

Signals are weighted by intent: purchase +10, add-to-cart +8, wishlist +5, share +4, long dwell +2, quick skip -1. Dwell is measured with an IntersectionObserver at a 60% visibility threshold.

Things I got wrong and had to fix:

- Cold start is brutal. Under 3 signals there's no meaningful vector direction, so cosine returns noise. It falls back to curated picks until then.
- Pure exploitation collapses fast. Every third slot is now reserved for a low-affinity pick.
- 5,000 SKUs meant scoring the full catalog on every render. Fixed with batched rendering (30 cards at a time) and windowed image loading.

Where it breaks down: this can never do collaborative filtering - "people like you also liked" needs cross-user data, which is exactly what client-only can't have. Past roughly 20k products the localStorage ceiling and per-load scoring cost stop being viable. So it's a real technique with a hard ceiling, which I think is the interesting part.

Analytics after launch taught me something blunt too: the second-most-clicked element on the site was a non-interactive div. The full-bleed product photo had no click handler, and people trained on Instagram kept tapping it - 12.8% dead clicks until I made it open the product.

Source: https://github.com/Bhaumik-Tandan/thodasa
```

---

## 2. r/SideProject

⚠️ Rules NOT verified — Reddit blocks automated fetching. Read the sidebar first
(check for karma/account-age minimums and any link-drop restrictions).

Pre-filled: see LAUNCH-POSTS.md section 2, or use the long link in the chat
transcript. Title:

    I built a shopping app that scrolls like Instagram reels - 5,000 products, no backend

---

## 3. r/developersIndia

⚠️ Rules NOT verified — read the sidebar first.

    Made a reels-style shopping feed for the Indian market - recommender runs fully client-side

---

## Do NOT post to r/InternetIsBeautiful

Rule 5 is "No Stores or Demos" and they ban domains permanently. See
LAUNCH-POSTS.md for the full quote.

---

## After posting

- Stay in the thread ~2 hours and reply to every comment. First-hour engagement
  is what both HN and Reddit rank on.
- One venue per day. Never simultaneous cross-posts.
- Best windows (IST): Show HN 6:00–7:30 PM · Indian subs 9–11 PM.
- Reply templates for predictable pushback are in LAUNCH-POSTS.md section 4.
