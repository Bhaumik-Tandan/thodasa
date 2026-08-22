// Blinkit/Amazon-style catalog: ~90 famous-product templates × variants
// (flavour · size · colour) expand into 1000+ SKUs, the way real q-commerce
// catalogs work. Every image is a verified Unsplash photo (hotlinking allowed),
// shared across a template's variants — same as Lays 52g vs 90g sharing a shot.
export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'gadgets', label: 'Gadgets' },
  { id: 'home', label: 'Home' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'accessories', label: 'Fashion' },
  { id: 'stationery', label: 'Stationery' },
  { id: 'quirky', label: 'Quirky' },
]

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

const img = (id) => `https://images.unsplash.com/photo-${id}?w=800&h=1400&fit=crop&q=80&auto=format`

// verified photo pool, keyed by what the photo actually shows
const I = {
  samosa: '1601050690597-df0568f70950', spices: '1596040033229-a9821ebd058d', chai: '1544787219-7f47ccb76574',
  mug: '1485955900006-10f4d324d411', tableMug: '1518481612222-68bbe828ecd1', berries: '1464965911861-746a04b4bca6',
  salad: '1512621776951-a57141f2eefd', bowl: '1546069901-ba9599a7e63c', pizza: '1565299624946-b28f40a0ae38',
  pancakes: '1567620905732-2d1ec7ab7445', cake: '1565958011703-44f9829ba187', dessert: '1551024506-0bccd828d307',
  milk: '1550583724-b2692b85b150', smoothie: '1553530666-ba11a7da3888', pasta: '1576402187878-974f70c890a5',
  lemon: '1572635148818-ef6fd45eb394',
  lipstick: '1586495777744-4413f21062fa', rose: '1518895949257-7621c3c786d7', nails: '1522337660859-02fbefca4702',
  kajal: '1522335789203-aabd1fc54bc9', makeupFace: '1487412947147-5cebf100ffc2', perfume: '1541643600914-78b084683601',
  serum: '1556228578-8c89e6adf883', tube: '1608248543803-ba4f8c70ae0b', skincareFlat: '1598440947619-2c35fc9aa908',
  makeupFlat: '1571875257727-256c39da42af', palette: '1512496015851-a90fb38ba796', apothecary: '1611930022073-b7a4ba5fcccd',
  earbuds: '1585155770447-2f66e2a397b5', headphones: '1583394838336-acd977736f90', phoneYellow: '1601784551446-20c9e07cdbdb',
  phoneHand: '1511707171634-5f897ff02aa9', phoneBed: '1580910051074-3eb694886505', phoneDesk: '1512941937669-90a1b58e7e9c',
  phoneApps: '1512428559087-560fa5ceab42x', cables: '1544197150-b99a580bb7a8', keyboard: '1587829741301-dc798b83add3',
  neon: '1550745165-9bc0b252726f', appleWatch: '1579586337278-3befd40fd17a', watch: '1523170335258-f5ed11844a49',
  camera: '1526170375885-4d8ecf77b99f', speaker: '1545454675-3531b543be5d', phoneCase: '1591337676887-a217a6970a8a',
  lamp: '1507473885765-e6ed057f782c', fairy: '1492684223066-81342ee5ff30', candle: '1602874801007-bd458bb1b8b6',
  candle2: '1603006905003-be475563bc59', stars: '1419242902214-272b3f66ee7a', bedroom: '1540932239986-30128078f3c5',
  boho: '1556228453-efd6c1ff04f6', mirror: '1616046229478-9901c5536a45', plant: '1416879595882-3373a0480b5b',
  cactus: '1459411552884-841db9b3cc2a', stool: '1503602642458-232111445657', gift: '1549465220-1a8b9238cd48',
  giftBox: '1513201099705-a9746e1e201f', interior: '1586023492125-27b2c045efd7',
  spoons: '1526434426615-1abe81efcb0b', kitchen: '1556911220-bff31c812dba', bottle: '1602143407151-7111542de6e8',
  shaker: '1610824352934-c10d87b700cc',
  chips: '1613919113640-25732ec5e61f', chipsBowl: '1528751014936-863e6e7a319c', bakedBags: '1566478989037-eec170784d0b', fries: '1585109649139-366815a0d713',
  wayfarer: '1572635196237-14b3f281503f', beachShades: '1473496169904-658ba7c44d8a', fashion: '1483985988355-763728e1935b',
  backpack: '1491637639811-60e2756cc1c7', navyBag: '1553062407-98eeb64c6a62', tanBag: '1590874103328-eac38a683ce7',
  sneaker: '1595950653106-6c9ebd614d3a', shoeFlat: '1511556820780-d912e42b4980', tee: '1554568218-0f1715e72254',
  wardrobe: '1445205170230-053b83016050', earrings: '1535632066927-ab7c9ab60908', pearls: '1515562141207-7a88fb7ce338',
  pens: '1456735190827-d1262f71b8a3', books: '1497633762265-9d179a990aa6', deskDark: '1441986300917-64674bd600d8',
  confetti: '1513151233558-d860c5398176', arcade: '1511882150382-421056c89033', saleTags: '1607083206968-13611e3d76db',
}

// variant helpers
const V = (...pairs) => pairs // [[label, price], ...]
const combo = (flavors, sizes) => flavors.flatMap((f) => sizes.map(([s, p]) => [`${f} · ${s}`, p]))
const colors = (cols, p) => cols.map((c) => [c, p])

