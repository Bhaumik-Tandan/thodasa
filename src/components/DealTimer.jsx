import { useEffect, useState } from 'react'
import { TimerIcon } from './Icons'

// Each deal ends at a fixed, product-specific time of day (deterministic),
// so the countdown never visibly resets mid-session — it just runs out and
// the next window starts the following day.
const dealEndMs = (productId) => {
  const now = new Date()
  const end = new Date(now)
  end.setHours((productId * 37) % 24, (productId * 13) % 60, (productId * 7) % 60, 0)
  if (end <= now) end.setDate(end.getDate() + 1)
  return end.getTime()
}

const fmt = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function DealTimer({ productId }) {
  const [end] = useState(() => dealEndMs(productId))
  const [left, setLeft] = useState(() => end - Date.now())

  useEffect(() => {
    const t = setInterval(() => setLeft(end - Date.now()), 1000)
    return () => clearInterval(t)
  }, [end])

  if (left <= 0) return null
  const urgent = left < 10 * 60 * 1000

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm ${urgent ? 'bg-red-600 animate-pulse' : 'bg-black/45'}`}>
      <TimerIcon />
      <span>Deal ends in</span>
      <span className="tabular-nums tracking-wider">{fmt(left)}</span>
    </div>
  )
}
