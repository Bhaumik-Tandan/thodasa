// Sharing utilities: WhatsApp-first links (India runs on WhatsApp) and
// canvas-rendered share cards (guilt verdict / taste vibe) — the artifacts
// people actually post.
export const SITE = 'https://thodasa.com'

export const productUrl = (p) => `${SITE}/p/${p.slug}/`

export const productShareText = (p) =>
  `${p.emoji} ${p.baseName} — ₹${p.price}${p.deal ? ` (${Math.round((1 - p.price / p.mrp) * 100)}% off!)` : ''} on ThodaSa`

export const waShare = (text, url) =>
  window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, '_blank')

export const xShare = (text, url) =>
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')

export const copyLink = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
      return true
    } catch {
      return false
    }
  }
}

// 1080×1350 share card (IG-post ratio). Returns a PNG blob.
export const makeShareCard = ({ emoji, headline, subline, meterPct, colors }) => {
  const W = 1080, H = 1350
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d')

  const grad = ctx.createLinearGradient(0, 0, W, H)
  grad.addColorStop(0, colors[0])
  grad.addColorStop(1, colors[1])
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.font = '900 64px system-ui'
  ctx.fillText('ThodaSa 🛍️', W / 2, 130)

  ctx.font = '240px system-ui'
  ctx.fillText(emoji, W / 2, 560)

  ctx.fillStyle = '#fff'
  ctx.font = '900 88px system-ui'
  const words = headline.split(' ')
  let line = '', y = 740
  for (const w of words) {
    if (ctx.measureText(line + ' ' + w).width > W - 140) {
      ctx.fillText(line.trim(), W / 2, y)
      y += 104
      line = w
    } else line += ' ' + w
  }
  ctx.fillText(line.trim(), W / 2, y)

  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.font = '600 52px system-ui'
  ctx.fillText(subline, W / 2, y + 110)

  if (meterPct != null) {
    const bx = 140, bw = W - 280, by = y + 190, bh = 36
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 18); ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.beginPath(); ctx.roundRect(bx, by, Math.max(40, bw * Math.min(1, meterPct / 100)), bh, 18); ctx.fill()
  }

  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = '700 46px system-ui'
  ctx.fillText('scroll yours at thodasa.com', W / 2, H - 90)

  return new Promise((resolve) => c.toBlob(resolve, 'image/png'))
}

// Share a PNG blob via native share sheet, else download it.
export const shareCardBlob = async (blob, filename, text) => {
  const file = new File([blob], filename, { type: 'image/png' })
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text })
      return 'shared'
    } catch { /* user cancelled — fall through to download */ }
  }
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 5000)
  return 'downloaded'
}

// ——— Order haul card ———
// A real user screenshotted their orders and posted them ("Finally Gadi, Bike,
// Plane sab khareed liya"), so this makes that one tap instead of a manual
// screenshot: a receipt-style PNG plus a caption with the absurd total.

const crore = (n) => (n >= 1e7 ? `${(n / 1e7).toFixed(n >= 1e8 ? 0 : 1)} crore` : n >= 1e5 ? `${(n / 1e5).toFixed(1)} lakh` : n.toLocaleString('en-IN'))

export const haulStats = (orders) => {
  const items = orders.flatMap((o) => o.items)
  const total = orders.reduce((s, o) => s + o.total, 0)
  const qty = items.reduce((s, it) => s + it.qty, 0)
  const priciest = [...items].sort((a, b) => b.product.price - a.product.price).slice(0, 3)
  return { total, qty, orders: orders.length, priciest, pretty: crore(total) }
}

// The joke writes itself once the total is big enough — that is what got shared.
const verdict = (total) => {
  if (total >= 1e9) return 'GDP of a small nation, spent on vibes'
  if (total >= 1e8) return 'A private jet was involved. No regrets'
  if (total >= 1e7) return 'Ek Activa se thoda zyada'
  if (total >= 1e5) return 'Salary gone, dopamine acquired'
  if (total >= 1e4) return 'Wallet ne notice kiya'
  return 'Thoda sa hi tha, promise'
}

export const orderShareText = (orders) => {
  const s = haulStats(orders)
  const top = s.priciest[0]?.product?.baseName
  return `😎 ₹${s.pretty} ka haul on ThodaSa${top ? ` — including a ${top}` : ''}\n${verdict(s.total)}\n\nScroll yours at`
}

// Receipt-style 1080×1350 PNG of the haul.
export const makeOrderCard = async (orders) => {
  const s = haulStats(orders)
  const W = 1080, H = 1350
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')

  ctx.fillStyle = '#0b0b0d'
  ctx.fillRect(0, 0, W, H)
  // soft corner wash so it isn't a flat black rectangle
  const g = ctx.createRadialGradient(W, 0, 0, W, 0, 900)
  g.addColorStop(0, 'rgba(255,255,255,0.10)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  ctx.textAlign = 'left'
  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '600 30px system-ui'
  ctx.fillText('T H O D A S A   ·   M Y   H A U L', 90, 130)

  ctx.fillStyle = '#fff'
  ctx.font = '500 92px Georgia, serif'
  ctx.fillText('The damage', 90, 260)

  // the number is the whole point — make it enormous
  ctx.font = '600 168px Georgia, serif'
  ctx.fillText(`₹${s.pretty}`, 90, 430)

  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = '400 40px system-ui'
  ctx.fillText(`${s.qty} item${s.qty === 1 ? '' : 's'} · ${s.orders} order${s.orders === 1 ? '' : 's'}`, 90, 500)

  // itemised, like a receipt
  ctx.strokeStyle = 'rgba(255,255,255,0.14)'
  ctx.beginPath(); ctx.moveTo(90, 570); ctx.lineTo(W - 90, 570); ctx.stroke()
  let y = 650
  for (const it of s.priciest) {
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = '500 38px system-ui'
    const name = it.product.baseName.length > 26 ? it.product.baseName.slice(0, 25) + '…' : it.product.baseName
    ctx.fillText(name, 90, y)
    ctx.textAlign = 'right'
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.fillText(`₹${it.product.price.toLocaleString('en-IN')}`, W - 90, y)
    ctx.textAlign = 'left'
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.beginPath(); ctx.moveTo(90, y + 28); ctx.lineTo(W - 90, y + 28); ctx.stroke()
    y += 96
  }

  ctx.fillStyle = '#fff'
  ctx.font = 'italic 500 54px Georgia, serif'
  ctx.fillText(verdict(s.total), 90, y + 90)

  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '600 34px system-ui'
  ctx.fillText('thodasa.com', 90, H - 90)

  return new Promise((r) => c.toBlob(r, 'image/png'))
}
