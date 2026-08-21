// 45 mock impulse products. price = selling price (₹), mrp = strikethrough price when deal=true.
// img = Unsplash photo (hotlinking allowed); grad = gradient fallback shown while the image loads.
export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'quirky', label: 'Quirky' },
  { id: 'phone', label: 'Phone Stuff' },
  { id: 'beauty', label: 'Beauty Minis' },
  { id: 'home', label: 'Home Vibes' },
  { id: 'accessories', label: 'Accessories' },
]

const img = (id) => `https://images.unsplash.com/photo-${id}?w=800&h=1400&fit=crop&q=80&auto=format`

const P = (id, name, price, category, emoji, desc, rating, photo, deal = false, mrp = null, grad = 0) => ({
  id, name, price, category, emoji, desc, rating, deal, mrp: mrp ?? Math.round(price * 1.8), grad,
  img: img(photo),
  reviews: 120 + ((id * 137) % 4200),
})

export const GRADS = [
  'from-rose-400 via-fuchsia-400 to-indigo-400',
  'from-amber-300 via-orange-400 to-rose-500',
  'from-teal-300 via-cyan-400 to-blue-500',
  'from-lime-300 via-emerald-400 to-teal-500',
  'from-violet-400 via-purple-400 to-fuchsia-500',
  'from-sky-300 via-indigo-400 to-purple-500',
  'from-pink-300 via-rose-400 to-red-400',
  'from-yellow-300 via-amber-400 to-orange-500',
]

