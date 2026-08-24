import { useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard'
import { LAST_DROP_COUNT } from '../data/products'

export default function Feed({ products, wishlist, onToggleWish, onAddToCart, onQty, onRemove, onSignal, onDwell, onOpenDetail, onCategory, onActiveProduct, onUnlockPrompt, cart, cartByTemplate = {}, hasCartBar = false, scrollToIndex, onScrolled }) {
  const ref = useRef(null)
  // Which card the user is on — drives windowed image loading so a cold
  // visitor downloads ~4 photos instead of the whole catalog at once.
  const [activeIndex, setActiveIndex] = useState(0)
  // Incremental rendering: with a 1000+ SKU catalog we only mount a batch of
  // cards and grow it as the user approaches the end — like a real feed.
  const BATCH = 30
  const [renderCount, setRenderCount] = useState(BATCH)
  const observerRef = useRef(null)
  const observedRef = useRef(new WeakSet())

  useEffect(() => {
    // category switch / re-rank: reset to the top batch
    setRenderCount(BATCH)
    setActiveIndex(0)
  }, [products])

  // Scroll fires up to ~120x/sec in a snap container, and this handler reads
  // scrollTop/clientHeight (a forced synchronous layout) then sets state. Doing
  // that per event is a large INP contributor; collapsing to one read per frame
  // gives the same result for a fraction of the main-thread cost.
  const rafRef = useRef(0)
  const onScroll = () => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      const el = ref.current
      if (!el || !el.clientHeight) return
      const idx = Math.round(el.scrollTop / el.clientHeight)
      setActiveIndex((prev) => {
        if (prev !== idx) onActiveProduct?.(products[idx])
        return prev === idx ? prev : idx
      })
      if (idx > renderCount - 10) setRenderCount((c) => Math.min(products.length, c + BATCH))
    })
  }
  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), [])

  useEffect(() => {
    if (scrollToIndex == null || !ref.current) return
    const el = ref.current.children[scrollToIndex]
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    onScrolled()
  }, [scrollToIndex, onScrolled])

  // Dwell tracking: how long each card stays ≥60% visible.
  // Long pause = interest, instant flick past = skip. Feeds the taste profile.
  useEffect(() => {
    const root = ref.current
    if (!root || !onDwell) return
    const enteredAt = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number(entry.target.dataset.index)
          const product = products[idx]
          if (!product) continue
          if (entry.isIntersecting) {
            enteredAt.set(product.id, performance.now())
          } else if (enteredAt.has(product.id)) {
            onDwell(product, performance.now() - enteredAt.get(product.id))
            enteredAt.delete(product.id)
          }
        }
      },
      { root, threshold: 0.6 },
    )
    observerRef.current = observer
    observedRef.current = new WeakSet()
    for (const child of root.children) {
      observedRef.current.add(child)
      observer.observe(child)
    }
    return () => {
      observerRef.current = null
      // flush dwell for whatever card is on screen when the feed unmounts
      for (const [id, t] of enteredAt) {
        const product = products.find((p) => p.id === id)
        if (product) onDwell(product, performance.now() - t)
      }
      observer.disconnect()
    }
  }, [products, onDwell])

  // The effect above runs once per `products` change, when only the first
  // BATCH of cards exists — so every card mounted by a later batch was never
  // observed, and dwell signals silently stopped past card 30. The taste engine
  // was therefore only ever learning from the first 30 cards of a session.
  useEffect(() => {
    const root = ref.current
    const observer = observerRef.current
    if (!root || !observer) return
    for (const child of root.children) {
      if (observedRef.current.has(child)) continue
      observedRef.current.add(child)
      observer.observe(child)
    }
  }, [renderCount, products])

  if (!products.length) {
    return (
      <div className="grid h-full place-items-center px-8 text-center">
        <div>
          <p className="text-lg font-bold text-gray-700 dark:text-gray-200">Kuch nahi mila yahan!</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try another category.</p>
        </div>
      </div>
    )
  }

  const restart = () => {
    // instant jump — smooth-scrolling across 46 screens stalls in snap
    // containers and feels endless; a snap back reads as "fresh deck"
    if (ref.current) ref.current.scrollTop = 0
    setActiveIndex(0)
  }

  return (
    <div ref={ref} onScroll={onScroll} className="snap-feed h-full overflow-y-auto">
      {products.slice(0, renderCount).map((p, i) => (
        <ProductCard
          key={p.id}
          index={i}
          near={Math.abs(i - activeIndex) <= 2}
          active={i === activeIndex}
          product={p}
          wished={wishlist.has(p.id)}
          onToggleWish={onToggleWish}
          onAddToCart={onAddToCart}
          onQty={onQty}
          onRemove={onRemove}
          onSignal={onSignal}
          onOpenDetail={onOpenDetail}
          onCategory={onCategory}
          onUnlockPrompt={onUnlockPrompt}
          inCartQty={cart[p.id]?.qty ?? 0}
          templateCart={cartByTemplate[p.templateId]}
          hasCartBar={hasCartBar}
        />
      ))}
      {/* end-of-feed loop card — only when the whole catalog is exhausted */}
      {renderCount >= products.length && (
        <section className="snap-card relative flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-rose-500 px-8 text-center">
          <span className="animate-float text-7xl">🎢</span>
          <h2 className="text-3xl font-black text-white drop-shadow-lg">Bas, itna hi tha!</h2>
          <p className="text-base font-medium text-white/85">Aapne saare {products.length} finds dekh liye.</p>
          <p className="mt-1 text-sm font-semibold text-white/95">
            Kal subah {LAST_DROP_COUNT > 0 ? `${LAST_DROP_COUNT} naye products` : 'naye products'} aayenge — aur streak bhi badhega 🔥
          </p>
          <button
            onClick={restart}
            className="mt-2 rounded-2xl bg-white px-8 py-4 text-base font-extrabold text-fuchsia-600 shadow-xl active:scale-95"
          >
            🔁 Phir se scroll karo
          </button>
          <p className="text-xs font-semibold text-white/70">Pro tip: jitna scroll karoge, utna smart hoga aapka feed ✨</p>
        </section>
      )}
    </div>
  )
}
