// First screen — the front door.
//
// It used to lead with "Retail therapy without the receipts. Swipe real Indian
// products for the fun of it — buy nothing." That framing sold the reels store,
// and 30 days of Clarity said the reels store is the low-intent path: 62% of
// sessions bounce shallow, while the 13% who go deep are goal-seekers, and the
// goal Google sends them for is a tax number (jet/phone "price in india"
// queries ranking page 1). So the door now leads with the calculator: the
// primary button goes to /duty/, and browsing the feed is the secondary path.
//
// `replay` is set when reopened from Rewards; the ✕ closes it. Backdrop is
// full-bleed on purpose — capping it at max-w-3xl once left the live app
// clickable down both sides on desktop and showed up as dead clicks.
export default function Welcome({ onStart, replay = false }) {
  return (
    <div className="fixed inset-0 z-[60] overflow-hidden bg-[#0d0d0f]">
      <div className="relative mx-auto flex h-full max-w-md flex-col justify-center gap-10 px-8 py-12 lg:max-w-3xl lg:gap-14 lg:px-16">
        {replay && (
          <button
            onClick={onStart}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-lg text-white/70 backdrop-blur active:scale-90"
          >
            ✕
          </button>
        )}
        {/* faint editorial wash so the black isn't flat */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-white/8 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-white/6 to-transparent blur-3xl" />

        <div className="relative">
          <p className="label-caps text-[10px] text-white/45">
            Thoda<span className="text-amber-300/80">Sa</span> · India
          </p>
          <h1 className="font-display mt-5 text-[36px] leading-[1.08] text-white lg:text-[54px]">
            How much of an Indian price is actually tax?
          </h1>
          <p className="mt-4 max-w-[21rem] text-[15px] leading-relaxed text-white/60">
            MRP includes every tax by law, so the number on the label already
            hides it. This pulls it back out — customs duty, surcharge, cess, GST.
          </p>
        </div>

        <div className="relative">
          {/* three hooks that make the calculator worth a tap */}
          <div className="border-t border-white/12">
            {[
              ['iPhone 16 Pro Max', '31% is tax'],
              ['Imported car', '62%'],
              ['A cold drink', 'taxed harder than a laptop'],
            ].map(([thing, fact]) => (
              <div key={thing} className="flex items-baseline justify-between gap-4 border-b border-white/12 py-3.5">
                <span className="text-[14px] text-white/75">{thing}</span>
                <span className="label-caps text-[10px] text-amber-300/90">{fact}</span>
              </div>
            ))}
          </div>

          <a
            href="/duty/"
            className="label-caps mt-8 flex w-full items-center justify-center gap-2 bg-white py-4.5 text-[12px] text-black transition-transform active:scale-[0.98]"
          >
            Work out any price →
          </a>
          <button
            onClick={onStart}
            className="mt-4 w-full py-2 text-center text-[13px] font-medium text-white/55 active:text-white/80"
          >
            or just browse the feed
          </button>
          <p className="label-caps mt-5 text-center text-[9px] text-white/30">
            Concept demo · built in public · @TandanBhaumik
          </p>
        </div>
      </div>
    </div>
  )
}