export const PRODUCTS = [
  // ——— Quirky ———
  P(1, 'Mini Auto-Rickshaw Keychain', 149, 'quirky', '🛺', 'Apni personal auto, bina meter ke drama. Sasta hai, le lo!', 4.6, '1513201099705-a9746e1e201f', true, 299, 1),
  P(2, 'Samosa Squishy Stress Ball', 129, 'quirky', '🥟', 'Squeeze karo, tension release karo. Calories zero.', 4.4, '1601050690597-df0568f70950', false, null, 7),
  P(3, 'Chai Lover Enamel Pin', 99, 'quirky', '☕', 'Wear your chai obsession on your sleeve. Literally.', 4.7, '1544787219-7f47ccb76574', false, null, 3),
  P(4, 'Desi Meme Sticker Pack (50 pc)', 119, 'quirky', '😂', 'Laptop ko bana do meme museum. 50 bangers.', 4.8, '1498050108023-c5249f4df085', true, 249, 0),
  P(5, 'Tiny Cactus Bobblehead', 179, 'quirky', '🌵', 'Nods along to all your bad decisions. Very supportive.', 4.3, '1459411552884-841db9b3cc2a', false, null, 4),
  P(6, 'Paneer Tikka Fridge Magnet Set', 159, 'quirky', '🍢', 'Fridge pe tikka, dil mein khushi. Set of 4.', 4.5, '1596040033229-a9821ebd058d', false, null, 6),
  P(7, 'Mood Dial Desk Sign', 199, 'quirky', '🎭', '"Do not disturb" se "Chai pilao" tak — flip your mood.', 4.4, '1517705008128-361805f42e86', true, 399, 2),
  P(8, 'Mini Claw Machine Toy', 349, 'quirky', '🕹️', 'Arcade at your desk. Warning: extremely distracting.', 4.2, '1511882150382-421056c89033', false, null, 5),
  P(9, 'Bollywood Dialogue Coasters (6)', 249, 'quirky', '🎬', '"Chai rakho... styles mein." Filmy coasters, full drama.', 4.7, '1518481612222-68bbe828ecd1', true, 499, 1),
  P(10, 'Googly Eyes Mega Pack', 99, 'quirky', '👀', 'Stick on everything. EVERYTHING. No regrets.', 4.9, '1513151233558-d860c5398176', false, null, 3),

  // ——— Phone Stuff ———
  P(11, 'Popsocket — Evil Eye Edition', 199, 'phone', '🧿', 'Nazar bhi door, grip bhi strong. Win-win.', 4.6, '1511707171634-5f897ff02aa9', true, 349, 5),
  P(12, 'Glow-in-Dark Cable Protectors', 129, 'phone', '🌟', 'Cables that party after lights out. Set of 6.', 4.3, '1550745165-9bc0b252726f', false, null, 2),
  P(13, 'Mini Ring Light Clip', 299, 'phone', '💡', 'Reels-ready lighting. Main character energy on tap.', 4.5, '1526170375885-4d8ecf77b99f', false, null, 0),
  P(14, 'Cassette Tape Phone Case', 349, 'phone', '📼', 'Retro vibes for your very modern doomscrolling.', 4.4, '1583394838336-acd977736f90', true, 599, 6),
  P(15, 'Finger Grip Phone Strap', 149, 'phone', '🤳', 'One-hand scrolling in a crowded local? Sorted.', 4.2, '1580910051074-3eb694886505', false, null, 4),
  P(16, 'Cartoon Cable Biters (4 pc)', 119, 'phone', '🦈', 'Tiny sharks chomping your charger. Cable saved, drama added.', 4.7, '1544197150-b99a580bb7a8', true, 249, 3),
  P(17, 'Foldable Phone Stand', 179, 'phone', '📐', 'Binge-watching posture upgrade. Neck says thank you.', 4.5, '1512941937669-90a1b58e7e9c', false, null, 7),
  P(18, 'LED Selfie Phone Charm', 249, 'phone', '✨', 'Y2K charm that literally glows. Extra? Yes. Worth it? Also yes.', 4.3, '1601784551446-20c9e07cdbdb', false, null, 1),
  P(19, 'Anti-Dust Plug Set (Cute Animals)', 99, 'phone', '🐼', 'Chhota sa panda, bada sa cuteness. Jack protection included.', 4.1, '1591337676887-a217a6970a8a', false, null, 5),
  P(20, 'Magnetic Cable Organizer', 159, 'phone', '🧲', 'Desk cables ka permanent breakup with chaos.', 4.6, '1587829741301-dc798b83add3', true, 299, 2),

  // ——— Beauty Minis ———
  P(21, 'Mini Lip Tint Trio', 299, 'beauty', '💋', 'Teen shades, pocket size, full paisa vasool.', 4.5, '1586495777744-4413f21062fa', true, 549, 6),
  P(22, 'Rose Water Face Mist (50ml)', 149, 'beauty', '🌹', 'Gulab jal glow-up, spritz spritz done.', 4.6, '1518895949257-7621c3c786d7', false, null, 0),
  P(23, 'Glitter Nail Polish Minis (4)', 199, 'beauty', '💅', 'Chhoti bottles, badi sparkle. Commitment-free colours.', 4.3, '1512496015851-a90fb38ba796', false, null, 4),
  P(24, 'Kajal + Liner Duo Stick', 179, 'beauty', '🖤', 'Ek stick, do kaam. Smudge-proof tak ka vaada.', 4.7, '1522335789203-aabd1fc54bc9', true, 329, 1),
  P(25, 'Fruity Lip Balm Set (3)', 129, 'beauty', '🍓', 'Strawberry, mango, litchi — lips ka fruit chaat.', 4.4, '1464965911861-746a04b4bca6', false, null, 7),
  P(26, 'Mini Perfume Roll-on — Mogra', 249, 'beauty', '🌸', 'Pocket mein mogra, mood mein monsoon.', 4.8, '1541643600914-78b084683601', true, 449, 3),
  P(27, 'Sheet Mask Party Pack (5)', 299, 'beauty', '🧖', 'Self-care Sunday sorted for a month. Almost.', 4.5, '1570554886111-e80fcca6a029', false, null, 5),
  P(28, 'Holographic Hair Clips (6)', 149, 'beauty', '🪩', 'Disco ball energy, hair edition.', 4.2, '1522337660859-02fbefca4702', false, null, 2),
  P(29, 'Ubtan Face Scrub Mini', 169, 'beauty', '✨', 'Dadi-approved glow in a travel tube.', 4.6, '1608248543803-ba4f8c70ae0b', false, null, 6),
  P(30, 'Cushion Blush Mini — Peach', 229, 'beauty', '🍑', 'Ek dab mein instant "just had chai" glow.', 4.4, '1487412947147-5cebf100ffc2', true, 399, 0),

  // ——— Home Vibes ———
  P(31, 'Sunset Projection Lamp', 449, 'home', '🌅', 'Golden hour on demand. Instagram wall unlocked.', 4.7, '1507473885765-e6ed057f782c', true, 899, 7),
  P(32, 'Mini Cactus Planter Duo', 249, 'home', '🪴', 'Plants you (probably) can\'t kill. Probably.', 4.5, '1616046229478-9901c5536a45', false, null, 3),
  P(33, 'Fairy Lights — Warm Glow (5m)', 199, 'home', '🧚', 'Instant Diwali vibes, 365 days a year.', 4.6, '1492684223066-81342ee5ff30', true, 399, 1),
  P(34, 'Truck Art Trinket Tray', 299, 'home', '🚚', 'Horn OK Please, but make it home décor.', 4.4, '1607083206968-13611e3d76db', false, null, 5),
  P(35, 'Scented Candle — Filter Coffee', 349, 'home', '🕯️', 'Ghar smells like a Bangalore café now. You\'re welcome.', 4.8, '1603006905003-be475563bc59', false, null, 2),
  P(36, 'Cloud LED Night Light', 279, 'home', '☁️', 'Soft glow, softer dreams. Bedside upgrade.', 4.3, '1540932239986-30128078f3c5', true, 549, 4),
  P(37, 'Rangoli Stencil Kit', 149, 'home', '🎨', 'Pro-level rangoli, zero artistic pressure.', 4.2, '1549465220-1a8b9238cd48', false, null, 6),
  P(38, 'Mini Zen Garden Kit', 399, 'home', '🪨', 'Rake tiny sand. Feel infinite peace. Repeat.', 4.5, '1586023492125-27b2c045efd7', false, null, 0),
  P(39, 'Retro Radio Bluetooth Speaker', 499, 'home', '📻', 'Purana look, naya bass. Nani-approved aesthetics.', 4.6, '1545454675-3531b543be5d', true, 999, 3),
  P(40, 'Glow Star Ceiling Pack (100)', 129, 'home', '🌌', 'Sapno ka ceiling, literally. 100 stars included.', 4.4, '1419242902214-272b3f66ee7a', false, null, 5),

  // ——— Accessories ———
  P(41, 'Beaded Smiley Bracelet Set', 149, 'accessories', '😊', 'Y2K wrist party. Stack karo, slay karo.', 4.5, '1535632066927-ab7c9ab60908', true, 299, 1),
  P(42, 'Mini Sling Bag — Neon', 449, 'accessories', '👝', 'Phone, lipstick, vibes — bas itna hi chahiye.', 4.4, '1590874103328-eac38a683ce7', false, null, 4),
  P(43, 'Funky Socks — Masala Pack (3)', 249, 'accessories', '🧦', 'Mirchi, chai, aur momos on your feet.', 4.7, '1595950653106-6c9ebd614d3a', true, 449, 7),
  P(44, 'Heart Shades — Rose Tint', 299, 'accessories', '🕶️', 'Dekho sab kuch pyaar se. Literally rose-tinted.', 4.3, '1572635196237-14b3f281503f', false, null, 6),
  P(45, 'Charm Anklet — Ghungroo', 199, 'accessories', '🔔', 'Thoda sa chhan-chhan with every step.', 4.6, '1515562141207-7a88fb7ce338', false, null, 2),
]
