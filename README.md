# ThodaSa 🛍️

*Thoda sa treat toh banta hai.*

A mobile-first impulse-shopping / retail-therapy discovery app for the Indian market — Instagram-reels-style vertical product feed meets Meesho. Built with React + Vite + Tailwind CSS, no backend (mock data + localStorage).

**Live:** https://bhaumik-tandan.github.io/thodasa/

## Features

- Full-screen vertical swipe feed, one product per screen (CSS scroll-snap, 60fps)
- 45 mock Indian impulse products (₹99–₹499) with real photos
- Flash deals with live countdown timers and strikethrough MRP
- Thumb-zone Add to Cart that morphs into a quantity stepper (trash to remove at qty 1)
- Cart with a playful guilt-free meter (₹300 / ₹700 tiers)
- Wishlist, past orders, cart, and dark mode — all persisted in localStorage
- Native share (Web Share API with clipboard fallback)
- Fake checkout with free-delivery threshold (no real payments)

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Built `dist/` is published to the `gh-pages` branch and served by GitHub Pages.
