import { useCallback, useEffect, useMemo, useState } from 'react'
import { PRODUCTS, TEMPLATE_HEROES } from './data/products'
import CategoryChips from './components/CategoryChips'
import Feed from './components/Feed'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Wishlist from './components/Wishlist'
import Orders from './components/Orders'
import Search from './components/Search'
import ProductSheet from './components/ProductSheet'
import Welcome from './components/Welcome'
import Confetti from './components/Confetti'
import Feedback from './components/Feedback'
import Rewards from './components/Rewards'
import { startDay, action as gameAction, onReward, load as loadGame } from './lib/gamify'
import { HeartIcon, BagIcon, MoonIcon, SunIcon, SearchIcon } from './components/Icons'
import { startSession, recordSignal, dwellSignal, rankFeed, isNewToday } from './lib/taste'
import { play as playSound } from './lib/sound'

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(`thodasa.${key}`)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(`thodasa.${key}`, JSON.stringify(value))
  } catch { /* storage full/blocked — app still works, just won't persist */ }
}

const COMPLIMENTS = [
  'Excellent choice! 🔥', 'Great taste 👌', 'Ooh, classy 💫', 'Solid pick 😎',
  "You've got an eye 👀", "Chef's kiss 🤌", 'Certified banger 🎯', 'Impeccable taste 🥂',
  "Now that's style ✨", 'Big brain shopping 🧠', 'Elite selection 🏆', 'Yesss, love this one 💖',
]

