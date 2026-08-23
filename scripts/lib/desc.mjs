// Shared so fetch-daily.mjs and the one-off backfill can't drift apart.
// Descriptions used to be four canned lines rotated by index, so every 4th item
// in the feed repeated verbatim and none of them said anything about the product
// — two of them described the scraper ("asli barcode", "scanned from a real
// pack"), which no shopper cares about. These are keyed off the same category
// signal priceFor() already derives, and picked by name hash so the same product
// always gets the same line while neighbours in the feed differ.
export const DESC_BANDS = [
  [/energy drink|red bull|sting|monster/, [
    'Deadline raat ka fuel.', 'Gym se pehle ya exam se pehle. Dono chalega.',
    'Caffeine plus taurine. Sochna band, karna shuru.', 'Thanda peeyo, warna kaam ka maza nahi.']],
  [/biscuit|cookie|marie|bourbon|oreo|rusk|jimjam|jim jam|hide & seek|krackjack|monaco|milk bikis|good day|little hearts|nice time/, [
    'Chai mein dubao, jaldi nikalo. Timing sab kuch hai.', 'Ek packet khatam hone tak pata bhi nahi chalta.',
    'Guests ke liye rakha tha. Khud kha gaye.', 'Sham ki chai ka default partner.',
    'Dunk karo. Toota to aapki galti.']],
  [/\bwafers?\b|\bchips\b|\bsevs?\b|namkeen|kurkure|bhujia|farsan|lays|lay's|bingo|pringles|doritos|chipps|murmura|mixture|sticks/, [
    'Crunch itna loud, poora ghar sun leta hai.', 'Ek haath packet, doosra remote. Set.',
    'Chhota packet lena tha. Bada le aaye.', 'Namak, masala, aur zero pachtava.']],
  [/chocolate|dairy milk|kitkat|\bcandys?\b|toffee|choco/, [
    'Fridge mein rakho. Thanda chocolate alag level hai.', 'Baantne ke liye tha. Ab nahi hai.',
    'Mood kharab ho to yahi kaam aata hai.', 'Chhote bacche isi ke liye pyaar karte hain.']],
  [/\bcolas?\b|sprite|\bsodas?\b|thums|pepsi|limca|fanta/, [
    'Barf ke saath. Warna kya fayda.', 'Pehla ghoont. Aankh band. Samajh gaye.',
    'Samosa ke saath yahi banta hai.', 'Gas nahi hai to cold drink kaisa.']],
  [/\bjuices?\b|frooti|maaza|slice|nectar|squash/, [
    'Tetra pack wala nostalgia.', 'School tiffin ki yaad dila dega.',
    'Garmi mein fridge se seedha.', 'Straw daalo aur khatam karo.']],
  [/\bwaters?\b|mineral|packaged drinking/, [
    'Safar mein sabse zaroori cheez.', 'Bas paani hai. Par sahi waqt pe sona hai.',
    'Ghar se nikle to yeh saath rakhna.']],
  [/noodle|maggi|\bpastas?\b|ramen|vermicelli/, [
    'Do minute ka vaada. Paanch lagte hain. Chalta hai.', 'Hostel survival kit ka item number one.',
    'Raat ke barah baje ki bhookh ka jawab.', 'Extra masala daalo. Judge nobody.']],
  [/\boats\b|muesli|cereal|flakes|granola/, [
    'January mein khareeda. February mein bhool gaye.', 'Healthy khane ka irada. Shuruaat yahin se.',
    'Doodh daalo, do minute ruko, ho gaya.', 'Subah ki jaldi mein sabse aasan option.']],
  [/\bsalts?\b|\bsugars?\b|\battas?\b|\bdals?\b|\brices?\b|\bflours?\b|besan|poha|suji|maida/, [
    'Kitchen khali ho to sabse pehle yahi.', 'Mahine ka rashan. Romance zero, zaroorat sau percent.',
    'Yeh khatam hua to ghar mein khana band.', 'Basic hai. Isliye zaroori hai.']],
  [/ketchup|sauce|\bjams?\b|spread|nutella|mayonnaise|pickle|chutney/, [
    'Roti pe, bread pe, ya chamach se seedha.', 'Bacche isi ke bharose sabzi kha lete hain.',
    'Fridge ka darwaza kholo, yahi dikhta hai.', 'Thoda zyada daal do. Kisi ko farak nahi padta.']],
  [/ice cream|kulfi|frozen dessert/, [
    'Freezer se nikala. Do minute ruko. Phir khao.', 'Garmi ka asli ilaaj.',
    'Dinner ke baad ki asli wajah.']],
  [/\bteas?\b|\bchais?\b|coffee|cofe|espresso|mocha|latte|cappuccino/, [
    'Din shuru isi se hota hai. Baat khatam.', 'Do cup se kam mein kaam nahi chalta.',
    'Guests aaye to sabse pehle yahi banta hai.', 'Kadak, meethi, aur bilkul abhi.']],
  [/paneer|cheese|\btofus?\b/, [
    'Sabzi ka hero. Bina iske kuch nahi.', 'Slice karo, tawe pe daalo, khatam.',
    'Fridge mein ho to dinner ki tension khatam.', 'Bacchon ko sabzi khilane ka jugaad.']],
  [/\blassis?\b|butter ?milk|chaas|\bdahis?\b|\bcurds?\b|yoghurt|yogurt/, [
    'Dopahar ke khane ke baad. Neend guarantee.', 'Thanda, gaadha, aur seedha glass mein.',
    'Garmi mein isse behtar kuch nahi.', 'Pet ko aaram, garmi ko jawab.']],
  [/\bghees?\b|butter\b|makhan/, [
    'Roti pe lagao. Zyada lagao.', 'Dal mein ek chamach. Baaki sab bahana hai.',
    'Ghar ki khushboo isi se aati hai.', 'Doctor mana karta hai. Dadi kehti hai daalo.']],
  [/\bmilks?\b|doodh/, [
    'Fridge mein hona hi chahiye. Warna subah chai nahi.', 'Ubaalna mat bhoolna.',
    'Ghar ka khana isi se banta hai.', 'Khatam ho jaye to poora din off track.']],
]

export const descFor = (name, cats, qty) => {
  const t = `${name} ${cats}`.toLowerCase()
  const h = [...name].reduce((a, c) => a + c.charCodeAt(0), 0)
  for (const [re, lines] of DESC_BANDS) if (re.test(t)) return lines[h % lines.length]
  const generic = [
    'Roz ki list mein chupke se aa jaata hai.', 'Zaroorat padegi. Aaj ya kal.',
    'Kirana list ka regular member.', 'Ghar mein rakhne wali cheez.',
  ]
  return generic[h % generic.length]
}
