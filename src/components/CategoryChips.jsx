import { CATEGORIES } from '../data/products'

export default function CategoryChips({ active, onSelect, newCount = 0 }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Today's drops. The catalog already rotates a fresh slice every day —
          this is the only thing that tells a returning visitor so. */}
      {newCount > 0 && (
        <button
          onClick={() => onSelect('new')}
          className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-200 active:scale-90 ${
            active === 'new'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-black shadow-lg shadow-amber-400/40 scale-105'
              : 'bg-amber-400/95 text-black shadow-lg shadow-amber-400/30 backdrop-blur'
          }`}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-600 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-600" />
          </span>
          {newCount} new today
        </button>
      )}
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-200 active:scale-90 ${
            active === c.id
              ? 'bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-lg shadow-rose-500/40 scale-105'
              : 'bg-white/80 text-gray-700 backdrop-blur dark:bg-white/10 dark:text-gray-200'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