// T(brand, name, category, photoKey, emoji, desc, variants, launch?)
const TEMPLATES = [
  // ——— SNACKS ———
  ['Maggi', '2-Minute Noodles', 'snacks', 'bowl', '🍜', '2 minute bola tha, 20 saal ho gaye. Still worth it.', combo(['Masala', 'Special Masala', 'Chicken'], V(['Pack of 4', 60], ['Pack of 8', 118], ['Pack of 12', 172])), true],
  ['Lays', 'Potato Chips', 'snacks', 'chips', '🥔', 'Ek pack kabhi kaafi nahi hota. Science hai.', combo(['Magic Masala', 'Cream & Onion', 'Classic Salted', 'Tomato Tango', 'Chile Limón'], V(['52g', 20], ['90g', 35], ['Party Pack 177g', 60]))],
  ['Kurkure', 'Crunchy Snack', 'snacks', 'spices', '🌶️', 'Tedha hai par mera hai.', combo(['Masala Munch', 'Green Chutney', 'Solid Masti'], V(['40g', 10], ['90g', 20], ['Family Pack', 35]))],
  ['Haldiram’s', 'Bhujia', 'snacks', 'spices', '🥨', 'Chai ke saath ya waise hi. No judgement.', combo(['Classic', 'Aloo', 'Moong Dal'], V(['200g', 52], ['400g', 95], ['1kg', 210]))],
  ['Cadbury', 'Dairy Milk Silk', 'snacks', 'dessert', '🍫', 'Kiss me, close your eyes... aapko pata hai.', combo(['Original', 'Oreo', 'Fruit & Nut', 'Bubbly'], V(['60g', 89], ['150g', 199])), true],
  ['Parle', 'Parle-G Biscuits', 'snacks', 'chai', '🍪', 'G maane Genius. Desh ka biscuit.', V(['65g', 5], ['250g', 30], ['800g Value Pack', 80])],
  ['Britannia', 'Good Day Cookies', 'snacks', 'chai', '🍪', 'Har bite mein khushi wala propaganda. Sach hai.', combo(['Butter', 'Cashew', 'Choco Chip'], V(['75g', 25], ['200g', 60]))],
  ['Oreo', 'Sandwich Biscuits', 'snacks', 'dessert', '🖤', 'Twist, lick, dunk — ya seedha poora pack.', combo(['Original', 'Chocolate', 'Strawberry'], V(['46g', 10], ['120g', 30]))],
  ['Sunfeast', 'YiPPee! Noodles', 'snacks', 'pasta', '🍝', 'Long noodles, longer slurps.', combo(['Magic Masala', 'Mood Masala'], V(['Pack of 4', 55], ['Pack of 8', 108]))],
  ['Ching’s', 'Schezwan Chutney', 'snacks', 'spices', '🔥', 'Sab kuch schezwan bana do. SAB KUCH.', V(['90g', 45], ['250g', 90])],
  ['Act II', 'Instant Popcorn', 'snacks', 'bowl', '🍿', 'Movie night ka asli hero.', combo(['Butter', 'Butter Pepper', 'Golden Sizzle'], V(['30g', 15], ['59g', 30]))],
  ['Paper Boat', 'Fruit Drink', 'snacks', 'smoothie', '🧃', 'Bachpan ka swaad, tetra pack mein.', combo(['Aamras', 'Jaljeera', 'Aam Panna', 'Anar'], V(['200ml', 30], ['1L', 99]))],
  ['Appy', 'Fizz Sparkling Drink', 'snacks', 'smoothie', '🍏', 'Cool drink for cool logon ke liye.', V(['250ml', 25], ['600ml', 45], ['1L', 70])],
  ['Nescafé', 'Classic Instant Coffee', 'snacks', 'mug', '☕', 'Deadline se pehle wala ritual.', V(['25g', 85], ['50g', 155], ['100g', 290])],
  ['Tata', 'Tea Gold', 'snacks', 'chai', '🫖', 'Ghar wali chai ka secret ingredient.', V(['250g', 140], ['500g', 270])],
  ['Nutella', 'Hazelnut Spread', 'snacks', 'pancakes', '🥞', 'Roti pe, bread pe, ya chamach se seedha.', V(['150g', 199], ['350g', 399])],
  ['Kissan', 'Mixed Fruit Jam', 'snacks', 'berries', '🍓', 'Bread ka best friend since forever.', V(['200g', 75], ['500g', 155])],
  ['MDH', 'Masala Box Refill', 'snacks', 'spices', '🧂', 'Asli masale sach sach. Dadi approved.', combo(['Garam Masala', 'Chana Masala', 'Kitchen King', 'Chunky Chat'], V(['100g', 68], ['500g', 290]))],
  ['Amul', 'Cheese Slices', 'snacks', 'pizza', '🧀', 'Har cheez pe cheese. Rule of life.', V(['10 Slices', 135], ['20 Slices', 255])],
  ['Bingo', 'Mad Angles', 'snacks', 'chipsBowl', '📐', 'Angle sahi ho toh sab crunchy lagta hai.', combo(['Achaari Masti', 'Very Peri Peri', 'Tomato Madness'], V(['66g', 20], ['130g', 35]))],

  // ——— BEAUTY ———
  ['Lakmé', 'Eyeconic Kajal', 'beauty', 'kajal', '🖤', 'Ek stroke mein full drama.', combo(['Deep Black', 'Royal Blue', 'Brown'], V(['0.35g', 199], ['Twin Pack', 358])), true],
  ['Maybelline', 'Colossal Bold Liner', 'beauty', 'makeupFace', '👁️', 'Wing itna sharp ki senti ho jaye.', V(['Black 3g', 199], ['Waterproof 3g', 249])],
  ['Lakmé', '9to5 Primer + Matte Lipstick', 'beauty', 'lipstick', '💄', 'Meeting se movie tak, ek hi shade.', colors(['Red Coat', 'Rosy Sunday', 'Blushing Nude', 'Mauve Matter', 'Scarlet Drill'], 425)],
  ['SUGAR', 'Matte As Hell Lip Crayon', 'beauty', 'makeupFlat', '💋', 'Matte bhi, savage bhi.', colors(['01 Scarlett', '02 Brigitte', '07 Viola', '12 Poison Ivy'], 449)],
  ['Mamaearth', 'Ubtan Face Wash', 'beauty', 'tube', '🧴', 'Haldi-chandan wala glow, tube mein.', V(['50ml', 149], ['100ml', 259], ['150ml Value', 349])],
  ['Mamaearth', 'Onion Hair Shampoo', 'beauty', 'serum', '🧅', 'Pyaaz rulata nahi, baal ugata hai (allegedly).', V(['150ml', 199], ['250ml', 349])],
  ['Plum', 'Green Tea Face Wash', 'beauty', 'skincareFlat', '🍵', 'Oily skin ka arch-enemy.', V(['75ml', 225], ['150ml', 385])],
  ['Minimalist', 'Niacinamide 10% Serum', 'beauty', 'serum', '💧', 'Science jo skin pe kaam karta hai.', V(['30ml', 399])],
  ['WOW', 'Vitamin C Face Serum', 'beauty', 'apothecary', '🍊', 'Subah ka glow, bottle se.', V(['30ml', 349], ['60ml Duo', 499])],
  ['Nivea', 'Soft Moisturising Cream', 'beauty', 'skincareFlat', '🌸', 'Sardi ho ya AC, skin happy.', V(['50ml', 99], ['100ml', 175], ['300ml', 349])],
  ['Ponds', 'Cold Cream', 'beauty', 'makeupFlat', '❄️', 'Winter classic since aapki mummy ke time se.', V(['55ml', 70], ['100ml', 120], ['200ml', 210])],
  ['Himalaya', 'Purifying Neem Face Wash', 'beauty', 'tube', '🌿', 'Neem karela nahi, neem hero hai.', V(['100ml', 145], ['200ml', 260])],
  ['Garnier', 'Sheet Mask', 'beauty', 'rose', '🧖', 'Sunday self-care, ₹99 mein.', combo(['Hydra Bomb', 'Bright Complete', 'Green Tea', 'Charcoal'], V(['1 pc', 99], ['Pack of 3', 269]))],
  ['Bella Vita', 'Luxury Perfume', 'beauty', 'perfume', '🌹', 'Old money vibes, new money price.', combo(['CEO Man', 'Date Woman', 'White Oud', 'Honey Oud'], V(['20ml', 229], ['50ml', 449]))],
  ['Beardo', 'Beard Growth Oil', 'beauty', 'apothecary', '🧔', 'Patchy se patch-perfect.', V(['30ml', 350], ['50ml', 449])],
  ['Kay Beauty', 'Nail Enamel', 'beauty', 'nails', '💅', 'Katrina approved shine.', colors(['Cherry Pop', 'Nude Mood', 'Lilac Haze', 'Coffee Date', 'Mint To Be', 'Berry Much'], 199)],
  ['Dot & Key', 'Lip Balm SPF', 'beauty', 'berries', '👄', 'Lips ka sunscreen. Haan, ye bhi hota hai.', combo(['Strawberry', 'Watermelon', 'Vanilla'], V(['12g', 245]))],

  // ——— GADGETS ———
  ['boAt', 'Airdopes 131 TWS Earbuds', 'gadgets', 'earbuds', '🎧', '60 hour playback, zero wire ka jhanjhat.', colors(['Active Black', 'Bold Blue', 'Furious Red', 'Ivory White'], 449), true],
  ['boAt', 'Bassheads 100 Wired', 'gadgets', 'headphones', '🎵', 'Hawk-inspired design, bass jo feel ho.', colors(['Black', 'Red', 'White', 'Blue'], 299)],
  ['Ambrane', '10000mAh Power Bank', 'gadgets', 'phoneDesk', '🔋', 'Battery anxiety ka ilaaj.', colors(['Black', 'Blue'], 499)],
  ['Portronics', 'Konnect Charging Cable', 'gadgets', 'cables', '🔌', 'Tez charging, tangle-free zindagi.', combo(['Type-C', 'Micro USB', 'Lightning'], V(['1m', 149], ['1.5m Braided', 199]))],
  ['SanDisk', 'Cruzer Pendrive', 'gadgets', 'keyboard', '💾', 'Files ka ghar, pocket mein.', V(['32GB', 299], ['64GB', 449])],
  ['Zebronics', 'Zeb-Power Wired Mouse', 'gadgets', 'deskDark', '🖱️', 'Click click click. Bas kaam karta hai.', colors(['Black', 'Red'], 249)],
  ['Noise', 'Smartwatch Strap', 'gadgets', 'appleWatch', '⌚', 'Naya strap = naya watch feel.', colors(['Jet Black', 'Teal Blue', 'Olive', 'Coral'], 199)],
  ['Generic', 'Popsocket Grip', 'gadgets', 'phoneHand', '📱', 'Ek haath se selfie, doosre se chai.', colors(['Evil Eye', 'Marble White', 'Sunset Fade', 'Matte Black', 'Holo Glitter', 'Yin-Yang'], 199)],
  ['Portronics', 'Foldable Phone Stand', 'gadgets', 'phoneBed', '📐', 'Binge-watching posture ka dost.', colors(['Grey', 'Blue'], 249)],
  ['Generic', 'LED Ring Light 10"', 'gadgets', 'camera', '💡', 'Reels-ready lighting, tripod included.', V(['10 inch', 449], ['6 inch', 299])],
  ['Generic', 'Cable Protector Set', 'gadgets', 'neon', '🦈', 'Charger cables ki bodyguard duty.', combo(['Cartoon Animals', 'Glow-in-Dark', 'Pastel'], V(['Set of 6', 129]))],
  ['Generic', 'Phone Case iPhone', 'gadgets', 'phoneYellow', '🛡️', 'Drip bhi, drop-protection bhi.', combo(['Clear', 'Matte Black', 'Lavender', 'Mint'], V(['iPhone 13/14', 249], ['iPhone 15/16', 299]))],
  ['Generic', 'Phone Case Samsung', 'gadgets', 'phoneCase', '🛡️', 'Samsung walon ka bhi haq hai drip pe.', combo(['Clear', 'Navy', 'Forest Green'], V(['S23/S24', 249], ['M-Series', 199]))],
  ['boAt', 'Stone 180 BT Speaker', 'gadgets', 'speaker', '🔊', '10W ka dhamaka, pocket size.', colors(['Black', 'Teal'], 499)],

  // ——— HOME ———
  ['Philips', 'LED Bulb 9W B22', 'home', 'lamp', '💡', 'Bijli bachao, ghar chamkao.', combo(['Cool Day White', 'Warm White'], V(['1 pc', 99], ['Pack of 2', 179], ['Pack of 4', 329]))],
  ['Generic', 'Fairy String Lights', 'home', 'fairy', '🧚', '365 din Diwali vibes.', combo(['Warm White', 'Multicolour'], V(['5m', 199], ['10m', 349])), true],
  ['Generic', 'Scented Jar Candle', 'home', 'candle', '🕯️', 'Ghar smells expensive now.', combo(['Vanilla', 'Lavender', 'Filter Coffee', 'Rose', 'Sandalwood'], V(['Small', 149], ['Large', 299]))],
  ['Cycle', 'Agarbatti Pack', 'home', 'candle2', '🪷', 'Subah wali shanti, stick form mein.', combo(['Sandal', 'Rose', 'Mogra', 'Lavender'], V(['70 sticks', 55], ['210 sticks', 140]))],
  ['Generic', 'Glow Star Ceiling Pack', 'home', 'stars', '🌌', 'Sapno ka ceiling, literally.', V(['100 stars', 129], ['200 stars + moon', 229])],
  ['Generic', 'Cushion Cover Set', 'home', 'boho', '🛋️', 'Sofa ka makeover, ₹300 mein.', combo(['Mustard Boho', 'Grey Geometric', 'Rust Stripes', 'Sage Solid'], V(['Set of 2', 299], ['Set of 5', 499]))],
  ['Generic', 'Sunset Projection Lamp', 'home', 'bedroom', '🌅', 'Golden hour on demand.', colors(['Sunset Red', 'Rainbow', 'Blue Hour'], 449)],
  ['Odonil', 'Room Freshener Blocks', 'home', 'mirror', '🌬️', 'Mehmaan aane se pehle wala hack.', combo(['Jasmine', 'Citrus', 'Lavender'], V(['48g', 55], ['Mixed Pack of 4', 199]))],
  ['Generic', 'Mini Cactus Planter', 'home', 'cactus', '🌵', 'Plants jo (shayad) nahi marenge.', V(['Single', 149], ['Duo Set', 249], ['Trio + Stand', 399])],
  ['Generic', 'Wall Décor Photo Frames', 'home', 'interior', '🖼️', 'Deewar ko bhi personality chahiye.', V(['Set of 3', 349], ['Set of 6', 499])],
  ['Gala', 'Spin Mop Refill', 'home', 'stool', '🧹', 'Ghar chamkega, back nahi dukhega.', V(['1 pc', 149], ['Pack of 2', 269])],
  ['Generic', 'Bamboo Hangers', 'home', 'wardrobe', '👔', 'Wardrobe ko Pinterest banao.', V(['Pack of 5', 249], ['Pack of 10', 449])],

  // ——— KITCHEN ———
  ['Milton', 'Thermosteel Bottle', 'kitchen', 'bottle', '🍾', '24 hour garam ya thanda. Physics who?', combo(['Olive', 'Steel Silver', 'Black'], V(['350ml', 449], ['500ml', 499])), true],
  ['Cello', 'H2O Water Bottle', 'kitchen', 'shaker', '💧', 'School se office tak ka sathi.', combo(['Blue', 'Aqua', 'Pink', 'Grey'], V(['1L', 199], ['Set of 2', 349]))],
  ['Pigeon', 'Handy Veggie Chopper', 'kitchen', 'kitchen', '🔪', 'Pyaaz kaato, aansu nahi.', V(['400ml', 299], ['900ml', 399])],
  ['Prestige', 'Gas Lighter', 'kitchen', 'spoons', '🔥', 'Ek click, chai ready.', V(['Classic', 149], ['With Knife Combo', 199])],
  ['Generic', 'Masala Dabba Steel', 'kitchen', 'spices', '🧂', '7 masale, ek ghar. Sabka apna kamra.', V(['7 Compartment', 399], ['With Spoons', 449])],
  ['Borosil', 'Glass Mug Set', 'kitchen', 'tableMug', '☕', 'Chai dikhti bhi achhi lagni chahiye.', V(['Set of 2', 299], ['Set of 4', 499])],
  ['Generic', 'Measuring Spoon Set', 'kitchen', 'spoons', '🥄', 'Baking mein andaaza nahi chalta.', V(['Set of 8', 199], ['With Cups Combo', 349])],
  ['Tupperware', 'Lunch Tiffin Set', 'kitchen', 'bowl', '🍱', 'Dabba jo kabhi leak nahi karta. Pinky promise.', combo(['Blue', 'Green'], V(['2 Container', 399], ['3 Container', 499]))],
  ['Generic', 'Gym Shaker Bottle', 'kitchen', 'shaker', '💪', 'Protein shake ya sharbat, aapki marzi.', colors(['Cyan', 'Black', 'Neon Green'], 249)],

  // ——— FASHION / ACCESSORIES ———
  ['Fastrack', 'UV Protected Sunglasses', 'accessories', 'wayfarer', '🕶️', 'Dhoop se bhi, boring look se bhi bachao.', combo(['Wayfarer Black', 'Aviator Gold', 'Round Retro'], V(['Standard', 449])), true],
  ['Generic', 'Beach Shades', 'accessories', 'beachShades', '😎', 'Goa jao na jao, vibes Goa wali.', colors(['Tortoise', 'Jet Black', 'Clear Frame'], 299)],
  ['Generic', 'Graphic Cotton Tee', 'accessories', 'tee', '👕', 'Personality, ab wearable format mein.', combo(['Chai Lover', 'Overthinker Club', 'Sasta Traveller', 'Desi Vibes Only'], V(['S', 299], ['M', 299], ['L', 299], ['XL', 349]))],
  ['Wildcraft', 'Baseball Cap', 'accessories', 'fashion', '🧢', 'Bad hair day ka full-proof plan.', colors(['Black', 'Navy', 'Olive', 'Maroon'], 349)],
  ['Generic', 'Canvas Tote Bag', 'accessories', 'tanBag', '👜', 'Plastic nahi, personality carry karo.', combo(['Coffee Doodle', 'Plants Print', 'Plain Beige'], V(['Standard', 249]))],
  ['Skybags', 'Casual Daypack Mini', 'accessories', 'backpack', '🎒', 'Chhota bag, bade plans.', colors(['Forest Green', 'Navy', 'Black'], 499)],
  ['Generic', 'Cotton Crew Socks', 'accessories', 'sneaker', '🧦', 'Mismatched socks era khatam.', combo(['Solid Pack', 'Stripes Pack', 'Funky Prints'], V(['Pack of 3', 249], ['Pack of 5', 379]))],
  ['Generic', 'Statement Earrings', 'accessories', 'earrings', '💎', 'Ek pair, poora outfit carry.', colors(['Royal Blue', 'Emerald', 'Blush Pink'], 199)],
  ['Generic', 'Pearl Charm Necklace', 'accessories', 'pearls', '📿', 'Old money aesthetic, sasta price.', V(['Single Strand', 249], ['Layered', 349])],
  ['Generic', 'Scrunchie Set Velvet', 'accessories', 'nails', '🎀', 'Wrist pe bhi, baalon mein bhi.', V(['Pack of 6', 149], ['Pack of 12', 249])],
  ['Generic', 'Minimal Analog Watch', 'accessories', 'watch', '⌚', 'Phone nikale bina time. Retro much?', colors(['Tan Strap', 'Black Strap', 'Mesh Silver'], 499)],

  // ——— STATIONERY ———
  ['Classmate', 'Spiral Notebook', 'stationery', 'books', '📓', 'Naye notebook wali feeling > sab kuch.', combo(['Single Line', 'Unruled'], V(['180 pages', 45], ['300 pages', 72], ['Pack of 6', 240]))],
  ['DOMS', 'Pencil Kit Box', 'stationery', 'pens', '✏️', 'School wali nostalgia, adult budget.', V(['Groove Kit', 99], ['Mega Gift Kit', 199])],
  ['Pilot', 'V5 Hi-Tecpoint Pen', 'stationery', 'pens', '🖊️', 'Likhawat sudhar nahi sakta, feel de sakta hai.', combo(['Blue', 'Black'], V(['1 pc', 65], ['Pack of 3', 180]))],
  ['Faber-Castell', 'Connector Pens', 'stationery', 'pens', '🖍️', 'Adulting break le lo, colour karo.', V(['15 Shades', 120], ['25 Shades', 199], ['50 Shades', 375])],
  ['Camlin', 'Geometry Box', 'stationery', 'deskDark', '📐', 'Compass se circle, memories se dard.', V(['Classic', 130], ['Exam Special', 180])],
  ['Generic', 'Sticky Notes Combo', 'stationery', 'confetti', '🗒️', 'Yaad rakhne ka jugaad, colourful edition.', V(['400 sheets', 149], ['800 sheets + Flags', 249])],
  ['Generic', 'Aesthetic Highlighters', 'stationery', 'nails', '🖍️', 'Notes jo Insta-worthy lagein.', V(['Pastel Set of 6', 199], ['Neon Set of 6', 179])],
  ['Generic', 'Daily Planner A5', 'stationery', 'books', '📅', 'Life sort karne ka pehla (aur aakhri) step.', combo(['Sage Green', 'Dusty Pink', 'Charcoal'], V(['Undated', 349]))],
  ['Fevicol', 'Fevikwik Instant Glue', 'stationery', 'saleTags', '🔧', 'Todo nahi, jodo. 1 second mein.', V(['3 pc', 30], ['10 pc Value', 90])],

  // ——— QUIRKY ———
  ['ThodaSa', 'Mystery Gift Box', 'quirky', 'giftBox', '🎁', 'Kya niklega? Wahi toh maza hai.', V(['Mini ₹149', 149], ['Classic ₹299', 299], ['Grand ₹499', 499]), true],
  ['Generic', 'Samosa Squishy Toy', 'quirky', 'samosa', '🥟', 'Squeeze karo, tension release karo. Zero calories.', V(['Single', 129], ['Chai-Samosa Combo', 229]), true],
  ['Generic', 'Desi Meme Stickers', 'quirky', 'keyboard', '😂', 'Laptop ko meme museum banao.', combo(['Bollywood Pack', 'Dev Jokes Pack', 'Hinglish Pack'], V(['50 pc', 119], ['100 pc', 199]))],
  ['Generic', 'Googly Eyes Mega Pack', 'quirky', 'confetti', '👀', 'Sab pe chipkao. SAB PE.', V(['100 pc', 99], ['500 pc Chaos Pack', 299])],
  ['Generic', 'Mini Claw Machine', 'quirky', 'arcade', '🕹️', 'Arcade at your desk. Productivity RIP.', V(['Classic', 349], ['With Toys Refill', 449])],
  ['Generic', 'Desk Bobblehead', 'quirky', 'cactus', '🌵', 'Haan bolne wala colleague. Finally.', combo(['Cactus', 'Pug', 'Astronaut'], V(['Standard', 179]))],
  ['Generic', 'Mini Designer Chair Décor', 'quirky', 'stool', '🪑', 'Famous chair, chhota size, full class.', V(['Single', 199], ['Set of 3', 499])],
  ['Mattel', 'UNO Card Game', 'quirky', 'saleTags', '🃏', 'Dosti todne ka official license.', V(['Classic', 199], ['UNO Flip', 249])],
  ['Generic', 'Magic 8 Ball Desi Edition', 'quirky', 'gift', '🎱', '"Ho jayega" se "Rehne do" tak ke answers.', V(['Standard', 299])],
  ['Generic', 'Keychain Collection', 'quirky', 'giftBox', '🔑', 'Keys kho jayengi, style nahi.', combo(['Auto-Rickshaw', 'Chai Kulhad', 'Cassette', 'Gamepad', 'Tiffin'], V(['1 pc', 99], ['Any 3', 249]))],
]

