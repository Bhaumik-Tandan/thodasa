import { useEffect, useRef } from 'react'
import ProductCard from './ProductCard'

export default function Feed({ products, wishlist, onToggleWish, onAddToCart, onQty, onRemove, cart, scrollToIndex, onScrolled }) {
  const ref = useRef(null)

  useEffect(() => {
    if (scrollToIndex == null || !ref.current) return
    const el = ref.current.children[scrollToIndex]
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    onScrolled()
  }, [scrollToIndex, onScrolled])

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
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          wished={wishlist.has(p.id)}
          onToggleWish={onToggleWish}
          onAddToCart={onAddToCart}
          onQty={onQty}
          onRemove={onRemove}
          inCartQty={cart[p.id]?.qty ?? 0}
        />
      ))}
    </div>
  )
}
