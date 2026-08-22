import { CATEGORIES } from '../data/products'

export default function CategoryChips({ active, onSelect, newCount = 0 }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Today's drops. The catalog already rotates a fresh slice every day —
          this is the only thing that tells a returning visitor so. */}
      {newCount > 0 && (
        <button
          onClick={() => onSelect('new')}
          className={`label-caps flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-none px-3.5 py-2 text-[10px] transition-colors duration-200 active:scale-95 ${
            active === 'new'
              ? 'bg-white text-black lg:bg-neutral-900 lg:text-white lg:dark:bg-white lg:dark:text-black'
              : 'border border-white/50 text-white lg:border-neutral-300 lg:text-neutral-700 lg:dark:border-white/50 lg:dark:text-white'
          }`}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-600 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-600" />
          </span>
          {newCount} New in
        </button>
      )}
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`label-caps whitespace-nowrap rounded-none px-3.5 py-2 text-[10px] transition-colors duration-200 active:scale-95 ${
            active === c.id
              ? 'bg-white text-black lg:bg-neutral-900 lg:text-white lg:dark:bg-white lg:dark:text-black'
              : 'bg-black/25 text-white/85 backdrop-blur lg:bg-neutral-100 lg:text-neutral-600 lg:dark:bg-white/10 lg:dark:text-white/85'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