export default function App() {
  const [dark, setDark] = useState(() => load('dark', false))
  const [category, setCategory] = useState('all')
  const [cart, setCart] = useState(() => load('cart', {})) // id -> { product, qty }
  const [wishlist, setWishlist] = useState(() => new Set(load('wishlist', [])))
  const [orders, setOrders] = useState(() => load('orders', []))
  const [view, setView] = useState('feed') // feed | wishlist | cart | checkout | orders | search
  const [detail, setDetail] = useState(null) // product whose variant sheet is open
  const [welcomed, setWelcomed] = useState(() => load('welcomed', false))
  const [burstKey, setBurstKey] = useState(0)
  const [scrollToIndex, setScrollToIndex] = useState(null)
  const [cartBounce, setCartBounce] = useState(false)
  const [gameTick, setGameTick] = useState(0)
  const [reward, setReward] = useState(null)

  // deep link from static share pages: /p/<slug>/ redirects to /#p=<templateId>
  useEffect(() => {
    const m = location.hash.match(/^#p=(\d+)/)
    if (!m) return
    const hero = PRODUCTS.find((p) => p.templateId === Number(m[1]))
    if (hero) setDetail(hero)
    history.replaceState(null, '', '/')
  }, [])

  useEffect(() => save('dark', dark), [dark])
  useEffect(() => save('cart', cart), [cart])
  useEffect(() => save('wishlist', [...wishlist]), [wishlist])
  useEffect(() => save('orders', orders), [orders])

  // taste profile session: decay old signals once per visit, then rank the
  // feed by learned affinity (with exploration slots). Re-ranks per category.
  useEffect(() => {
    startDay()
    const off = onReward((r) => {
      setGameTick((t) => t + 1)
      playSound(r.type === 'achievement' ? 'level' : 'coin')
      setReward(r)
      setTimeout(() => setReward((cur) => (cur === r ? null : cur)), 2400)
    })
    return off
  }, [])
  const [tasteProfile] = useState(() => startSession())
  const products = useMemo(() => {
    const pool =
      category === 'all' ? PRODUCTS
      : category === 'new' ? PRODUCTS.filter(isNewToday)
      : PRODUCTS.filter((p) => p.category === category)
    return rankFeed(pool, tasteProfile)
  }, [category, tasteProfile])
  // how many of today's rotating drops exist — drives the "N new today" chip
  const newTodayCount = useMemo(() => TEMPLATE_HEROES.filter(isNewToday).length, [])

  const onDwell = useCallback((product, ms) => {
    const signal = dwellSignal(ms)
    if (signal) recordSignal(product, signal)
    gameAction('scroll')
  }, [])

  const onSignal = useCallback((product, signal) => { recordSignal(product, signal); if (signal === 'share') gameAction('share') }, [])

  const addToCart = useCallback((product) => {
    setCart((c) => ({ ...c, [product.id]: { product, qty: (c[product.id]?.qty ?? 0) + 1 } }))
    setCartBounce(true)
    setTimeout(() => setCartBounce(false), 500)
    recordSignal(product, 'addToCart')
    gameAction('add')
    playSound('add')
    const msg = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]
    setReward({ type: 'compliment', reason: `${msg}  +15 🪙` })
    setTimeout(() => setReward((cur) => (cur?.type === 'compliment' ? null : cur)), 2200)
  }, [])

  const setQty = useCallback((id, qty) => {
    setCart((c) => ({ ...c, [id]: { ...c[id], qty } }))
  }, [])

  const removeItem = useCallback((id) => {
    setCart((c) => {
      const next = { ...c }
      delete next[id]
      return next
    })
  }, [])

  const toggleWish = useCallback((id) => {
    const product = PRODUCTS.find((p) => p.id === id)
    setWishlist((w) => {
      const next = new Set(w)
      if (next.has(id)) {
        next.delete(id)
        if (product) recordSignal(product, 'unwishlist')
      } else {
        next.add(id)
        if (product) recordSignal(product, 'wishlist')
        gameAction('wish')
        playSound('wish')
      }
      return next
    })
  }, [])

  const placeOrder = useCallback(({ items, total }) => {
    setOrders((o) => [...o, { id: Date.now().toString(36).toUpperCase(), date: new Date().toISOString(), items, total }])
    setCart({})
    setBurstKey((k) => k + 1)
    for (const it of items) recordSignal(it.product, 'purchase')
    gameAction('order')
    playSound('order')
  }, [])

  const cartCount = Object.values(cart).reduce((s, it) => s + it.qty, 0)
  const cartTotal = Object.values(cart).reduce((s, it) => s + it.product.price * it.qty, 0)
  // per-template cart totals so multi-variant cards can show "In cart" state
  const cartByTemplate = {}
  for (const it of Object.values(cart)) {
    const t = (cartByTemplate[it.product.templateId] ||= { qty: 0, amt: 0 })
    t.qty += it.qty
    t.amt += it.qty * it.product.price
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="relative mx-auto h-dvh max-w-md overflow-hidden bg-gray-100 shadow-2xl lg:max-w-none lg:shadow-none dark:bg-zinc-950">
        {/* top bar — floats over the photo */}
        <header className="absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black/40 to-transparent pb-6 pt-3 lg:bg-black/80 lg:pb-2 lg:backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 pb-1 lg:mx-auto lg:max-w-[1600px] lg:px-10">
            <h1 className="text-xl font-black tracking-tight text-white drop-shadow">
              Thoda<span className="text-amber-300">Sa</span>
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('rewards')}
                aria-label="Rewards"
                className="flex items-center gap-1 rounded-full bg-amber-400/90 px-2.5 py-1.5 text-xs font-black text-black backdrop-blur-md active:scale-90"
              >
                🪙 <span key={gameTick}>{loadGame().coins.toLocaleString('en-IN')}</span>
              </button>
              <button
                onClick={() => setView('search')}
                aria-label="Search products"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/25 text-white backdrop-blur-md active:scale-90"
              >
                <SearchIcon className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => setView('wishlist')}
                aria-label="Open wishlist"
                className="flex items-center gap-1 rounded-full bg-white/25 px-2.5 py-1.5 text-xs font-bold text-white backdrop-blur-md active:scale-90"
              >
                <HeartIcon className="h-3.5 w-3.5" /> {wishlist.size}
              </button>
              <button
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle dark mode"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/25 text-white backdrop-blur-md active:scale-90"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                onClick={() => setView('cart')}
                className={`relative flex h-9 items-center gap-1.5 rounded-full bg-white/25 px-2.5 text-white backdrop-blur-md active:scale-90 ${cartBounce ? 'animate-wiggle' : ''}`}
                aria-label="Open cart"
              >
                <BagIcon className="h-5 w-5" />
                {cartCount > 0 && <span className="text-xs font-extrabold">₹{cartTotal}</span>}
                {cartCount > 0 && (
                  <span className={`absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-[10px] font-black text-black ${cartBounce ? 'animate-pop' : ''}`}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="lg:mx-auto lg:max-w-[1600px] lg:px-6">
            <CategoryChips active={category} newCount={newTodayCount} onSelect={(c) => { setCategory(c); setScrollToIndex(0) }} />
          </div>
        </header>

        {/* full-screen feed */}
        <Feed
          products={products}
          wishlist={wishlist}
          onToggleWish={toggleWish}
          onAddToCart={addToCart}
          onQty={setQty}
          onRemove={removeItem}
          onSignal={onSignal}
          onCategory={(cat) => { setCategory(cat); setScrollToIndex(0) }}
          onDwell={onDwell}
          onOpenDetail={setDetail}
          cart={cart}
          cartByTemplate={cartByTemplate}
          hasCartBar={cartCount > 0}
          scrollToIndex={scrollToIndex}
          onScrolled={() => setScrollToIndex(null)}
        />

        {/* persistent View Cart bar — the checkout path users kept missing */}
        {cartCount > 0 && view === 'feed' && (
          <button
            onClick={() => setView('cart')}
            className="animate-slide-up absolute inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-2xl bg-[#0c831f] px-5 py-3.5 text-white shadow-2xl shadow-green-900/40 active:scale-[0.99]"
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <BagIcon className="h-5 w-5" />
              {cartCount} item{cartCount > 1 ? 's' : ''} · ₹{cartTotal}
            </span>
            <span className="text-base font-extrabold">View Cart →</span>
          </button>
        )}

        <Confetti burstKey={burstKey} />
        {view === 'feed' && <Feedback />}
        {view === 'rewards' && <Rewards onClose={() => setView('feed')} onChange={() => setGameTick((t) => t + 1)} />}
        {reward && (
          <div className="animate-slide-up pointer-events-none absolute left-1/2 top-20 z-[55] -translate-x-1/2 rounded-full bg-black/85 px-4 py-2 text-sm font-black text-amber-300 shadow-xl backdrop-blur">
            {reward.type === 'achievement' ? `${reward.achievement.emoji} ${reward.achievement.name} unlocked! +50 🪙` : reward.type === 'compliment' ? reward.reason : `🪙 ${reward.reason}`}
          </div>
        )}

        {view === 'wishlist' && (
          <Wishlist
            wishlist={wishlist}
            onToggleWish={toggleWish}
            onAddToCart={addToCart}
            cart={cart}
            onClose={() => setView('feed')}
          />
        )}
        {view === 'cart' && (
          <Cart
            cart={cart}
            onQty={setQty}
            onRemove={removeItem}
            onCheckout={() => setView('checkout')}
            onOrders={() => setView('orders')}
            onClose={() => setView('feed')}
          />
        )}
        {view === 'checkout' && (
          <Checkout
            cart={cart}
            onClose={() => setView('feed')}
            onOrders={() => setView('orders')}
            onOrderPlaced={placeOrder}
          />
        )}
        {view === 'orders' && <Orders orders={orders} onClose={() => setView('feed')} />}
        {view === 'search' && (
          <Search cart={cart} onAddToCart={addToCart} onOpenDetail={setDetail} onClose={() => setView('feed')} />
        )}
        {!welcomed && <Welcome onStart={() => { setWelcomed(true); save('welcomed', true) }} />}
        {detail && (
          <ProductSheet
            product={detail}
            cart={cart}
            onAddToCart={addToCart}
            onQty={setQty}
            onRemove={removeItem}
            onClose={() => setDetail(null)}
          />
        )}
      </div>
    </div>
  )
}