// ——— MEGA templates: high-combination SKU matrices (model × design, shade
// ranges, print drops) — this is what actually pads real catalogs to 1000s ———
const PHONE_MODELS = ['iPhone 13', 'iPhone 14', 'iPhone 15', 'iPhone 16', 'Galaxy S23', 'Galaxy S24', 'OnePlus 12', 'Pixel 8', 'Redmi Note 13', 'Galaxy M34']
const CASE_DESIGNS = ['Marble White', 'Midnight Matte', 'Butterfly Garden', 'Clear + Cardholder', 'Sunset Gradient', 'Checkerboard']
const ANIME_DESIGNS = ['Shonen Hero', 'Kawaii Cat', 'Cyber City', 'Wave Art']
const TEE_DROP = ['Mountains Are Calling', 'Ctrl+C Ctrl+V', 'Chalta Hai', 'Jugaad Engineer', 'Filter Coffee Club', 'Momo Lover', 'Kal Se Pakka', 'Introvert Loading']
const OVERSIZED = ['Acid Wash Grey', 'Vintage Black', 'Sage Solid', 'Off-White Minimal', 'Lavender Drop', 'Rust Orange']
const SIZES5 = V(['S', 349], ['M', 349], ['L', 349], ['XL', 399], ['XXL', 399])
const SHADES_LIP = ['Chilli Red', 'Brick Rose', 'Toffee Nude', 'Mauve Rush', 'Berry Bold', 'Peach Tea', 'Rosewood', 'Terracotta', 'Deep Plum', 'Coral Crush', 'Cinnamon', 'Pink Salt', 'Espresso', 'Raisin', 'First Date']
const SHADES_NAIL = ['Milky White', 'Baby Pink', 'Cherry', 'Wine Night', 'Lilac', 'Mint', 'Sky', 'Cobalt', 'Forest', 'Olive', 'Mustard', 'Tangerine', 'Chocolate', 'Charcoal', 'Silver Chrome', 'Gold Foil', 'Holo Glitter', 'Nude Beige', 'Blush', 'Jet Black']
const POP_DESIGNS = ['Daisy', 'Smiley', 'Tie-Dye', 'Cow Print', 'Sunflower', 'Lightning', 'Om', 'Trishul', 'Peace', 'Cherry', 'Taco', 'Planet', 'Custom Initial', 'Mirror Chrome', 'Glow Skull']
const STRAP_COLORS = ['Black', 'White', 'Navy', 'Teal', 'Olive', 'Coral', 'Lavender', 'Wine', 'Mustard', 'Grey', 'Mint', 'Rose Pink']
const CITY_MAGNETS = ['Mumbai', 'Delhi', 'Goa', 'Jaipur', 'Varanasi', 'Kolkata', 'Ladakh', 'Kerala', 'Udaipur', 'Rishikesh', 'Pondicherry', 'Hampi']
const POSTERS = ['Retro Bollywood', 'Minimal Mountains', 'Chai Quote', 'Vintage Travel India', 'Abstract Sunset', 'F1 Grid', 'Anime Cityscape', 'Motivation Meme', 'Lo-fi Room', 'Old Map of India', 'Cricket Legends', 'Space Nebula', 'Botanical Sketch', 'Rickshaw Art', 'Typography Hustle']
const SOUP_FLAVORS = ['Hot & Sour', 'Sweet Corn', 'Tomato', 'Mushroom', 'Mixed Veg', 'Manchow']
const SHEET_THEMES = ['Doodle Chai', 'Space Cats', 'Bollywood Dialogues', 'Plants', 'Retro Gaming', 'Vaporwave', 'Cute Food', 'Zodiac', 'Music Notes', 'Travel Stamps', 'Coding Memes', 'Floral']
const WASHI = ['Gold Foil', 'Sakura', 'Grid Lines', 'Rainbow Pastel', 'Newspaper', 'Leaves', 'Stars', 'Checker', 'Marble', 'Doodle']
const GEL_COLORS = ['Pastel Pink', 'Pastel Blue', 'Mint', 'Lilac', 'Peach', 'Lemon', 'Sage', 'Sky', 'Rose', 'Grey']
const CLAW_COLORS = ['Tortoise', 'Matte Black', 'Cream', 'Clear Amber', 'Sage', 'Blush', 'Cocoa', 'Lavender', 'Pearl White', 'Ocean Blue']
const MOUSEPADS = ['World Map', 'Galaxy', 'Minimal Grey', 'Anime Skyline', 'Meme Cat', 'Gradient Sunset', 'Keyboard Shortcuts', 'Marble', 'Forest', 'Cricket Field']

