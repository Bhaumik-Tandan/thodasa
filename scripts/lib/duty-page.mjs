// The standalone landed-cost calculator at /duty/.
//
// This is the one asset on the site with genuine search intent behind it.
// "import duty on iphone in india" is a question people type before spending
// real money; "a reels feed of products you cannot buy" is not. So the
// calculator gets its own page, works without the app bundle, and is indexable
// on its own terms.
//
// The maths is duplicated into inline browser JS on purpose — the page must
// work as a single static file with no module loading — but gen-pages.mjs
// asserts the inline copy agrees with lib/duty.js on a spread of inputs and
// fails the build if it ever drifts. A tax figure that disagrees with itself
// across two pages of the same site is worse than showing none.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

// Kept as a string so gen-pages can both embed it AND eval it for the
// cross-check against landedFrom().
export const BROWSER_MATH = `
function landed(mrp, bcdRate, gstRate, cessRate) {
  var b = bcdRate / 100, g = gstRate / 100, c = cessRate / 100;
  var assessable = mrp / ((1 + 1.1 * b) * (1 + g + c));
  var bcd = assessable * b;
  var sws = bcd * 0.1;
  var base = assessable + bcd + sws;
  var igst = base * g;
  var cess = base * c;
  var r = Math.round;
  return {
    mrp: r(mrp), assessable: r(assessable), bcd: r(bcd), sws: r(sws),
    igst: r(igst), cess: r(cess),
    govtTotal: r(bcd + sws + igst + cess),
    govtShare: mrp > 0 ? Math.round(((bcd + sws + igst + cess) / mrp) * 100) : 0
  };
}`

