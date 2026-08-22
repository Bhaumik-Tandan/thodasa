# Reel captions — Instagram Reels / YouTube Shorts

Video: `reels/reel-2026-08-22-16-34.mp4` (390×844 vertical, 3.2MB)

**Add trending audio inside the app at upload.** Do not bundle a track — the
algorithm favours sounds already trending, and a silent reel gets suppressed on
both platforms. Pick anything upbeat; the video has no dialogue to clash with.

**Why this channel:** no karma gate, no account age, no moderators. Unlike HN
and Reddit, reach here does not depend on your standing — only on watch time.

---

## Instagram Reels

**Caption:**
```
I made shopping scroll like reels.

One product per screen. Swipe up for the next. No grid, no filters,
no 47 tabs open.

The feed learns what you like as you scroll — and it runs entirely in
your browser. No login, no account, nothing tracked to a server.

₹5 biscuits to ₹3.85 lakh suits. Same swipe.

Link in bio 👀

#buildinpublic #webdev #reactjs #indiedev #uidesign #productdesign
#startupindia #frontend #ecommerce #uxdesign
```

**First comment (post immediately yourself — boosts early engagement):**
```
Built with React + Tailwind, no backend at all. The recommender is cosine
similarity over feature vectors in localStorage — about 100 lines.

thodasa.com if you want to try it
```

---

## YouTube Shorts

Title (Shorts titles are the hook — keep under 60 chars):
```
I made shopping scroll like Instagram reels
```

**Description:**
```
A shopping feed you scroll like reels — one product per screen, swipe up
for the next.

The recommendation engine runs entirely client-side: every product is a
feature vector, your taste profile is a running weighted sum of what you
engage with, and ranking is cosine similarity. All in localStorage. No
backend, no database, no login.

~5,700 products from ₹5 biscuits to ₹3.85 lakh suits.

Try it: https://thodasa.com
Source: https://github.com/Bhaumik-Tandan/thodasa

#Shorts #webdev #react #buildinpublic
```

---

## X / Twitter (you already have an account — repost the video there too)

```
I made shopping scroll like reels.

One product per screen. Swipe up for the next.

The feed learns your taste as you scroll — cosine similarity over feature
vectors, running entirely in your browser. No backend, no login.

₹5 biscuits to ₹3.85 lakh suits. Same swipe.

thodasa.com
```

Attach the MP4 directly (native video outperforms a link — X suppresses posts
whose main payload is an external URL).

---

## Posting notes

- **Best windows (IST):** Reels 8–11 PM · Shorts 7–10 PM · X 9–11 PM
- **Post to all three.** Unlike Reddit, cross-posting the same video across
  platforms is normal and carries no penalty.
- **Reply to every comment for the first two hours.** Watch time and early
  comments are what both algorithms rank on.
- **If a reel flops, post another cut in 3 days.** Short-form is volume-based;
  one video landing badly means nothing. This is the opposite of HN, where you
  get roughly one shot per project.
- Regenerate a fresh cut anytime with `npm run reel` — the feed shuffles, so
  every run shows different products.