TEMPLATES.push(
  ['Generic', 'Designer Phone Case', 'gadgets', 'phoneCase', '📱', 'Drip bhi, drop-protection bhi.', combo(PHONE_MODELS, CASE_DESIGNS.map((d) => [d, 249]))],
  ['Generic', 'Anime Phone Case', 'gadgets', 'phoneYellow', '🌸', 'Weeb mode: ON. Protection: bhi ON.', combo(PHONE_MODELS, ANIME_DESIGNS.map((d) => [d, 299]))],
  ['Generic', 'Graphic Tee Drop 2', 'accessories', 'tee', '👕', 'Statement pehno, baat mat karo.', combo(TEE_DROP, SIZES5)],
  ['Generic', 'Oversized Tee', 'accessories', 'wardrobe', '🫥', 'Comfort jo fashion ban gaya.', combo(OVERSIZED, V(['M', 399], ['L', 399], ['XL', 449], ['XXL', 449]))],
  ['Nykaa', 'Matte Luxe Lipstick', 'beauty', 'lipstick', '💄', 'Shade range itni ki decide karna impossible.', SHADES_LIP.map((s) => [s, 299])],
  ['Generic', 'Nail Paint Minis', 'beauty', 'nails', '💅', 'Commitment issues? Mini bottles le lo.', SHADES_NAIL.map((s) => [s, 99])],
  ['Generic', 'Popsocket Drop 2', 'gadgets', 'phoneHand', '🌼', 'Grip strong, vibe stronger.', POP_DESIGNS.map((d) => [d, 199])],
  ['Generic', 'Watch Strap 20mm Silicone', 'gadgets', 'appleWatch', '⌚', 'Roz naya watch wala scene.', STRAP_COLORS.map((c) => [c, 199])],
  ['Generic', 'Cushion Cover Solids', 'home', 'boho', '🛋️', 'Rang badlo, room badlo.', combo(['Mustard', 'Sage', 'Rust', 'Charcoal', 'Blush', 'Teal', 'Ivory', 'Indigo', 'Olive', 'Wine'], V(['Set of 2', 249], ['Set of 5', 449]))],
  ['Generic', 'Tealight Candles', 'home', 'candle2', '🕯️', 'Mood lighting, budget pricing.', combo(['Vanilla', 'Rose', 'Lemongrass', 'Ocean', 'Cinnamon', 'Jasmine', 'Coffee', 'Unscented'], V(['Pack of 10', 149], ['Pack of 25', 299], ['Pack of 50', 449]))],
  ['Generic', 'Kids Sipper Bottle', 'kitchen', 'shaker', '🧃', 'School bag ka sabse colourful member.', combo(['Dino', 'Unicorn', 'Space', 'Jungle', 'Cars', 'Mermaid', 'Football', 'Butterfly'], V(['500ml', 249], ['750ml', 299]))],
  ['Generic', 'Keychain Drop 2', 'quirky', 'giftBox', '🔑', 'Pocket-size personality.', ['Mini Tabla', 'Filmy Clapboard', 'Paan Leaf', 'Truck Horn', 'Mini Ludo', 'Cutting Chai', 'Vada Pav', 'Old Scooter', 'Cassette Mix', 'Lucky 786', 'Evil Eye', 'Pixel Heart', 'Mini Cricket Bat', 'Jhumka Style', 'Retro TV'].map((d) => [d, 99])],
  ['Generic', 'Sticker Sheet Packs', 'stationery', 'confetti', '✨', 'Laptop, diary, fridge — sab canvas hai.', combo(SHEET_THEMES, V(['1 Sheet', 49], ['3 Sheets', 129]))],
  ['Generic', 'Washi Tape Rolls', 'stationery', 'pens', '🎏', 'Journal ko art bana do.', combo(WASHI, V(['1 Roll', 79], ['3 Rolls', 199]))],
  ['Generic', 'Pastel Gel Pens', 'stationery', 'pens', '🖊️', 'Notes likhna suddenly fun lagta hai.', combo(GEL_COLORS, V(['1 pc', 40], ['Full Set of 10', 349]))],
  ['Generic', 'Hair Claw Clips', 'accessories', 'fashion', '🦋', 'Messy bun = 5 second hairstyle.', CLAW_COLORS.map((c) => [c, 129])],
  ['Generic', 'Fridge Magnet Cities', 'quirky', 'saleTags', '🧲', 'Travel memories, fridge pe framed.', combo(CITY_MAGNETS, V(['1 pc', 99], ['Any 3', 249]))],
  ['Generic', 'Wall Poster A3', 'home', 'interior', '🖼️', 'Deewar bolti hai, bas poster chahiye.', POSTERS.map((p) => [p, 149])],
  ['Knorr', 'Cup-a-Soup', 'snacks', 'bowl', '🍲', '4 baje wali bhookh ka one-click answer.', combo(SOUP_FLAVORS, V(['1 Cup', 35], ['Pack of 4', 129]))],
  ['Cornitos', 'Nacho Crisps', 'snacks', 'fries', '🌮', 'Crunch jo poore room ko sunai de.', combo(['Cheese & Herbs', 'Sizzlin Jalapeno', 'Tikka Masala', 'Sea Salt'], V(['60g', 35], ['150g', 90]))],
  ['Too Yumm', 'Baked Chips', 'snacks', 'bakedBags', '🍟', 'Guilt-free karke khud ko convince karo.', combo(['Chilli Achaari', 'Noodle Masala', 'Dahi Papdi', 'Peri Peri'], V(['45g', 20], ['90g', 40]))],
  ['Sunfeast', 'Dark Fantasy Choco Fills', 'snacks', 'dessert', '🍫', 'Andar se surprise. Har baar.', combo(['Choco Fills', 'Choco Nut', 'Coffee Fills'], V(['75g', 40], ['300g', 140]))],
  ['Amul', 'Chocolate Minis', 'snacks', 'cake', '🍫', 'Desi chocolate, videshi feels.', combo(['Fruit & Nut', 'Almond', 'Dark 55%', 'Mystic Mocha', 'Orange Twist'], V(['40g', 50], ['150g', 160]))],
  ['Generic', 'Gaming Mousepad XL', 'gadgets', 'deskDark', '🖱️', 'Desk setup 10x better in 1 step.', MOUSEPADS.map((m) => [m, 299])],
  ['Generic', 'Laptop Sleeve', 'gadgets', 'keyboard', '💻', 'Laptop ko bhi winter jacket chahiye.', combo(['Grey Felt', 'Black Neoprene', 'Olive Canvas'], V(['13 inch', 349], ['14 inch', 399], ['15.6 inch', 449]))],
  ['Generic', 'Ceramic Planter Pastel', 'home', 'plant', '🪴', 'Plants deserve designer ghar.', combo(['Blush', 'Sage', 'Cream', 'Sky', 'Terracotta'], V(['4 inch', 199], ['6 inch', 299]))],
  ['Generic', 'Coaster Set Quirky', 'kitchen', 'tableMug', '🥤', 'Table bachao, style badhao.', combo(['Bollywood Dialogues', 'Truck Art', 'Marble', 'Wooden Round', 'Retro Ads', 'Doodle Chai', 'Neon Quotes', 'Mandala'], V(['Set of 4', 199], ['Set of 6', 279]))],
  ['Generic', 'Socks Drop 2 — Prints', 'accessories', 'sneaker', '🧦', 'Ankle pe attitude.', combo(['Momos', 'Chai Time', 'Cricket', 'Cats', 'Pizza', 'Rangoli', 'Gaming', 'Autorickshaw'], V(['Pack of 2', 199], ['Pack of 4', 349]))],
  ['Generic', 'Tempered Glass Guard', 'gadgets', 'phoneDesk', '🪟', 'Screen crack hone se pehle wala akal.', combo(PHONE_MODELS, V(['1 pc', 149], ['Pack of 2', 249]))],
  ['boAt', 'Rockerz Neckband', 'gadgets', 'headphones', '🎶', 'Gym se metro tak, wire ka tension zero.', colors(['Active Black', 'Ocean Blue', 'Raging Red', 'Moon White'], 499)],
  ['Tetley', 'Green Tea Bags', 'snacks', 'lemon', '🍋', 'Detox ka natak hi sahi, tasty hai.', combo(['Lemon Honey', 'Mint', 'Ginger', 'Tulsi', 'Jasmine', 'Classic', 'Cinnamon', 'Aloe Vera'], V(['10 Bags', 90], ['25 Bags', 199]))],
  ['Happilo', 'Trail Mix Pouch', 'snacks', 'berries', '🥜', 'Healthy snacking (jab tak pack khatam na ho).', combo(['Nutty Berry', 'Seeds Mix', 'Choco Nut', 'Cranberry'], V(['100g', 149], ['200g', 249]))],
  ['Generic', 'Photo Clip String Lights', 'home', 'fairy', '📸', 'Yaadein bhi, mood lighting bhi.', combo(['Warm Glow', 'Multicolour'], V(['20 Clips', 249], ['40 Clips', 399]))],
  ['Generic', 'LED Diya Pack', 'home', 'candle', '🪔', 'Diwali vibes, zero wax mess.', V(['Pack of 6', 199], ['Pack of 12', 349], ['Pack of 24', 499])],
  ['Generic', 'Metal Bookmark', 'stationery', 'books', '🔖', 'Page mod ke rakhne walon se durr raho.', ['Feather Gold', 'Peacock', 'Ganesha', 'Minimal Line', 'Cat Tail', 'Warli Art', 'Om', 'Lotus'].map((d) => [d, 99])],
)