export const dutyPage = ({ site, goods }) => {
  const options = goods
    .map((g) => '<option value="' + esc(g.id) + '">' + esc(g.label) + '</option>')
    .join('\n        ')

  const rates = JSON.stringify(
    Object.fromEntries(goods.map((g) => [g.id, { l: g.label, g: g.gst, b: g.bcd, c: g.cess ?? 0 }])),
  )

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much is import duty on a phone in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A phone imported into India carries roughly 20% basic customs duty, a social welfare surcharge of 10% of that duty, and 18% IGST on the total. On a listed price of ₹1,44,900 that works out to about ₹44,247, or 31% of what you pay.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is GST included in the MRP in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Indian law requires the maximum retail price to be inclusive of all taxes, so GST is never added at the till — it is already inside the number on the label. To find the tax you extract it from the price rather than adding it on top.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the social welfare surcharge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The social welfare surcharge is 10% charged on the basic customs duty itself, not on the value of the goods. Because it compounds on the duty rather than the item, calculators that apply it to the goods value overstate the total.',
        },
      },
    ],
  }

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Import duty &amp; GST calculator for India | ThodaSa</title>
<meta name="description" content="Work out how much of an Indian price is customs duty, social welfare surcharge, compensation cess and GST. MRP is tax-inclusive, so this extracts the tax from the price rather than adding it on top.">
<link rel="canonical" href="${site}/duty/">
<meta property="og:type" content="website">
<meta property="og:url" content="${site}/duty/">
<meta property="og:title" content="How much of an Indian price is tax?">
<meta property="og:description" content="Customs duty, surcharge, cess and GST, extracted from any Indian price.">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(faq)}</script>
<style>
  :root{color-scheme:dark}
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0d0d0f;color:#fff;font-family:Inter,system-ui,-apple-system,sans-serif;line-height:1.6}
  .wrap{max-width:44rem;margin:0 auto;padding:3rem 1.5rem 5rem}
  .caps{font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;color:rgba(255,255,255,.45)}
  h1{font-family:Georgia,serif;font-weight:500;font-size:clamp(1.9rem,5vw,2.6rem);line-height:1.15;margin:.8rem 0 0}
  .lede{color:rgba(255,255,255,.72);margin-top:.7rem;max-width:34rem}
  form{margin-top:2rem;display:grid;gap:1rem}
  label{display:block}
  .caps.lbl{margin-bottom:.35rem}
  input,select{width:100%;background:#161619;color:#fff;border:1px solid rgba(255,255,255,.16);border-radius:.5rem;padding:.85rem .9rem;font-size:1rem;font-family:inherit}
  input:focus,select:focus{outline:2px solid rgba(255,255,255,.4);outline-offset:1px}
  .row{display:flex;gap:.6rem;align-items:center;flex-wrap:wrap}
  .row label{display:flex;gap:.45rem;align-items:center;font-size:.92rem;color:rgba(255,255,255,.8)}
  .row input[type=radio]{width:auto}
  table{width:100%;border-collapse:collapse;margin-top:1.6rem;font-size:.95rem}
  td{padding:.6rem 0;border-bottom:1px solid rgba(255,255,255,.1)}
  td:last-child{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
  tr.total td{font-weight:700;border-bottom:none;padding-top:.9rem}
  .hint{font-size:.78rem;color:rgba(255,255,255,.4)}
  .headline{margin-top:1.6rem;font-family:Georgia,serif;font-size:clamp(1.5rem,4vw,2rem);line-height:1.2}
  .headline b{color:#fbbf24;font-weight:500}
  h2{font-size:1rem;margin-top:2.8rem;font-weight:700}
  p{color:rgba(255,255,255,.72);margin-top:.6rem}
  code{background:#161619;padding:.15rem .4rem;border-radius:.3rem;font-size:.86rem}
  pre{background:#161619;padding:.9rem;border-radius:.5rem;overflow-x:auto;margin-top:.7rem;font-size:.86rem}
  a{color:rgba(255,255,255,.8)}
  footer{margin-top:3rem;font-size:.8rem;color:rgba(255,255,255,.4)}
</style>
</head>
<body>
<div class="wrap">
  <p class="caps"><a href="/" style="text-decoration:none;color:inherit">ThodaSa</a> · India</p>
  <h1>How much of this price is tax?</h1>
  <p class="lede">Indian MRP is inclusive of tax by law, so the number on the label
  already contains it. This pulls it back out — customs duty, the surcharge on
  that duty, compensation cess and GST.</p>

  <form id="f">
    <label>
      <span class="caps lbl">Price shown in India (₹)</span>
      <input id="price" type="number" inputmode="numeric" min="0" step="1" value="144900">
    </label>
    <label>
      <span class="caps lbl">What is it?</span>
      <select id="goods">
        ${options}
      </select>
    </label>
    <div class="row">
      <span class="caps lbl" style="margin:0">Origin</span>
      <label><input type="radio" name="origin" value="1" checked> Imported</label>
      <label><input type="radio" name="origin" value="0"> Made in India</label>
    </div>
  </form>

  <p class="headline" id="headline"></p>
  <table id="out"></table>
  <p class="hint" id="ratehint"></p>

  <h2>How this is worked out</h2>
  <p>Because the price already includes tax, you cannot add rates to it — you
  solve backwards for the value the taxes were charged on:</p>
  <pre>A = MRP / ((1 + 1.1b) × (1 + g + c))</pre>
  <p><code>b</code> is basic customs duty, <code>g</code> is IGST and
  <code>c</code> is compensation cess. The <code>1.1b</code> is the part most
  calculators get wrong: the 10% social welfare surcharge is charged on the
  <em>duty</em>, not on the goods, so it compounds on <code>b</code> alone.</p>

  <h2>How accurate is this?</h2>
  <p>The rates are the indicative headline slabs for each kind of goods. Real
  classification runs on an 8-digit HSN code, and exemptions, free-trade
  agreements and value thresholds all move the number — a car under the CIF
  threshold is charged differently from one above it. Treat this as the right
  order of magnitude and the right <em>structure</em>, not a customs
  assessment.</p>

  <h2>Why it exists</h2>
  <p>A hypercar listed at $2.6M abroad sells for roughly three times that here
  and people assume someone is gouging them. Usually it is duty. Same for the
  phone that costs a third more than it does in Dubai — though
  <a href="/vs/">once you count customs on the way home, the Dubai deal mostly
  evaporates too</a>.</p>
  <p style="margin-top:1.2rem"><a href="/">See it applied across 900 real Indian products →</a></p>

  <footer>ThodaSa · <a href="/vs/">Dubai vs India prices</a> · <a href="/browse/">Browse products</a> · <a href="/credits/">Photo credits</a></footer>
</div>
<script>
var RATES = ${rates};
${BROWSER_MATH}
var inr = function (n) { return Math.round(n).toLocaleString('en-IN'); };
var priceEl = document.getElementById('price');
var goodsEl = document.getElementById('goods');
var out = document.getElementById('out');
var headline = document.getElementById('headline');
var ratehint = document.getElementById('ratehint');

function origin() {
  var r = document.querySelector('input[name=origin]:checked');
  return r && r.value === '1';
}

function row(label, hint, amount) {
  return '<tr><td>' + label + (hint ? ' <span class="hint">' + hint + '</span>' : '') +
         '</td><td>₹' + inr(amount) + '</td></tr>';
}

function render() {
  var mrp = Number(priceEl.value) || 0;
  var g = RATES[goodsEl.value];
  if (!g) return;
  var imported = origin();
  var d = landed(mrp, imported ? g.b : 0, g.g, imported ? g.c : 0);

  headline.innerHTML = mrp > 0
    ? '<b>₹' + inr(d.govtTotal) + '</b> of this is tax and duty — <b>' + d.govtShare + '%</b> of what you pay.'
    : 'Enter a price above.';

  var html = row('Product value', imported ? '(landed, before duty)' : '', d.assessable);
  if (d.bcd > 0) html += row('Basic customs duty', '@ ' + g.b + '%', d.bcd);
  if (d.sws > 0) html += row('Social welfare surcharge', '@ 10% of the duty', d.sws);
  if (d.cess > 0) html += row('Compensation cess', '@ ' + g.c + '%', d.cess);
  html += row(imported ? 'IGST' : 'GST', '@ ' + g.g + '%', d.igst);
  html += '<tr class="total"><td>You pay</td><td>₹' + inr(d.mrp) + '</td></tr>';
  out.innerHTML = html;

  ratehint.textContent = imported
    ? g.l + ': ' + g.b + '% customs duty, ' + g.g + '% IGST' + (g.c ? ', ' + g.c + '% cess' : '') + '. Indicative slabs.'
    : g.l + ': ' + g.g + '% GST' + (g.c ? ' plus ' + g.c + '% cess' : '') + '. No customs — made in India.';

  // Keep the URL shareable so a result can be sent to someone as a link.
  try {
    var qs = 'price=' + encodeURIComponent(mrp) + '&goods=' + encodeURIComponent(goodsEl.value) + '&imported=' + (imported ? 1 : 0);
    history.replaceState(null, '', '/duty/?' + qs);
  } catch (e) { /* file:// or blocked */ }
}

// restore from a shared link
(function () {
  var q = new URLSearchParams(location.search);
  if (q.get('price')) priceEl.value = q.get('price');
  if (q.get('goods') && RATES[q.get('goods')]) goodsEl.value = q.get('goods');
  if (q.get('imported') === '0') document.querySelector('input[name=origin][value="0"]').checked = true;
})();

document.getElementById('f').addEventListener('input', render);
render();
</script>
</body>
</html>
`
}
