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
  { id: 'cars', label: 'Cars 🏎️' },
  { id: 'bikes', label: 'Sport Bikes' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'watches', label: 'Watches' },
  { id: 'luxe', label: 'Luxe Bags' },
  { id: 'art', label: 'Art' },
  { id: 'books', label: 'Books' },
  { id: 'realty', label: 'Real Estate 🏝️' },
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

export const inr = (n) => n.toLocaleString('en-IN')

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
  // ——— premium / luxe pool (verified) ———
  carBlue: '1552519507-da3b142c6e3d', carBugatti: '1544636331-e26879cd4d9b', carRed: '1583121274602-3e2820c69888',
  carRoad: '1568605117036-5fe5e7bab0b7', carSedanBlack: '1503376780353-7e6692767b70', carBmw: '1580273916550-e323be2ae537',
  carMustang: '1494976388531-d1058494cdd8', carAmg: '1553440569-bcc63803a83d',
  bikeCafe: '1558981806-ec527fa84c39', bikeDucati: '1568772585407-9361f9bf3a87', bikeNaked: '1591637333184-19aa84b3e01f', bikeKtm: '1609630875171-b1321377ee65',
  shoeJordan: '1552346154-21d32810aba3', shoeYellow: '1514989940723-e8e51635b782', shoeNeon: '1606107557195-0e29a4b5b4aa', shoeTan: '1549298916-b41d501d3772',
  watchDark: '1587836374828-4dbafa94cf0e', watchMinimal: '1524592094714-0f0654e20314', watchDive: '1547996160-81dfa63595aa', watchSmart: '1523275335684-37898b6baf30',
  suit: '1594938298603-c8148c4dae35', menswearFlat: '1490114538077-0a7f8cb49891', womensJacket: '1544022613-e87ca75a784a',
  artClassical: '1578321272176-b7bbc0679853', artAbstract1: '1541961017774-22349e4a1262', artAbstract2: '1531913764164-f85c52e6e654', artLandscape: '1577720580479-7d839d829c73',
  bookPoetry: '1544947950-fa07a98d237f', bookStack: '1512820790803-83ca734da794', bookshelf: '1524995997946-a1c2e315a42f', booksRow: '1495446815901-a7297e633e8d',
  perfumeCoco: '1592945403244-b3fbafd7f539', perfumeAmber: '1615634260167-c8cdede054de',
  bagTeal: '1594223274512-ad4803739b7c', bagRed: '1584917865442-de89df76afd3',
  villa: '1512917774080-9991f1c4c750', livingRoom: '1560448204-e02f11c3d0e2', modernHouse: '1613490493576-7fde63acd811',
  livingMin: '1600607687939-ce8a6c25118c', glassHouse: '1600585154340-be6161a56a0c', apartment: '1600566753086-00f18fb6b3ea',
  livingWarm: '1502672260266-1c1ef2d93688', livingSofa: '1583847268964-b28dc8f51f92', decorCorner: '1519710164239-da123dc03ef4',
  cottage: '1449844908441-8829872d2607',
}

// variant helpers
const V = (...pairs) => pairs // [[label, price], ...]
const combo = (flavors, sizes) => flavors.flatMap((f) => sizes.map(([s, p]) => [`${f} · ${s}`, p]))
const colors = (cols, p) => cols.map((c) => [c, p])

