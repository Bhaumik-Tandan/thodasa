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
