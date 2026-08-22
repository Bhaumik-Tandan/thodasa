import { inr, PRODUCTS, CATEGORIES } from '../data/products'
import { HeartIcon } from './Icons'
import { tasteSummary } from '../lib/taste'
import { makeShareCard, shareCardBlob } from '../lib/share'

const VIBE_COLORS = ['bg-violet-500', 'bg-rose-500', 'bg-amber-500', 'bg-teal-500', 'bg-sky-500']

export default function Wishlist({ wishlist, onToggleWish, onAddToCart, cart, onClose }) {
  const items = PRODUCTS.filter((p) => wishlist.has(p.id))
  const vibe = tasteSummary()

  return (
    <div className="animate-slide-up fixed inset-0 z-40 mx-auto flex max-w-md flex-col lg:max-w-none bg-gray-50 dark:bg-zinc-950">
      <header className="lg:mx-auto lg:w-full lg:max-w-3xl flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 pt-12 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">My Wishlist ({items.length})</h1>
        <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-500 active:scale-95 dark:text-gray-300">
          Close
        </button>
      </header>

      {vibe && (
        <div className="mx-3 mt-3 rounded-2xl border border-gray-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-black uppercase tracking-wide text-gray-400">Your vibe · learned from your scrolling</p>
          <div className="mt-2 flex h-3 overflow-hidden rounded-full">
            {vibe.map((v, i) => (
              <div key={v.cat} className={`${VIBE_COLORS[i % VIBE_COLORS.length]} transition-all duration-500`} style={{ width: `${v.pct}%` }} />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
            {vibe.slice(0, 3).map((v, i) => (
              <span key={v.cat} className="flex items-center gap-1">
                <span className={`h-2 w-2 rounded-full ${VIBE_COLORS[i % VIBE_COLORS.length]}`} />
                {CATEGORIES.find((c) => c.id === v.cat)?.label ?? v.cat} {v.pct}%
              </span>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-gray-400">Your feed is ranked by this — plus a few 🎲 fresh finds so it never gets boring.</p>
          <button
            onClick={async () => {
              const top = vibe.slice(0, 3).map((v) => `${v.pct}% ${CATEGORIES.find((c) => c.id === v.cat)?.label ?? v.cat}`).join(' · ')
              const blob = await makeShareCard({
                emoji: '\ud83e\udde0',
                headline: 'My shopping vibe',
                subline: top,
                meterPct: null,
                colors: ['#8b5cf6', '#ec4899'],
              })
              await shareCardBlob(blob, 'thodasa-vibe.png', `My ThodaSa vibe: ${top} \u2014 what's yours? thodasa.com`)
            }}
            className="mt-2.5 w-full rounded-xl border border-gray-200 py-2.5 text-sm font-extrabold text-gray-700 active:scale-[0.98] dark:border-zinc-700 dark:text-gray-200"
          >
            📸 Share my vibe
          </button>
        </div>
      )}

      <div className="flex-1 lg:mx-auto lg:w-full lg:max-w-3xl space-y-2 overflow-y-auto p-3">
        {items.length === 0 && (
          <div className="grid h-full place-items-center text-center">
            <div>
              <HeartIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-zinc-700" />
              <p className="mt-3 font-semibold text-gray-600 dark:text-gray-300">Nothing saved yet</p>
              <p className="text-sm text-gray-400">Tap the heart on products you like.</p>
            </div>
          </div>
        )}
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
              <span className="absolute inset-0 grid place-items-center text-2xl">{p.emoji}</span>
              <img src={p.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
              <p className="text-xs text-gray-500">{p.rating} ★ · {p.category}</p>
              <p className="mt-0.5 text-sm font-extrabold text-gray-900 dark:text-white">
                ₹{inr(p.price)}
                {p.deal && <span className="ml-1.5 text-xs font-semibold text-gray-400 line-through">₹{inr(p.mrp)}</span>}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <button onClick={() => onToggleWish(p.id)} aria-label="Remove from wishlist" className="text-rose-500 active:scale-90">
                <HeartIcon filled className="h-5 w-5" />
              </button>
              <button
                onClick={() => onAddToCart(p)}
                className="rounded-lg border border-[#0c831f] px-4 py-1.5 text-xs font-extrabold text-[#0c831f] active:scale-95"
              >
                {cart[p.id]?.qty > 0 ? `ADD (${cart[p.id].qty})` : 'ADD'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
