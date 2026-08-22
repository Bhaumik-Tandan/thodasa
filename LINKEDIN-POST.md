# ThodaSa — LinkedIn launch post

## The post (paste into LinkedIn; attach the reel or 2–3 screenshots)

I gave a shopping app a recommendation engine — with no backend, no login, and no database.

It runs entirely in your browser, in about 150 lines of JavaScript. Here's what building it taught me. 👇

A few weeks ago I got curious about why apps like Blinkit, Zepto and Meesho are so hard to put down. The answer isn't the products — it's that the *browsing itself* is the entertainment. Scrolling is the dopamine loop.

So I built ThodaSa: a shopping app where you swipe through products like Instagram reels. One product per screen, everything under ₹499, and a "guilt-free meter" that gently judges your cart (under ₹300 → "Totally fine 😌", over ₹700 → "Okay big spender 👀").

The interesting engineering problem was personalization. A feed is boring if it's identical for everyone — but this is a static site on GitHub Pages. No servers, no user accounts. So the recommender had to live entirely on the device.

The approach turned out to be simpler than I expected:
→ every product is embedded as a small feature vector (category, price band, deal, rating)
→ your dwell time, saves and add-to-carts build a "taste profile" — a running weighted sum — stored in localStorage
→ the next visit ranks the feed by cosine similarity to that profile, with deliberate random slots mixed in so it never becomes an echo chamber

Four things I took away:
1. `scroll-snap` + one full-screen card per product gives you TikTok-feel scrolling with zero JavaScript scroll handlers.
2. An IntersectionObserver is a shockingly good implicit-feedback sensor — pausing on a card is a signal; flicking past is a signal too.
3. A recommender doesn't need a GPU or even a server. Cosine similarity over ~1000 items runs in microseconds on a phone.
4. localStorage as a "user model" is private by design — the taste profile never leaves your device.

It's a concept demo (nothing is actually sold), but it's live, it's fast, and it genuinely learns as you scroll. 1000+ products, a search page, a guilt-free meter, dark mode — all client-side.

Would you use something like this — or is "retail therapy as a feed" a genuinely terrible idea? I'd love the honest take.

(Live demo + code in the comments 👇)

---

## First comment (post immediately after — keeps the link out of the main post)

Try it (free, no login, works on mobile): https://thodasa.com
Full write-up on how the recommender works: [your dev.to article URL]
Code's open source: https://github.com/Bhaumik-Tandan/thodasa

---

## Posting tips
- Attach the reel MP4 (or 2–3 phone screenshots) directly to the post — LinkedIn suppresses posts whose main content is an outbound link, which is why the link goes in the first comment.
- Best time: Tue–Thu, 9–11am IST (LinkedIn's India professional window).
- Reply to every comment in the first 2 hours — early engagement is what LinkedIn's algorithm amplifies.
- Grab your dev.to article URL from your published post to fill the placeholder above.