const hash = (n) => { let h = n * 2654435761 % 2 ** 32; h = (h ^ (h >> 15)) * 2246822519 % 2 ** 32; return Math.abs(h ^ (h >> 13)) }

export const LAUNCH_PICKS = []

const build = () => {
  const out = []
  let id = 1
  let templateId = 0
  for (const [brand, name, category, photo, emoji, desc, variants, launch] of TEMPLATES) {
    templateId++
    const baseName = `${brand === 'Generic' || brand === 'ThodaSa' ? '' : brand + ' '}${name}`.trim()
    let first = true
    for (const [label, price] of variants) {
      const h = hash(id)
      out.push({
        id, templateId, baseName,
        variantLabel: label,
        variantCount: variants.length,
        name: `${baseName}${label ? ' — ' + label : ''}`,
        brand, category, emoji, desc,
        price,
        deal: h % 10 < 3,
        mrp: Math.round(price * (1.5 + (h % 5) / 10)),
        rating: Math.round((3.8 + (h % 12) / 10) * 10) / 10,
        reviews: 150 + (h % 9000),
        grad: h % 8,
        img: img(I[photo]),
      })
      if (launch && first) LAUNCH_PICKS.push(id)
      first = false
      id++
    }
  }
  return out
}

export const PRODUCTS = build()

// variants grouped per template — powers the variant picker sheet
export const VARIANTS_BY_TEMPLATE = PRODUCTS.reduce((m, p) => {
  ;(m[p.templateId] = m[p.templateId] || []).push(p)
  return m
}, {})

// one representative "hero" SKU per template — the feed shows these
export const TEMPLATE_HEROES = Object.values(VARIANTS_BY_TEMPLATE).map((list) => list[0])
