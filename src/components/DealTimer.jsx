import { useEffect, useState } from 'react'
import { TimerIcon } from './Icons'

// Each deal product gets a deterministic-per-mount countdown between ~3 and 12 minutes.
export default function DealTimer({ productId }) {
  const [left, setLeft] = useState(() => 180 + ((productId * 97) % 540))

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s <= 1 ? 180 + ((productId * 97) % 540) : s - 1)), 1000)
    return () => clearInterval(t)
  }, [productId])

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  const urgent = left < 60

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm ${urgent ? 'bg-red-600 animate-pulse' : 'bg-black/45'}`}>
      <TimerIcon />
      <span>Deal ends in</span>
      <span className="tabular-nums tracking-wider">{mm}:{ss}</span>
    </div>
  )
}
