import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 430, height: 1000 }, deviceScaleFactor: 3 })
const page = await ctx.newPage()
await page.addInitScript(() => {
  localStorage.setItem('thodasa.welcomed', 'true')
  localStorage.setItem('thodasa.dark', 'false')
  localStorage.setItem('thodasa.unlocks', JSON.stringify(['cars']))
})
await page.goto('http://localhost:4199/?c=cars', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)

// find the Audi Q7 card, open its sheet
const opened = await page.evaluate(() => {
  const f = document.querySelector('.snap-feed')
  for (let i = 0; i < f.children.length; i++) {
    if (/Audi Q7/.test(f.children[i].textContent)) {
      f.scrollTop = i * f.clientHeight
      f.dispatchEvent(new Event('scroll'))
      return true
    }
  }
  return false
})
await page.waitForTimeout(1200)
await page.evaluate(() => document.querySelector('button[aria-label^="View details"]').click())
await page.waitForTimeout(1500)
// expand the duty breakdown
await page.evaluate(() => {
  const b = [...document.querySelectorAll('button')].find((x) => /why it costs this much/i.test(x.textContent))
  if (b) b.click()
})
await page.waitForTimeout(900)

const panel = await page.evaluateHandle(() => {
  const btn = [...document.querySelectorAll('button')].find((x) => /why it costs this much/i.test(x.textContent))
  return btn.parentElement
})
const el = panel.asElement()
await el.scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await el.screenshot({ path: 'reels/duty-breakdown.png' })
console.log('found Audi:', opened)
await browser.close()
