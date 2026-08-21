const fmtDate = (iso) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })

export default function Orders({ orders, onClose }) {
  return (
    <div className="animate-slide-up fixed inset-0 z-50 mx-auto flex max-w-md flex-col bg-gray-50 dark:bg-zinc-950">
      <header className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 pt-12 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">My Orders ({orders.length})</h1>
        <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-500 active:scale-95 dark:text-gray-300">
          Close
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-3">
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
                Placed (demo)
              </span>
            </div>
            <p className="mt-0.5 text-xs text-gray-400">{fmtDate(o.date)}</p>
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
                  <span className="font-semibold text-gray-900 dark:text-white">₹{it.product.price * it.qty}</span>
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex justify-between border-t border-dashed border-gray-200 pt-2 text-sm font-extrabold text-gray-900 dark:border-zinc-700 dark:text-white">
              <span>Total</span><span>₹{o.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
