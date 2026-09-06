// The Clarity snippet for the STATIC pages (/duty/, /vs/, /p/, /browse/,
// /credits/) — until now only the app shell (index.html) carried it, so all
// thousand-plus static pages were analytics-blind: Top Pages only ever showed
// the homepage, and no search visitor's behaviour on the duty calculator or
// the Dubai comparisons was ever recorded. For a site whose strategy is those
// pages, that was measuring the lobby and not the shop.
//
// Same guards as index.html, same project id, kept byte-for-byte in spirit:
//   * thodasa.noTrack in localStorage excludes the author's own visits
//     (/?dev=1 sets it once per device, /?dev=0 clears it)
//   * localhost / .local / file: never report
export const CLARITY_SNIPPET = `<script>
  (function (c, l, a, r, i, t, y) {
    try {
      var q = new URLSearchParams(l.location.search).get('dev')
      if (q === '1') localStorage.setItem('thodasa.noTrack', '1')
      if (q === '0') localStorage.removeItem('thodasa.noTrack')
      if (localStorage.getItem('thodasa.noTrack')) return
    } catch (e) { /* private mode: fall through and track */ }
    var h = l.location.hostname
    if (h === 'localhost' || h === '127.0.0.1' || h.endsWith('.local') || l.location.protocol === 'file:') return
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "y63dkbbpsv");
</script>`