// T(brand, name, category, photoKey, emoji, desc, variants, launch?)
const TEMPLATES = [
  // ——— SNACKS ———
  ['Slurpp', '2-Minute Masala Noodles', 'snacks', 'bowl', '🍜', '2 minute bola tha, 20 saal ho gaye. Still worth it.', combo(['Masala', 'Special Masala', 'Chicken'], V(['Pack of 4', 60], ['Pack of 8', 118], ['Pack of 12', 172])), true],
  ['CrunchLab', 'Potato Chips', 'snacks', 'chips', '🥔', 'Ek pack kabhi kaafi nahi hota. Science hai.', combo(['Magic Masala', 'Cream & Onion', 'Classic Salted', 'Tomato Tango', 'Chile Limón'], V(['52g', 20], ['90g', 35], ['Party Pack 177g', 60]))],
  ['Tedha', 'Crunchy Snack', 'snacks', 'spices', '🌶️', 'Tedha hai par mera hai.', combo(['Masala Munch', 'Green Chutney', 'Solid Masti'], V(['40g', 10], ['90g', 20], ['Family Pack', 35]))],
  ['Namkeen Bros', 'Bhujia', 'snacks', 'spices', '🥨', 'Chai ke saath ya waise hi. No judgement.', combo(['Classic', 'Aloo', 'Moong Dal'], V(['200g', 52], ['400g', 95], ['1kg', 210]))],
  ['Kokoa', 'Silk Chocolate Bar', 'snacks', 'dessert', '🍫', 'Kiss me, close your eyes... aapko pata hai.', combo(['Original', 'Cookie Crunch', 'Fruit & Nut', 'Bubbly'], V(['60g', 89], ['150g', 199])), true],
  ['GoodOld', 'Glucose Biscuits', 'snacks', 'chai', '🍪', 'G maane Genius. Desh ka biscuit.', V(['65g', 5], ['250g', 30], ['800g Value Pack', 80])],
  ['SunnySide', 'Butter Cookies', 'snacks', 'chai', '🍪', 'Har bite mein khushi wala propaganda. Sach hai.', combo(['Butter', 'Cashew', 'Choco Chip'], V(['75g', 25], ['200g', 60]))],
  ['TwistO', 'Sandwich Biscuits', 'snacks', 'dessert', '🖤', 'Twist, lick, dunk — ya seedha poora pack.', combo(['Original', 'Chocolate', 'Strawberry'], V(['46g', 10], ['120g', 30]))],
  ['Noodly', 'Long Noodles', 'snacks', 'pasta', '🍝', 'Long noodles, longer slurps.', combo(['Magic Masala', 'Mood Masala'], V(['Pack of 4', 55], ['Pack of 8', 108]))],
  ['WokBoy', 'Schezwan Chutney', 'snacks', 'spices', '🔥', 'Sab kuch schezwan bana do. SAB KUCH.', V(['90g', 45], ['250g', 90])],
  ['PopKarma', 'Instant Popcorn', 'snacks', 'bowl', '🍿', 'Movie night ka asli hero.', combo(['Butter', 'Butter Pepper', 'Golden Sizzle'], V(['30g', 15], ['59g', 30]))],
  ['Naav', 'Fruit Drink', 'snacks', 'smoothie', '🧃', 'Bachpan ka swaad, tetra pack mein.', combo(['Aamras', 'Jaljeera', 'Aam Panna', 'Anar'], V(['200ml', 30], ['1L', 99]))],
  ['FizzySaeb', 'Fizz Sparkling Drink', 'snacks', 'smoothie', '🍏', 'Cool drink for cool logon ke liye.', V(['250ml', 25], ['600ml', 45], ['1L', 70])],
  ['MorningMood', 'Classic Instant Coffee', 'snacks', 'mug', '☕', 'Deadline se pehle wala ritual.', V(['25g', 85], ['50g', 155], ['100g', 290])],
  ['Kadak', 'Tea Gold', 'snacks', 'chai', '🫖', 'Ghar wali chai ka secret ingredient.', V(['250g', 140], ['500g', 270])],
  ['ChocoNutty', 'Hazelnut Spread', 'snacks', 'pancakes', '🥞', 'Roti pe, bread pe, ya chamach se seedha.', V(['150g', 199], ['350g', 399])],
  ['Mixify', 'Mixed Fruit Jam', 'snacks', 'berries', '🍓', 'Bread ka best friend since forever.', V(['200g', 75], ['500g', 155])],
  ['MasalaGhar', 'Masala Box Refill', 'snacks', 'spices', '🧂', 'Asli masale sach sach. Dadi approved.', combo(['Garam Masala', 'Chana Masala', 'Kitchen King', 'Chunky Chat'], V(['100g', 68], ['500g', 290]))],
  ['Doodhwala', 'Cheese Slices', 'snacks', 'pizza', '🧀', 'Har cheez pe cheese. Rule of life.', V(['10 Slices', 135], ['20 Slices', 255])],
  ['AngleAttack', 'Mad Angles', 'snacks', 'chipsBowl', '📐', 'Angle sahi ho toh sab crunchy lagta hai.', combo(['Achaari Masti', 'Very Peri Peri', 'Tomato Madness'], V(['66g', 20], ['130g', 35]))],

  // ——— BEAUTY ———
  ['Kohl&Co', 'Deep Kajal', 'beauty', 'kajal', '🖤', 'Ek stroke mein full drama.', combo(['Deep Black', 'Royal Blue', 'Brown'], V(['0.35g', 199], ['Twin Pack', 358])), true],
  ['LineUp', 'Bold Wing Liner', 'beauty', 'makeupFace', '👁️', 'Wing itna sharp ki senti ho jaye.', V(['Black 3g', 199], ['Waterproof 3g', 249])],
  ['Kohl&Co', 'Office-Proof Matte Lipstick', 'beauty', 'lipstick', '💄', 'Meeting se movie tak, ek hi shade.', colors(['Red Coat', 'Rosy Sunday', 'Blushing Nude', 'Mauve Matter', 'Scarlet Drill'], 425)],
  ['BoldMove', 'Matte As Hell Lip Crayon', 'beauty', 'makeupFlat', '💋', 'Matte bhi, savage bhi.', colors(['01 Scarlett', '02 Brigitte', '07 Viola', '12 Poison Ivy'], 449)],
  ['MittiGlow', 'Ubtan Glow Face Wash', 'beauty', 'tube', '🧴', 'Haldi-chandan wala glow, tube mein.', V(['50ml', 149], ['100ml', 259], ['150ml Value', 349])],
  ['MittiGlow', 'Onion Hair Shampoo', 'beauty', 'serum', '🧅', 'Pyaaz rulata nahi, baal ugata hai (allegedly).', V(['150ml', 199], ['250ml', 349])],
  ['TeaTree Co', 'Green Tea Face Wash', 'beauty', 'skincareFlat', '🍵', 'Oily skin ka arch-enemy.', V(['75ml', 225], ['150ml', 385])],
  ['BareScience', 'Niacinamide 10% Serum', 'beauty', 'serum', '💧', 'Science jo skin pe kaam karta hai.', V(['30ml', 399])],
  ['GlowWow', 'Vitamin C Face Serum', 'beauty', 'apothecary', '🍊', 'Subah ka glow, bottle se.', V(['30ml', 349], ['60ml Duo', 499])],
  ['SoftSaga', 'Soft Moisturising Cream', 'beauty', 'skincareFlat', '🌸', 'Sardi ho ya AC, skin happy.', V(['50ml', 99], ['100ml', 175], ['300ml', 349])],
  ['ColdCare', 'Cold Cream', 'beauty', 'makeupFlat', '❄️', 'Winter classic since aapki mummy ke time se.', V(['55ml', 70], ['100ml', 120], ['200ml', 210])],
  ['NeemNest', 'Purifying Neem Face Wash', 'beauty', 'tube', '🌿', 'Neem karela nahi, neem hero hai.', V(['100ml', 145], ['200ml', 260])],
  ['MaskMandi', 'Sheet Mask', 'beauty', 'rose', '🧖', 'Sunday self-care, ₹99 mein.', combo(['Hydra Bomb', 'Bright Complete', 'Green Tea', 'Charcoal'], V(['1 pc', 99], ['Pack of 3', 269]))],
  ['IttarWala', 'Luxury Perfume', 'beauty', 'perfume', '🌹', 'Old money vibes, new money price.', combo(['CEO Man', 'Date Woman', 'White Oud', 'Honey Oud'], V(['20ml', 229], ['50ml', 449]))],
  ['DaadhiDon', 'Beard Growth Oil', 'beauty', 'apothecary', '🧔', 'Patchy se patch-perfect.', V(['30ml', 350], ['50ml', 449])],
  ['ShadeStreet', 'Nail Enamel', 'beauty', 'nails', '💅', 'Katrina approved shine.', colors(['Cherry Pop', 'Nude Mood', 'Lilac Haze', 'Coffee Date', 'Mint To Be', 'Berry Much'], 199)],
  ['LipLore', 'Lip Balm SPF', 'beauty', 'berries', '👄', 'Lips ka sunscreen. Haan, ye bhi hota hai.', combo(['Strawberry', 'Watermelon', 'Vanilla'], V(['12g', 245]))],

  // ——— GADGETS ———
  ['SoundLoot', 'AirBuds 131 TWS', 'gadgets', 'earbuds', '🎧', '60 hour playback, zero wire ka jhanjhat.', colors(['Active Black', 'Bold Blue', 'Furious Red', 'Ivory White'], 449), true],
  ['SoundLoot', 'BassBuds Wired', 'gadgets', 'headphones', '🎵', 'Hawk-inspired design, bass jo feel ho.', colors(['Black', 'Red', 'White', 'Blue'], 299)],
  ['PowerPeti', '10000mAh Power Bank', 'gadgets', 'phoneDesk', '🔋', 'Battery anxiety ka ilaaj.', colors(['Black', 'Blue'], 499)],
  ['PlugPoint', 'Konnect Charging Cable', 'gadgets', 'cables', '🔌', 'Tez charging, tangle-free zindagi.', combo(['Type-C', 'Micro USB', 'Lightning'], V(['1m', 149], ['1.5m Braided', 199]))],
  ['DataDabba', 'Chotu 3.0 Pendrive', 'gadgets', 'keyboard', '💾', 'Files ka ghar, pocket mein.', V(['32GB', 299], ['64GB', 449])],
  ['ClickClick', 'Clicker Wired Mouse', 'gadgets', 'deskDark', '🖱️', 'Click click click. Bas kaam karta hai.', colors(['Black', 'Red'], 249)],
  ['StrapStory', 'Smartwatch Strap', 'gadgets', 'appleWatch', '⌚', 'Naya strap = naya watch feel.', colors(['Jet Black', 'Teal Blue', 'Olive', 'Coral'], 199)],
  ['Generic', 'Popsocket Grip', 'gadgets', 'phoneHand', '📱', 'Ek haath se selfie, doosre se chai.', colors(['Evil Eye', 'Marble White', 'Sunset Fade', 'Matte Black', 'Holo Glitter', 'Yin-Yang'], 199)],
  ['PlugPoint', 'Foldable Phone Stand', 'gadgets', 'phoneBed', '📐', 'Binge-watching posture ka dost.', colors(['Grey', 'Blue'], 249)],
  ['Generic', 'LED Ring Light 10"', 'gadgets', 'camera', '💡', 'Reels-ready lighting, tripod included.', V(['10 inch', 449], ['6 inch', 299])],
  ['Generic', 'Cable Protector Set', 'gadgets', 'neon', '🦈', 'Charger cables ki bodyguard duty.', combo(['Cartoon Animals', 'Glow-in-Dark', 'Pastel'], V(['Set of 6', 129]))],
  ['Generic', 'Phone Case iPhone', 'gadgets', 'phoneYellow', '🛡️', 'Drip bhi, drop-protection bhi.', combo(['Clear', 'Matte Black', 'Lavender', 'Mint'], V(['iPhone 13/14', 249], ['iPhone 15/16', 299]))],
  ['Generic', 'Phone Case Samsung', 'gadgets', 'phoneCase', '🛡️', 'Samsung walon ka bhi haq hai drip pe.', combo(['Clear', 'Navy', 'Forest Green'], V(['S23/S24', 249], ['M-Series', 199]))],
  ['SoundLoot', 'Boombox Mini BT Speaker', 'gadgets', 'speaker', '🔊', '10W ka dhamaka, pocket size.', colors(['Black', 'Teal'], 499)],

  // ——— HOME ———
  ['GlowGhar', 'LED Bulb 9W B22', 'home', 'lamp', '💡', 'Bijli bachao, ghar chamkao.', combo(['Cool Day White', 'Warm White'], V(['1 pc', 99], ['Pack of 2', 179], ['Pack of 4', 329]))],
  ['Generic', 'Fairy String Lights', 'home', 'fairy', '🧚', '365 din Diwali vibes.', combo(['Warm White', 'Multicolour'], V(['5m', 199], ['10m', 349])), true],
  ['Generic', 'Scented Jar Candle', 'home', 'candle', '🕯️', 'Ghar smells expensive now.', combo(['Vanilla', 'Lavender', 'Filter Coffee', 'Rose', 'Sandalwood'], V(['Small', 149], ['Large', 299]))],
  ['DhoopBatti Co', 'Agarbatti Pack', 'home', 'candle2', '🪷', 'Subah wali shanti, stick form mein.', combo(['Sandal', 'Rose', 'Mogra', 'Lavender'], V(['70 sticks', 55], ['210 sticks', 140]))],
  ['Generic', 'Glow Star Ceiling Pack', 'home', 'stars', '🌌', 'Sapno ka ceiling, literally.', V(['100 stars', 129], ['200 stars + moon', 229])],
  ['Generic', 'Cushion Cover Set', 'home', 'boho', '🛋️', 'Sofa ka makeover, ₹300 mein.', combo(['Mustard Boho', 'Grey Geometric', 'Rust Stripes', 'Sage Solid'], V(['Set of 2', 299], ['Set of 5', 499]))],
  ['Generic', 'Sunset Projection Lamp', 'home', 'bedroom', '🌅', 'Golden hour on demand.', colors(['Sunset Red', 'Rainbow', 'Blue Hour'], 449)],
  ['KhushbuKart', 'Room Freshener Blocks', 'home', 'mirror', '🌬️', 'Mehmaan aane se pehle wala hack.', combo(['Jasmine', 'Citrus', 'Lavender'], V(['48g', 55], ['Mixed Pack of 4', 199]))],
  ['Generic', 'Mini Cactus Planter', 'home', 'cactus', '🌵', 'Plants jo (shayad) nahi marenge.', V(['Single', 149], ['Duo Set', 249], ['Trio + Stand', 399])],
  ['Generic', 'Wall Décor Photo Frames', 'home', 'interior', '🖼️', 'Deewar ko bhi personality chahiye.', V(['Set of 3', 349], ['Set of 6', 499])],
  ['Gala', 'Spin Mop Refill', 'home', 'stool', '🧹', 'Ghar chamkega, back nahi dukhega.', V(['1 pc', 149], ['Pack of 2', 269])],
  ['Generic', 'Bamboo Hangers', 'home', 'wardrobe', '👔', 'Wardrobe ko Pinterest banao.', V(['Pack of 5', 249], ['Pack of 10', 449])],

  // ——— KITCHEN ———
  ['ThandaGaram', 'Thermosteel Bottle', 'kitchen', 'bottle', '🍾', '24 hour garam ya thanda. Physics who?', combo(['Olive', 'Steel Silver', 'Black'], V(['350ml', 449], ['500ml', 499])), true],
  ['SipSip', 'Everyday Water Bottle', 'kitchen', 'shaker', '💧', 'School se office tak ka sathi.', combo(['Blue', 'Aqua', 'Pink', 'Grey'], V(['1L', 199], ['Set of 2', 349]))],
  ['ChopShop', 'Handy Veggie Chopper', 'kitchen', 'kitchen', '🔪', 'Pyaaz kaato, aansu nahi.', V(['400ml', 299], ['900ml', 399])],
  ['Chingari', 'Gas Lighter', 'kitchen', 'spoons', '🔥', 'Ek click, chai ready.', V(['Classic', 149], ['With Knife Combo', 199])],
  ['Generic', 'Masala Dabba Steel', 'kitchen', 'spices', '🧂', '7 masale, ek ghar. Sabka apna kamra.', V(['7 Compartment', 399], ['With Spoons', 449])],
  ['GlassGhar', 'Glass Mug Set', 'kitchen', 'tableMug', '☕', 'Chai dikhti bhi achhi lagni chahiye.', V(['Set of 2', 299], ['Set of 4', 499])],
  ['Generic', 'Measuring Spoon Set', 'kitchen', 'spoons', '🥄', 'Baking mein andaaza nahi chalta.', V(['Set of 8', 199], ['With Cups Combo', 349])],
  ['DabbaDost', 'Lunch Tiffin Set', 'kitchen', 'bowl', '🍱', 'Dabba jo kabhi leak nahi karta. Pinky promise.', combo(['Blue', 'Green'], V(['2 Container', 399], ['3 Container', 499]))],
  ['Generic', 'Gym Shaker Bottle', 'kitchen', 'shaker', '💪', 'Protein shake ya sharbat, aapki marzi.', colors(['Cyan', 'Black', 'Neon Green'], 249)],

  // ——— FASHION / ACCESSORIES ———
  ['ShadeSquad', 'UV Protected Sunglasses', 'accessories', 'wayfarer', '🕶️', 'Dhoop se bhi, boring look se bhi bachao.', combo(['Wayfarer Black', 'Aviator Gold', 'Round Retro'], V(['Standard', 449])), true],
  ['Generic', 'Beach Shades', 'accessories', 'beachShades', '😎', 'Goa jao na jao, vibes Goa wali.', colors(['Tortoise', 'Jet Black', 'Clear Frame'], 299)],
  ['Generic', 'Graphic Cotton Tee', 'accessories', 'tee', '👕', 'Personality, ab wearable format mein.', combo(['Chai Lover', 'Overthinker Club', 'Sasta Traveller', 'Desi Vibes Only'], V(['S', 299], ['M', 299], ['L', 299], ['XL', 349]))],
  ['TopiTales', 'Baseball Cap', 'accessories', 'fashion', '🧢', 'Bad hair day ka full-proof plan.', colors(['Black', 'Navy', 'Olive', 'Maroon'], 349)],
  ['Generic', 'Canvas Tote Bag', 'accessories', 'tanBag', '👜', 'Plastic nahi, personality carry karo.', combo(['Coffee Doodle', 'Plants Print', 'Plain Beige'], V(['Standard', 249]))],
  ['BagBazaar', 'Casual Daypack Mini', 'accessories', 'backpack', '🎒', 'Chhota bag, bade plans.', colors(['Forest Green', 'Navy', 'Black'], 499)],
  ['Generic', 'Cotton Crew Socks', 'accessories', 'sneaker', '🧦', 'Mismatched socks era khatam.', combo(['Solid Pack', 'Stripes Pack', 'Funky Prints'], V(['Pack of 3', 249], ['Pack of 5', 379]))],
  ['Generic', 'Statement Earrings', 'accessories', 'earrings', '💎', 'Ek pair, poora outfit carry.', colors(['Royal Blue', 'Emerald', 'Blush Pink'], 199)],
  ['Generic', 'Pearl Charm Necklace', 'accessories', 'pearls', '📿', 'Old money aesthetic, sasta price.', V(['Single Strand', 249], ['Layered', 349])],
  ['Generic', 'Scrunchie Set Velvet', 'accessories', 'nails', '🎀', 'Wrist pe bhi, baalon mein bhi.', V(['Pack of 6', 149], ['Pack of 12', 249])],
  ['Generic', 'Minimal Analog Watch', 'accessories', 'watch', '⌚', 'Phone nikale bina time. Retro much?', colors(['Tan Strap', 'Black Strap', 'Mesh Silver'], 499)],

  // ——— STATIONERY ———
  ['CopyKitaab', 'Spiral Notebook', 'stationery', 'books', '📓', 'Naye notebook wali feeling > sab kuch.', combo(['Single Line', 'Unruled'], V(['180 pages', 45], ['300 pages', 72], ['Pack of 6', 240]))],
  ['PencilPeti', 'Pencil Kit Box', 'stationery', 'pens', '✏️', 'School wali nostalgia, adult budget.', V(['Groove Kit', 99], ['Mega Gift Kit', 199])],
  ['InkInc', 'V5 Hi-Tecpoint Pen', 'stationery', 'pens', '🖊️', 'Likhawat sudhar nahi sakta, feel de sakta hai.', combo(['Blue', 'Black'], V(['1 pc', 65], ['Pack of 3', 180]))],
  ['RangRez', 'Connector Pens', 'stationery', 'pens', '🖍️', 'Adulting break le lo, colour karo.', V(['15 Shades', 120], ['25 Shades', 199], ['50 Shades', 375])],
  ['GeoBox', 'Geometry Box', 'stationery', 'deskDark', '📐', 'Compass se circle, memories se dard.', V(['Classic', 130], ['Exam Special', 180])],
  ['Generic', 'Sticky Notes Combo', 'stationery', 'confetti', '🗒️', 'Yaad rakhne ka jugaad, colourful edition.', V(['400 sheets', 149], ['800 sheets + Flags', 249])],
  ['Generic', 'Aesthetic Highlighters', 'stationery', 'nails', '🖍️', 'Notes jo Insta-worthy lagein.', V(['Pastel Set of 6', 199], ['Neon Set of 6', 179])],
  ['Generic', 'Daily Planner A5', 'stationery', 'books', '📅', 'Life sort karne ka pehla (aur aakhri) step.', combo(['Sage Green', 'Dusty Pink', 'Charcoal'], V(['Undated', 349]))],
  ['JodTod', '1-Second Instant Glue', 'stationery', 'saleTags', '🔧', 'Todo nahi, jodo. 1 second mein.', V(['3 pc', 30], ['10 pc Value', 90])],

  // ——— QUIRKY ———
  ['ThodaSa', 'Mystery Gift Box', 'quirky', 'giftBox', '🎁', 'Kya niklega? Wahi toh maza hai.', V(['Mini ₹149', 149], ['Classic ₹299', 299], ['Grand ₹499', 499]), true],
  ['Generic', 'Samosa Squishy Toy', 'quirky', 'samosa', '🥟', 'Squeeze karo, tension release karo. Zero calories.', V(['Single', 129], ['Chai-Samosa Combo', 229]), true],
  ['Generic', 'Desi Meme Stickers', 'quirky', 'keyboard', '😂', 'Laptop ko meme museum banao.', combo(['Bollywood Pack', 'Dev Jokes Pack', 'Hinglish Pack'], V(['50 pc', 119], ['100 pc', 199]))],
  ['Generic', 'Googly Eyes Mega Pack', 'quirky', 'confetti', '👀', 'Sab pe chipkao. SAB PE.', V(['100 pc', 99], ['500 pc Chaos Pack', 299])],
  ['Generic', 'Mini Claw Machine', 'quirky', 'arcade', '🕹️', 'Arcade at your desk. Productivity RIP.', V(['Classic', 349], ['With Toys Refill', 449])],
  ['Generic', 'Desk Bobblehead', 'quirky', 'cactus', '🌵', 'Haan bolne wala colleague. Finally.', combo(['Cactus', 'Pug', 'Astronaut'], V(['Standard', 179]))],
  ['Generic', 'Mini Designer Chair Décor', 'quirky', 'stool', '🪑', 'Famous chair, chhota size, full class.', V(['Single', 199], ['Set of 3', 499])],
  ['TaashParty', 'Dosti-Todo Card Game', 'quirky', 'saleTags', '🃏', 'Dosti todne ka official license.', V(['Classic', 199], ['UNO Flip', 249])],
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
  ['RangRani', 'Matte Luxe Lipstick', 'beauty', 'lipstick', '💄', 'Shade range itni ki decide karna impossible.', SHADES_LIP.map((s) => [s, 299])],
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
  ['SoupNation', 'Cup Soup Sachets', 'snacks', 'bowl', '🍲', '4 baje wali bhookh ka one-click answer.', combo(SOUP_FLAVORS, V(['1 Cup', 35], ['Pack of 4', 129]))],
  ['NachoNation', 'Nacho Crisps', 'snacks', 'fries', '🌮', 'Crunch jo poore room ko sunai de.', combo(['Cheese & Herbs', 'Sizzlin Jalapeno', 'Tikka Masala', 'Sea Salt'], V(['60g', 35], ['150g', 90]))],
  ['BakedYaar', 'Baked Chips', 'snacks', 'bakedBags', '🍟', 'Guilt-free karke khud ko convince karo.', combo(['Chilli Achaari', 'Noodle Masala', 'Dahi Papdi', 'Peri Peri'], V(['45g', 20], ['90g', 40]))],
  ['Noodly', 'Dark Fantasy Choco Fills', 'snacks', 'dessert', '🍫', 'Andar se surprise. Har baar.', combo(['Choco Fills', 'Choco Nut', 'Coffee Fills'], V(['75g', 40], ['300g', 140]))],
  ['Doodhwala', 'Chocolate Minis', 'snacks', 'cake', '🍫', 'Desi chocolate, videshi feels.', combo(['Fruit & Nut', 'Almond', 'Dark 55%', 'Mystic Mocha', 'Orange Twist'], V(['40g', 50], ['150g', 160]))],
  ['Generic', 'Gaming Mousepad XL', 'gadgets', 'deskDark', '🖱️', 'Desk setup 10x better in 1 step.', MOUSEPADS.map((m) => [m, 299])],
  ['Generic', 'Laptop Sleeve', 'gadgets', 'keyboard', '💻', 'Laptop ko bhi winter jacket chahiye.', combo(['Grey Felt', 'Black Neoprene', 'Olive Canvas'], V(['13 inch', 349], ['14 inch', 399], ['15.6 inch', 449]))],
  ['Generic', 'Ceramic Planter Pastel', 'home', 'plant', '🪴', 'Plants deserve designer ghar.', combo(['Blush', 'Sage', 'Cream', 'Sky', 'Terracotta'], V(['4 inch', 199], ['6 inch', 299]))],
  ['Generic', 'Coaster Set Quirky', 'kitchen', 'tableMug', '🥤', 'Table bachao, style badhao.', combo(['Bollywood Dialogues', 'Truck Art', 'Marble', 'Wooden Round', 'Retro Ads', 'Doodle Chai', 'Neon Quotes', 'Mandala'], V(['Set of 4', 199], ['Set of 6', 279]))],
  ['Generic', 'Socks Drop 2 — Prints', 'accessories', 'sneaker', '🧦', 'Ankle pe attitude.', combo(['Momos', 'Chai Time', 'Cricket', 'Cats', 'Pizza', 'Rangoli', 'Gaming', 'Autorickshaw'], V(['Pack of 2', 199], ['Pack of 4', 349]))],
  ['Generic', 'Tempered Glass Guard', 'gadgets', 'phoneDesk', '🪟', 'Screen crack hone se pehle wala akal.', combo(PHONE_MODELS, V(['1 pc', 149], ['Pack of 2', 249]))],
  ['SoundLoot', 'FlexBeat Neckband', 'gadgets', 'headphones', '🎶', 'Gym se metro tak, wire ka tension zero.', colors(['Active Black', 'Ocean Blue', 'Raging Red', 'Moon White'], 499)],
  ['GreenLeaf', 'Green Tea Bags', 'snacks', 'lemon', '🍋', 'Detox ka natak hi sahi, tasty hai.', combo(['Lemon Honey', 'Mint', 'Ginger', 'Tulsi', 'Jasmine', 'Classic', 'Cinnamon', 'Aloe Vera'], V(['10 Bags', 90], ['25 Bags', 199]))],
  ['NutsForYou', 'Trail Mix Pouch', 'snacks', 'berries', '🥜', 'Healthy snacking (jab tak pack khatam na ho).', combo(['Nutty Berry', 'Seeds Mix', 'Choco Nut', 'Cranberry'], V(['100g', 149], ['200g', 249]))],
  ['Generic', 'Photo Clip String Lights', 'home', 'fairy', '📸', 'Yaadein bhi, mood lighting bhi.', combo(['Warm Glow', 'Multicolour'], V(['20 Clips', 249], ['40 Clips', 399]))],
  ['Generic', 'LED Diya Pack', 'home', 'candle', '🪔', 'Diwali vibes, zero wax mess.', V(['Pack of 6', 199], ['Pack of 12', 349], ['Pack of 24', 499])],
  ['Generic', 'Metal Bookmark', 'stationery', 'books', '🔖', 'Page mod ke rakhne walon se durr raho.', ['Feather Gold', 'Peacock', 'Ganesha', 'Minimal Line', 'Cat Tail', 'Warli Art', 'Om', 'Lotus'].map((d) => [d, 99])],
)

