// Dubai vs India comparison pages — /vs/<slug>/ plus the /vs/ hub.
//
// The query family ("iphone price in dubai vs india") has real volume and is
// answered today by stale forum threads and blogs that stop at the naive
// shelf-price gap. Our differentiator is the duty engine: these pages compute
// BOTH honest numbers — what Dubai actually costs after the tourist VAT refund,
// and what Indian customs takes on the way home. For most electronics that
// second number kills the famous saving, which no competing page says.
//
// All figures are computed at BUILD time from src/data/vsDubai.js — there is no
// inline JS copy of the model, so page and model cannot drift.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
const inr = (n) => Math.round(Math.abs(n)).toLocaleString('en-IN')

// Shared head + styles, matching the duty page's look so /vs/ and /duty/ read
// as one product.
const shell = ({ title, desc, canonical, jsonld, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="ThodaSa">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta name="twitter:card" content="summary">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
<style>
  :root{color-scheme:dark}
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0d0d0f;color:#fff;font-family:Inter,system-ui,-apple-system,sans-serif;line-height:1.6}
  .wrap{max-width:44rem;margin:0 auto;padding:3rem 1.5rem 5rem}
  .caps{font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;color:rgba(255,255,255,.45)}
  h1{font-family:Georgia,serif;font-weight:500;font-size:clamp(1.9rem,5vw,2.6rem);line-height:1.15;margin:.8rem 0 0}
  .lede{color:rgba(255,255,255,.72);margin-top:.7rem;max-width:34rem}
  .headline{margin-top:1.6rem;font-family:Georgia,serif;font-size:clamp(1.4rem,4vw,1.9rem);line-height:1.25}
  .headline b{color:#fbbf24;font-weight:500}
  .headline b.bad{color:#fb7185}
  table{width:100%;border-collapse:collapse;margin-top:1rem;font-size:.93rem}
  td,th{padding:.55rem 0;border-bottom:1px solid rgba(255,255,255,.1);text-align:left}
  td:last-child,th:last-child{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
  th{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.45);font-weight:600}
  tr.total td{font-weight:700;border-bottom:none;padding-top:.9rem}
  .hint{font-size:.78rem;color:rgba(255,255,255,.4)}
  .good{color:#4ade80}
  .bad{color:#fb7185}
  h2{font-size:1rem;margin-top:2.6rem;font-weight:700}
  p{color:rgba(255,255,255,.72);margin-top:.6rem}
  a{color:rgba(255,255,255,.8)}
  ul{list-style:none;margin-top:.6rem}
  li{padding:.3rem 0;font-size:.92rem}
  footer{margin-top:3rem;font-size:.8rem;color:rgba(255,255,255,.4)}
</style>
</head>
<body>
<div class="wrap">
${body}
</div>
</body>
</html>
`

const footer = `  <footer>
    <p>ThodaSa is a free concept demo. Prices on both sides are indicative list
    prices at the stated exchange rate, not live quotes — check the store before
    booking a flight around a gadget. The customs figures assume you declare
    honestly at the red channel, which is the law.</p>
    <p style="margin-top:.8rem"><a href="/">Open ThodaSa →</a> &middot; <a href="/duty/">Duty &amp; GST calculator</a> &middot; <a href="/vs/">All Dubai comparisons</a> &middot; <a href="/browse/">Browse products</a></p>
  </footer>`

// One product's comparison page.
export const vsPage = ({ site, item, cmp, model, others }) => {
  const url = `${site}/vs/${item.slug}/`
  const worth = cmp.honestSaving > 0
  const title = `${item.name} price in Dubai vs India — real saving after customs | ThodaSa`
  const desc = worth
    ? `${item.name}: ₹${inr(item.inr)} in India, AED ${item.aed.toLocaleString('en-IN')} (₹${inr(cmp.dubaiInr)}) in Dubai. The shelf gap is ₹${inr(cmp.naiveSaving)}, but after the VAT refund and Indian customs the honest saving is ₹${inr(cmp.honestSaving)}.`
    : `${item.name}: ₹${inr(item.inr)} in India, AED ${item.aed.toLocaleString('en-IN')} (₹${inr(cmp.dubaiInr)}) in Dubai. The shelf gap looks like ₹${inr(cmp.naiveSaving)} — but declared honestly at Indian customs you would end up ₹${inr(-cmp.honestSaving)} WORSE off than buying in India.`

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${item.name} cheaper in Dubai than in India?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `On the shelf, yes: about ₹${inr(cmp.dubaiInr)} in Dubai against ₹${inr(item.inr)} in India. But after the tourist VAT refund and the 38.5% Indian customs duty on baggage above the ₹50,000 allowance, the honest ${worth ? `saving is about ₹${inr(cmp.honestSaving)}` : `answer is no — you would pay about ₹${inr(-cmp.honestSaving)} more than buying it in India`}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How much duty do I pay bringing electronics from Dubai to India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A returning Indian resident gets a ₹50,000 duty-free baggage allowance. Anything above it is charged 35% baggage duty plus a 10% surcharge on that duty — an effective 38.5% on the excess value.',
        },
      },
    ],
  }

  const badge = (n) =>
    n > 0 ? `<span class="good">save ₹${inr(n)}</span>` : n < 0 ? `<span class="bad">lose ₹${inr(n)}</span>` : '—'

  const body = `  <p class="caps"><a href="/vs/" style="text-decoration:none;color:inherit">ThodaSa · Dubai vs India</a></p>
  <h1>${esc(item.name)}: Dubai vs India</h1>
  <p class="lede">Everyone knows the Dubai price looks better. Almost nobody
  computes what happens at the airport on the way home. Both numbers, honestly.</p>

  <p class="headline">${
    worth
      ? `Real saving after customs: <b>₹${inr(cmp.honestSaving)}</b> — not the ₹${inr(cmp.naiveSaving)} the shelf gap suggests.`
      : `Declared honestly, buying this in Dubai <b class="bad">costs ₹${inr(-cmp.honestSaving)} more</b> than buying it in India.`
  }</p>

  <h2>The two shelf prices</h2>
  <table>
    <tr><td>India price (MRP)</td><td>₹${inr(item.inr)}</td></tr>
    <tr><td>Dubai price <span class="hint">AED ${item.aed.toLocaleString('en-IN')} × ₹${model.AED_INR}</span></td><td>₹${inr(cmp.dubaiInr)}</td></tr>
    <tr class="total"><td>Shelf gap <span class="hint">what the blogs quote</span></td><td>${badge(cmp.naiveSaving)}</td></tr>
  </table>

  <h2>What Dubai actually costs a tourist</h2>
  <table>
    <tr><td>Shelf price</td><td>₹${inr(cmp.dubaiInr)}</td></tr>
    <tr><td>UAE VAT inside it <span class="hint">5%, price is VAT-inclusive</span></td><td>₹${inr(cmp.vatInside)}</td></tr>
    <tr><td>Tourist refund at the airport <span class="hint">~85% of the VAT, Planet Tax Free</span></td><td>− ₹${inr(cmp.refund)}</td></tr>
    <tr class="total"><td>Dubai, after refund</td><td>₹${inr(cmp.dubaiAfterRefund)}</td></tr>
  </table>

  <h2>What Indian customs takes on the way home</h2>
  <table>
    <tr><td>Duty-free baggage allowance <span class="hint">returning resident</span></td><td>₹${inr(model.BAGGAGE_ALLOWANCE)}</td></tr>
    ${
      cmp.baggageDuty > 0
        ? `<tr><td>Value above the allowance</td><td>₹${inr(cmp.dubaiAfterRefund - model.BAGGAGE_ALLOWANCE)}</td></tr>
    <tr><td>Baggage duty <span class="hint">35% + 10% surcharge = 38.5% of the excess</span></td><td>₹${inr(cmp.baggageDuty)}</td></tr>`
        : `<tr><td>Value above the allowance</td><td>₹0 — under the allowance, no duty</td></tr>`
    }
    <tr class="total"><td>Landed home, declared honestly</td><td>₹${inr(cmp.landedHome)}</td></tr>
  </table>

  <h2>The honest verdict</h2>
  <table>
    <tr><td>Buy in India</td><td>₹${inr(item.inr)}</td></tr>
    <tr><td>Buy in Dubai, bring home declared</td><td>₹${inr(cmp.landedHome)}</td></tr>
    <tr class="total"><td>Honest difference</td><td>${badge(cmp.honestSaving)}</td></tr>
  </table>
  <p class="hint" style="margin-top:.7rem">Assumes AED 1 = ₹${model.AED_INR}, list prices both sides, one item, red-channel declaration. Warranty is a separate cost: a Dubai-bought unit usually carries international or UAE warranty, not Indian.</p>

  <h2>Why the India price is higher in the first place</h2>
  <p>The gap is mostly tax, not margin. India charges customs duty, a surcharge
  on that duty, and GST — all of it already inside the MRP. The UAE charges 5%
  VAT and refunds most of it to tourists.
  <a href="/duty/?price=${item.inr}&amp;goods=${esc(item.goods)}&amp;imported=1">See the full Indian tax breakdown for this price →</a></p>

  <h2>More Dubai vs India comparisons</h2>
  <ul>
    ${others.map((o) => `<li><a href="/vs/${o.item.slug}/">${esc(o.item.name)}</a> <span class="hint">— honest ${o.cmp.honestSaving >= 0 ? 'saving' : 'loss'} ₹${inr(o.cmp.honestSaving)}</span></li>`).join('\n    ')}
  </ul>

${footer}`

  return shell({ title, desc, canonical: url, jsonld: faq, body })
}

// The /vs/ hub — one table, every product, both numbers.
export const vsHubPage = ({ site, rows, model }) => {
  const url = `${site}/vs/`
  const winners = rows.filter((r) => r.cmp.honestSaving > 0).length
  const title = 'Dubai vs India prices — what you really save after customs | ThodaSa'
  const desc = `iPhone, MacBook, PlayStation, watches and more: Dubai price vs India price, then the number every blog skips — Indian customs on the way home. Only ${winners} of ${rows.length} items are still worth buying in Dubai once you declare honestly.`

  const body = `  <p class="caps"><a href="/" style="text-decoration:none;color:inherit">ThodaSa</a> · Dubai vs India</p>
  <h1>Is it really cheaper in Dubai?</h1>
  <p class="lede">The shelf price says yes. Then you land in India with it, and a
  returning resident owes 38.5% on everything above a ₹50,000 allowance. After
  the tourist VAT refund and that duty, only <b>${winners} of these ${rows.length}</b>
  are still a real saving.</p>

  <table>
    <tr><th>Item</th><th>Shelf gap</th><th>After customs</th></tr>
    ${rows
      .map((r) => {
        const h = r.cmp.honestSaving
        return `<tr><td><a href="/vs/${r.item.slug}/">${esc(r.item.name)}</a></td><td>₹${inr(r.cmp.naiveSaving)}</td><td class="${h > 0 ? 'good' : 'bad'}">${h > 0 ? '₹' + inr(h) : h < 0 ? '− ₹' + inr(h) : '—'}</td></tr>`
      })
      .join('\n    ')}
  </table>
  <p class="hint" style="margin-top:.7rem">AED 1 = ₹${model.AED_INR}. Shelf gap = India MRP minus Dubai shelf price. After customs = including the ~85% tourist VAT refund in Dubai and 38.5% Indian baggage duty above the ₹${inr(model.BAGGAGE_ALLOWANCE)} allowance, declared honestly.</p>

  <h2>The pattern</h2>
  <p>Phones with a big India-vs-global price gap survive customs with a small
  real saving. Items near the ₹50,000 allowance — earbuds, perfume — are the
  clean wins, because they ride inside the allowance and dodge the duty
  entirely. And anything India already prices near global parity (base iPhones,
  MacBooks, Swiss watches at boutique list) becomes a <em>loss</em> the moment
  you declare it.</p>

  <h2>Work it out for anything</h2>
  <p>The India side of every row above comes from the same engine as the
  <a href="/duty/">duty &amp; GST calculator</a> — paste any Indian price and see
  how much of it is tax.</p>

${footer}`

  return shell({ title, desc, canonical: url, jsonld: null, body })
}
