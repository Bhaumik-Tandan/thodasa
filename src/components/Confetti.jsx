import { useMemo } from 'react'

const COLORS = ['#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#a855f7', '#ec4899', '#facc15']

// burstKey changes on every burst; pieces regenerate from it so re-triggers re-animate.
export default function Confetti({ burstKey }) {
  const pieces = useMemo(() => {
    if (!burstKey) return []
    return Array.from({ length: 60 }, (_, i) => ({
      id: `${burstKey}-${i}`,
      left: Math.random() * 100,
      drift: (Math.random() - 0.5) * 220,
      dur: 1.4 + Math.random() * 1.4,
      size: 6 + Math.random() * 8,
      color: COLORS[i % COLORS.length],
      round: Math.random() > 0.5,
    }))
  }, [burstKey])

  if (!pieces.length) return null
  return (
    <>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (p.round ? 1 : 0.5),
            background: p.color,
            borderRadius: p.round ? '50%' : '2px',
            '--drift': `${p.drift}px`,
            '--dur': `${p.dur}s`,
          }}
        />
      ))}
    </>
  )
}
