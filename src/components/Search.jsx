import { inr } from '../data/products'
import { useMemo, useState } from 'react'
import { PRODUCTS, TEMPLATE_HEROES } from '../data/products'
import { pickedForYou } from '../lib/taste'
import { SearchIcon, BagPlusIcon } from './Icons'
import { searchProducts } from '../lib/fuzzy'

const POPULAR = ['Noodles', 'Earbuds', 'Kajal', 'Chips', 'Bottle', 'Candle', 'Tee', 'Stickers', 'Perfume', 'Sunglasses']

export default function Search({ cart, onAddToCart, onOpenDetail, onClose }) {
  const [q, setQ] = useState('')
  const forYou = useMemo(() => pickedForYou(TEMPLATE_HEROES, 6), [])

  // typo-tolerant: exact substring first, fuzzy fallback (see lib/fuzzy.js)
  const results = useMemo(() => searchProducts(q, PRODUCTS, 30), [q])

  const Row = ({ p, badge }) => (
    <button onClick={() => onOpenDetail(p)} className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left active:scale-[0.99] dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800">
        <span className="absolute inset-0 grid place-items-center text-2xl">{p.emoji}</span>
        <img src={p.img.replace('w=800&h=1400', 'w=120&h=120')} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
      </div>
      <div className="min-w-0 flex-1">
        {badge && <span className="text-[10px] font-black uppercase tracking-wide text-violet-500">{badge}</span>}
        <p className="line-clamp-2 text-sm font-bold leading-tight text-gray-900 dark:text-white">{p.baseName}</p>
        <p className="text-xs text-gray-500">
          {p.rating} ★ · {p.variantCount > 1 ? `${p.variantCount} options` : p.variantLabel}
        </p>
        <p className="text-sm font-extrabold text-gray-900 dark:text-white">
          ₹{inr(p.price)}{p.variantCount > 1 && <span className="font-medium text-gray-400"> onwards</span>}
        </p>
      </div>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#0c831f] text-[#0c831f]">
        <BagPlusIcon className="h-4 w-4" />
      </span>
    </button>
  )

  return (
    <div className="fixed inset-0 z-40 mx-auto flex max-w-md flex-col lg:max-w-none bg-gray-50 dark:bg-zinc-950">
      <header className="lg:mx-auto lg:w-full lg:max-w-3xl border-b border-gray-100 bg-white px-4 pb-3 pt-12 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="px-1 py-2 text-xl font-bold text-gray-500 active:scale-90 dark:text-gray-300" aria-label="Back">←</button>
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-gray-100 px-3 py-2.5 dark:bg-zinc-800">
            <SearchIcon className="h-4 w-4 text-gray-400" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Search 1000+ products…'
              className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
            />
            {q && <button onClick={() => setQ('')} className="text-sm font-bold text-gray-400">✕</button>}
          </div>
        </div>
      </header>

      <div className="flex-1 lg:mx-auto lg:w-full lg:max-w-3xl space-y-2 overflow-y-auto p-3">
        {q.trim() ? (
          <>
            <p className="px-1 text-xs font-semibold text-gray-400">{results.length} result{results.length === 1 ? '' : 's'}{results.length === 30 ? '+' : ''}</p>
            {results.map((p) => <Row key={p.templateId} p={p} />)}
            {results.length === 0 && (
              <div className="grid place-items-center py-16 text-center">
                <p className="font-semibold text-gray-600 dark:text-gray-300">"{q}" nahi mila 🫥</p>
                <p className="text-sm text-gray-400">Try "chips", "kajal", "earbuds"…</p>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="px-1 pt-1 text-xs font-black uppercase tracking-wide text-gray-400">✨ Picked for you</p>
            {forYou.map((p) => <Row key={p.templateId} p={p} badge={null} />)}
            <p className="px-1 pt-3 text-xs font-black uppercase tracking-wide text-gray-400">Popular searches</p>
            <div className="flex flex-wrap gap-2 px-1">
              {POPULAR.map((b) => (
                <button key={b} onClick={() => setQ(b)} className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-700 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-200">
                  {b}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
