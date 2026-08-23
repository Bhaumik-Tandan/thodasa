import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PRODUCTS, TEMPLATE_HEROES, CATEGORIES, inr, inrShort } from './data/products'
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
import OrderStatusBar from './components/OrderStatusBar'
import UnlockSheet from './components/UnlockSheet'
import { LOCKS, isLocked, loadUnlocked, saveUnlocked, lockedTeasers, nextUnlock } from './lib/unlocks'
import InstallNudge from './components/InstallNudge'
import { trackAddToCart, trackRemoveFromCart, trackWishlist, trackPurchase, trackUnlock, trackBeginCheckout } from './lib/track'
import { activeOrders, normalizeOrder } from './lib/orderStatus'
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
  const [orders, setOrders] = useState(() => {
    const raw = load('orders', [])
    const fixed = (Array.isArray(raw) ? raw : []).map(normalizeOrder).filter(Boolean)
    if (JSON.stringify(fixed) !== JSON.stringify(raw)) save('orders', fixed)
    return fixed
  })
  const [view, setView] = useState('feed') // feed | wishlist | cart | checkout | orders | search
  const [detail, setDetail] = useState(null) // product whose variant sheet is open
  const [welcomed, setWelcomed] = useState(() => load('welcomed', false))
  const [burstKey, setBurstKey] = useState(0)
  const [scrollToIndex, setScrollToIndex] = useState(null)
  const [cartBounce, setCartBounce] = useState(false)
  const [gameTick, setGameTick] = useState(0)
  const [reward, setReward] = useState(null)
  const [unlocked, setUnlocked] = useState(() => loadUnlocked())
  const [unlockPrompt, setUnlockPrompt] = useState(null) // category awaiting unlock

  // deep link from static share pages: /p/<slug>/ redirects to /#p=<templateId>
  useEffect(() => {
    const m = location.hash.match(/^#p=(\d+)/)
    if (!m) return
    const hero = PRODUCTS.find((p) => p.templateId === Number(m[1]))
    if (hero) setDetail(hero)
    history.replaceState(null, '', '/')
  }, [])

  // Shareable browse state: /?c=<category>&p=<templateId>. On load, restore
  // the category and scroll the feed to that product; while browsing, keep the
  // URL in sync (replaceState, so the back button isn't spammed).
  useEffect(() => {
    const q = new URLSearchParams(location.search)
    const pid = Number(q.get('p'))
    const shared = pid ? PRODUCTS.find((x) => x.templateId === pid) : null

    // A shared link has to deliver the product it promised, even when that
    // product sits in a locked category — the lock gates *browsing* the tier,
    // not one specific item someone was sent. Otherwise every link posted to
    // social lands on an unlock wall instead of the thing being talked about.
    if (shared) {
      setDetail(shared)
      if (!isLocked(shared.category, loadUnlocked())) setCategory(shared.category)
      return
    }

    const c = q.get('c')
    if (c && (c === 'new' || CATEGORIES.some((x) => x.id === c))) {
      if (isLocked(c, loadUnlocked())) setUnlockPrompt(c)
      else setCategory(c)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Phone back button: opening any panel pushes a history entry so back closes
  // it instead of leaving the site (people were being ejected from thodasa.com
  // when they hit back inside the cart or search).
  const openView = useCallback((v) => {
    setView(v)
    history.pushState({ ts: 'view', view: v }, '')
  }, [])

  const openDetail = useCallback((p) => {
    setDetail(p)
    history.pushState({ ts: 'detail', id: p.templateId }, '')
  }, [])

  const closeOverlay = useCallback(() => {
    if (history.state?.ts) history.back() // popstate handler resets the view
    else { setView('feed'); setDetail(null) }
  }, [])

  // No overlay handled Escape — the variant sheet closed on a backdrop click
  // only, which is fine on touch but wrong on a desktop layout that now has a
  // real keyboard. Uses the history-aware close so Back stays consistent.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (unlockPrompt) { setUnlockPrompt(null); return }
      if (detail || view !== 'feed') { history.back() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [detail, view, unlockPrompt])

  useEffect(() => {
    const onPop = (e) => {
      const st = e.state
      setUnlockPrompt(null)
      if (st?.ts === 'view') { setDetail(null); setView(st.view); return }
      if (st?.ts === 'detail') {
        const p = PRODUCTS.find((x) => x.templateId === st.id)
        setView('feed'); setDetail(p ?? null); return
      }
      setDetail(null); setView('feed')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const syncUrl = useCallback((cat, templateId) => {
    const q = new URLSearchParams()
    if (cat && cat !== 'all') q.set('c', cat)
    if (templateId) q.set('p', String(templateId))
    const qs = q.toString()
    history.replaceState(history.state, '', qs ? `/?${qs}` : '/')
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
    const open = (p) => !isLocked(p.category, unlocked)
    const pool =
      category === 'all' ? PRODUCTS.filter(open)
      : category === 'new' ? PRODUCTS.filter(isNewToday).filter(open)
      : PRODUCTS.filter((p) => p.category === category)
    const ranked = rankFeed(pool, tasteProfile)
    if (category !== 'all') return ranked

    // Splice locked teasers into the All feed at a fixed cadence. Locked tiers
    // used to be filtered out completely, so a visitor never discovered that
    // cars, jets or Dubai real estate existed — the locked chips live off-screen
    // in a 24-chip scroll and ~85% of browsing happens right here in All.
    const teasers = lockedTeasers(PRODUCTS, unlocked)
    if (!teasers.length) return ranked
    const out = []
    let t = 0
    for (let i = 0; i < ranked.length; i++) {
      out.push(ranked[i])
      // first tease early enough to be seen in a one-minute session
      if (t < teasers.length && (i === 4 || (i > 4 && (i - 4) % 11 === 0))) out.push(teasers[t++])
    }
    return out
  }, [category, tasteProfile, unlocked])

  // "340 more coins to unlock Cars" — tells people what to do, not just that
  // something is locked
  const nextLock = useMemo(() => nextUnlock(unlocked), [unlocked, gameTick])
  // how many of today's rotating drops exist — drives the "N new today" chip
  const newTodayCount = useMemo(() => TEMPLATE_HEROES.filter(isNewToday).length, [])

  // restore ?p=<templateId> once the ranked feed exists
  useEffect(() => {
    const pid = new URLSearchParams(location.search).get('p')
    if (!pid) return
    const idx = products.findIndex((x) => x.templateId === Number(pid))
    if (idx >= 0) setScrollToIndex(idx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onActiveProduct = useCallback((product) => {
    if (product) syncUrl(category, product.templateId)
  }, [syncUrl, category])

  const onDwell = useCallback((product, ms) => {
    const signal = dwellSignal(ms)
    if (signal) recordSignal(product, signal)
    gameAction('scroll')
    // Scroll rewards deliberately emit no toast, so the header coin pill never
    // re-rendered while scrolling — the counter looked frozen and taught people
    // that browsing earns nothing. Refresh it every few cards instead.
    scrollTick.current = (scrollTick.current + 1) % 3
    if (scrollTick.current === 0) setGameTick((t) => t + 1)
  }, [])
  const scrollTick = useRef(0)

  const onSignal = useCallback((product, signal) => { recordSignal(product, signal); if (signal === 'share') gameAction('share') }, [])

  const addToCart = useCallback((product) => {
    setCart((c) => ({ ...c, [product.id]: { product, qty: (c[product.id]?.qty ?? 0) + 1 } }))
    setCartBounce(true)
    setTimeout(() => setCartBounce(false), 500)
    recordSignal(product, 'addToCart')
    trackAddToCart(product)
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
    trackRemoveFromCart()
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
        if (product) { recordSignal(product, 'wishlist'); trackWishlist(product) }
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
    trackPurchase(total, items.reduce((n, it) => n + it.qty, 0))
    gameAction('order')
    playSound('order')
  }, [])

  const liveOrders = activeOrders(orders)
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
        <header className="absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black/40 to-transparent pb-6 pt-3 lg:border-b lg:border-neutral-200 lg:bg-white lg:from-transparent lg:pb-2 lg:dark:border-white/10 lg:dark:bg-[#0b0b0d]">
          <div className="flex items-center justify-between px-4 pb-1 lg:mx-auto lg:max-w-[1600px] lg:px-10">
            <h1 className="text-xl font-black tracking-tight text-white drop-shadow lg:text-neutral-900 lg:drop-shadow-none lg:dark:text-white">
              Thoda<span className="text-amber-300">Sa</span>
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openView('rewards')}
                aria-label="Rewards"
                className="flex items-center gap-1 rounded-full bg-amber-400/90 px-2.5 py-1.5 text-xs font-black text-black backdrop-blur-md active:scale-90"
              >
                🪙 <span key={gameTick}>{loadGame().coins.toLocaleString('en-IN')}</span>
                {nextLock && (
                  <span className="hidden text-[10px] font-bold text-black/55 sm:inline">
                    /{nextLock.cost}
                  </span>
                )}
              </button>
              <button
                onClick={() => openView('search')}
                aria-label="Search products"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/25 text-white backdrop-blur-md active:scale-90 lg:bg-neutral-100 lg:text-neutral-700 lg:dark:bg-white/10 lg:dark:text-white"
              >
                <SearchIcon className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => openView('wishlist')}
                aria-label="Open wishlist"
                className="flex items-center gap-1 rounded-full bg-white/25 px-2.5 py-1.5 text-xs font-bold text-white backdrop-blur-md active:scale-90 lg:bg-neutral-100 lg:text-neutral-700 lg:dark:bg-white/10 lg:dark:text-white"
              >
                <HeartIcon className="h-3.5 w-3.5" /> {wishlist.size}
              </button>
              <button
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle dark mode"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/25 text-white backdrop-blur-md active:scale-90 lg:bg-neutral-100 lg:text-neutral-700 lg:dark:bg-white/10 lg:dark:text-white"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                onClick={() => openView('cart')}
                className={`relative flex h-9 items-center gap-1.5 rounded-full bg-white/25 px-2.5 text-white backdrop-blur-md active:scale-90 lg:bg-neutral-100 lg:text-neutral-700 lg:dark:bg-white/10 lg:dark:text-white ${cartBounce ? 'animate-wiggle' : ''}`}
                aria-label="Open cart"
              >
                <BagIcon className="h-5 w-5" />
                {cartCount > 0 && <span className="text-xs font-extrabold">₹{inrShort(cartTotal)}</span>}
                {cartCount > 0 && (
                  <span className={`absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-[10px] font-black text-black ${cartBounce ? 'animate-pop' : ''}`}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="lg:mx-auto lg:max-w-[1600px] lg:px-6">
            <CategoryChips active={category} newCount={newTodayCount} locks={LOCKS} unlocked={unlocked} onSelect={(c) => { if (isLocked(c, unlocked)) { setUnlockPrompt(c); return } setCategory(c); setScrollToIndex(0); syncUrl(c, null) }} />
          </div>
          {/* live order strip — the only route to My Orders used to be the cart
              header, and placing an order empties the cart, so people lost it */}
          {liveOrders.length > 0 && <OrderStatusBar order={liveOrders[0]} more={liveOrders.length - 1} onOpen={() => openView('orders')} />}
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
          onCategory={(cat) => { if (isLocked(cat, unlocked)) { setUnlockPrompt(cat); return } setCategory(cat); setScrollToIndex(0); syncUrl(cat, null) }}
          onDwell={onDwell}
          onActiveProduct={onActiveProduct}
          onUnlockPrompt={setUnlockPrompt}
          onOpenDetail={openDetail}
          cart={cart}
          cartByTemplate={cartByTemplate}
          hasCartBar={cartCount > 0}
          scrollToIndex={scrollToIndex}
          onScrolled={() => setScrollToIndex(null)}
        />

        {/* persistent View Cart bar — the checkout path users kept missing */}
        {cartCount > 0 && view === 'feed' && (
          <button
            onClick={() => openView('cart')}
            className="animate-slide-up absolute inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-2xl bg-[#0c831f] px-5 py-3.5 text-white shadow-2xl shadow-green-900/40 active:scale-[0.99]"
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <BagIcon className="h-5 w-5" />
              {cartCount} item{cartCount > 1 ? 's' : ''} · ₹{inr(cartTotal)}
            </span>
            <span className="text-base font-extrabold">View Cart →</span>
          </button>
        )}

        <InstallNudge />

        {unlockPrompt && (
          <UnlockSheet
            category={unlockPrompt}
            onUnlocked={(cat) => {
              const next = new Set(unlocked); next.add(cat)
              setUnlocked(next); saveUnlocked(next)
              trackUnlock(cat, LOCKS[cat])
              setUnlockPrompt(null)
              setGameTick((t) => t + 1)
              setBurstKey((k) => k + 1)
              setCategory(cat); setScrollToIndex(0); syncUrl(cat, null)
            }}
            onClose={() => setUnlockPrompt(null)}
          />
        )}
        <Confetti burstKey={burstKey} />
        {view === 'feed' && <Feedback />}
        {view === 'rewards' && <Rewards onClose={closeOverlay} onChange={() => setGameTick((t) => t + 1)} />}
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
            onClose={closeOverlay}
          />
        )}
        {view === 'cart' && (
          <Cart
            cart={cart}
            onQty={setQty}
            onRemove={removeItem}
            onCheckout={() => { trackBeginCheckout(cartTotal, cartCount); openView('checkout') }}
            onOrders={() => openView('orders')}
            onClose={closeOverlay}
          />
        )}
        {view === 'checkout' && (
          <Checkout
            cart={cart}
            onClose={closeOverlay}
            onOrders={() => openView('orders')}
            onOrderPlaced={placeOrder}
          />
        )}
        {view === 'orders' && <Orders orders={orders} onClose={closeOverlay} />}
        {view === 'search' && (
          <Search cart={cart} onAddToCart={addToCart} onOpenDetail={openDetail} onClose={closeOverlay} />
        )}
        {!welcomed && <Welcome onStart={() => { setWelcomed(true); save('welcomed', true) }} />}
        {detail && (
          <ProductSheet
            product={detail}
            cart={cart}
            onAddToCart={addToCart}
            onQty={setQty}
            onRemove={removeItem}
            onClose={closeOverlay}
          />
        )}
      </div>
    </div>
  )
}
