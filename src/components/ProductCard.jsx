import { useState } from 'react'
import DealTimer from './DealTimer'
import { GRADS, CATEGORIES } from '../data/products'
import { HeartIcon, ShareIcon, BagPlusIcon, TrashIcon, MinusIcon, PlusIcon } from './Icons'

const fmtReviews = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n)

export default function ProductCard({ product, index, near = true, wished, onToggleWish, onAddToCart, onQty, onRemove, onSignal, onOpenDetail, inCartQty }) {
  const multi = product.variantCount > 1
  const [justAdded, setJustAdded] = useState(false)
  const [heartPop, setHeartPop] = useState(false)
  const [imgReady, setImgReady] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const [shared, setShared] = useState(false)
  // windowed loading: fetch the photo only once the card is near the viewport,
  // then keep it (sticky) so scrolling back never re-fetches.
  const [activated, setActivated] = useState(near)
  if (near && !activated) setActivated(true)

  const add = () => {
    onAddToCart(product)
    setJustAdded(true)
    if (navigator.vibrate) navigator.vibrate(15)
    setTimeout(() => setJustAdded(false), 550)
  }

  const wish = () => {
    onToggleWish(product.id)
    setHeartPop(true)
    setTimeout(() => setHeartPop(false), 450)
  }

  const [shareMsg, setShareMsg] = useState('')
  const share = async () => {
    const url = `${location.origin}/?product=${product.id}`
    const data = { title: product.name, text: `${product.name} — ₹${product.price} on ThodaSa`, url }
    const text = `${data.text} ${url}`
    try {
      if (navigator.share) {
        await navigator.share(data)
        return
      }
      await navigator.clipboard.writeText(text)
      setShareMsg('Link copied!')
    } catch (err) {
      if (err?.name === 'AbortError') return // user closed the share sheet
      // clipboard API can be blocked — fall back to the legacy copy path
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
        setShareMsg('Link copied!')
      } catch {
        setShareMsg('Could not share')
      }
    }
    setShared(true)
    setTimeout(() => setShared(false), 1400)
    onSignal?.(product, 'share')
  }

  const off = product.deal ? Math.round((1 - product.price / product.mrp) * 100) : 0
  const catLabel = CATEGORIES.find((c) => c.id === product.category)?.label ?? product.category

  return (
    <section data-index={index} className={`snap-card relative h-full w-full overflow-hidden bg-gradient-to-br ${GRADS[product.grad]}`}>
      {/* full-bleed product photo */}
      {!imgFailed && activated && (
        <img
          src={product.img}
          alt={product.name}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          onLoad={() => setImgReady(true)}
          onError={() => setImgFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${imgReady ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {(!imgReady || imgFailed) && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="animate-float text-[7rem] drop-shadow-[0_18px_24px_rgba(0,0,0,0.25)]">{product.emoji}</span>
        </div>
      )}

      {/* readability gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

      {/* deal timer */}
      {product.deal && (
        <div className="absolute left-4 top-28">
          <DealTimer productId={product.id} />
        </div>
      )}

      {/* right action rail — reels style */}
      <div className="absolute bottom-56 right-3 z-10 flex flex-col items-center gap-5">
        <button onClick={wish} aria-label="Wishlist" className="flex flex-col items-center active:scale-90">
          <span className={`grid h-12 w-12 place-items-center rounded-full bg-black/35 backdrop-blur-md ${heartPop ? 'animate-heart' : ''} ${wished ? 'text-rose-500' : 'text-white'}`}>
            <HeartIcon filled={wished} />
          </span>
          <span className="mt-1 text-[11px] font-bold text-white drop-shadow">{wished ? 'Saved' : 'Save'}</span>
        </button>
        <button onClick={share} aria-label="Share" className="flex flex-col items-center active:scale-90">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md">
            <ShareIcon />
          </span>
          <span className="mt-1 text-[11px] font-bold text-white drop-shadow">Share</span>
        </button>
        <button onClick={multi ? () => onOpenDetail(product) : add} aria-label="Quick add" className="flex flex-col items-center active:scale-90">
          <span className={`grid h-12 w-12 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md ${justAdded ? 'animate-pop' : ''}`}>
            <BagPlusIcon />
          </span>
          <span className="mt-1 text-[11px] font-bold text-white drop-shadow">{inCartQty > 0 ? `×${inCartQty}` : 'Add'}</span>
        </button>
      </div>

      {/* share toast */}
      {shared && (
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/75 px-4 py-2 text-sm font-bold text-white backdrop-blur">
          {shareMsg}
        </div>
      )}

      {/* bottom info overlay */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-6">
        <div className="px-4 pr-20">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
            {product.reason === 'forYou' && (
              <span className="rounded-full bg-violet-500 px-2.5 py-1 text-white shadow-lg shadow-violet-500/40">✨ For you</span>
            )}
            {product.reason === 'fresh' && (
              <span className="rounded-full bg-teal-500 px-2.5 py-1 text-white shadow-lg shadow-teal-500/40">🎲 Fresh find</span>
            )}
            {product.reason === 'new' && (
              <span className="rounded-full bg-amber-400 px-2.5 py-1 text-black shadow-lg shadow-amber-400/40">🆕 Aaj ka drop</span>
            )}
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-white backdrop-blur-sm">{catLabel}</span>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-amber-300 backdrop-blur-sm">
              ⭐ {product.rating} · {fmtReviews(product.reviews)} ratings
            </span>
            {product.deal && (
              <span className="rounded-full bg-rose-500 px-2.5 py-1 text-white shadow-lg shadow-rose-500/40">{off}% OFF</span>
            )}
          </div>

          <h2 className="mt-2 text-2xl font-black leading-tight text-white drop-shadow-lg">{product.baseName ?? product.name}</h2>
          <p className="mt-1 text-sm font-medium text-white/85 drop-shadow">{product.desc}</p>
          {multi && (
            <button
              onClick={() => onOpenDetail(product)}
              className="mt-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm active:scale-95"
            >
              {product.variantCount} options · {product.variantLabel} ▾
            </button>
          )}

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white drop-shadow-lg">₹{product.price}</span>
            {product.deal && <span className="text-sm font-semibold text-white/55 line-through">₹{product.mrp}</span>}
            <span className="ml-1 text-[11px] font-semibold text-emerald-300 drop-shadow">
              Free delivery over ₹499
            </span>
          </div>
          {product.deal && (
            <p className="mt-1 text-[11px] font-bold text-orange-300 drop-shadow">
              🔥 {14 + ((product.id * 53) % 87)} logo ne aaj kharida
            </p>
          )}
        </div>

        {/* full-width thumb-zone CTA: Add → quantity stepper with remove */}
        {inCartQty === 0 ? (
          <button
            onClick={multi ? () => onOpenDetail(product) : add}
            className={`mx-4 mt-3 flex h-14 w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-base font-extrabold text-white shadow-xl shadow-rose-500/40 transition-transform active:scale-[0.97] ${justAdded ? 'animate-pop animate-pulse-ring' : ''}`}
          >
            <BagPlusIcon className="h-5 w-5" />
            {multi ? `Choose options · from ₹${product.price}` : `Add to Cart · ₹${product.price}`}
          </button>
        ) : (
          <div className={`mx-4 mt-3 flex h-14 w-[calc(100%-2rem)] items-stretch overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-xl shadow-rose-500/40 ${justAdded ? 'animate-pop' : ''}`}>
            <button
              onClick={() => (inCartQty === 1 ? onRemove(product.id) : onQty(product.id, inCartQty - 1))}
              aria-label={inCartQty === 1 ? 'Remove from cart' : 'Decrease quantity'}
              className="grid w-16 place-items-center bg-black/15 active:bg-black/30"
            >
              {inCartQty === 1 ? <TrashIcon /> : <MinusIcon />}
            </button>
            <div className="flex flex-1 flex-col items-center justify-center leading-tight">
              <span className="text-base font-extrabold">{inCartQty} in cart</span>
              <span className="text-[11px] font-semibold text-white/85">₹{inCartQty * product.price} total</span>
            </div>
            <button
              onClick={add}
              aria-label="Increase quantity"
              className="grid w-16 place-items-center bg-black/15 active:bg-black/30"
            >
              <PlusIcon />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
