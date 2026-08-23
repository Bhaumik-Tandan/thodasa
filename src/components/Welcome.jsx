// First-visit explainer: tells the visitor what this is (a concept demo)
// before they form the wrong expectation. Shown once, then never again.
//
// This is the first thing anyone sees, so it sets the quality expectation for
// the whole app — it deliberately uses the same editorial language as the
// product card (Playfair display, tracked caps, solid white CTA, no emoji)
// rather than the loud gradient it used to have.
export default function Welcome({ onStart }) {
  return (
    <div className="fixed inset-0 z-[60] mx-auto flex max-w-md flex-col justify-center gap-12 overflow-hidden bg-[#0d0d0f] px-8 py-12 lg:max-w-3xl lg:gap-16 lg:px-16">
      {/* faint editorial wash so the black isn't flat */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-white/8 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-white/6 to-transparent blur-3xl" />

      <div className="relative">
        <p className="label-caps text-[10px] text-white/45">Concept demo · India</p>
        <h1 className="font-display mt-5 text-[44px] leading-[1.05] text-white lg:text-[68px]">
          Thoda<span className="italic text-white/70">Sa</span>
        </h1>
        <p className="mt-4 max-w-[19rem] text-[15px] leading-relaxed text-white/60">
          Retail therapy without the receipts. Swipe real Indian products for the fun of it — buy nothing.
        </p>
      </div>

      <div className="relative">
        <div className="border-t border-white/12">
          {[
            ['01', 'Nothing is for sale. That is the point — browse guilt-free'],
            ['02', 'Tap any price to see how much of it is GST and customs duty'],
            ['03', 'The feed learns your taste as you scroll — all in your browser'],
          ].map(([n, text]) => (
            <div key={n} className="flex items-start gap-4 border-b border-white/12 py-4">
              <span className="label-caps mt-0.5 text-[10px] text-white/35">{n}</span>
              <span className="text-[13.5px] leading-snug text-white/75">{text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="label-caps mt-8 w-full bg-white py-4.5 text-[12px] text-black transition-transform active:scale-[0.98]"
        >
          Shuru karo
        </button>
        <p className="label-caps mt-5 text-center text-[9px] text-white/30">
          Built in public · @TandanBhaumik
        </p>
      </div>
    </div>
  )
}
