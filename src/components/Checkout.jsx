import { inr } from '../data/products'
import { useState } from 'react'

export default function Checkout({ cart, onClose, onOrders, onOrderPlaced }) {
  const [placed, setPlaced] = useState(false)
  const items = Object.values(cart)
  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0)
  const delivery = subtotal >= 499 ? 0 : 49
  const total = subtotal + delivery

  const place = () => {
    setPlaced(true)
    onOrderPlaced({ items, total })
    if (navigator.vibrate) navigator.vibrate([20, 40, 20])
  }

  if (placed) {
    return (
      <div className="animate-slide-up fixed inset-0 z-50 mx-auto grid max-w-md place-items-center lg:max-w-none bg-gray-50 px-8 text-center dark:bg-zinc-950">
        <div>
          <div className="animate-float text-8xl">📦</div>
          <h1 className="mt-4 text-3xl font-black text-gray-900 dark:text-white">Order placed!</h1>
          <p className="mt-2 font-medium text-gray-500 dark:text-gray-400">
            (Not really — no real payments here 😄)<br />
            Aapka happiness parcel is on its imaginary way.
          </p>
          <button onClick={onClose} className="mt-8 rounded-xl bg-[#0c831f] px-8 py-3.5 font-extrabold text-white shadow-lg shadow-green-600/30 active:scale-95">
            Continue shopping
          </button>
          <button onClick={onOrders} className="mx-auto mt-3 block text-sm font-bold text-gray-500 underline-offset-2 hover:underline dark:text-gray-400">
            View my orders
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-slide-up fixed inset-0 z-50 mx-auto flex max-w-md flex-col lg:max-w-none bg-gray-50 dark:bg-zinc-950">
      <header className="lg:mx-auto lg:w-full lg:max-w-2xl flex items-center justify-between px-5 pb-3 pt-14">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Checkout 🧾</h1>
        <button onClick={onClose} className="rounded-full bg-gray-200 px-4 py-2 text-sm font-bold text-gray-700 active:scale-90 dark:bg-white/10 dark:text-gray-200">← Back</button>
      </header>

      <div className="flex-1 lg:mx-auto lg:w-full lg:max-w-2xl overflow-y-auto px-5">
        <div className="rounded-3xl bg-white p-4 shadow-md dark:bg-zinc-900">
          <h2 className="text-sm font-black uppercase tracking-wide text-gray-400">Order summary</h2>
          <div className="mt-3 space-y-2.5">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center gap-2.5 text-sm">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10">
                  <span className="absolute inset-0 grid place-items-center text-lg">{product.emoji}</span>
                  <img src={product.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                </div>
                <span className="min-w-0 flex-1 truncate font-semibold text-gray-700 dark:text-gray-200">
                  {product.name} <span className="text-gray-400">×{qty}</span>
                </span>
                <span className="font-extrabold text-gray-900 dark:text-white">₹{inr(product.price * qty)}</span>
              </div>
            ))}
          </div>
          <div className="my-3 border-t border-dashed border-gray-200 dark:border-white/10" />
          <div className="flex justify-between text-sm font-semibold text-gray-500 dark:text-gray-400">
            <span>Subtotal</span><span>₹{inr(subtotal)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm font-semibold text-gray-500 dark:text-gray-400">
            <span>Delivery {delivery === 0 && '🎁'}</span>
            <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
          </div>
          {delivery > 0 && (
            <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              ₹{499 - subtotal} aur add karo for free delivery!
            </p>
          )}
          <div className="mt-3 flex justify-between text-lg font-black text-gray-900 dark:text-white">
            <span>Total</span><span>₹{inr(total)}</span>
          </div>
        </div>

        <div className="mt-4 rounded-3xl bg-white p-4 shadow-md dark:bg-zinc-900">
          <h2 className="text-sm font-black uppercase tracking-wide text-gray-400">Delivering to</h2>
          <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">🏠 Ghar — 42, Happy Colony, Your City 400001</p>
          <p className="mt-1 text-xs text-gray-400">(Demo address — nothing real is happening here)</p>
        </div>
      </div>

      <footer className="border-t border-gray-200 bg-white px-5 pb-8 pt-4 dark:border-white/10 dark:bg-zinc-900">
        <button onClick={place} className="w-full rounded-xl bg-[#0c831f] py-4 text-lg font-extrabold text-white shadow-lg shadow-green-600/30 active:scale-[0.98]">
          Place Order · ₹{inr(total)}
        </button>
        <p className="mt-1.5 text-center text-[11px] text-gray-400">Demo checkout — no real payment happens.</p>
      </footer>
    </div>
  )
}
