import { useEffect, useState } from 'react'
import { trackInstallPrompt } from '../lib/track'

// Safari's ITP deletes localStorage after 7 days without a visit, and every
// retention mechanic here lives there: coins, XP, streak, unlocks, taste
// profile. So an iOS visitor who returns after a week finds their progress
// gone — the exact opposite of what the streak was built to do. A PWA added to
// the home screen is exempt from that eviction, which makes this prompt the
// only fix that needs no backend and no app store.
//
// Mobile Safari is ~24% of sessions, so this is aimed there; Android Chrome
// gets the native install prompt via beforeinstallprompt instead.
const KEY = 'thodasa.installNudge'
const isStandalone = () =>
  window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true

export default function InstallNudge() {
  const [show, setShow] = useState(false)
  const [deferred, setDeferred] = useState(null)

  useEffect(() => {
    if (isStandalone()) return
    let dismissedAt = 0
    try { dismissedAt = Number(localStorage.getItem(KEY)) || 0 } catch { /* private mode */ }
    // don't nag: once dismissed, stay quiet for two weeks
    if (Date.now() - dismissedAt < 14 * 864e5) return

    // Chrome fires beforeinstallprompt on load, so capture the event but do not
    // surface anything yet — an install ask on arrival is the kind of thing
    // people dismiss reflexively. Both platforms wait for real engagement.
    const onPrompt = (e) => { e.preventDefault(); setDeferred(e) }
    window.addEventListener('beforeinstallprompt', onPrompt)
    const t = setTimeout(() => setShow(true), 45000)
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); clearTimeout(t) }
  }, [])

  const close = (action) => {
    setShow(false)
    trackInstallPrompt(action)
    try { localStorage.setItem(KEY, String(Date.now())) } catch { /* private mode */ }
  }

  if (!show) return null

  return (
    <div className="pointer-events-auto fixed inset-x-3 bottom-24 z-[60] mx-auto max-w-md rounded-2xl border border-white/15 bg-zinc-900/95 p-4 shadow-2xl backdrop-blur-xl lg:bottom-6 lg:left-6 lg:right-auto lg:mx-0">
      <p className="text-sm font-bold text-white">Add ThodaSa to your home screen</p>
      <p className="mt-1 text-[12px] leading-snug text-white/65">
        {deferred
          ? 'Opens full screen, works offline, and keeps your coins and streak.'
          : 'Tap Share, then “Add to Home Screen”. Safari clears saved coins and streaks after a week otherwise.'}
      </p>
      <div className="mt-3 flex gap-2">
        {deferred && (
          <button
            onClick={async () => { close('accepted'); try { await deferred.prompt() } catch { /* dismissed */ } }}
            className="flex-1 rounded-xl bg-white px-4 py-2.5 text-[13px] font-extrabold text-zinc-900 active:scale-95"
          >
            Install
          </button>
        )}
        <button
          onClick={() => close('dismissed')}
          className={`rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white/70 active:scale-95 ${deferred ? '' : 'flex-1 bg-white/10'}`}
        >
          {deferred ? 'Not now' : 'Got it'}
        </button>
      </div>
    </div>
  )
}
