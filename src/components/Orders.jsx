import { inr } from '../data/products'
import { useState } from 'react'
import { orderProgress, etaText, ORDER_STEPS } from '../lib/orderStatus'
import { makeOrderCard, shareCardBlob, orderShareText, haulStats, waShare, xShare, SITE } from '../lib/share'

const fmtDate = (iso) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })

export default function Orders({ orders, onClose }) {
  const [busy, setBusy] = useState(false)
  const stats = orders.length ? haulStats(orders) : null

  // One tap instead of a manual screenshot. On mobile the native share sheet
  // attaches the PNG straight to X/WhatsApp/Instagram; elsewhere it downloads.
  const shareHaul = async () => {
    setBusy(true)
    try {
      const blob = await makeOrderCard(orders)
      await shareCardBlob(blob, 'thodasa-haul.png', `${orderShareText(orders)} ${SITE}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="animate-slide-up fixed inset-0 z-50 mx-auto flex max-w-md flex-col lg:max-w-none bg-gray-50 dark:bg-zinc-950">
      <header className="lg:mx-auto lg:w-full lg:max-w-3xl flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 pt-12 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">My Orders ({orders.length})</h1>
        <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-500 active:scale-95 dark:text-gray-300">
          Close
        </button>
      </header>

      <div className="flex-1 lg:mx-auto lg:w-full lg:max-w-3xl space-y-3 overflow-y-auto p-3">
        {stats && (
          <div className="rounded-2xl bg-[#0b0b0d] p-4 text-white">
            <p className="label-caps text-[9px] text-white/45">Total damage</p>
            <p className="font-display mt-1 text-[34px] leading-none">₹{stats.pretty}</p>
            <p className="mt-1 text-xs text-white/50">
              {stats.qty} item{stats.qty === 1 ? '' : 's'} · {stats.orders} order{stats.orders === 1 ? '' : 's'}
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <button
                onClick={shareHaul}
                disabled={busy}
                className="label-caps rounded-none bg-white px-4 py-2.5 text-[10px] text-black active:scale-[0.98] disabled:opacity-60"
              >
                {busy ? 'Making image…' : 'Share my haul'}
              </button>
              <button
                onClick={() => waShare(orderShareText(orders), SITE)}
                className="label-caps rounded-none border border-white/25 px-4 py-2.5 text-[10px] text-white active:scale-[0.98]"
              >
                WhatsApp
              </button>
              <button
                onClick={() => xShare(orderShareText(orders), SITE)}
                className="label-caps rounded-none border border-white/25 px-4 py-2.5 text-[10px] text-white active:scale-[0.98]"
              >
                Post on X
              </button>
            </div>
          </div>
        )}
        {orders.length === 0 && (
          <div className="grid h-full place-items-center text-center">
            <div>
              <p className="font-semibold text-gray-600 dark:text-gray-300">No orders yet</p>
              <p className="text-sm text-gray-400">Your (fake) orders will show up here.</p>
            </div>
          </div>
        )}
        {[...orders].reverse().map((o) => (
          <div key={o.id} className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900 dark:text-white">Order #{o.id}</span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-bold text-[#0c831f] dark:bg-green-500/20 dark:text-green-300">
                {orderProgress(o).step.label}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-gray-400">{fmtDate(o.date)}</p>

            {/* tracking timeline — derived from elapsed time, no backend */}
            {(() => {
              const p = orderProgress(o)
              return (
                <div className="mt-3 rounded-xl bg-gray-50 p-3 dark:bg-zinc-800/60">
                  <p className="text-[11px] font-bold text-gray-700 dark:text-gray-200">
                    {p.delivered ? 'Delivered' : `Arriving ${etaText(p.eta)}`}
                  </p>
                  <div className="mt-2.5 space-y-0">
                    {ORDER_STEPS.map((s, i) => {
                      const done = i <= p.index
                      return (
                        <div key={s.key} className="flex gap-2.5">
                          <div className="flex flex-col items-center">
                            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${done ? 'bg-[#0c831f]' : 'bg-gray-300 dark:bg-zinc-600'}`} />
                            {i < ORDER_STEPS.length - 1 && (
                              <span className={`w-px flex-1 ${i < p.index ? 'bg-[#0c831f]' : 'bg-gray-200 dark:bg-zinc-700'}`} />
                            )}
                          </div>
                          <div className="pb-3">
                            <p className={`text-[12px] font-semibold ${done ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{s.label}</p>
                            <p className="text-[11px] text-gray-400">{s.detail}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })()}
            <div className="mt-2.5 space-y-1.5">
              {o.items.map((it) => (
                <div key={it.product.id} className="flex items-center gap-2 text-sm">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
                    <span className="absolute inset-0 grid place-items-center text-base">{it.product.emoji}</span>
                    <img src={it.product.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  </div>
                  <span className="min-w-0 flex-1 truncate font-medium text-gray-700 dark:text-gray-200">
                    {it.product.name} <span className="text-gray-400">×{it.qty}</span>
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{inr(it.product.price * it.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex justify-between border-t border-dashed border-gray-200 pt-2 text-sm font-extrabold text-gray-900 dark:border-zinc-700 dark:text-white">
              <span>Total</span><span>₹{inr(o.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
