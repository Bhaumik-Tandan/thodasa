import { inr } from '../data/products'
import { useState } from 'react'
import DealTimer from './DealTimer'
import { GRADS, CATEGORIES } from '../data/products'
import { load as loadGame } from '../lib/gamify'
import { HeartIcon, ShareIcon, BagPlusIcon, TrashIcon, MinusIcon, PlusIcon } from './Icons'
import { productUrl, productShareText, waShare, xShare, copyLink } from '../lib/share'
import { deliveryEstimate } from '../lib/orderStatus'

const fmtReviews = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n)

export default function ProductCard({ product, index, near = true, wished, onToggleWish, onAddToCart, onQty, onRemove, onSignal, onOpenDetail, onCategory, onUnlockPrompt, inCartQty, templateCart, hasCartBar = false }) {
  // Locked-tier teaser: shows WHAT is behind the lock and exactly what to do
  // about it. Locked categories used to be filtered out of the feed entirely,
  // so nobody knew cars/jets/real estate existed, let alone that they unlock.
  if (product.locked) {
    const cat = CATEGORIES.find((c) => c.id === product.category)?.label ?? product.category
    const coins = loadGame().coins
    const short = Math.max(0, product.lockCost - coins)
    return (
      <section data-index={index} className="snap-card relative h-full w-full overflow-hidden bg-[#0b0b0d]">
        {near && (
          <img
            src={product.img}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-xl"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />
        <button
          onClick={() => onUnlockPrompt?.(product.category)}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-white/25 text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="14" height="10" x="5" y="11" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </span>
          <p className="label-caps mt-5 text-[10px] text-white/50">Locked section</p>
          <h2 className="font-display mt-2 text-[34px] leading-tight text-white">{cat}</h2>
          <p className="mt-2 max-w-[17rem] text-[13px] leading-relaxed text-white/60">
            {product.variantCount > 1 ? `${product.variantCount} options · ` : ''}
            up to ₹{inr(product.price)} — like the {product.baseName}
          </p>
          <span className="label-caps mt-7 bg-white px-5 py-3.5 text-[11px] text-black">
            {short > 0 ? `${short} more coins to unlock` : `Unlock for ${product.lockCost} coins`}
          </span>
          <p className="mt-4 text-[11px] text-white/45">
            You have 🪙 {inr(coins)} · earn more by scrolling, saving &amp; ordering
          </p>
        </button>
      </section>
    )
  }

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
  const [shareOpen, setShareOpen] = useState(false)
  const toast = (msg) => {
    setShareMsg(msg)
    setShared(true)
    setTimeout(() => setShared(false), 1400)
  }
  const doShare = (how) => {
    const url = productUrl(product)
    const text = productShareText(product)
    if (how === 'wa') waShare(text, url)
    else if (how === 'x') xShare(text, url)
    else copyLink(`${text}\n${url}`).then((ok) => toast(ok ? 'Link copied!' : 'Could not copy'))
    setShareOpen(false)
    onSignal?.(product, 'share')
  }

  const off = product.deal ? Math.round((1 - product.price / product.mrp) * 100) : 0
  const catLabel = CATEGORIES.find((c) => c.id === product.category)?.label ?? product.category

  return (
    <section data-index={index} className={`snap-card relative h-full w-full overflow-hidden bg-gradient-to-br ${GRADS[product.grad]} lg:grid lg:grid-cols-[1.25fr_1fr] lg:bg-white lg:bg-none lg:dark:bg-[#0b0b0d]`}>
      {/* full-bleed product photo */}
      {!imgFailed && activated && (
        <img
          src={product.img}
          alt={product.name}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          onLoad={() => setImgReady(true)}
          onError={() => setImgFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 lg:w-[55.56%] ${imgReady ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {(!imgReady || imgFailed) && (
        <div className="absolute inset-0 grid place-items-center lg:right-[44.44%]">
          <span className="animate-float text-[7rem] drop-shadow-[0_18px_24px_rgba(0,0,0,0.25)]">{product.emoji}</span>
        </div>
      )}

      {/* readability gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/60 to-transparent lg:hidden" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/45 to-transparent lg:hidden" />

      {/* Whole-photo tap target. Reels-trained users instinctively tap the media,
          and until now that did nothing — it was ~7% of all clicks on the site
          (the 2nd most-clicked element, and dead). Sits at z-0 so every control
          above it still wins the tap. */}
      <button
        type="button"
        aria-label={`View details for ${product.name}`}
        onClick={() => onOpenDetail(product)}
        className="absolute inset-0 z-0 cursor-pointer lg:right-[44.44%]"
      />

      {/* deal timer */}
      {product.deal && (
        <div className="absolute left-4 top-28">
          <DealTimer productId={product.id} />
        </div>
      )}

      {/* right action rail — reels style */}
      <div className="absolute bottom-56 right-3 z-20 flex flex-col items-center gap-5 lg:bottom-10 lg:right-12 lg:flex-row lg:gap-9">
        <button onClick={wish} aria-label="Wishlist" className="flex flex-col items-center active:scale-90">
          <span className={`grid h-12 w-12 place-items-center rounded-full bg-black/35 backdrop-blur-md lg:bg-neutral-100 lg:dark:bg-black/35 ${heartPop ? 'animate-heart' : ''} ${wished ? 'text-rose-500' : 'text-white'}`}>
            <HeartIcon filled={wished} />
          </span>
          <span className="mt-1 text-[11px] font-bold text-white drop-shadow lg:text-neutral-500 lg:drop-shadow-none lg:dark:text-white">{wished ? 'Saved' : 'Save'}</span>
        </button>
        <button onClick={() => setShareOpen(true)} aria-label="Share" className="flex flex-col items-center active:scale-90">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md lg:bg-neutral-100 lg:text-neutral-700 lg:dark:bg-black/35 lg:dark:text-white">
            <ShareIcon />
          </span>
          <span className="mt-1 text-[11px] font-bold text-white drop-shadow lg:text-neutral-500 lg:drop-shadow-none lg:dark:text-white">Share</span>
        </button>
        <button onClick={multi ? () => onOpenDetail(product) : add} aria-label="Quick add" className="flex flex-col items-center active:scale-90">
          <span className={`grid h-12 w-12 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md lg:bg-neutral-100 lg:text-neutral-700 lg:dark:bg-black/35 lg:dark:text-white ${justAdded ? 'animate-pop' : ''}`}>
            <BagPlusIcon />
          </span>
          <span className="mt-1 text-[11px] font-bold text-white drop-shadow lg:text-neutral-500 lg:drop-shadow-none lg:dark:text-white">{inCartQty > 0 ? `×${inCartQty}` : 'Add'}</span>
        </button>
      </div>

      {/* share toast */}
      {shared && (
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/75 px-4 py-2 text-sm font-bold text-white backdrop-blur">
          {shareMsg}
        </div>
      )}

      {/* share menu — WhatsApp first, because India */}
      {shareOpen && (
        <div className="absolute inset-0 z-30 flex items-end justify-center" onClick={() => setShareOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="animate-slide-up relative mb-28 w-[85%] space-y-2 rounded-3xl bg-white p-3 shadow-2xl dark:bg-zinc-900" onClick={(e) => e.stopPropagation()}>
            <p className="px-2 pt-1 text-xs font-black uppercase tracking-wide text-gray-400">Share this find</p>
            <button onClick={() => doShare('wa')} className="flex w-full items-center gap-3 rounded-2xl bg-[#25D366] px-4 py-3.5 font-extrabold text-white active:scale-[0.98]">
              <span className="text-xl">💬</span> WhatsApp pe bhejo
            </button>
            <button onClick={() => doShare('x')} className="flex w-full items-center gap-3 rounded-2xl bg-black px-4 py-3.5 font-extrabold text-white active:scale-[0.98] dark:bg-white dark:text-black">
              <span className="text-xl">𝕏</span> Post on X
            </button>
            <button onClick={() => doShare('copy')} className="flex w-full items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3.5 font-extrabold text-gray-800 active:scale-[0.98] dark:bg-zinc-800 dark:text-gray-100">
              <span className="text-xl">🔗</span> Copy link
            </button>
          </div>
        </div>
      )}

      {/* bottom info overlay */}
      <div className={`absolute inset-x-0 bottom-0 z-10 lg:static lg:col-start-2 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:justify-center ${hasCartBar ? 'pb-[74px] lg:pb-0' : 'pb-6 lg:pb-0'}`}>
        <div className="px-4 pr-20 lg:px-12 lg:pr-16">
          <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
            {product.reason === 'forYou' && (
              <span className="label-caps rounded-sm bg-white/95 px-2 py-1 text-[9px] text-black lg:bg-neutral-900 lg:text-white lg:dark:bg-white lg:dark:text-black">For you</span>
            )}
            {product.reason === 'fresh' && (
              <span className="label-caps rounded-sm border border-white/40 px-2 py-1 text-[9px] text-white lg:border-neutral-300 lg:text-neutral-600 lg:dark:border-white/40 lg:dark:text-white">Fresh find</span>
            )}
            {product.reason === 'new' && (
              <span className="label-caps rounded-sm bg-white/95 px-2 py-1 text-[9px] text-black lg:bg-neutral-900 lg:text-white lg:dark:bg-white lg:dark:text-black">New in</span>
            )}
            {product.deal && (
              <span className="label-caps rounded-sm border border-white/50 px-2 py-1 text-[9px] text-white lg:border-neutral-300 lg:text-neutral-700 lg:dark:border-white/50 lg:dark:text-white">{off}% off</span>
            )}
            <button
              onClick={() => onCategory?.(product.category)}
              className="label-caps px-1 py-1 text-[9px] text-white/70 underline decoration-white/30 underline-offset-4 active:scale-95 lg:text-neutral-500 lg:decoration-neutral-300 lg:dark:text-white/70 lg:dark:decoration-white/30"
            >
              {catLabel}
            </button>
          </div>

          {/* brand set apart from the product name — how fashion retail reads */}
          <p className="label-caps mt-3 text-[11px] text-white/75 lg:mt-0 lg:text-[12px] lg:text-neutral-500 lg:dark:text-white/70">{product.brand}</p>
          <h2 className="font-display mt-1 text-[27px] leading-[1.15] text-white drop-shadow-lg lg:mt-2 lg:text-[46px] lg:leading-[1.08] lg:text-neutral-900 lg:drop-shadow-none lg:dark:text-white">
            {product.baseName ?? product.name}
          </h2>
          <p className="mt-1.5 text-[13px] font-normal leading-snug text-white/80 drop-shadow lg:mt-4 lg:max-w-md lg:text-[15px] lg:leading-relaxed lg:text-neutral-600 lg:drop-shadow-none lg:dark:text-white/70">{product.desc}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-white/70 lg:text-neutral-500 lg:dark:text-white/70">
            <span className="text-amber-300">★</span> {product.rating}
            <span className="text-white/35">·</span> {fmtReviews(product.reviews)} ratings
          </div>
          {multi && (
            <button
              onClick={() => onOpenDetail(product)}
              className="label-caps mt-2.5 text-[9px] text-white/80 underline decoration-white/30 underline-offset-4 active:scale-95 lg:text-neutral-600 lg:decoration-neutral-300 lg:dark:text-white/80 lg:dark:decoration-white/30"
            >
              {product.variantCount} options · {product.variantLabel}
            </button>
          )}

          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-display text-[30px] leading-none text-white drop-shadow lg:text-[40px] lg:text-neutral-900 lg:drop-shadow-none lg:dark:text-white">₹{inr(product.price)}</span>
            {product.deal && <span className="text-[13px] font-normal text-white/45 line-through lg:text-neutral-400 lg:dark:text-white/45">₹{inr(product.mrp)}</span>}
            <span className="label-caps ml-0.5 text-[9px] text-white/60 lg:text-neutral-500 lg:dark:text-white/60">Free over ₹499</span>
          </div>
          <p className="mt-1.5 text-[11px] font-medium text-emerald-300 lg:text-emerald-700 lg:dark:text-emerald-300">
            {deliveryEstimate(product).label}
          </p>
          {product.deal && (
            <p className="mt-1 text-[11px] font-medium text-white/55 lg:text-neutral-500 lg:dark:text-white/55">
              {14 + ((product.id * 53) % 87)} logo ne aaj kharida
            </p>
          )}
        </div>

        {/* full-width thumb-zone CTA: Add → quantity stepper with remove */}
        {multi && templateCart?.qty > 0 ? (
          <button
            onClick={() => onOpenDetail(product)}
            className="label-caps mx-4 mt-4 flex h-14 w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-none bg-black/85 text-[12px] text-white ring-1 ring-white/25 backdrop-blur transition-transform active:scale-[0.98] lg:mx-12 lg:mt-8 lg:h-16 lg:w-[min(22rem,calc(100%-6rem))] lg:bg-[#0c831f] lg:text-white lg:ring-0 lg:dark:bg-black/85 lg:dark:ring-1"
          >
            ✓ {templateCart.qty} in cart · ₹{inr(templateCart.amt)} — Edit options ▾
          </button>
        ) : inCartQty === 0 ? (
          <button
            onClick={multi ? () => onOpenDetail(product) : add}
            className={`label-caps mx-4 mt-4 flex h-14 w-[calc(100%-2rem)] items-center justify-center gap-2.5 rounded-none bg-white text-[12px] text-black transition-transform active:scale-[0.98] lg:mx-12 lg:mt-8 lg:h-16 lg:w-[min(22rem,calc(100%-6rem))] lg:bg-neutral-900 lg:text-white lg:hover:bg-neutral-800 lg:dark:bg-white lg:dark:text-black lg:dark:hover:bg-white/90 ${justAdded ? 'animate-pop' : ''}`}
          >
            <BagPlusIcon className="h-5 w-5" />
            {multi ? `Choose options · from ₹${inr(product.price)}` : `Add to Cart · ₹${inr(product.price)}`}
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
              <span className="text-[11px] font-semibold text-white/85">₹{inr(inCartQty * product.price)} total</span>
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
