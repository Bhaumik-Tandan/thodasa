import { useState } from 'react'
import { CATEGORIES } from '../data/products'
import { LOCKS } from '../lib/unlocks'
import { load as loadGame, spendCoins } from '../lib/gamify'
import { play as playSound } from '../lib/sound'

// Category unlock prompt: shows the price in coins, spends them, celebrates.
// Locked tiers are the coin sink — before this, coins bought nothing.
export default function UnlockSheet({ category, onUnlocked, onClose }) {
  const [balance, setBalance] = useState(() => loadGame().coins)
  const cost = LOCKS[category]
  const label = CATEGORIES.find((c) => c.id === category)?.label ?? category
  const short = cost - balance

  const doUnlock = () => {
    if (!spendCoins(cost)) { setBalance(loadGame().coins); return }
    playSound('level')
    onUnlocked(category)
  }

  return (
    <div className="fixed inset-0 z-[70] mx-auto flex max-w-md flex-col justify-end lg:max-w-none lg:items-center lg:justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="animate-slide-up relative rounded-t-3xl bg-white p-6 pb-9 lg:w-full lg:max-w-md lg:rounded-3xl lg:shadow-2xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="label-caps text-[10px] text-gray-400">Locked section</p>
        <h2 className="font-display mt-2 text-[32px] leading-tight text-gray-900 dark:text-white">{label}</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Ye section coins se khulta hai. Scroll, save, order — sab coins deta hai.
        </p>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3.5 dark:bg-zinc-800/60">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Your coins</span>
          <span className="text-lg font-extrabold text-gray-900 dark:text-white">🪙 {balance.toLocaleString('en-IN')}</span>
        </div>

        {balance >= cost ? (
          <button
            onClick={doUnlock}
            className="label-caps mt-4 w-full bg-neutral-900 py-4 text-[12px] text-white active:scale-[0.98] dark:bg-white dark:text-black"
          >
            Unlock for 🪙 {cost}
          </button>
        ) : (
          <div className="mt-4">
            <button disabled className="label-caps w-full bg-gray-200 py-4 text-[12px] text-gray-400 dark:bg-zinc-800 dark:text-gray-500">
              Unlock for 🪙 {cost} — {short} short
            </button>
            <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
              Earn faster: order (+100) · daily spin (up to 500) · add to cart (+15) · scroll (+1 each)
            </p>
          </div>
        )}
        <button onClick={onClose} className="mt-3 w-full py-2 text-center text-xs font-semibold text-gray-400">
          Not now
        </button>
      </div>
    </div>
  )
}
