import { CATEGORIES } from '../data/products'

export default function CategoryChips({ active, onSelect, newCount = 0, locks = {}, unlocked = new Set() }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* The calculator, first and always visible. Returning visitors skip the
          intro (welcomed flag persists), so this is the only in-feed door to
          /duty/ for them — and the tax number is what the engaged 13% actually
          come for. Styled apart from the category chips with the amber accent. */}
      <a
        href="/duty/"
        className="label-caps flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-none border border-amber-300/70 px-3.5 py-2 text-[10px] text-amber-300 active:scale-95 lg:border-amber-500/60 lg:text-amber-600 lg:dark:border-amber-300/70 lg:dark:text-amber-300"
      >
        🧮 Duty calc
      </a>
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
          {locks[c.id] && !unlocked.has(c.id) ? (
            <span className="flex items-center gap-1.5 opacity-80">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="14" height="10" x="5" y="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
              {c.label} · {locks[c.id]}
            </span>
          ) : (
            c.label
          )}
        </button>
      ))}
    </div>
  )
}
