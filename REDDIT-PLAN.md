# Reddit — the legitimate route

## What the search actually turned up

r/IndiaTax asks this question constantly, and gets it answered badly:

| Thread | Age | Engagement |
|---|---|---|
| I paid 15k customs for 11,000 product | 9mo | **485 votes, 138 comments** |
| High customs duty | 1y | **235 votes, 107 comments** |
| UPS charging 147% customs. Can I refuse to pay? | 2y | 80 votes, 40 comments |
| India customs charged ₹1.68 lakh on a ₹5,000 model set (r/LegalAdviceIndia) | 3mo | 374 votes, 73 comments |
| Will UPS actually charge me 77% on a $450 import? | 25d | 9 comments |
| Bringing an RTX 5080 from the UK — how much duty in 2026? | 25d | 8 comments |
| Import duty via DHL, first time | 10d | 12 comments |
| Buying from Amazon Japan | 13d | 2 comments |
| "Can anybody tell me how much custom I have to pay importing from the UK" | **2d** | 2 comments |

Two things to notice.

**One: the top-voted answer in that community is wrong.** On the 485-vote thread the accepted
explanation is *"Customs duty is 42.5% on any item you import from outside India for personal
use."* That is a flat rate applied to everything, and it isn't how the chain works. The real
number runs from 0% on printed books to 62% on a fully-built car import, and the structure —
BCD, then 10% surcharge **on the duty**, then IGST on the whole lot — is what makes it vary.

**Two: nobody can verify the number they were charged.** Every one of these threads is a
person who got a figure from a courier and has no way to check it. That is exactly the gap
`/duty/` fills.

So the play is not scattered comments. It is one good post that becomes the thing people
link to, plus genuine replies on the live threads.

---

## The post (r/IndiaTax)

**Title**

    Everyone says Indian customs is "42.5% on everything". It isn't — here's what it actually is, by category

**Body**

> Every few weeks someone posts here after a courier charged them a number they can't
> verify, and the top reply is usually "customs is 42.5%, that's just how it is." That flat
> rate is why the figures never seem to add up.
>
> There isn't one rate. There's a chain, and the order matters:
>
> 1. **Assessable value** — the item plus shipping and insurance (CIF), not what you paid
> 2. **Basic customs duty** — this is the part that varies by goods
> 3. **Social welfare surcharge** — 10%, and it's charged on the *duty*, not on the goods
> 4. **IGST** — the item's GST slab, applied to value + duty + surcharge
> 5. **Compensation cess** — vehicles and a few demerit goods only
>
> Step 3 is where most calculators and most Reddit answers go wrong. The surcharge compounds
> on the duty alone, so it's small on a book and large on a car.
>
> What that produces, working backwards out of a tax-inclusive Indian price:
>
> - Printed books — **0%**
> - Phone or laptop — **~31%**
> - Wristwatch, handbag, perfume — **~31%**
> - Motorcycle — **~51%**
> - Toys — **~55%** (duty went to 70% to push local manufacture)
> - Car, fully built import — **~62%**
>
> So the 77% and 147% figures people post here aren't necessarily couriers cheating anyone —
> on the wrong category, with shipping in the assessable value, they're plausible. And the
> 42.5% rule of thumb is wildly wrong in both directions depending on what you bought.
>
> I built a calculator that runs this chain for any price and goods type, because I got tired
> of not being able to check: **thodasa.com/duty**
>
> It's free, there's no signup, and it shows every step rather than just a total so you can
> argue with it. Rates are the indicative headline slabs — real classification is on an
> 8-digit HSN code and FTAs and value thresholds move things — so it's the right structure
> and the right order of magnitude, not a customs assessment.
>
> Corrections very welcome. I'd rather it be right than mine.

**Notes**
- Post it as a **text post**, link in the body, not a link post. Link posts get filtered.
- Do this **after** you have positive karma, not before.
- If it lands, it becomes the comment you paste for the next two years.

---

## Replies for the live threads

Adapt each to what the person actually asked — a reply that ignores the specifics reads as
copy-paste and deserves to. The shape that works: **answer the number first, show the chain,
then mention the tool.**

### "Can anybody tell me how much custom I have to pay importing from the UK" (2d, live)

> Depends entirely on what it is — there's no single rate, which is why the answers here vary
> so much.
>
> The chain is: assessable value (item + shipping + insurance) → basic customs duty, which
> varies by goods → 10% social welfare surcharge **on that duty** → IGST on the whole lot.
>
> If you say what the item is and what you paid including shipping, I can give you a figure.
> Rough guide: electronics land around 31% of the final price, clothing similar, books are
> nil, anything vehicle-shaped is much worse.
>
> I put the chain into a calculator here if you want to run it yourself: thodasa.com/duty

### "Bringing an RTX 5080 from the UK to India — how much duty in 2026?" (25d)

> Graphics cards fall under the same electronics treatment as a laptop: roughly 20% basic
> customs duty, 10% surcharge on that duty, then 18% IGST on value + duty + surcharge. That
> works out to about **31% of what you end up paying** — so on a £1,000 card, budget roughly
> a third of the landed total in tax.
>
> Two things that catch people out: shipping and insurance go **into** the assessable value
> before duty is applied, and carrying it in your baggage is a different regime from shipping
> it (personal baggage allowance rather than commercial import).
>
> Calculator if you want to plug in your actual number: thodasa.com/duty

### "Will UPS actually charge me 77% on a $450 import?" (25d)

> 77% is high but not automatically wrong — it depends on the category. Electronics come to
> about 31% of the final price; toys are near 55% because duty was raised to 70% to push
> local manufacture; anything vehicle-shaped is 60%+.
>
> Worth checking two things on the invoice: whether they included shipping in the assessable
> value (they should — it's CIF, not the item price), and which duty rate they applied. If the
> rate looks wrong for what you bought, that's the bit to query.
>
> You can run the chain yourself here: thodasa.com/duty

---

## Ground rules

- **Disclose it's yours.** "I built a calculator" — never "I found this useful tool". Getting
  caught pretending is worse than not posting.
- **One link per comment, and only where it answers the question asked.** If you can't answer
  the question without the link, don't comment.
- **Comment on live threads, not the 2-year-old ones.** Necro-commenting a dead thread for
  karma is exactly the behaviour the filters exist to catch.
- **Don't post the same reply twice.** Reddit's spam detection is looking for that.
