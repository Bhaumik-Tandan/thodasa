import { CATEGORIES } from '../data/products'

export default function CategoryChips({ active, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
