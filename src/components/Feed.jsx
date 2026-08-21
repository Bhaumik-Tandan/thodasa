import { useEffect, useRef } from 'react'
import ProductCard from './ProductCard'

export default function Feed({ products, wishlist, onToggleWish, onAddToCart, onQty, onRemove, onSignal, onDwell, cart, scrollToIndex, onScrolled }) {
  const ref = useRef(null)

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
    for (const child of root.children) observer.observe(child)
    return () => {
      // flush dwell for whatever card is on screen when the feed unmounts
      for (const [id, t] of enteredAt) {
        const product = products.find((p) => p.id === id)
        if (product) onDwell(product, performance.now() - t)
      }
      observer.disconnect()
    }
  }, [products, onDwell])

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

  return (
    <div ref={ref} className="snap-feed h-full overflow-y-auto">
      {products.map((p, i) => (
        <ProductCard
          key={p.id}
          index={i}
          product={p}
          wished={wishlist.has(p.id)}
          onToggleWish={onToggleWish}
          onAddToCart={onAddToCart}
          onQty={onQty}
          onRemove={onRemove}
          onSignal={onSignal}
          inCartQty={cart[p.id]?.qty ?? 0}
        />
      ))}
    </div>
  )
}