// ——— LUXE EXPANSION: real brands, configs/colours/sizes (concept demo) ———
const CAR_COLORS = ['Alpine White', 'Jet Black', 'Storm Grey', 'Racing Red', 'Ocean Blue']
const CAR_TRIMS = ['Standard', 'Sport', 'Signature']
const car = (trims, cols, price) => combo(trims, cols.map((c) => [c, price]))
const BIKE_COLORS = ['Racing Red', 'Matte Black', 'Pearl White', 'Neon']
const BAG_COLORS = ['Noir', 'Beige', 'Bordeaux', 'Powder Blue', 'Emerald', 'Monogram']
const SHOE_SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
const SNEAKER_COLORS = ['OG Red', 'Triple Black', 'Panda', 'Royal Blue', 'Cream']
const CLOTHE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const shoeVariants = (cols, price) => combo(cols, SHOE_SIZES.map((s) => [s, price]))

TEMPLATES.push(
  // ——— CARS ———
  ['BMW', '3 Series Sedan', 'cars', 'carBmw', '🚗', 'Ultimate driving machine. EMI pe le lo, dil khush.', car(CAR_TRIMS, CAR_COLORS, 5500000), true],
  ['BMW', 'M4 Competition', 'cars', 'carBlue', '🏎️', 'Twin-turbo, 510 hp. Neighbours jealous guaranteed.', car(['Coupe', 'Convertible', 'CS'], CAR_COLORS, 14500000)],
  ['BMW', 'X5 xDrive', 'cars', 'carRoad', '🚙', 'Big SUV energy. Sunday drives sorted.', car(CAR_TRIMS, CAR_COLORS, 9800000)],
  ['BMW', 'i7 Electric', 'cars', 'carSedanBlack', '⚡', 'Silent flex. 600km range, zero petrol pump drama.', car(['eDrive50', 'M70'], CAR_COLORS, 20500000)],
  ['Mercedes-Benz', 'C-Class', 'cars', 'carSedanBlack', '🚗', 'Baby S-Class. Sasta nahi, par worth it.', car(CAR_TRIMS, CAR_COLORS, 6200000)],
  ['Mercedes-Benz', 'S-Class', 'cars', 'carBmw', '🚘', 'Boss ki car. Peeche baith ke aao.', car(['350d', '450 4MATIC', 'Maybach'], CAR_COLORS, 17500000)],
  ['Mercedes-AMG', 'GT Coupe', 'cars', 'carAmg', '🏎️', 'Roar first, arrive later.', car(['GT', 'GT S', 'GT R'], CAR_COLORS, 26000000)],
  ['Audi', 'A6 Sedan', 'cars', 'carSedanBlack', '🚗', 'Quattro grip, quiet class.', car(CAR_TRIMS, CAR_COLORS, 6800000)],
  ['Audi', 'Q7 SUV', 'cars', 'carRoad', '🚙', 'Seven seats of understated flex.', car(CAR_TRIMS, CAR_COLORS, 9200000)],
  ['Audi', 'R8 V10', 'cars', 'carRed', '🏎️', 'Supercar without the tantrums.', car(['Coupe', 'Spyder'], CAR_COLORS, 30000000)],
  ['Porsche', '911 Carrera', 'cars', 'carRed', '🏎️', 'The one poster car that grew up with you.', car(['Carrera', 'Carrera S', 'Turbo S'], CAR_COLORS, 21000000), true],
  ['Porsche', 'Cayenne', 'cars', 'carRoad', '🚙', 'SUV that thinks it is a sports car.', car(CAR_TRIMS, CAR_COLORS, 14500000)],
  ['Porsche', 'Taycan', 'cars', 'carBlue', '⚡', 'Electric, but make it Porsche.', car(['4S', 'Turbo', 'Turbo S'], CAR_COLORS, 17000000)],
  ['Lamborghini', 'Huracán', 'cars', 'carRed', '🏎️', 'Subtlety left the chat.', car(['EVO', 'STO', 'Tecnica'], CAR_COLORS, 42000000)],
  ['Lamborghini', 'Urus', 'cars', 'carMustang', '🚙', 'School drop-off, but make it 650hp.', car(['S', 'Performante'], CAR_COLORS, 44000000)],
  ['Ferrari', 'Roma', 'cars', 'carRed', '🏎️', 'La dolce vita on four wheels.', car(['Coupe', 'Spider'], CAR_COLORS, 39000000)],
  ['Rolls-Royce', 'Ghost', 'cars', 'carSedanBlack', '🚘', 'Arrive like you own the building.', car(['Standard', 'Black Badge'], CAR_COLORS, 75000000)],
  ['Bugatti', 'Chiron', 'cars', 'carBugatti', '🏁', '1500 hp. Full ₹499 range, bas thodi upar. Le lo, sasta hai (nahi hai).', car(['Sport', 'Super Sport'], CAR_COLORS, 190000000), true],
  ['Tata', 'Nexon', 'cars', 'carRoad', '🚙', 'Desi, safe, 5-star. Paisa vasool.', car(['Smart', 'Creative', 'Fearless'], CAR_COLORS, 900000)],
  ['Tata', 'Harrier', 'cars', 'carRoad', '🚙', 'Bada SUV, chhota budget (relatively).', car(CAR_TRIMS, CAR_COLORS, 1600000)],
  ['Mahindra', 'Thar', 'cars', 'carMustang', '🚙', 'Off-road ka OG. Instagram reels ready.', car(['AX', 'LX', 'RWD'], CAR_COLORS, 1100000), true],
  ['Mahindra', 'XUV700', 'cars', 'carRoad', '🚙', 'ADAS wali gaadi. Future aa gaya.', car(['MX', 'AX7', 'AX7 L'], CAR_COLORS, 1500000)],
  ['Maruti Suzuki', 'Swift', 'cars', 'carBlue', '🚗', 'India ki favourite. Mileage king.', car(['LXi', 'VXi', 'ZXi+'], CAR_COLORS, 700000)],

  // ——— SPORT BIKES ———
  ['Ducati', 'Panigale V4', 'bikes', 'bikeDucati', '🏍️', 'Italian scream on two wheels.', colors(BIKE_COLORS, 2700000), true],
  ['Ducati', 'Monster', 'bikes', 'bikeNaked', '🏍️', 'Naked, loud, unapologetic.', colors(BIKE_COLORS, 1300000)],
  ['Kawasaki', 'Ninja ZX-10R', 'bikes', 'bikeDucati', '🏍️', 'Track weapon, road legal (mostly).', colors(BIKE_COLORS, 1600000)],
  ['Kawasaki', 'Z900', 'bikes', 'bikeNaked', '🏍️', 'Inline-four symphony.', colors(BIKE_COLORS, 950000)],
  ['Yamaha', 'YZF-R1', 'bikes', 'bikeDucati', '🏍️', 'MotoGP DNA for the street.', colors(BIKE_COLORS, 2100000)],
  ['Yamaha', 'MT-15', 'bikes', 'bikeNaked', '🏍️', 'Dark side of Japan, budget edition.', colors(BIKE_COLORS, 170000)],
  ['KTM', 'Duke 390', 'bikes', 'bikeKtm', '🏍️', 'Ready to race, ready to wheelie (mat karo).', colors(BIKE_COLORS, 310000), true],
  ['KTM', 'RC 390', 'bikes', 'bikeKtm', '🏍️', 'Full-faired fun machine.', colors(BIKE_COLORS, 320000)],
  ['Royal Enfield', 'Classic 350', 'bikes', 'bikeCafe', '🏍️', 'Thump thump. Highway ka raja.', colors(['Halcyon Black', 'Chrome Red', 'Dark Stealth', 'Signals'], 200000), true],
  ['Royal Enfield', 'Continental GT 650', 'bikes', 'bikeCafe', '🏍️', 'Cafe racer sapna, affordable.', colors(['British Racing Green', 'Rocker Red', 'Apex Grey'], 320000)],
  ['BMW Motorrad', 'S 1000 RR', 'bikes', 'bikeDucati', '🏍️', 'German precision, 205 hp.', colors(BIKE_COLORS, 2100000)],
  ['Harley-Davidson', 'Iron 883', 'bikes', 'bikeCafe', '🏍️', 'Rebel without a silencer.', colors(['Vivid Black', 'Midnight Blue'], 950000)],
  ['Bajaj', 'Pulsar NS200', 'bikes', 'bikeNaked', '🏍️', 'College ka legend. Definitely male.', colors(['Pewter Grey', 'Metallic Red', 'Fiery Orange'], 150000)],

  // ——— SHOES ———
  ['Nike', 'Air Jordan 1 High', 'shoes', 'shoeJordan', '👟', 'The pair that started the culture.', shoeVariants(['Chicago', 'Bred', 'Royal', 'Shadow'], 16000), true],
  ['Nike', 'Air Force 1', 'shoes', 'shoeTan', '👟', 'Never out of style. Ever.', shoeVariants(['Triple White', 'Wheat Tan', 'Black'], 8500)],
  ['Nike', 'Air Max 90', 'shoes', 'shoeYellow', '👟', 'Visible air, visible drip.', shoeVariants(['Infrared', 'Yellow Ochre', 'Triple White'], 11000)],
  ['Nike', 'Dunk Low', 'shoes', 'shoeJordan', '👟', 'Panda everywhere for a reason.', shoeVariants(['Panda', 'UNC', 'Grey Fog'], 9000)],
  ['Adidas', 'Ultraboost', 'shoes', 'shoeNeon', '👟', 'Running feels illegal in these.', shoeVariants(['Core Black', 'Cloud White', 'Solar Red'], 12000)],
  ['Adidas', 'Samba OG', 'shoes', 'shoeTan', '👟', 'The it-shoe that refuses to leave.', shoeVariants(['Black/White', 'Gum', 'Cream'], 9000), true],
  ['Adidas', 'Yeezy Boost 350', 'shoes', 'shoeNeon', '👟', 'Ye ka drama, comfort ka aaram.', shoeVariants(['Zebra', 'Beluga', 'Onyx'], 24000)],
  ['New Balance', '550', 'shoes', 'shoeJordan', '👟', 'Dad shoe, gen-Z approved.', shoeVariants(['White/Green', 'White/Grey', 'Navy'], 13000)],
  ['Puma', 'Suede Classic', 'shoes', 'shoeTan', '👟', 'Old-school cool, forever.', shoeVariants(['Red', 'Black', 'Blue'], 6000)],
  ['Converse', 'Chuck 70 High', 'shoes', 'shoeNeon', '👟', 'Canvas classic. Goes with everything.', shoeVariants(['Black', 'Parchment', 'Egret'], 6500)],
  ['Crocs', 'Classic Clog', 'shoes', 'shoeYellow', '🩴', 'Ugly? Yes. Comfortable? Blasphemously.', colors(['Black', 'Navy', 'Lavender', 'Army Green'], 4000)],
  ['Birkenstock', 'Arizona Sandals', 'shoes', 'shoeTan', '🩴', 'Cork therapy for your feet.', shoeVariants(['Taupe', 'Black', 'Mocha'], 7500)],

  // ——— FASHION / CLOTHES ———
  ['Zara', 'Oversized Blazer', 'fashion', 'suit', '🧥', 'Effortless boss energy.', combo(['Beige', 'Black', 'Pinstripe'], CLOTHE_SIZES.map((z) => [z, 4990]))],
  ['Zara', 'Slim Fit Shirt', 'fashion', 'menswearFlat', '👔', 'Office se date tak, ek shirt.', combo(['White', 'Sky Blue', 'Black'], CLOTHE_SIZES.map((z) => [z, 2590]))],
  ['H&M', 'Cotton Hoodie', 'fashion', 'womensJacket', '🧥', 'Cozy season, sorted.', combo(['Grey Melange', 'Black', 'Sage', 'Cream'], CLOTHE_SIZES.map((z) => [z, 1999]))],
  ['Uniqlo', 'AIRism Tee', 'fashion', 'tee', '👕', 'Summer ka lifesaver. Sweat-proof flex.', combo(['White', 'Navy', 'Olive', 'Black'], CLOTHE_SIZES.map((z) => [z, 990]))],
  ['Levi\'s', '511 Slim Jeans', 'fashion', 'wardrobe', '👖', 'The denim that just fits.', combo(['Dark Indigo', 'Stonewash', 'Black'], ['30', '32', '34', '36', '38'].map((z) => [z + '"', 3999]))],
  ['Raymond', '3-Piece Suit', 'fashion', 'suit', '🤵', 'Shaadi season ka hero.', combo(['Navy', 'Charcoal', 'Midnight Blue'], CLOTHE_SIZES.map((z) => [z, 14999])), true],
  ['Gucci', 'GG Hoodie', 'fashion', 'womensJacket', '🧥', 'Logo bada, statement bada.', combo(['Black', 'Beige'], CLOTHE_SIZES.map((z) => [z, 89000]))],
  ['Versace', 'Baroque Shirt', 'fashion', 'menswearFlat', '👔', 'Loud, gold, glorious.', combo(['Gold Print', 'Black Print'], CLOTHE_SIZES.map((z) => [z, 72000]))],
  ['Balenciaga', 'Oversized Tee', 'fashion', 'tee', '👕', '₹60k for a t-shirt. Aesthetic > logic.', combo(['Washed Black', 'White'], CLOTHE_SIZES.map((z) => [z, 58000]))],
  ['FabIndia', 'Cotton Kurta', 'fashion', 'wardrobe', '👗', 'Festive ready, breathable comfy.', combo(['Ivory', 'Indigo', 'Maroon', 'Sage'], CLOTHE_SIZES.map((z) => [z, 2499]))],

  // ——— WATCHES ———
  ['Rolex', 'Submariner', 'watches', 'watchDive', '⌚', 'Dive watch you will never dive with.', colors(['Black Dial', 'Green (Hulk)', 'Blue (Smurf)'], 1250000), true],
  ['Rolex', 'Datejust 41', 'watches', 'watchDark', '⌚', 'Boardroom ka classic.', colors(['Silver', 'Blue', 'Wimbledon'], 950000)],
  ['Omega', 'Speedmaster', 'watches', 'watchDark', '⌚', 'The moonwatch. Literally been to space.', colors(['Black Dial', 'Silver'], 720000)],
  ['Omega', 'Seamaster', 'watches', 'watchDive', '⌚', 'Bond ki ghadi.', colors(['Blue Wave', 'Black', 'Green'], 650000)],
  ['TAG Heuer', 'Carrera', 'watches', 'watchDark', '⌚', 'Motorsport on your wrist.', colors(['Black', 'Blue', 'Panda'], 380000)],
  ['Tissot', 'PRX Powermatic', 'watches', 'watchMinimal', '⌚', 'Integrated bracelet, entry-lux flex.', colors(['Ice Blue', 'Green', 'Black'], 75000), true],
  ['Apple', 'Watch Ultra 2', 'watches', 'watchSmart', '⌚', 'Trek, dive, text. Titanium beast.', colors(['Natural Titanium', 'Black Titanium'], 89900)],
  ['Apple', 'Watch Series 10', 'watches', 'watchSmart', '⌚', 'Wrist pe poora ecosystem.', combo(['41mm', '46mm'], colors(['Midnight', 'Silver', 'Rose Gold'], 46900).map((c) => c))],
  ['Casio', 'G-Shock', 'watches', 'watchDark', '⌚', 'Drop it, drown it, it survives.', colors(['All Black', 'Military Green', 'Retro White'], 12000)],
  ['Titan', 'Edge Slim', 'watches', 'watchMinimal', '⌚', 'India ka apna, elegantly thin.', colors(['Rose Gold', 'Silver', 'Black'], 15000)],

  // ——— LUXE BAGS ———
  ['Louis Vuitton', 'Neverfull MM', 'luxe', 'bagTeal', '👜', 'The tote that started an obsession.', colors(BAG_COLORS, 220000), true],
  ['Louis Vuitton', 'Speedy 25', 'luxe', 'bagRed', '👜', 'Audrey approved since forever.', colors(BAG_COLORS, 185000)],
  ['Dior', 'Lady Dior', 'luxe', 'bagRed', '👜', 'Princess Diana ki choice.', colors(BAG_COLORS, 550000), true],
  ['Dior', 'Saddle Bag', 'luxe', 'bagTeal', '👜', 'Y2K icon, back with a vengeance.', colors(BAG_COLORS, 380000)],
  ['Gucci', 'GG Marmont', 'luxe', 'bagRed', '👜', 'That double-G clasp. Chef\'s kiss.', colors(BAG_COLORS, 280000)],
  ['Chanel', 'Classic Flap', 'luxe', 'bagTeal', '👜', 'Investment piece, not a purchase.', colors(['Black Caviar', 'Beige', 'Bordeaux'], 1050000)],
  ['Hermès', 'Birkin 30', 'luxe', 'bagTeal', '👜', 'Waitlist se bhi mushkil. The holy grail.', colors(['Noir', 'Étoupe', 'Gold', 'Rouge'], 2500000)],
  ['Prada', 'Galleria Saffiano', 'luxe', 'bagRed', '👜', 'Structured, sharp, forever chic.', colors(BAG_COLORS, 320000)],

  // ——— ART ———
  ['Studio Editions', 'Abstract Canvas', 'art', 'artAbstract1', '🎨', 'Statement wall, instant sophistication.', combo(['Sunset Chaos', 'Ocean Depths'], V(['A2 Framed', 8500], ['A1 Canvas', 18000], ['XL Gallery', 45000]))],
  ['Studio Editions', 'Modern Abstract II', 'art', 'artAbstract2', '🖼️', 'The piece guests will ask about.', combo(['Cityscape Red', 'Blue Hour'], V(['A2 Framed', 8500], ['A1 Canvas', 18000]))],
  ['Heritage Prints', 'Classical Reproduction', 'art', 'artClassical', '🖼️', 'Old-master drama for your hallway.', combo(['Renaissance', 'Baroque'], V(['Framed A2', 12000], ['Museum Canvas', 55000]))],
  ['Heritage Prints', 'Landscape Oil', 'art', 'artLandscape', '🏔️', 'A window to somewhere calmer.', combo(['Highlands', 'Misty Coast'], V(['A2 Framed', 9500], ['A1 Canvas', 22000]))],
  ['Atelier Original', 'Signed Original', 'art', 'artAbstract1', '🎨', 'One of one. Certificate included.', V(['Small Original', 85000], ['Large Original', 350000], ['Commission', 500000])],

  // ——— BOOKS ———
)

