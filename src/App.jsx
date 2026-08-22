import { useCallback, useEffect, useMemo, useState } from 'react'
import { PRODUCTS } from './data/products'
import CategoryChips from './components/CategoryChips'
import Feed from './components/Feed'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Wishlist from './components/Wishlist'
import Orders from './components/Orders'
import Search from './components/Search'
import ProductSheet from './components/ProductSheet'
import Confetti from './components/Confetti'
import { HeartIcon, BagIcon, MoonIcon, SunIcon, SearchIcon } from './components/Icons'
import { startSession, recordSignal, dwellSignal, rankFeed } from './lib/taste'

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

export default function App() {
  const [dark, setDark] = useState(() => load('dark', false))
  const [category, setCategory] = useState('all')
  const [cart, setCart] = useState(() => load('cart', {})) // id -> { product, qty }
  const [wishlist, setWishlist] = useState(() => new Set(load('wishlist', [])))
  const [orders, setOrders] = useState(() => load('orders', []))
  const [view, setView] = useState('feed') // feed | wishlist | cart | checkout | orders | search
  const [detail, setDetail] = useState(null) // product whose variant sheet is open
  const [burstKey, setBurstKey] = useState(0)
  const [scrollToIndex, setScrollToIndex] = useState(null)
  const [cartBounce, setCartBounce] = useState(false)

  useEffect(() => save('dark', dark), [dark])
  useEffect(() => save('cart', cart), [cart])
  useEffect(() => save('wishlist', [...wishlist]), [wishlist])
  useEffect(() => save('orders', orders), [orders])

  // taste profile session: decay old signals once per visit, then rank the
  // feed by learned affinity (with exploration slots). Re-ranks per category.
  const [tasteProfile] = useState(() => startSession())
  const products = useMemo(() => {
    const pool = category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)
    return rankFeed(pool, tasteProfile)
  }, [category, tasteProfile])

  const onDwell = useCallback((product, ms) => {
    const signal = dwellSignal(ms)
    if (signal) recordSignal(product, signal)
  }, [])

  const onSignal = useCallback((product, signal) => recordSignal(product, signal), [])

  const addToCart = useCallback((product) => {
    setCart((c) => ({ ...c, [product.id]: { product, qty: (c[product.id]?.qty ?? 0) + 1 } }))
    setCartBounce(true)
    setTimeout(() => setCartBounce(false), 500)
    recordSignal(product, 'addToCart')
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
      }
      return next
    })
  }, [])

  const placeOrder = useCallback(({ items, total }) => {
    setOrders((o) => [...o, { id: Date.now().toString(36).toUpperCase(), date: new Date().toISOString(), items, total }])
    setCart({})
    setBurstKey((k) => k + 1)
    for (const it of items) recordSignal(it.product, 'purchase')
  }, [])

  const cartCount = Object.values(cart).reduce((s, it) => s + it.qty, 0)
  const cartTotal = Object.values(cart).reduce((s, it) => s + it.product.price * it.qty, 0)

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="relative mx-auto h-dvh max-w-md overflow-hidden bg-gray-100 shadow-2xl dark:bg-zinc-950">
        {/* top bar — floats over the photo */}
        <header className="absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black/40 to-transparent pb-6 pt-3">
          <div className="flex items-center justify-between px-4 pb-1">
            <h1 className="text-xl font-black tracking-tight text-white drop-shadow">
              Thoda<span className="text-amber-300">Sa</span>
            </h1>
            <div className="flex items-center gap-2">
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
          <CategoryChips active={category} onSelect={(c) => { setCategory(c); setScrollToIndex(0) }} />
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
          onDwell={onDwell}
          onOpenDetail={setDetail}
          cart={cart}
          scrollToIndex={scrollToIndex}
          onScrolled={() => setScrollToIndex(null)}
        />

        <Confetti burstKey={burstKey} />

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
