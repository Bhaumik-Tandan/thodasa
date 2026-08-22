import { inr } from '../data/products'
import { useEffect, useState } from 'react'
import { makeShareCard, shareCardBlob } from '../lib/share'

const meterFor = (total) => {
  if (total === 0) return { label: 'Cart khali hai 🫙', emoji: '🫙', pct: 0, bar: 'from-gray-300 to-gray-400', note: 'Add something chhota-sa!' }
  if (total < 300) return { label: 'Totally fine 😌', emoji: '😌', pct: Math.max(12, (total / 1000) * 100), bar: 'from-emerald-400 to-teal-400', note: 'Guilt level: zero. Enjoy!' }
  if (total <= 700) return { label: 'Treat yourself 🎉', emoji: '🎉', pct: (total / 1000) * 100, bar: 'from-amber-400 to-orange-400', note: 'You earned this, honestly.' }
  return { label: 'Okay big spender 👀', emoji: '👀', pct: Math.min(100, (total / 1000) * 100), bar: 'from-rose-500 to-fuchsia-500', note: 'Wallet is side-eyeing you.' }
}

export default function Cart({ cart, onQty, onRemove, onCheckout, onOrders, onClose }) {
  const items = Object.values(cart)
  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0)
  const count = items.reduce((s, it) => s + it.qty, 0)
  const meter = meterFor(total)

  const [installable, setInstallable] = useState(!!window.__installPrompt)
  useEffect(() => {
    const on = () => setInstallable(true)
    window.addEventListener('thodasa:installable', on)
    return () => window.removeEventListener('thodasa:installable', on)
  }, [])

  return (
    <div className="animate-slide-up fixed inset-0 z-40 mx-auto flex max-w-md flex-col bg-gray-50 dark:bg-zinc-950">
      <header className="flex items-center justify-between px-5 pb-3 pt-14">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Your Cart</h1>
        <div className="flex items-center gap-2">
          <button onClick={onOrders} className="rounded-full bg-gray-200 px-4 py-2 text-sm font-bold text-gray-700 active:scale-90 dark:bg-white/10 dark:text-gray-200">
            My Orders
          </button>
          <button onClick={onClose} className="rounded-full bg-gray-200 px-4 py-2 text-sm font-bold text-gray-700 active:scale-90 dark:bg-white/10 dark:text-gray-200">
            ✕ Close
          </button>
        </div>
      </header>

      {/* guilt-free meter */}
      <div className="mx-5 rounded-3xl bg-white p-4 shadow-md dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Guilt-free meter</span>
          <span className="text-base font-extrabold text-gray-900 dark:text-white">{meter.label}</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
          <div className={`h-full rounded-full bg-gradient-to-r ${meter.bar} transition-all duration-500`} style={{ width: `${meter.pct}%` }} />
        </div>
        <p className="mt-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">{meter.note}</p>
        {total > 0 && (
          <button
            onClick={async () => {
              const colors = total < 300 ? ['#10b981', '#0ea5e9'] : total <= 700 ? ['#f59e0b', '#f43f5e'] : ['#f43f5e', '#a855f7']
              const blob = await makeShareCard({
                emoji: meter.emoji,
                headline: meter.label.replace(/[\u{1F000}-\u{1FFFF}]/gu, '').trim(),
                subline: `cart damage: \u20B9${total}`,
                meterPct: Math.min(100, (total / 1000) * 100),
                colors,
              })
              await shareCardBlob(blob, 'thodasa-verdict.png', `The ThodaSa guilt-free meter has spoken: ${meter.label} (\u20B9${total}) \u2014 thodasa.com`)
            }}
            className="mt-2.5 w-full rounded-xl border border-gray-200 py-2.5 text-sm font-extrabold text-gray-700 active:scale-[0.98] dark:border-zinc-700 dark:text-gray-200"
          >
            📸 Share this verdict
          </button>
        )}
      </div>

      {installable && (
        <button
          onClick={() => { window.__installPrompt?.prompt(); setInstallable(false) }}
          className="mx-5 mt-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 font-extrabold text-white shadow-lg shadow-violet-500/30 active:scale-[0.98]"
        >
          📲 Install ThodaSa — home screen pe rakho
        </button>
      )}

      {/* items */}
      <div className="mt-4 flex-1 space-y-3 overflow-y-auto px-5 pb-4">
        {items.length === 0 && (
          <div className="grid h-full place-items-center text-center">
            <div>
              <div className="text-6xl">🛍️</div>
              <p className="mt-3 font-bold text-gray-700 dark:text-gray-200">Bilkul khali. Jao kuch pasand karo!</p>
            </div>
          </div>
        )}
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex items-center gap-3 rounded-3xl bg-white p-3 shadow-sm dark:bg-zinc-900">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-500/20 dark:to-orange-500/20">
              <span className="absolute inset-0 grid place-items-center text-2xl">{product.emoji}</span>
              <img src={product.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{product.name}</p>
              <p className="text-sm font-extrabold text-gray-900 dark:text-white">₹{inr(product.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => (qty === 1 ? onRemove(product.id) : onQty(product.id, qty - 1))} className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 font-black text-gray-600 active:scale-90 dark:bg-white/10 dark:text-gray-300">−</button>
              <span className="w-5 text-center text-sm font-extrabold text-gray-900 dark:text-white">{qty}</span>
              <button onClick={() => onQty(product.id, qty + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-green-100 font-black text-[#0c831f] active:scale-90 dark:bg-green-500/20 dark:text-green-300">+</button>
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      {items.length > 0 && (
        <footer className="border-t border-gray-200 bg-white px-5 pb-8 pt-4 dark:border-white/10 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{count} item{count > 1 ? 's' : ''}</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">₹{inr(total)}</p>
            </div>
            <button onClick={onCheckout} className="rounded-xl bg-[#0c831f] px-6 py-3.5 font-extrabold text-white shadow-lg shadow-green-600/30 active:scale-95">
              Proceed to Checkout
            </button>
          </div>
        </footer>
      )}
    </div>
  )
}
