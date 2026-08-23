// Generates a fresh vertical demo reel of the live site (MP4, ready for
// IG Reels / YT Shorts / X).
//
// The previous choreography had two bugs that made a bad reel:
//   * scrollBy({behavior:'smooth'}) does not finish before the next swipe in a
//     snap container, so it kept landing back on the same card — three of seven
//     sampled frames were the identical noodle packet.
//   * it clicked the first card's "Quick add", which for a multi-variant product
//     OPENS THE SHEET rather than adding, then opened the cart anyway — so the
//     reel ended on "Cart khali hai", an empty cart.
// Now: absolute scrollTop per card so every beat is a different product, a real
// add from inside the sheet, and the duty breakdown gets screen time because it
// is the most distinctive thing here.
//
// Usage: node scripts/make-reel.mjs [url]  → reels/reel-<timestamp>.mp4
import { chromium } from 'playwright'
import ffmpeg from 'ffmpeg-static'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'

const URL = process.argv[2] ?? 'https://thodasa.com/'
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  recordVideo: { dir: 'reels/raw', size: { width: 390, height: 844 } },
})
const page = await context.newPage()
await page.addInitScript(() => {
  localStorage.setItem('thodasa.welcomed', 'true')
  localStorage.setItem('thodasa.installNudge', String(Date.now())) // no prompt mid-reel
})
await page.goto(URL, { waitUntil: 'networkidle' })
await wait(2200)

// land on card n exactly, so no beat repeats a product
const toCard = async (n, pause) => {
  await page.evaluate((i) => {
    const f = document.querySelector('.snap-feed')
    f.scrollTop = i * f.clientHeight
    f.dispatchEvent(new Event('scroll'))
  }, n)
  await wait(pause)
}

const seen = []
const cardInfo = async () => page.evaluate(() => {
  const f = document.querySelector('.snap-feed')
  const i = Math.round(f.scrollTop / f.clientHeight)
  const el = f.children[i]
  const detail = el?.querySelector('button[aria-label^="View details"]')
  return {
    // the aria-label carries the product name; innerText is full of chrome
    name: detail?.getAttribute('aria-label')?.replace('View details for ', '') ?? null,
    locked: /LOCKED SECTION/i.test(el?.innerText ?? ''),
  }
})

// Locked teasers are spliced in at card 5 and every 11th after, so a fixed
// walk lands on one. That is a good beat to show — it is how anyone learns the
// Pagani and the jets exist — but a sheet cannot be opened on it.
for (const [card, pause] of [[1, 1700], [2, 1500], [3, 1600], [4, 1500], [5, 1800], [6, 1500]]) {
  await toCard(card, pause)
  seen.push(await cardInfo())
}

// walk forward to the next unlocked product card, then open its sheet so the
// duty table gets screen time — the most distinctive thing in the app
let opened = false
for (let card = 6; card < 14 && !opened; card++) {
  await toCard(card, 700)
  const info = await cardInfo()
  if (info.locked || !info.name) continue
  await page.evaluate(() => {
    const f = document.querySelector('.snap-feed')
    const i = Math.round(f.scrollTop / f.clientHeight)
    f.children[i].querySelector('button[aria-label^="View details"]')?.click()
  })
  await wait(2600)
  opened = await page.evaluate(() => !!document.querySelector('.fixed.inset-0.z-50'))
}

// a real add, from inside the sheet
const added = await page.evaluate(() => {
  const sheet = document.querySelector('.fixed.inset-0.z-50')
  if (!sheet) return false
  const variants = [...sheet.querySelectorAll('button')].filter((b) => /₹/.test(b.innerText))
  variants[1]?.click()
  const add = [...sheet.querySelectorAll('button')].find((b) => b.innerText.trim() === 'Add')
  if (!add) return false
  add.click()
  return true
})
await wait(1800)

// close via the backdrop: the sheet has no Escape handler, so pressing Escape
// left it open and the cart click below was swallowed by the overlay
await page.evaluate(() => {
  const sheet = document.querySelector('.fixed.inset-0.z-50')
  sheet?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
})
await wait(900)
const sheetClosed = await page.evaluate(() => !document.querySelector('.fixed.inset-0.z-50'))
await page.click('[aria-label="Open cart"]').catch(() => {})
await wait(2400)

const cartText = await page.evaluate(() => document.body.innerText.slice(0, 200))
await context.close()
await browser.close()

const webm = fs.readdirSync('reels/raw').find((f) => f.endsWith('.webm'))
const out = `reels/reel-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')}.mp4`
execFileSync(ffmpeg, ['-y', '-i', `reels/raw/${webm}`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-crf', '23', out])
fs.rmSync('reels/raw', { recursive: true, force: true })
console.log('beats:', seen.map((b) => b.locked ? '[locked teaser]' : b.name).join(' / '))
console.log('sheet opened :', opened, '| closed after:', sheetClosed)
console.log('added to cart :', added)
console.log('cart empty?   :', /khali/i.test(cartText))
console.log('reel ready    :', out)
