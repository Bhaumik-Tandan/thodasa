// First-visit explainer: tells the visitor what this is (a concept demo)
// before they form the wrong expectation. Shown once, then never again.
export default function Welcome({ onStart }) {
  return (
    <div className="fixed inset-0 z-[60] mx-auto flex max-w-md flex-col items-center justify-center gap-5 bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-600 px-8 text-center">
      <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-lg">
        Thoda<span className="text-amber-300">Sa</span> 🛍️
      </h1>
      <p className="text-lg font-bold text-white">Shopping, but it scrolls like reels.</p>

      <div className="w-full space-y-2.5 text-left">
        {[
          ['📱', 'Swipe up — one fun find per screen, sab under ₹499'],
          ['🧠', 'The feed learns your taste as you scroll, save & add'],
          ['😌', 'Cart has a guilt-free meter. It will judge you (lovingly)'],
          ['🧪', 'Concept demo — nothing real is sold, no login needed'],
        ].map(([emoji, text]) => (
          <div key={text} className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
            <span className="text-2xl">{emoji}</span>
            <span className="text-sm font-semibold text-white">{text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="mt-2 w-full rounded-2xl bg-white py-4 text-lg font-extrabold text-fuchsia-600 shadow-xl active:scale-95"
      >
        Shuru karo 🚀
      </button>
      <p className="text-xs font-medium text-white/70">Built in public · @TandanBhaumik</p>
    </div>
  )
}
