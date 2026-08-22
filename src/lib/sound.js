// Synthesised UI sound effects — no audio files, so zero added bytes to the
// bundle and nothing to license. Every sound is a few oscillators with a short
// gain envelope, built on demand.
//
// Browsers block audio until the user interacts with the page, so the
// AudioContext is created lazily on the first play() (which only ever happens
// from a tap/click) and resumed if the browser suspended it.

const KEY = 'thodasa.sound'

let ctx = null
let master = null
let enabled = (() => {
  try {
    // Default OFF: an unexpected noise on a first visit is a reason to bounce,
    // and we would rather the user opt in from the header toggle.
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
})()

export const isEnabled = () => enabled
export const setEnabled = (on) => {
  enabled = !!on
  try { localStorage.setItem(KEY, enabled ? '1' : '0') } catch { /* private mode */ }
  if (enabled) play('tap') // immediate confirmation that sound is live
  return enabled
}

const ready = () => {
  if (!enabled) return null
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!ctx) {
    ctx = new AC()
    master = ctx.createGain()
    // Deliberately quiet — these are accents, not a soundtrack.
    master.gain.value = 0.14
    master.connect(ctx.destination)
  }
  // Autoplay policy can leave the context suspended until a gesture.
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// One shaped tone. `to` sweeps the pitch, which is what makes a blip read as a
// "pop" (up) or a "whirr" (down) rather than a flat beep.
const tone = (t, { freq, to, dur = 0.12, type = 'sine', gain = 1 }) => {
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  if (to && to !== freq) osc.frequency.exponentialRampToValueAtTime(to, t + dur)

  const peak = Math.max(0.0001, gain)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(peak, t + Math.min(0.012, dur / 3))
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)

  osc.connect(g)
  g.connect(master)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

// note = [freq, startOffset, duration, type, gain, sweepTo]
const SOUNDS = {
  // soft confirmation — also used to preview the toggle
  tap: [[520, 0, 0.06, 'sine', 0.5, 620]],
  // added to cart: a satisfying two-step upward pop
  add: [
    [420, 0, 0.09, 'triangle', 0.9, 620],
    [780, 0.07, 0.13, 'sine', 0.75, 950],
  ],
  // wishlist: light, airy
  wish: [[880, 0, 0.1, 'sine', 0.6, 1180]],
  // coins earned: bright chime, two stacked notes
  coin: [
    [1050, 0, 0.1, 'triangle', 0.7],
    [1570, 0.05, 0.16, 'sine', 0.5],
  ],
  // achievement / level up: little ascending arpeggio
  level: [
    [523, 0, 0.11, 'triangle', 0.7],
    [659, 0.09, 0.11, 'triangle', 0.7],
    [784, 0.18, 0.13, 'triangle', 0.7],
    [1046, 0.28, 0.24, 'sine', 0.65],
  ],
  // spin wheel: descending whirr that lands on a ding
  spin: [
    [900, 0, 0.5, 'sawtooth', 0.28, 220],
    [1320, 0.52, 0.26, 'sine', 0.6],
  ],
  // order placed: short fanfare
  order: [
    [587, 0, 0.12, 'triangle', 0.7],
    [784, 0.1, 0.12, 'triangle', 0.7],
    [1046, 0.2, 0.3, 'sine', 0.7],
  ],
}

export const play = (name) => {
  const c = ready()
  if (!c) return
  const spec = SOUNDS[name]
  if (!spec) return
  const t0 = c.currentTime + 0.005
  for (const [freq, at, dur, type, gain, to] of spec) {
    tone(t0 + at, { freq, to, dur, type, gain })
  }
}
