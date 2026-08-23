import { useState } from 'react'

// In-app feedback loop. No backend needed:
//  • rating + text + contact fire into Microsoft Clarity as custom tags/events
//    (readable + filterable in the Clarity dashboard, per session)
//  • a copy is kept in localStorage as backup
//  • optional: set FEEDBACK_ENDPOINT to a Formspree/webhook URL for a clean inbox
const FEEDBACK_ENDPOINT = '' // e.g. 'https://formspree.io/f/xxxx' — leave '' to skip

const RATINGS = [
  { emoji: '😍', label: 'Love it', key: 'love' },
  { emoji: '🙂', label: 'Good', key: 'good' },
  { emoji: '😐', label: 'Meh', key: 'meh' },
  { emoji: '😞', label: 'Nope', key: 'bad' },
]

export default function Feedback() {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(null)
  const [text, setText] = useState('')
  const [contact, setContact] = useState('')
  const [sent, setSent] = useState(false)

  const submit = () => {
    if (!rating) return
    const entry = { rating, text: text.trim(), contact: contact.trim(), at: new Date().toISOString() }

    // 1) Clarity — structured tags + event, shows up in your dashboard
    try {
      if (window.clarity) {
        window.clarity('set', 'feedback_rating', rating)
        if (entry.text) window.clarity('set', 'feedback_text', entry.text.slice(0, 255))
        if (entry.contact) window.clarity('set', 'feedback_contact', entry.contact.slice(0, 100))
        window.clarity('event', 'feedback_submitted')
      }
    } catch { /* clarity not loaded (localhost) — fine */ }

    // 2) localStorage backup
    try {
      const all = JSON.parse(localStorage.getItem('thodasa.feedback') || '[]')
      all.push(entry)
      localStorage.setItem('thodasa.feedback', JSON.stringify(all))
    } catch { /* private mode — fine */ }

    // 3) optional real inbox
    if (FEEDBACK_ENDPOINT) {
      fetch(FEEDBACK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(entry),
      }).catch(() => {})
    }

    setSent(true)
    setTimeout(() => { setOpen(false); setSent(false); setRating(null); setText(''); setContact('') }, 1600)
  }

  return (
    <>
      {/* subtle floating trigger — bottom-left so it never clashes with the cart CTA */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Give feedback"
        className="absolute bottom-4 left-3 z-30 grid h-10 w-10 place-items-center rounded-full bg-black/35 text-lg backdrop-blur-md transition-transform active:scale-90"
      >
        💬
      </button>

      {open && (
        <div className="fixed inset-0 z-50 mx-auto flex max-w-md items-end justify-center lg:max-w-none lg:items-center" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="animate-slide-up relative w-full rounded-t-3xl bg-white p-5 pb-8 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300 dark:bg-zinc-700" />

            {sent ? (
              <div className="py-8 text-center">
                <div className="text-5xl">🙏</div>
                <p className="mt-3 text-lg font-black text-gray-900 dark:text-white">Shukriya!</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Goes straight to one person. No ticket, no bot.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">How's ThodaSa? 🛍️</h2>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">30-second honest take. It genuinely helps.</p>

                <div className="mt-4 flex justify-between gap-2">
                  {RATINGS.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => setRating(r.key)}
                      className={`flex flex-1 flex-col items-center gap-1 rounded-2xl border py-3 transition-all active:scale-95 ${
                        rating === r.key
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10'
                          : 'border-gray-200 dark:border-zinc-700'
                      }`}
                    >
                      <span className="text-2xl">{r.emoji}</span>
                      <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300">{r.label}</span>
                    </button>
                  ))}
                </div>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  placeholder="What would make it better? (optional)"
                  className="mt-3 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-rose-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />

                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="X handle / email if you want a reply (optional)"
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-rose-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />

                <button
                  onClick={submit}
                  disabled={!rating}
                  className="mt-3 w-full rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 py-3.5 font-extrabold text-white shadow-lg shadow-rose-500/40 transition-transform active:scale-[0.98] disabled:opacity-40"
                >
                  Send feedback
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
