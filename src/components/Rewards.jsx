import { useState } from 'react'
import { summary, canSpin, spin, SPIN_PRIZES, levelFor } from '../lib/gamify'
import { play as playSound, isEnabled as soundOn, setEnabled as setSoundEnabled } from '../lib/sound'
import { VolumeOnIcon, VolumeOffIcon } from './Icons'

const WHEEL_COLORS = ['#f43f5e', '#fb923c', '#facc15', '#4ade80', '#22d3ee', '#818cf8', '#c084fc', '#f472b6']

export default function Rewards({ onClose, onChange }) {
  const [g, setG] = useState(() => summary())
  const [snd, setSnd] = useState(() => soundOn())
  const [spinning, setSpinning] = useState(false)
  const [deg, setDeg] = useState(0)
  const [won, setWon] = useState(null)
  const spinnable = canSpin(g)

  const doSpin = () => {
    if (spinning || !canSpin()) return
    setSpinning(true)
    setWon(null)
    playSound('spin')
    const res = spin()
    if (!res) { setSpinning(false); return }
    // land the winning segment under the top pointer
    const target = 360 * 5 + (360 - (res.idx * 45 + 22.5))
    setDeg(target)
    setTimeout(() => {
      setSpinning(false)
      setWon(res.prize)
      setG(summary())
      onChange?.()
    }, 3200)
  }

  const wheelBg = `conic-gradient(${SPIN_PRIZES.map((_, i) => `${WHEEL_COLORS[i]} ${i * 45}deg ${(i + 1) * 45}deg`).join(', ')})`

  return (
    <div className="animate-slide-up fixed inset-0 z-40 mx-auto flex max-w-md flex-col lg:max-w-none bg-gray-50 dark:bg-zinc-950">
      <header className="lg:mx-auto lg:w-full lg:max-w-2xl flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 pt-12 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-lg font-black text-gray-900 dark:text-white">Rewards 🎁</h1>
        <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-500 active:scale-95 dark:text-gray-300">Close</button>
      </header>

      <div className="flex-1 lg:mx-auto lg:w-full lg:max-w-2xl space-y-4 overflow-y-auto p-4">
        {/* level + coins + streak */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 p-5 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/70">Level {g.level.emoji}</p>
              <p className="text-2xl font-black">{g.level.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-wide text-white/70">Coins</p>
              <p className="text-2xl font-black">🪙 {g.coins.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${g.pct}%` }} />
          </div>
          <div className="mt-1.5 flex justify-between text-xs font-semibold text-white/80">
            <span>🔥 {g.streak}-day streak</span>
            <span>{g.next ? `${g.next.min - g.xp} XP to ${g.next.name}` : 'Max level!'}</span>
          </div>
        </div>

        {/* sound toggle — off by default so a first visit is never noisy */}
        <button
          onClick={() => setSnd(setSoundEnabled(!snd))}
          aria-pressed={snd}
          className="flex w-full items-center gap-3.5 rounded-3xl border border-gray-100 bg-white p-4 text-left transition-colors active:scale-[0.99] dark:border-zinc-800 dark:bg-zinc-900"
        >
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-colors ${
              snd
                ? 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300'
                : 'bg-gray-100 text-gray-400 dark:bg-zinc-800 dark:text-gray-500'
            }`}
          >
            {snd ? <VolumeOnIcon className="h-5 w-5" /> : <VolumeOffIcon className="h-5 w-5" />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-gray-900 dark:text-white">Sound effects</span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {snd ? 'Coins, cart adds & spins' : 'Off — tap to turn on'}
            </span>
          </span>
          <span
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
              snd ? 'bg-violet-600' : 'bg-gray-200 dark:bg-zinc-700'
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                snd ? 'left-6' : 'left-1'
              }`}
            />
          </span>
        </button>

        {/* daily spin */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-black uppercase tracking-wide text-gray-400">Daily Spin</p>
          <div className="relative mx-auto mt-4 h-56 w-56">
            {/* pointer */}
            <div className="absolute left-1/2 top-[-6px] z-10 -translate-x-1/2 text-2xl">🔻</div>
            <div
              className="h-56 w-56 rounded-full border-8 border-white shadow-lg dark:border-zinc-700"
              style={{ background: wheelBg, transform: `rotate(${deg}deg)`, transition: spinning ? 'transform 3.2s cubic-bezier(.17,.67,.2,1)' : 'none' }}
            />
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-2xl shadow-md dark:bg-zinc-800">🎁</div>
            </div>
          </div>

          {won ? (
            <p className="mt-4 text-lg font-black text-fuchsia-600 dark:text-fuchsia-400">You won {won.label}! 🎉</p>
          ) : spinnable ? (
            <button onClick={doSpin} disabled={spinning} className="mt-4 w-full rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 py-3.5 font-extrabold text-white shadow-lg shadow-rose-500/40 active:scale-[0.98] disabled:opacity-50">
              {spinning ? 'Spinning…' : 'SPIN to win 🪙'}
            </button>
          ) : (
            <p className="mt-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Aaj ka spin done — kal aana! ⏰</p>
          )}
        </div>

        {/* achievements */}
        <div>
          <p className="px-1 pb-2 text-xs font-black uppercase tracking-wide text-gray-400">
            Achievements · {g.achievements.filter((a) => a.unlocked).length}/{g.achievements.length}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {g.achievements.map((a) => (
              <div key={a.id} className={`rounded-2xl border p-3 ${a.unlocked ? 'border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10' : 'border-gray-100 bg-white opacity-50 dark:border-zinc-800 dark:bg-zinc-900'}`}>
                <div className="flex items-start gap-2">
                  <span className={`text-2xl leading-none ${a.unlocked ? '' : 'grayscale'}`}>{a.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight text-gray-900 dark:text-white">{a.name}</p>
                    <p className="mt-0.5 text-[11px] leading-tight text-gray-500">{a.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="pb-4 text-center text-[11px] text-gray-400">
          Earn coins by scrolling, saving, adding to cart & visiting daily. It's a demo — coins are for fun 🪙
        </p>
      </div>
    </div>
  )
}
