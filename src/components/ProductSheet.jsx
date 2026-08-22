import { useState } from 'react'
import { VARIANTS_BY_TEMPLATE } from '../data/products'
import { TrashIcon, MinusIcon, PlusIcon, BagPlusIcon } from './Icons'

// Blinkit-style bottom sheet: pick a flavour/size/colour variant, add to cart.
export default function ProductSheet({ product, cart, onAddToCart, onQty, onRemove, onClose }) {
  const variants = VARIANTS_BY_TEMPLATE[product.templateId] ?? [product]
  const [selectedId, setSelectedId] = useState(product.id)
  const selected = variants.find((v) => v.id === selectedId) ?? variants[0]
  const qty = cart[selected.id]?.qty ?? 0
  const off = selected.deal ? Math.round((1 - selected.price / selected.mrp) * 100) : 0

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-md flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="animate-slide-up relative max-h-[85%] overflow-y-auto rounded-t-3xl bg-white p-4 pb-8 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gray-300 dark:bg-zinc-700" />

        <div className="flex gap-3">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800">
            <span className="absolute inset-0 grid place-items-center text-3xl">{product.emoji}</span>
            <img src={product.img} alt="" className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="rounded bg-[#1fa144] px-1.5 py-0.5 font-bold text-white">{product.rating} ★</span>
              <span className="font-medium text-gray-500">{product.reviews.toLocaleString('en-IN')} ratings</span>
            </div>
            <h2 className="mt-1 text-lg font-bold leading-snug text-gray-900 dark:text-white">{product.baseName}</h2>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{product.desc}</p>
          </div>
        </div>

        {variants.length > 1 && (
          <>
            <p className="mt-4 text-xs font-black uppercase tracking-wide text-gray-400">
              Choose option · {variants.length} available
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedId(v.id)}
                  className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    v.id === selected.id
                      ? 'border-[#0c831f] bg-green-50 dark:bg-green-500/10'
                      : 'border-gray-200 dark:border-zinc-700'
                  }`}
                >
                  <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">{v.variantLabel}</p>
                  <p className="text-sm font-extrabold text-gray-900 dark:text-white">
                    ₹{v.price}
                    {v.deal && <span className="ml-1.5 text-xs font-semibold text-gray-400 line-through">₹{v.mrp}</span>}
                    {cart[v.id]?.qty > 0 && <span className="ml-1.5 text-xs font-bold text-[#0c831f]">×{cart[v.id].qty} in cart</span>}
                  </p>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">₹{selected.price}</span>
              {selected.deal && (
                <>
                  <span className="text-sm text-gray-400 line-through">₹{selected.mrp}</span>
                  <span className="text-sm font-bold text-[#0c831f]">{off}% off</span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-400">{selected.variantLabel}</p>
          </div>

          {qty === 0 ? (
            <button
              onClick={() => onAddToCart(selected)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 px-6 py-3 font-extrabold text-white shadow-lg shadow-rose-500/40 active:scale-95"
            >
              <BagPlusIcon className="h-5 w-5" /> Add
            </button>
          ) : (
            <div className="flex items-stretch overflow-hidden rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-lg shadow-rose-500/40">
              <button
                onClick={() => (qty === 1 ? onRemove(selected.id) : onQty(selected.id, qty - 1))}
                className="grid w-12 place-items-center bg-black/15 py-3 active:bg-black/30"
                aria-label={qty === 1 ? 'Remove' : 'Decrease'}
              >
                {qty === 1 ? <TrashIcon /> : <MinusIcon />}
              </button>
              <span className="grid w-10 place-items-center font-extrabold">{qty}</span>
              <button onClick={() => onAddToCart(selected)} className="grid w-12 place-items-center bg-black/15 active:bg-black/30" aria-label="Increase">
                <PlusIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
