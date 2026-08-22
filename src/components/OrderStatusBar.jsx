import { useEffect, useState } from 'react'
import { orderProgress, etaText, ORDER_STEPS } from '../lib/orderStatus'

// Live order strip on the feed. Before this existed, "My Orders" was only
// reachable from the cart header or the checkout success screen — and since
// placing an order empties the cart, people who tapped "Continue shopping"
// had no way back and reported that their order had disappeared.
export default function OrderStatusBar({ order, more = 0, onOpen }) {
  const [, tick] = useState(0)
  // re-render so the status visibly advances while the user is still here
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 15000)
    return () => clearInterval(t)
  }, [])

  const p = orderProgress(order)

  return (
    <button
      onClick={onOpen}
      className="pointer-events-auto flex w-full items-center gap-3 border-b border-white/10 bg-black/75 px-4 py-2.5 text-left backdrop-blur-xl active:bg-black/85 lg:border-neutral-200 lg:bg-neutral-50 lg:backdrop-blur-none lg:hover:bg-neutral-100 lg:dark:border-white/10 lg:dark:bg-black/75 lg:mx-auto lg:max-w-[1600px] lg:gap-4 lg:px-10"
    >
      {/* step pips */}
      <span className="flex shrink-0 items-center gap-1">
        {ORDER_STEPS.map((s, i) => (
          <span
            key={s.key}
            className={`h-1 rounded-full transition-all duration-500 ${
              i <= p.index ? 'w-4 bg-emerald-500' : 'w-2 bg-white/25 lg:bg-neutral-300 lg:dark:bg-white/25'
            }`}
          />
        ))}
      </span>

      <span className="min-w-0 flex-1">
        <span className="label-caps block text-[9px] text-emerald-400">
          {p.delivered ? 'Delivered' : p.step.label}
        </span>
        <span className="block truncate text-[12px] text-white/70 lg:text-neutral-600 lg:dark:text-white/70">
          {p.delivered ? 'Left at your door' : `Arriving ${etaText(p.eta)}`}
          <span className="hidden sm:inline"> · Order #{order.id}</span>
          {more > 0 && <span className="text-emerald-400"> · +{more} more order{more > 1 ? 's' : ''}</span>}
        </span>
      </span>

      <span className="label-caps shrink-0 text-[9px] text-white/60 lg:text-neutral-500 lg:dark:text-white/60">Track ↗</span>
    </button>
  )
}