// Books: 40+ real titles × formats → 120+ SKUs, the easy way to 100s of items
const cover = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`
const BOOK_TITLES = [
  ['Atomic Habits', 'James Clear', 'self-help ka GOAT. 1% better daily.', '9780735211292'],
  ['Ikigai', 'García & Miralles', 'Japanese secret to a long happy life.', '9781786330895'],
  ['The Psychology of Money', 'Morgan Housel', 'Paisa samajhne ki philosophy.', '9780857197689'],
  ['Rich Dad Poor Dad', 'Robert Kiyosaki', 'Finance 101 for the rest of us.', '9781612680194'],
  ['The Alchemist', 'Paulo Coelho', 'Chase your Personal Legend.', '9780061122415'],
  ['Sapiens', 'Yuval Noah Harari', 'How we accidentally ran the planet.', '9780062316097'],
  ['Wings of Fire', 'A.P.J. Abdul Kalam', 'Missile Man ki apni kahani.', '9788173711466'],
  ['Milk and Honey', 'Rupi Kaur', 'Poetry that hits different at 2am.', '9781449474256'],
  ['The God of Small Things', 'Arundhati Roy', 'Booker-winning Kerala saga.', '9780679457312'],
  ['A Suitable Boy', 'Vikram Seth', '1300 pages, worth every one.', '9780060786526'],
  ['Train to Pakistan', 'Khushwant Singh', 'Partition, unflinching.', '9780802132215'],
  ['The White Tiger', 'Aravind Adiga', 'Booker winner, savage and sharp.', '9781416562603'],
  ['Shoe Dog', 'Phil Knight', 'How Nike almost never happened.', '9781501135910'],
  ['Zero to One', 'Peter Thiel', 'Startup contrarianism.', '9780804139298'],
  ['Deep Work', 'Cal Newport', 'Focus is the new superpower.', '9781455586691'],
  ['Thinking, Fast and Slow', 'Daniel Kahneman', 'Your brain two systems.', '9780374533557'],
  ['The Subtle Art of Not Giving a F*ck', 'Mark Manson', 'Counterintuitive self-help.', '9780062457714'],
  ['1984', 'George Orwell', 'Big Brother is still watching.', '9780451524935'],
  ['To Kill a Mockingbird', 'Harper Lee', 'The classic that stays classic.', '9780061120084'],
  ['The Great Gatsby', 'F. Scott Fitzgerald', 'Green light, old sport.', '9780743273565'],
  ['Harry Potter Box Set', 'J.K. Rowling', 'All 7. Childhood in a box.', '9781408856772'],
  ['The Hobbit', 'J.R.R. Tolkien', 'There and back again.', '9780547928227'],
  ['Dune', 'Frank Herbert', 'The spice must flow.', '9780441172719'],
  ['The Silent Patient', 'Alex Michaelides', 'Thriller you finish in one sit.', '9781250301697'],
  ['Gone Girl', 'Gillian Flynn', 'Trust no one.', '9780307588371'],
  ['It Ends with Us', 'Colleen Hoover', 'BookTok made this everywhere.', '9781501110368'],
  ['The Midnight Library', 'Matt Haig', 'Every life you could have lived.', '9780525559474'],
  ['Educated', 'Tara Westover', 'Memoir that floors you.', '9780399590504'],
  ['The Power of Now', 'Eckhart Tolle', 'Presence, packaged.', '9781577314806'],
  ['Can\'t Hurt Me', 'David Goggins', 'Stay hard.', '9781544512280'],
  ['The 5 AM Club', 'Robin Sharma', 'Own your morning.', '9781443456623'],
  ['Verity', 'Colleen Hoover', 'The twist. Oh, the twist.', '9781538724736'],
  ['A Thousand Splendid Suns', 'Khaled Hosseini', 'Will wreck you (lovingly).', '9781594489501'],
  ['The Kite Runner', 'Khaled Hosseini', 'For you, a thousand times over.', '9781594631931'],
  ['Norwegian Wood', 'Haruki Murakami', 'Melancholy, beautifully.', '9780375704024'],
  ['The Book Thief', 'Markus Zusak', 'Narrated by Death himself.', '9780375842207'],
  ['Becoming', 'Michelle Obama', 'Memoir with backbone.', '9781524763138'],
  ['The Palace of Illusions', 'Chitra Divakaruni', 'Mahabharata, Draupadi voice.', '9780330458535'],
  ['The Immortals of Meluha', 'Amish Tripathi', 'Shiva trilogy ka start.', '9789380658742'],
]
for (const [title, author, desc, isbn] of BOOK_TITLES) {
  TEMPLATES.push(['Generic', title, 'books', cover(isbn), '📚', `by ${author} · ${desc}`, V(['Paperback', 299 + ((title.length * 7) % 200)], ['Hardcover', 599 + ((title.length * 11) % 300)], ['E-book', 149])])
}

// ——— BIG EXPANSION: realty, decor, women's wear, electronics, footwear, etc ———
const WOMEN_SIZES = ['XS', 'S', 'M', 'L', 'XL']
const wsz = (cols, price) => combo(cols, WOMEN_SIZES.map((z) => [z, price]))
const DECOR_COL = ['Beige', 'Charcoal', 'Sage', 'Rust', 'Ivory', 'Navy']
TEMPLATES.push(
  // BMW M5 (as asked) + a couple more cars
  ['BMW', 'M5 Competition', 'cars', 'carBlue', '🏎️', 'V8 twin-turbo sedan sleeper. 617 hp of grey-suited menace.', car(['Standard', 'Competition'], ['Frozen Grey', 'Alpine White', 'Jet Black', 'Marina Blue', 'Isle of Man Green'], 16500000), true],
  ['Mercedes-Benz', 'G-Wagon G63', 'cars', 'carMustang', '🚙', 'Box on wheels, king of the valet line.', car(['G63', 'G63 AMG'], CAR_COLORS, 35000000)],
  ['Toyota', 'Fortuner', 'cars', 'carRoad', '🚙', 'Highway ka dabang. Resale value ka baap.', car(['4x2', '4x4', 'Legender'], CAR_COLORS, 3500000)],

  // ——— REAL ESTATE ———
  ['Palm Estates', 'Private Island — Dubai', 'realty', 'villa', '🏝️', 'Your own island off Dubai. Neighbours: dolphins.', V(['1 Acre', 850000000], ['3 Acre + Villa', 1900000000]), true],
  ['Palm Estates', 'Palm Jumeirah Villa', 'realty', 'modernHouse', '🏖️', 'Beachfront, infinity pool, Burj view.', V(['5 BHK', 420000000], ['7 BHK Signature', 680000000])],
  ['Emaar', 'Burj Khalifa Penthouse', 'realty', 'glassHouse', '🏙️', 'Live in the clouds. Literally floor 150+.', V(['3 BHK', 550000000], ['Sky Penthouse', 1200000000])],
  ['Lodha', 'Worli Sea-Facing Flat', 'realty', 'apartment', '🌊', 'Mumbai skyline + Arabian Sea from your sofa.', V(['3 BHK', 120000000], ['4 BHK Duplex', 250000000]), true],
  ['Godrej', 'Bandra 3BHK', 'realty', 'livingRoom', '🏢', 'Bandra address = instant status.', V(['2 BHK', 45000000], ['3 BHK', 75000000])],
  ['Isprava', 'Goa Beach Villa', 'realty', 'villa', '🌴', 'Portuguese charm, private pool, susegad life.', V(['3 BHK Villa', 65000000], ['5 BHK Estate', 140000000])],
  ['Isprava', 'Lonavala Farmhouse', 'realty', 'cottage', '🏡', 'Weekend escape, monsoon-ready.', V(['2 Acre', 55000000], ['5 Acre Estate', 120000000])],
  ['DLF', 'Gurgaon Sky Apartment', 'realty', 'livingMin', '🏙️', 'Golf-course view, NCR luxury.', V(['3 BHK', 38000000], ['4 BHK Penthouse', 90000000])],

  // ——— HOME DECOR (department) ———
  ['Generic', 'Arc Floor Lamp', 'home', 'decorCorner', '💡', 'Reading nook, instantly aesthetic.', colors(['Brass', 'Matte Black', 'Chrome'], 4999)],
  ['Generic', 'Table Lamp', 'home', 'lamp', '🛋️', 'Warm glow > harsh tubelight.', colors(DECOR_COL, 1999)],
  ['Urban Ladder', 'Accent Armchair', 'home', 'livingSofa', '🪑', 'The chair everyone fights for.', colors(['Mustard', 'Teal', 'Grey', 'Rust'], 18999)],
  ['Pepperfry', 'Coffee Table', 'home', 'livingWarm', '🪵', 'Centrepiece for chai + gossip.', colors(['Walnut', 'Oak', 'Marble Top'], 12999)],
  ['Generic', 'Sofa Cover Set', 'home', 'boho', '🛋️', 'Purani sofa, nayi jaan.', combo(['3-Seater', '5-Seater'], DECOR_COL.map((c) => [c, 1499]))],
  ['Chumbak', 'Ceramic Flower Vase', 'home', 'boho', '🏺', 'Fresh flowers optional, vibe mandatory.', colors(['Terracotta', 'Blue Pottery', 'White', 'Sage'], 899)],
  ['Generic', 'Decorative Wall Mirror', 'home', 'mirror', '🪞', 'Makes any room look 2x bigger.', colors(['Gold Round', 'Black Arch', 'Sunburst'], 3499)],
  ['Chumbak', 'Brass Showpiece', 'home', 'interior', '🕉️', 'Mandir shelf ya console table, dono.', colors(['Ganesha', 'Buddha', 'Nataraja', 'Peacock'], 1299)],
  ['Generic', 'Blackout Curtains', 'home', 'livingMin', '🪟', 'Sunday sleep-in, protected.', combo(['5ft', '7ft', '9ft'], DECOR_COL.map((c) => [c, 1799]))],
  ['Generic', 'Candle Holder Set', 'home', 'candle', '🕯️', 'Dinner date at home, sorted.', colors(['Brass', 'Glass', 'Ceramic Trio'], 999)],
  ['Generic', 'Photo Frame Set', 'home', 'interior', '🖼️', 'Memories, wall-mounted.', V(['Set of 6', 799], ['Collage 10-pc', 1299])],
  ['Jaipur Rugs', 'Handwoven Area Rug', 'home', 'livingWarm', '🧶', 'Feet ke liye luxury.', combo(['4x6', '5x8', '6x9'], DECOR_COL.map((c) => [c, 5999]))],
  ['Generic', 'Wall Clock', 'home', 'interior', '🕐', 'Time, but make it decor.', colors(['Vintage Roman', 'Minimal White', 'Wooden', 'Gold Metal'], 1499)],
  ['Generic', 'Peel & Stick Wallpaper', 'home', 'boho', '🎴', 'Renter-friendly makeover.', colors(['Botanical', 'Boho Arch', 'Marble', 'Terrazzo'], 2499)],
  ['Generic', 'Framed Wall Art (Set of 3)', 'home', 'artAbstract1', '🖼️', 'Gallery wall in one click.', colors(['Abstract', 'Botanical', 'Line Art', 'Boho'], 1999)],
  ['Generic', 'Resin Sculpture', 'home', 'interior', '🗿', 'Coffee-table conversation starter.', colors(['Abstract Face', 'Hands', 'Torso'], 2999)],
  ['Wakefit', 'Upholstered Bed', 'home', 'bedroom', '🛏️', 'Neend puri, back happy.', combo(['Queen', 'King'], colors(['Grey', 'Beige', 'Charcoal'], 24999).map((c) => c))],
  ['Generic', 'Bedsheet Set (Cotton)', 'home', 'bedroom', '🛌', 'Soft, breathable, 300 TC.', combo(['Double', 'King'], ['Sage Floral', 'Indigo Block', 'White Minimal', 'Boho'].map((c) => [c, 1299]))],
  ['Nilkamal', 'Storage Cabinet', 'home', 'wardrobe', '🗄️', 'Clutter ka permanent solution.', colors(['White', 'Walnut', 'Grey'], 6999)],
  ['Generic', 'Cushion Cover (Set of 5)', 'home', 'boho', '🛋️', 'Sofa refresh under a grand.', colors(['Mustard Boho', 'Velvet Green', 'Ikat', 'Solid Pastel'], 799)],

  // ——— WOMEN'S WESTERN WEAR ———
  ['Urbanic', 'Midi Dress', 'fashion', 'womensJacket', '👗', 'Brunch-to-date, one dress.', wsz(['Floral', 'Sage', 'Black', 'Powder Blue'], 1799), true],
  ['SHEIN', 'Bodycon Dress', 'fashion', 'fashion', '👗', 'Night-out ready, snatched fit.', wsz(['Black', 'Red', 'Emerald', 'Chocolate'], 999)],
  ['Zara', 'Satin Slip Maxi', 'fashion', 'womensJacket', '👗', 'Effortless, elegant, viral.', wsz(['Champagne', 'Rust', 'Forest'], 3990)],
  ['ONLY', 'Utility Jumpsuit', 'fashion', 'fashion', '🧥', 'One-and-done outfit energy.', wsz(['Olive', 'Black', 'Beige'], 2799)],
  ['Vero Moda', 'Co-ord Set', 'fashion', 'wardrobe', '👚', 'Matchy-matchy, effortlessly cool.', wsz(['Lilac', 'White', 'Terracotta', 'Black'], 2499), true],
  ['H&M', 'Ribbed Crop Top', 'fashion', 'tee', '👚', 'High-waist ka best friend.', wsz(['White', 'Black', 'Sage', 'Lilac', 'Mocha'], 799)],
  ['H&M', 'Cotton Tank Top', 'fashion', 'tee', '🎽', 'Basics that never miss.', wsz(['White', 'Black', 'Grey', 'Olive'], 599)],
  ['Roadster', 'Denim Shorts', 'fashion', 'wardrobe', '🩳', 'Summer staple, chill fit.', wsz(['Light Wash', 'Dark Wash', 'Black'], 1299)],
  ['Levi\'s', 'High-Waist Mom Jeans', 'fashion', 'wardrobe', '👖', 'Retro fit, forever flattering.', combo(['Light', 'Mid', 'Dark', 'Black'], ['26', '28', '30', '32', '34'].map((z) => [z + '"', 2999]))],
  ['Zara', 'Wide-Leg Trousers', 'fashion', 'wardrobe', '👖', 'Office ho ya airport, slay.', wsz(['Beige', 'Black', 'Chocolate', 'Grey'], 2590)],
  ['Forever 21', 'Skater Skirt', 'fashion', 'fashion', '🩰', 'Twirl-worthy, y2k-coded.', wsz(['Black', 'Plaid', 'Denim'], 1199)],
  ['Urbanic', 'Oversized Shirt', 'fashion', 'menswearFlat', '👔', 'Boyfriend fit, girlfriend approved.', wsz(['White', 'Striped', 'Sage', 'Black'], 1499)],

  // ——— JEWELRY & ACCESSORIES ———
  ['Accessorize', 'Statement Rings (Set)', 'accessories', 'earrings', '💍', 'Stack karo, slay karo.', colors(['Gold', 'Silver', 'Rose Gold', 'Mixed'], 799)],
  ['Zaveri Pearls', 'Jhumka Earrings', 'accessories', 'earrings', '👂', 'Ethnic drama, everyday price.', colors(['Gold Kundan', 'Silver Oxidised', 'Pearl', 'Meenakari'], 599)],
  ['Pipa Bella', 'Charm Bracelet', 'accessories', 'pearls', '📿', 'Wrist candy that means something.', colors(['Gold', 'Silver', 'Rose Gold'], 1299)],
  ['Accessorize', 'Hoop Earrings', 'accessories', 'earrings', '⭕', 'Small, medium, chunky — pick your mood.', colors(['Gold', 'Silver', 'Textured'], 499)],

  // ——— MORE ELECTRONICS ———
  ['Apple', 'iPhone 16', 'gadgets', 'phoneYellow', '📱', 'Base model, still a flex.', combo(['Ultramarine', 'Pink', 'Teal', 'Black'], V(['128GB', 79900], ['256GB', 89900]))],
  ['Apple', 'iPad Pro M4', 'gadgets', 'phoneDesk', '📱', 'Laptop replacement (for reels).', combo(['Space Black', 'Silver'], V(['11" 256GB', 99900], ['13" 512GB', 149900]))],
  ['Dyson', 'Supersonic Hair Dryer', 'gadgets', 'headphones', '💨', 'Salon at home. Yes, worth it.', colors(['Fuchsia', 'Nickel', 'Blue Blush'], 45900), true],
  ['Dyson', 'V15 Cordless Vacuum', 'gadgets', 'speaker', '🧹', 'Dust ka dushman. Laser detects it all.', V(['V12', 52900], ['V15 Detect', 65900])],
  ['Philips', 'Air Fryer', 'gadgets', 'kitchen', '🍟', 'Guilt-free fries, ghar pe.', combo(['4.1L', '6.2L'], colors(['Black', 'White'], 8999).map((c) => c))],
  ['Preethi', 'Mixer Grinder', 'gadgets', 'kitchen', '🔌', 'Har Indian kitchen ka MVP.', V(['750W 3-Jar', 4499], ['1000W 4-Jar', 6499])],
  ['iRobot', 'Robot Vacuum', 'gadgets', 'arcade', '🤖', 'Ghar ki safai, auto-pilot.', V(['Roomba i3', 24900], ['Roomba j7+', 54900])],
  ['Apple', 'AirPods Pro 2', 'gadgets', 'earbuds', '🎧', 'ANC that mutes the whole local train.', colors(['White'], 24900), true],
  ['Sony', 'WH-1000XM5', 'gadgets', 'headphones', '🎧', 'Silence, engineered.', colors(['Black', 'Silver', 'Midnight Blue'], 29990)],
  ['JBL', 'Flip 6 Speaker', 'gadgets', 'speaker', '🔊', 'Party anywhere, waterproof.', colors(['Black', 'Blue', 'Red', 'Teal'], 9999)],

  // ——— FOOTWEAR (sandals, sliders, heels, slippers) ———
  ['Adidas', 'Adilette Sliders', 'shoes', 'shoeTan', '🩴', 'Hostel-to-airport uniform.', shoeVariants(['Black/White', 'Grey', 'Navy'], 2999)],
  ['Bata', 'Everyday Slippers', 'shoes', 'shoeFlat', '🩴', 'Ghar ka sabse loyal footwear.', shoeVariants(['Brown', 'Black', 'Tan'], 599)],
  ['Steve Madden', 'Block Heels', 'shoes', 'shoeTan', '👠', 'Height + comfort, rare combo.', shoeVariants(['Nude', 'Black', 'Red'], 6999)],
  ['Metro', 'Ethnic Kolhapuris', 'shoes', 'shoeFlat', '🩴', 'Desi, handcrafted, timeless.', shoeVariants(['Tan', 'Brown', 'Multicolour'], 1299)],
  ['Relaxo', 'Flip-Flops', 'shoes', 'shoeYellow', '🩴', 'Barsaat ka bestie.', colors(['Black', 'Blue', 'Grey', 'Red'], 299)],

  // ——— STATIONERY (art supplies) ———
  ['Faber-Castell', 'Coloring Book + Pencils', 'stationery', 'confetti', '🖍️', 'Adult stress-relief, colourful edition.', V(['Mandala Kit', 399], ['Deluxe 48-pc', 799])],
  ['Camel', 'Acrylic Paint Set', 'stationery', 'pens', '🎨', 'Inner artist, unlocked.', V(['12 Shades', 349], ['24 Shades', 599])],
  ['Generic', 'Canvas Board Pack', 'stationery', 'deskDark', '🖼️', 'Blank canvas, big dreams.', combo(['8x10', '12x16', 'A3'], V(['Pack of 3', 399], ['Pack of 6', 699]))],
  ['Sketchpro', 'Sketch Pens & Markers', 'stationery', 'pens', '🖊️', 'Doodle karo, dil khush.', V(['24 Markers', 449], ['48 Dual-Tip', 899])],

  // ——— COSMETICS / FACIAL KIT ———
  ['VLCC', 'Gold Facial Kit', 'beauty', 'skincareFlat', '💆', 'Parlour glow, ghar pe.', colors(['Gold', 'Diamond', 'Fruit', 'Charcoal'], 599)],
  ['Lakme', 'Complete Makeup Kit', 'beauty', 'makeupFlat', '💄', 'Full face in one box.', V(['Starter', 1499], ['Pro Bridal', 3999])],
  ['Mamaearth', 'Skincare Combo', 'beauty', 'serum', '🧴', 'Cleanse-tone-moisturise, sorted.', colors(['Vitamin C', 'Ubtan', 'Tea Tree'], 899)],
  ['Kay Beauty', 'Nail Art Kit', 'beauty', 'nails', '💅', 'Salon nails, DIY budget.', V(['Basic', 699], ['Pro 30-pc', 1299])],
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
    const slug = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + templateId
    let first = true
    for (const [label, price] of variants) {
      const h = hash(id)
      out.push({
        id, templateId, baseName, slug,
        variantLabel: label,
        variantCount: variants.length,
        name: `${baseName}${label ? ' — ' + label : ''}`,
        brand, category, emoji, desc,
        price,
        deal: h % 10 < 3,
        mrp: Math.round(price * (1.5 + (h % 5) / 10)),
        rating: Math.round((3.6 + ((h >> 3) % 13) / 10) * 10) / 10,
        reviews: Math.round(10 ** (1.1 + ((h >> 5) % 300) / 92)),
        grad: h % 8,
        img: I[photo] ? img(I[photo]) : photo,
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
