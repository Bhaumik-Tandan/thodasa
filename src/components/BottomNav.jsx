import { HomeIcon, HeartIcon, BagIcon, DiceIcon } from './Icons'

export default function BottomNav({ view, onNav, onSurprise, cartCount, cartTotal, wishCount }) {
  const item = (key, label, Icon, badge) => {
    const active = view === key
    return (
      <button onClick={() => onNav(key)} className="relative flex flex-1 flex-col items-center gap-0.5 py-2 active:scale-95">
        <span className={active ? 'text-[#7c3aed]' : 'text-gray-400 dark:text-gray-500'}>
          <Icon className="h-6 w-6" />
        </span>
        <span className={`text-[10px] font-bold ${active ? 'text-[#7c3aed]' : 'text-gray-400 dark:text-gray-500'}`}>{label}</span>
        {badge > 0 && (
          <span className="absolute right-1/2 top-1 grid h-4 min-w-4 -translate-y-0.5 translate-x-4 place-items-center rounded-full bg-[#0c831f] px-1 text-[9px] font-black text-white">
            {badge}
          </span>
        )}
      </button>
    )
  }

  return (
    <nav className="relative z-30 flex items-stretch border-t border-gray-100 bg-white pb-4 dark:border-zinc-800 dark:bg-zinc-900">
      {item('feed', 'Home', HomeIcon)}
      {item('wishlist', 'Wishlist', HeartIcon, wishCount)}

      {/* surprise FAB */}
      <div className="relative flex flex-1 flex-col items-center">
        <button
          onClick={onSurprise}
          aria-label="Surprise me"
          className="absolute -top-5 grid h-14 w-14 place-items-center rounded-full bg-[#7c3aed] text-white shadow-lg shadow-violet-500/40 active:scale-90"
        >
          <DiceIcon className="h-7 w-7" />
        </button>
        <span className="mt-9 pb-2 text-[10px] font-bold text-gray-400 dark:text-gray-500">Surprise</span>
      </div>

      {item('cart', cartCount > 0 ? `₹${cartTotal}` : 'Cart', BagIcon, cartCount)}
    </nav>
  )
}
