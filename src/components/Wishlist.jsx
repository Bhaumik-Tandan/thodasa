import { PRODUCTS } from '../data/products'
import { HeartIcon } from './Icons'

export default function Wishlist({ wishlist, onToggleWish, onAddToCart, cart, onClose }) {
  const items = PRODUCTS.filter((p) => wishlist.has(p.id))

  return (
    <div className="animate-slide-up fixed inset-0 z-40 mx-auto flex max-w-md flex-col bg-gray-50 dark:bg-zinc-950">
      <header className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 pt-12 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">My Wishlist ({items.length})</h1>
        <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-500 active:scale-95 dark:text-gray-300">
          Close
        </button>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
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
                ₹{p.price}
                {p.deal && <span className="ml-1.5 text-xs font-semibold text-gray-400 line-through">₹{p.mrp}</span>}
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
