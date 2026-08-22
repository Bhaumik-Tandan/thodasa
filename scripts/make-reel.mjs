// Generates a fresh ~20s vertical demo reel of the live site (MP4, ready for
// IG Reels / YT Shorts / X). Products differ every run — the feed shuffles.
//
// One-time setup:  npm i -D playwright ffmpeg-static && npx playwright install chromium
// Usage:           node scripts/make-reel.mjs [url]  → reels/reel-<timestamp>.mp4
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
await page.addInitScript(() => localStorage.setItem('thodasa.welcomed', 'true'))
await page.goto(URL, { waitUntil: 'networkidle' })
await wait(2500)

const swipe = async (pause) => {
  await page.evaluate(() => {
    const f = document.querySelector('.snap-feed')
    f.scrollBy({ top: f.clientHeight, behavior: 'smooth' })
    f.dispatchEvent(new Event('scroll'))
  })
  await wait(pause)
}

await swipe(1800)
await swipe(1600)
await swipe(2200)
await swipe(1600)
await page.click('button[aria-label="Quick add"]').catch(() => {})
await wait(1400)
await page.click('[aria-label="Open cart"]')
await wait(2500)

await context.close()
await browser.close()

const webm = fs.readdirSync('reels/raw').find((f) => f.endsWith('.webm'))
const out = `reels/reel-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')}.mp4`
execFileSync(ffmpeg, ['-y', '-i', `reels/raw/${webm}`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-crf', '23', out])
fs.rmSync('reels/raw', { recursive: true, force: true })
console.log('reel ready:', out)
