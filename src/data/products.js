// Blinkit/Amazon-style catalog: ~90 famous-product templates × variants
// (flavour · size · colour) expand into 1000+ SKUs, the way real q-commerce
// catalogs work. Images are verified Unsplash photos (hotlinking allowed) plus a
// few Wikimedia Commons product shots (credited in WM_CREDITS),
// shared across a template's variants — same as Lays 52g vs 90g sharing a shot.
import DAILY from './daily.js'
import { AIRCRAFT } from './aircraft.js'
import PACKSHOTS from './packshots.js'
import ANGLES from './angles.js'
import TYPE_PHOTOS from './typePhotos.js'

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'gadgets', label: 'Gadgets' },
  { id: 'home', label: 'Home' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'stationery', label: 'Stationery' },
  { id: 'quirky', label: 'Quirky' },
  { id: 'cars', label: 'Cars' },
  { id: 'bikes', label: 'Sport Bikes' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'watches', label: 'Watches' },
  { id: 'luxe', label: 'Luxe Bags' },
  { id: 'art', label: 'Art' },
  { id: 'books', label: 'Books' },
  { id: 'realty', label: 'Real Estate' },
  { id: 'kpop', label: 'K-Pop' },
  { id: 'jets', label: 'Private Jets' },
  { id: 'toys', label: 'Toys' },
  { id: 'grocery', label: 'Grocery' },
  { id: 'jewels', label: 'Jewellery' },
  { id: 'icecream', label: 'Ice Cream' },
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
// short form for tight chrome: 78.4Cr / 12.5L / 45.2k
export const inrShort = (n) =>
  n >= 1e7 ? `${(n / 1e7).toFixed(n >= 1e9 ? 0 : 1)}Cr`
  : n >= 1e5 ? `${(n / 1e5).toFixed(1)}L`
  : n >= 1e4 ? `${(n / 1e3).toFixed(1)}k`
  : inr(n)

// Subjects that are wider than they are tall. A car, a jet or a building shot
// into a portrait frame loses its nose and tail.
export const WIDE_SUBJECT = new Set(['cars', 'bikes', 'jets', 'realty'])

// Unsplash crops server-side to whatever aspect you ask for, so requesting
// w=800&h=1400 for a Praetor 600 chops the aircraft in the SOURCE FILE. The
// card then renders it with object-contain and faithfully shows a mutilated
// photo — it looked like a CSS clipping bug and was actually the URL.
const img = (id, wide = false) =>
  `https://images.unsplash.com/photo-${id}?w=${wide ? 1200 : 800}&h=${wide ? 800 : 1400}&fit=crop&q=80&auto=format`

// Hero URLs no longer all share one aspect, so callers that used to do
// .replace('w=800&h=1400', ...) would now silently no-op on exactly the wide
// images that need resizing most. Swap whatever dimensions are actually there.
export const resized = (url, w, h) =>
  typeof url === 'string' && url.includes('images.unsplash.com')
    ? url.replace(/([?&])w=\d+&h=\d+/, `$1w=${w}&h=${h}`)
    : url

// Requested additions: Apple hardware, laptops and high horology. Photos are
// Wikimedia Commons product shots, eyeballed before use — a Hublot search also
// returned an unrelated lingerie photo, and Jacob & Co has no usable watch
// image on Commons at all, so that brand is deliberately absent rather than
// illustrated with something wrong.
const WM_IP16 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/IPhone_16_Pro_Max_Desert_Titanium_Rear.png/960px-IPhone_16_Pro_Max_Desert_Titanium_Rear.png'
const WM_IP15 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Apple_iPhone_15_Pro.jpg/960px-Apple_iPhone_15_Pro.jpg'
const WM_MBP = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/MacBook_Pro_2019_13_inch.jpg/960px-MacBook_Pro_2019_13_inch.jpg'
const WM_MBA = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/MacBook_Air_M1.png/960px-MacBook_Air_M1.png'
const WM_XPS = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Dell_XPS_15_and_Microsoft_Surface_Pro_-_2020.jpg/960px-Dell_XPS_15_and_Microsoft_Surface_Pro_-_2020.jpg'
const WM_MSI = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/MSI_Gaming_Laptop_on_wood_floor.jpg/960px-MSI_Gaming_Laptop_on_wood_floor.jpg'
const WM_THINKPAD = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Top_cover_of_a_closed_Lenovo_ThinkPad_X220_laptop.jpg/960px-Top_cover_of_a_closed_Lenovo_ThinkPad_X220_laptop.jpg'
const WM_RM = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/RM_030_Automatic.jpg/960px-RM_030_Automatic.jpg'
const WM_PATEK = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Patek-Philippe-Nautilus-5711-1A-010-1.jpg/960px-Patek-Philippe-Nautilus-5711-1A-010-1.jpg'
const WM_PATEK2 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Patek_Philippe_Nautilus_cronografo_flyback_ref._5980_del_2015.jpg/960px-Patek_Philippe_Nautilus_cronografo_flyback_ref._5980_del_2015.jpg'
const WM_SEIKO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Seiko_SKX781_Orange_Monster_diver_watch_%282026-02-13%29.jpg/960px-Seiko_SKX781_Orange_Monster_diver_watch_%282026-02-13%29.jpg'
const WM_SEIKO2 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Seiko_Automatic_Diver%27s_200m.jpg/960px-Seiko_Automatic_Diver%27s_200m.jpg'
const WM_HUBLOT = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Hublot_Geneve.jpg/960px-Hublot_Geneve.jpg'

// Indian cars, photographed. Every car in the catalog previously drew from a
// pool of eight generic Unsplash shots, so a Maruti Swift, a Porsche Taycan and
// a Koenigsegg Jesko were literally the same image, and the Mahindra Thar shared
// one with a Lamborghini Urus. These are the actual models.
const WM_SWIFT = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Maruti_Suzuki_Swift_4456.JPG/960px-Maruti_Suzuki_Swift_4456.JPG'
const WM_NEXON = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2023_Tata_Nexon_XZA%2B_front_view.jpg/960px-2023_Tata_Nexon_XZA%2B_front_view.jpg'
const WM_HARRIER = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Tata_Buzzard_Sport%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0651%29.jpg/960px-Tata_Buzzard_Sport%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0651%29.jpg'
const WM_XUV700 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png/960px-2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png'
const WM_THAR = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Mahindra_Thar_Photoshoot_At_Perupalem_Beach_%28West_Godavari_District%2CAP%2CIndia_%29_Djdavid.jpg/960px-Mahindra_Thar_Photoshoot_At_Perupalem_Beach_%28West_Godavari_District%2CAP%2CIndia_%29_Djdavid.jpg'
const WM_SCORPIO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mahindra_Scorpio_2014.JPG/960px-Mahindra_Scorpio_2014.JPG'
const WM_CRETA = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/HYUNDAI_CRETA_%2C_iX25_%28SU2%29_China_%281%29.jpg/960px-HYUNDAI_CRETA_%2C_iX25_%28SU2%29_China_%281%29.jpg'
const WM_PUNCH = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/2021_Tata_Punch_Creative_%28India%29_front_view_01.png/960px-2021_Tata_Punch_Creative_%28India%29_front_view_01.png'
const WM_BALENO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view.jpg/960px-2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view.jpg'
const WM_INNOVA = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Toyota_Innova_Crysta_2.4_Z_side.jpg/960px-Toyota_Innova_Crysta_2.4_Z_side.jpg'
const WM_SAFARI = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tata_Safari_4x4_front.jpg/960px-Tata_Safari_4x4_front.jpg'
const WM_IPAD = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Apple_iPad_Pro_11.jpg/960px-Apple_iPad_Pro_11.jpg'
const WM_DYSON_VAC = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Dyson_Cyclone_V10_Absolute_cordless_stick_vacuum.jpg/960px-Dyson_Cyclone_V10_Absolute_cordless_stick_vacuum.jpg'
const WM_FORTUNER = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Toyota_Fortuner_India.jpg/960px-Toyota_Fortuner_India.jpg'
const WM_FRONX = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Suzuki_Fronx_%28front%29.jpg/960px-Suzuki_Fronx_%28front%29.jpg'

// Wikimedia product shots used where the generic Unsplash key was wrong.
// 'shoeYellow' is a Nike Air Max, shared by three products, so Crocs and
// Relaxo both rendered as Nike sneakers. Credited in WM_CREDITS.
const WM_CROCS = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Crocs-synthetic-clogs.jpg/960px-Crocs-synthetic-clogs.jpg'
const WM_FLIPFLOP = 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Green_flip_flops_on_red_background.jpg'

// verified photo pool, keyed by what the photo actually shows
const I = {
  samosa: '1601050690597-df0568f70950', spices: '1596040033229-a9821ebd058d', chai: '1544787219-7f47ccb76574',
  mug: '1485955900006-10f4d324d411', coffeePack: '1559056199-641a0ac8b55e', coffeeBeans: '1447933601403-0c6688de566e',
  iceScoops: '1560008581-09826d1de69e', iceCone: '1497034825429-c343d7c6a68f', iceCones2: '1501443762994-82bd5dace89a',
  iceKulfi: '1488900128323-21503983a07e', iceSundae: '1563805042-7684c019e1cb', tableMug: '1518481612222-68bbe828ecd1', berries: '1464965911861-746a04b4bca6',
  salad: '1512621776951-a57141f2eefd', bowl: '1546069901-ba9599a7e63c', pizza: '1565299624946-b28f40a0ae38', noodles: '1612929633738-8fe44f7ec841',
  pancakes: '1567620905732-2d1ec7ab7445', cake: '1565958011703-44f9829ba187', dessert: '1551024506-0bccd828d307',
  milk: '1550583724-b2692b85b150', smoothie: '1553530666-ba11a7da3888', pasta: '1576402187878-974f70c890a5',
  lemon: '1572635148818-ef6fd45eb394',
  lipstick: '1586495777744-4413f21062fa', rose: '1518895949257-7621c3c786d7', nails: '1522337660859-02fbefca4702',
  kajal: '1522335789203-aabd1fc54bc9', makeupFace: '1487412947147-5cebf100ffc2', perfume: '1541643600914-78b084683601',
  serum: '1556228578-8c89e6adf883', tube: '1608248543803-ba4f8c70ae0b', skincareFlat: '1598440947619-2c35fc9aa908',
  makeupFlat: '1571875257727-256c39da42af', palette: '1512496015851-a90fb38ba796', apothecary: '1611930022073-b7a4ba5fcccd',
  earbuds: '1606220945770-b5b6c2c55bf1', airpods: '1572569511254-d8f925fe2cbb',
  chocoBar: '1610450949065-1f2841536c88', cookieChoco: '1499636136210-6f4ee915583e', cookieBowl: '1558961363-fa8fdf82db35', headphones: '1583394838336-acd977736f90', phoneYellow: '1601784551446-20c9e07cdbdb',
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
  hangers: '1567401893414-76b7b1e5a7a5', storageUnit: '1595428774223-ef52624120d2',
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
  bagFlap: '1566150905458-1bf1fc113f0d', bagTote: '1614179689702-355944cd0918', bagStud: '1559563458-527698bf5295',
  bagCroc: '1575032617751-6ddec2089882', bagQuilt: '1548036328-c9fa89d128fa', bagBlush: '1591561954557-26941169b49e',
  villa: '1512917774080-9991f1c4c750', livingRoom: '1560448204-e02f11c3d0e2', modernHouse: '1613490493576-7fde63acd811',
  livingMin: '1600607687939-ce8a6c25118c', glassHouse: '1600585154340-be6161a56a0c', apartment: '1600566753086-00f18fb6b3ea',
  livingWarm: '1502672260266-1c1ef2d93688', livingSofa: '1583847268964-b28dc8f51f92', decorCorner: '1519710164239-da123dc03ef4',
  cottage: '1449844908441-8829872d2607',
  houseA: '1568605114967-8130f3a36994', houseClassic: '1570129477492-45c003edd2be', aerialVillas: '1512699355324-f07e3106dae5',
  housePool: '1580587771525-78b9dba3b914', villaPool2: '1600596542815-ffad4c1539a9', houseModern2: '1600047509807-ba8f99d2cdde',
  houseMinimal: '1600566753190-17f0baa2a6c3', houseBrick: '1605276374104-dee2a0ed3cd6', bungalow: '1605146769289-440113cc3d00',
  houseRust: '1600047509358-9dc75507daeb', int1: '1493809842364-78817add7ffb', int2: '1600607687920-4e2a09cf159d',
  kitchenInt: '1600585152220-90363fe7e115', int3: '1600210492486-724fe5c67fb0', int4: '1618221195710-dd6b41faaea6',
  int5: '1615529182904-14819c35db37', int6: '1615873968403-89e068629265', int7: '1502005229762-cf1b2da7c5d6', kitchenInt2: '1484154218962-a197022b5858',
  jet1: '1540962351504-03099e0a754b', jet2: '1474302770737-173ee21bab63', plane: '1569629743817-70d8db6c323b',
  lego1: '1585366119957-e9730b6d0f60', lego2: '1518946222227-364f22132616', hotwheels: '1558060370-d644479cb6f7', figure: '1608889175123-8ee362201f81',
  dairyMilk: '1563636619-e9143da7973b', milkPour: '1550583724-b2692b85b150', cheese: '1486297678162-eb2a19b0a32d',
  potato: '1518977676601-b53f82aba655', vegSpread: '1590779033100-9f60a05a013d', vegMix: '1610348725531-843dff563e2c',
  fruits: '1619566636858-adf3ef46400b', fruitMix: '1610832958506-aa56368176cf', banana: '1571771894821-ce9b6c11b08e',
  bread: '1509440159596-0249088772ff', bakery: '1608198093002-ad4e005484ec', croissant: '1555507036-ab1f4038808a', breadSlice: '1549931319-a545dcf3bc73',
  almonds: '1508061253366-f7da158b6d46', seedsMix: '1596040033229-a9821ebd058d',
  grocShelf: '1542838132-92c53300491e', grocAisle: '1604719312566-8912e9227c6a', produce: '1607349913338-fca6f7fc42d0', market: '1584479898061-15742e14f50d',
  pearlSet: '1515562141207-7a88fb7ce338', pendant: '1599643478518-a784e5dc4c8f', bangle: '1611591437281-460bfbe1220a', goldChain: '1602173574767-37ac01994b2a', diamondSet: '1573408301185-9146fe634ad0',
  necklaceWorn: '1611085583191-a3b181a88401', lounge: '1594633312681-425c7b97ccd1', romper: '1618932260643-eee4a2f652a6',
  notebookFlat: '1531346878377-a5be20888e57', deskFlat: '1519389950473-47ba0277781c', penNib: '1455390582262-044cdead277a', penBlack: '1583485088034-697b5bc54ccd',
  shShirtStack: '1602810318383-e386cc2a3ccf', shChambray: '1596755094514-f87e34085b2c', shFormalBlue: '1620012253295-c15cc3e65df4',
  shShirtRack: '1626497764746-6dc36546b388', shLightBlue: '1588359348347-9bc6cbbb689e', shCheck: '1607345366928-199ea26cfe3e',
  shWhiteTie: '1598033129183-c4f50c736f10', shTeeWhite: '1521572163474-6864f9cf17ab', shTeeBlack: '1583743814966-8936f5b7be1a',
  shTeeBlackFlat: '1618354691373-d851c5c3a990', shTeePink: '1622470953794-aa9c70b0fb9d', shTeeGraphic: '1503341455253-b2e723bb3dbb',
  shTeeGraphic2: '1571945153237-4929e783af4a', shTeeGraphic3: '1576566588028-4147f3842f27', shTeeGraphicW: '1554568218-0f1715e72254',
  shChinos: '1473966968600-fa801b869a1a', shTrouser: '1624378439575-d8705ad7ae80', shJeansPocket: '1542272604-787c3835535d',
  shJeansWorn: '1541099649105-f69ad21f3246', shJeansHanger: '1602293589930-45aad59ba3ab', shJeansStack: '1604176354204-9268737828e4',
  ksLightstick: '1516450360452-9312f5e86fc7', ksAlbum: '1619983081563-430f63602796', ksPhotocard: '1533158307587-828f0a76ef46', ksHoodie: '1556821840-3a63f95609a7', ksPoster: '1541961017774-22349e4a1262',
}

// variant helpers
const V = (...pairs) => pairs // [[label, price], ...]
const combo = (flavors, sizes) => flavors.flatMap((f) => sizes.map(([s, p]) => [`${f} · ${s}`, p]))
const colors = (cols, p) => cols.map((c) => [c, p])

// T(brand, name, category, photoKey, emoji, desc, variants, launch?)
const TEMPLATES = [
  // ——— SNACKS ———
  ['Slurpp', '2-Minute Masala Noodles', 'snacks', 'noodles', '🍜', '2 minute bola tha, 20 saal ho gaye. Still worth it.', combo(['Masala', 'Special Masala', 'Chicken'], V(['Pack of 4', 60], ['Pack of 8', 118], ['Pack of 12', 172])), true],
  ['CrunchLab', 'Potato Chips', 'snacks', 'chips', '🥔', 'Ek pack kabhi kaafi nahi hota. Science hai.', combo(['Magic Masala', 'Cream & Onion', 'Classic Salted', 'Tomato Tango', 'Chile Limón'], V(['52g', 20], ['90g', 35], ['Party Pack 177g', 60]))],
  ['Tedha', 'Crunchy Snack', 'snacks', 'spices', '🌶️', 'Tedha hai par mera hai.', combo(['Masala Munch', 'Green Chutney', 'Solid Masti'], V(['40g', 10], ['90g', 20], ['Family Pack', 35]))],
  ['Namkeen Bros', 'Bhujia', 'snacks', 'spices', '🥨', 'Chai ke saath ya waise hi. No judgement.', combo(['Classic', 'Aloo', 'Moong Dal'], V(['200g', 52], ['400g', 95], ['1kg', 210]))],
  ['Kokoa', 'Silk Chocolate Bar', 'snacks', 'chocoBar', '🍫', 'Kiss me, close your eyes... aapko pata hai.', combo(['Original', 'Cookie Crunch', 'Fruit & Nut', 'Bubbly'], V(['60g', 89], ['150g', 199])), true],
  ['GoodOld', 'Glucose Biscuits', 'snacks', 'chai', '🍪', 'G maane Genius. Desh ka biscuit.', V(['65g', 5], ['250g', 30], ['800g Value Pack', 80])],
  ['SunnySide', 'Butter Cookies', 'snacks', 'chai', '🍪', 'Har bite mein khushi wala propaganda. Sach hai.', combo(['Butter', 'Cashew', 'Choco Chip'], V(['75g', 25], ['200g', 60]))],
  ['TwistO', 'Choco Chip Biscuits', 'snacks', 'cookieBowl', '🍪', 'Chai mein dunk karo, ya seedha poora pack.', combo(['Original', 'Chocolate', 'Strawberry'], V(['46g', 10], ['120g', 30]))],
  ['Noodly', 'Long Noodles', 'snacks', 'pasta', '🍝', 'Long noodles, longer slurps.', combo(['Magic Masala', 'Mood Masala'], V(['Pack of 4', 55], ['Pack of 8', 108]))],
  ['WokBoy', 'Schezwan Chutney', 'snacks', 'spices', '🔥', 'Sab kuch schezwan bana do. SAB KUCH.', V(['90g', 45], ['250g', 90])],
  ['PopKarma', 'Instant Popcorn', 'snacks', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bowl_of_Popcorn_%28Unsplash%29.jpg/960px-Bowl_of_Popcorn_%28Unsplash%29.jpg', '🍿', 'Movie night ka asli hero.', combo(['Butter', 'Butter Pepper', 'Golden Sizzle'], V(['30g', 15], ['59g', 30]))],
  ['Naav', 'Fruit Drink', 'snacks', 'smoothie', '🧃', 'Bachpan ka swaad, tetra pack mein.', combo(['Aamras', 'Jaljeera', 'Aam Panna', 'Anar'], V(['200ml', 30], ['1L', 99]))],
  ['FizzySaeb', 'Fizz Sparkling Drink', 'snacks', 'smoothie', '🍏', 'Cool drink for cool logon ke liye.', V(['250ml', 25], ['600ml', 45], ['1L', 70])],
  ['MorningMood', 'Classic Instant Coffee', 'snacks', 'coffeePack', '☕', 'Deadline se pehle wala ritual.', V(['25g', 85], ['50g', 155], ['100g', 290])],
  ['Kadak', 'Tea Gold', 'snacks', 'chai', '🫖', 'Ghar wali chai ka secret ingredient.', V(['250g', 140], ['500g', 270])],
  ['ChocoNutty', 'Hazelnut Spread', 'snacks', 'pancakes', '🥞', 'Roti pe, bread pe, ya chamach se seedha.', V(['150g', 199], ['350g', 399])],
  ['Mixify', 'Strawberry Preserve', 'snacks', 'berries', '🍓', 'Bread ka best friend since forever.', V(['200g', 75], ['500g', 155])],
  ['MasalaGhar', 'Masala Box Refill', 'snacks', 'spices', '🧂', 'Asli masale sach sach. Dadi approved.', combo(['Garam Masala', 'Chana Masala', 'Kitchen King', 'Chunky Chat'], V(['100g', 68], ['500g', 290]))],
  ['Doodhwala', 'Cheese Slices', 'snacks', 'cheese', '🧀', 'Har cheez pe cheese. Rule of life.', V(['10 Slices', 135], ['20 Slices', 255])],
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
  ['Generic', 'Bamboo Hangers', 'home', 'hangers', '👔', 'Wardrobe ko Pinterest banao.', V(['Pack of 5', 249], ['Pack of 10', 449])],

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
  ['SoupNation', 'Cup Soup Sachets', 'snacks', 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CupSoupChicken.jpg', '🍲', '4 baje wali bhookh ka one-click answer.', combo(SOUP_FLAVORS, V(['1 Cup', 35], ['Pack of 4', 129]))],
  ['NachoNation', 'Nacho Crisps', 'snacks', 'fries', '🌮', 'Crunch jo poore room ko sunai de.', combo(['Cheese & Herbs', 'Sizzlin Jalapeno', 'Tikka Masala', 'Sea Salt'], V(['60g', 35], ['150g', 90]))],
  ['BakedYaar', 'Baked Chips', 'snacks', 'bakedBags', '🍟', 'Guilt-free karke khud ko convince karo.', combo(['Chilli Achaari', 'Noodle Masala', 'Dahi Papdi', 'Peri Peri'], V(['45g', 20], ['90g', 40]))],
  ['Noodly', 'Dark Fantasy Choco Fills', 'snacks', 'cookieChoco', '🍫', 'Andar se surprise. Har baar.', combo(['Choco Fills', 'Choco Nut', 'Coffee Fills'], V(['75g', 40], ['300g', 140]))],
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
// Every trim x colour used to carry the identical price, so a BMW 3 Series
// listed 15 options all at Rs55,00,000 — trims that cost the same undercut the
// realism more than any wording does. Real ladders are roughly +8% and +15%
// over base, with a paint premium on anything but the standard colour.
const TRIM_STEP = [1, 1.08, 1.15]
const car = (trims, cols, price) =>
  combo(
    trims,
    cols.map((c, ci) => [c, price]),
    // combo() pairs labels; the multiplier is applied per trim below
  ).map(([label, p], i) => {
    const trimIndex = Math.floor(i / cols.length)
    const colourIndex = i % cols.length
    const mult = TRIM_STEP[Math.min(trimIndex, TRIM_STEP.length - 1)]
    const paint = colourIndex === 0 ? 0 : Math.round(price * 0.012 / 1000) * 1000
    return [label, Math.round((p * mult + paint) / 1000) * 1000]
  })
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
  ['Tata', 'Nexon', 'cars', WM_NEXON, '🚙', 'Desi, safe, 5-star. Paisa vasool.', car(['Smart', 'Creative', 'Fearless'], CAR_COLORS, 900000)],
  ['Tata', 'Harrier', 'cars', WM_HARRIER, '🚙', 'Bada SUV, chhota budget (relatively).', car(CAR_TRIMS, CAR_COLORS, 1600000)],
  ['Mahindra', 'Thar', 'cars', WM_THAR, '🚙', 'Off-road ka OG. Instagram reels ready.', car(['AX', 'LX', 'RWD'], CAR_COLORS, 1100000), true],
  ['Mahindra', 'XUV700', 'cars', WM_XUV700, '🚙', 'ADAS wali gaadi. Future aa gaya.', car(['MX', 'AX7', 'AX7 L'], CAR_COLORS, 1500000)],
  ['Maruti Suzuki', 'Swift', 'cars', WM_SWIFT, '🚗', 'India ki favourite. Mileage king.', car(['LXi', 'VXi', 'ZXi+'], CAR_COLORS, 700000)],
  ['Mahindra', 'Scorpio-N', 'cars', WM_SCORPIO, '🚙', 'Big Daddy of SUVs. Sadak pe rasta milta hai.', car(['Z4', 'Z8', 'Z8 L'], CAR_COLORS, 1400000), true],
  ['Hyundai', 'Creta', 'cars', WM_CRETA, '🚙', 'Sabse zyada bikne wali SUV. Wajah hai.', car(['E', 'SX', 'SX(O)'], CAR_COLORS, 1200000)],
  ['Tata', 'Punch', 'cars', WM_PUNCH, '🚗', 'Chhoti SUV, 5-star safety. Pehli gaadi ka default.', car(['Pure', 'Adventure', 'Creative'], CAR_COLORS, 650000)],
  ['Tata', 'Safari', 'cars', WM_SAFARI, '🚙', 'Saat log, ek gaadi. Naam mein hi weight hai.', car(['Smart', 'Accomplished', 'Adventure X'], CAR_COLORS, 1800000)],
  ['Maruti Suzuki', 'Baleno', 'cars', WM_BALENO, '🚗', 'Premium hatchback. Nexa wali feel.', car(['Delta', 'Zeta', 'Alpha'], CAR_COLORS, 800000)],
  ['Maruti Suzuki', 'Fronx', 'cars', WM_FRONX, '🚗', 'Coupe-SUV. Turbo lo, mileage bhulo.', car(['Sigma', 'Delta+', 'Alpha'], CAR_COLORS, 950000)],
  ['Toyota', 'Innova Crysta', 'cars', WM_INNOVA, '🚐', 'Poora khandaan, ek gaadi. Resale amar hai.', car(['GX', 'VX', 'ZX'], CAR_COLORS, 2100000)],

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
  ['Crocs', 'Classic Clog', 'shoes', WM_CROCS, '🩴', 'Ugly? Yes. Comfortable? Blasphemously.', colors(['Black', 'Navy', 'Lavender', 'Army Green'], 4000)],
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
  ['Louis Vuitton', 'Neverfull MM', 'luxe', 'bagTote', '👜', 'The tote that started an obsession.', colors(BAG_COLORS, 220000), true],
  ['Louis Vuitton', 'Speedy 25', 'luxe', 'bagCroc', '👜', 'Audrey approved since forever.', colors(BAG_COLORS, 185000)],
  ['Dior', 'Lady Dior', 'luxe', 'bagStud', '👜', 'Princess Diana ki choice.', colors(BAG_COLORS, 550000), true],
  ['Dior', 'Saddle Bag', 'luxe', 'bagBlush', '👜', 'Y2K icon, back with a vengeance.', colors(BAG_COLORS, 380000)],
  ['Gucci', 'GG Marmont', 'luxe', 'bagQuilt', '👜', 'That double-G clasp. Chef\'s kiss.', colors(BAG_COLORS, 280000)],
  ['Chanel', 'Classic Flap', 'luxe', 'bagFlap', '👜', 'Investment piece, not a purchase.', colors(['Black Caviar', 'Beige', 'Bordeaux'], 1050000)],
  ['Hermès', 'Birkin 30', 'luxe', 'bagTote', '👜', 'Waitlist se bhi mushkil. The holy grail.', colors(['Noir', 'Étoupe', 'Gold', 'Rouge'], 2500000)],
  ['Prada', 'Galleria Saffiano', 'luxe', 'bagStud', '👜', 'Structured, sharp, forever chic.', colors(BAG_COLORS, 320000)],

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
  ['The Hunger Games', 'Suzanne Collins', 'May the odds be ever in your favour.', '9780439023481'],
  ['The Catcher in the Rye', 'J.D. Salinger', 'Peak teenage angst, forever.', '9780316769488'],
  ['Anna Karenina', 'Leo Tolstoy', 'Russian doorstopper worth it.', '9781400079988'],
  ['Pride and Prejudice', 'Jane Austen', 'Mr. Darcy started a genre.', '9780141439518'],
  ['The Da Vinci Code', 'Dan Brown', 'Airport thriller GOAT.', '9780307474278'],
  ['The Little Prince', 'Antoine de Saint-Exupéry', 'Grown-ups never understand.', '9780156012195'],
  ['The Maze Runner', 'James Dashner', 'WICKED is good.', '9780385737951'],
  ['Divergent', 'Veronica Roth', 'Pick your faction.', '9780062024039'],
  ['Harry Potter & the Sorcerer\'s Stone', 'J.K. Rowling', 'Where it all began.', '9780439554930'],
  ['Harry Potter & the Cursed Child', 'Rowling & Thorne', 'The eighth story, on stage.', '9781338099133'],
  ['The Way of Kings', 'Brandon Sanderson', 'Epic fantasy, 1000+ pages.', '9780765326355'],
  ['A Game of Thrones', 'George R.R. Martin', 'Winter is coming.', '9780553573404'],
  ['The Girl with the Dragon Tattoo', 'Stieg Larsson', 'Nordic noir icon.', '9780316055437'],
  ['The Fault in Our Stars', 'John Green', 'Okay? Okay.', '9780525478812'],
  ['Twilight', 'Stephenie Meyer', 'Team Edward or Team Jacob?', '9780316015844'],
  ['Project Hail Mary', 'Andy Weir', 'Sci-fi you can\'t put down.', '9780593135204'],
  ['Where the Crawdads Sing', 'Delia Owens', 'Marsh girl mystery.', '9781984822178'],
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
  ['Toyota', 'Fortuner', 'cars', WM_FORTUNER, '🚙', 'Highway ka dabang. Resale value ka baap.', car(['4x2', '4x4', 'Legender'], CAR_COLORS, 3500000)],

  // ——— REAL ESTATE ———
  ['Palm Estates', 'Private Island — Dubai', 'realty', 'villa', '🏝️', 'Your own island off Dubai. Neighbours: dolphins.', V(['1 Acre', 850000000], ['3 Acre + Villa', 1900000000]), true],
  ['Palm Estates', 'Palm Jumeirah Villa', 'realty', 'modernHouse', '🏖️', 'Beachfront, infinity pool, Burj view.', V(['5 BHK', 420000000], ['7 BHK Signature', 680000000])],
  ['Emaar', 'Burj Khalifa Penthouse', 'realty', 'glassHouse', '🏙️', 'Live in the clouds. Literally floor 150+.', V(['3 BHK', 550000000], ['Sky Penthouse', 1200000000])],
  ['Lodha', 'Worli Sea-Facing Flat', 'realty', 'apartment', '🌊', 'Mumbai skyline + Arabian Sea from your sofa.', V(['3 BHK', 120000000], ['4 BHK Duplex', 250000000]), true],
  ['Godrej', 'Bandra 3BHK', 'realty', 'livingRoom', '🏢', 'Bandra address = instant status.', V(['2 BHK', 45000000], ['3 BHK', 75000000])],
  ['Isprava', 'Goa Beach Villa', 'realty', 'villa', '🌴', 'Portuguese charm, private pool, susegad life.', V(['3 BHK Villa', 65000000], ['5 BHK Estate', 140000000])],
  ['Isprava', 'Lonavala Farmhouse', 'realty', 'cottage', '🏡', 'Weekend escape, monsoon-ready.', V(['2 Acre', 55000000], ['5 Acre Estate', 120000000])],
  ['DLF', 'Gurgaon Sky Apartment', 'realty', 'apartment', '🏙️', 'Golf-course view, NCR luxury.', V(['3 BHK', 38000000], ['4 BHK Penthouse', 90000000])],

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
  ['Nilkamal', 'Storage Cabinet', 'home', 'storageUnit', '🗄️', 'Clutter ka permanent solution.', colors(['White', 'Walnut', 'Grey'], 6999)],
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
  ['Apple', 'iPad Pro M4', 'gadgets', WM_IPAD, '📱', 'Laptop replacement (for reels).', combo(['Space Black', 'Silver'], V(['11" 256GB', 99900], ['13" 512GB', 149900]))],
  ['Dyson', 'Supersonic Hair Dryer', 'gadgets', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Dyson_Supersonic_Hair_Dryer_1_2017-01-28.jpg/960px-Dyson_Supersonic_Hair_Dryer_1_2017-01-28.jpg', '💨', 'Salon at home. Yes, worth it.', colors(['Fuchsia', 'Nickel', 'Blue Blush'], 45900), true],
  ['Dyson', 'V15 Cordless Vacuum', 'gadgets', WM_DYSON_VAC, '🧹', 'Dust ka dushman. Laser detects it all.', V(['V12', 52900], ['V15 Detect', 65900])],
  ['Philips', 'Air Fryer', 'gadgets', 'kitchen', '🍟', 'Guilt-free fries, ghar pe.', combo(['4.1L', '6.2L'], colors(['Black', 'White'], 8999).map((c) => c))],
  ['Preethi', 'Mixer Grinder', 'gadgets', 'kitchen', '🔌', 'Har Indian kitchen ka MVP.', V(['750W 3-Jar', 4499], ['1000W 4-Jar', 6499])],
  ['iRobot', 'Robot Vacuum', 'gadgets', 'arcade', '🤖', 'Ghar ki safai, auto-pilot.', V(['Roomba i3', 24900], ['Roomba j7+', 54900])],
  ['Apple', 'AirPods Pro 2', 'gadgets', 'airpods', '🎧', 'ANC that mutes the whole local train.', colors(['White'], 24900), true],
  ['Sony', 'WH-1000XM5', 'gadgets', 'headphones', '🎧', 'Silence, engineered.', colors(['Black', 'Silver', 'Midnight Blue'], 29990)],
  ['JBL', 'Flip 6 Speaker', 'gadgets', 'speaker', '🔊', 'Party anywhere, waterproof.', colors(['Black', 'Blue', 'Red', 'Teal'], 9999)],

  // ——— FOOTWEAR (sandals, sliders, heels, slippers) ———
  ['Adidas', 'Adilette Sliders', 'shoes', 'shoeTan', '🩴', 'Hostel-to-airport uniform.', shoeVariants(['Black/White', 'Grey', 'Navy'], 2999)],
  ['Bata', 'Everyday Slippers', 'shoes', 'shoeFlat', '🩴', 'Ghar ka sabse loyal footwear.', shoeVariants(['Brown', 'Black', 'Tan'], 599)],
  ['Steve Madden', 'Block Heels', 'shoes', 'shoeTan', '👠', 'Height + comfort, rare combo.', shoeVariants(['Nude', 'Black', 'Red'], 6999)],
  ['Metro', 'Ethnic Kolhapuris', 'shoes', 'shoeFlat', '🩴', 'Desi, handcrafted, timeless.', shoeVariants(['Tan', 'Brown', 'Multicolour'], 1299)],
  ['Relaxo', 'Flip-Flops', 'shoes', WM_FLIPFLOP, '🩴', 'Barsaat ka bestie.', colors(['Black', 'Blue', 'Grey', 'Red'], 299)],

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
// ——— 1000+ REAL ESTATE listings: projects × (BHK · view) configs ———
const HOUSE_PHOTOS = ['houseA', 'houseClassic', 'housePool', 'villaPool2', 'houseModern2', 'houseMinimal', 'houseBrick', 'bungalow', 'houseRust', 'villa', 'modernHouse', 'glassHouse', 'cottage', 'aerialVillas']
const FLAT_PHOTOS = ['int1', 'int2', 'int3', 'int4', 'int5', 'int6', 'int7', 'kitchenInt', 'kitchenInt2', 'apartment', 'livingRoom']
const BHKS = [['1 BHK', 0.55], ['2 BHK', 1], ['3 BHK', 1.5], ['4 BHK', 2.1], ['5 BHK Duplex', 3], ['Penthouse', 4.2]]
const VIEWS = ['Garden Facing', 'Pool View', 'Park View', 'Corner Unit', 'High Floor', 'Sea Facing', 'City View']
const realtyConfigs = (base) => BHKS.flatMap(([b, m]) => VIEWS.map((v) => [`${b} · ${v}`, Math.round(base * m)]))
// [developer, project, city, basePrice(₹ for a 2BHK), villa?]
const REALTY = [
  ['Lodha', 'Marquise', 'Worli, Mumbai', 95000000, false],
  ['Lodha', 'Bellissimo', 'Mahalaxmi, Mumbai', 78000000, false],
  ['Oberoi Realty', 'Three Sixty West', 'Worli, Mumbai', 140000000, false],
  ['Oberoi Realty', 'Sky City', 'Borivali, Mumbai', 42000000, false],
  ['Rustomjee', 'Crown', 'Prabhadevi, Mumbai', 110000000, false],
  ['Godrej', 'Platinum', 'Bandra, Mumbai', 65000000, false],
  ['Hiranandani', 'Gardens', 'Powai, Mumbai', 38000000, false],
  ['DLF', 'The Camellias', 'Golf Course Rd, Gurgaon', 90000000, false],
  ['DLF', 'The Crest', 'Gurgaon', 48000000, false],
  ['M3M', 'Golf Estate', 'Gurgaon', 36000000, false],
  ['Sobha', 'City', 'Gurgaon', 28000000, false],
  ['Prestige', 'Golfshire Villa', 'Bangalore', 85000000, true],
  ['Prestige', 'Lakeside Habitat', 'Whitefield, Bangalore', 22000000, false],
  ['Brigade', 'Exotica', 'Bangalore', 26000000, false],
  ['Sobha', 'Dream Acres', 'Bangalore', 18000000, false],
  ['Total Environment', 'Windmills of Your Mind', 'Bangalore', 45000000, true],
  ['Embassy', 'Boulevard Villa', 'Bangalore', 72000000, true],
  ['Mahindra', 'Luminare', 'Sector 59, Gurgaon', 52000000, false],
  ['Tata Housing', 'Primanti', 'Gurgaon', 34000000, false],
  ['ATS', 'Marigold', 'Gurgaon', 24000000, false],
  ['Purva', 'Silversands', 'Pune', 21000000, false],
  ['Kolte Patil', 'Life Republic', 'Pune', 16000000, false],
  ['Godrej', 'Woods', 'Noida', 28000000, false],
  ['ATS', 'Knightsbridge', 'Noida', 40000000, false],
  ['Emaar', 'Palm Hills', 'Gurgaon', 46000000, false],
  ['Emaar', 'Beachfront', 'Dubai Marina', 180000000, false],
  ['Damac', 'Cavalli Tower', 'Dubai', 220000000, false],
  ['Nakheel', 'Palm Jumeirah Villa', 'Dubai', 380000000, true],
  ['Emaar', 'Downtown Views', 'Dubai', 150000000, false],
  ['Sobha', 'Hartland Villa', 'Dubai', 260000000, true],
  ['Isprava', 'Heritage Villa', 'Goa', 65000000, true],
  ['Isprava', 'Riverfront Estate', 'Alibaug', 90000000, true],
  ['Ozone', 'Hill Retreat', 'Lonavala', 42000000, true],
  ['Casagrand', 'Boulevard', 'Chennai', 15000000, false],
  ['Prestige', 'Bougainvillea', 'Chennai', 19000000, false],
  ['Merlin', 'The Fifth Avenue', 'Kolkata', 14000000, false],
  ['PS Group', 'Panorama', 'Kolkata', 22000000, false],
  ['My Home', 'Bhooja', 'Hyderabad', 24000000, false],
  ['Aparna', 'Sarovar Grande', 'Hyderabad', 20000000, false],
  ['Phoenix', 'One Bangalore West', 'Bangalore', 55000000, false],
]
REALTY.forEach(([dev, project, city, base, villa], i) => {
  const photo = villa ? HOUSE_PHOTOS[i % HOUSE_PHOTOS.length] : FLAT_PHOTOS[i % FLAT_PHOTOS.length]
  const emoji = villa ? '🏡' : '🏙️'
  const desc = villa
    ? `Gated ${city} address. Private garden, premium fittings, possession-ready.`
    : `${city} sky-living. Clubhouse, gym, 24x7 security, RERA-approved.`
  TEMPLATES.push([dev, `${project} — ${city.split(',')[0]}`, 'realty', photo, emoji, desc, realtyConfigs(base)])
})

// ——— MORE BEAUTY (Sephora-style brands) ———
const LIP_SHADES = ['Ruby Woo', 'Brick Red', 'Nude Rose', 'Mauve', 'Berry', 'Coral', 'Toffee', 'Terracotta', 'Wine', 'Peach']
TEMPLATES.push(
  ['Sephora Collection', 'Cream Lip Stain', 'beauty', 'lipstick', '💄', 'Sephora ka cult liquid lip. All-day stay.', colors(LIP_SHADES, 990)],
  ['Huda Beauty', 'Obsessions Palette', 'beauty', 'palette', '🎨', 'Pigment jo pop kare. Insta-glam unlocked.', colors(['Amethyst', 'Warm Brown', 'Smokey', 'Rose Gold'], 2400)],
  ['MAC', 'Retro Matte Lipstick', 'beauty', 'lipstick', '💋', 'Ruby Woo se kaam chal jaata hai.', colors(LIP_SHADES, 2100)],
  ['NARS', 'Blush — Orgasm', 'beauty', 'makeupFace', '🍑', 'The internet-famous peachy glow.', colors(['Orgasm', 'Deep Throat', 'Dolce Vita'], 3200)],
  ['Rare Beauty', 'Soft Pinch Blush', 'beauty', 'makeupFlat', '🌸', 'One dot = whole face lit. Selena-approved.', colors(['Joy', 'Hope', 'Grace', 'Bliss'], 2600)],
  ['Fenty Beauty', 'Pro Filt\'r Foundation', 'beauty', 'skincareFlat', '🧴', '50 shades, actually. Rihanna delivered.', colors(['110', '190', '290', '370', '440'], 3400)],
  ['Charlotte Tilbury', 'Pillow Talk Lipstick', 'beauty', 'lipstick', '💄', 'The nude that suits literally everyone.', colors(['Original', 'Medium', 'Intense'], 3200)],
  ['The Ordinary', 'Niacinamide 10%', 'beauty', 'serum', '💧', 'TikTok ka fav. Pores ka dushman.', V(['30ml', 650], ['60ml', 1100])],
  ['The Ordinary', 'Hyaluronic Acid', 'beauty', 'apothecary', '💦', 'Hydration in a bottle, cult status.', V(['30ml', 700])],
  ['Cetaphil', 'Gentle Cleanser', 'beauty', 'tube', '🧼', 'Derm-recommended, drama-free.', V(['125ml', 385], ['250ml', 625], ['500ml', 999])],
  ['Neutrogena', 'Hydro Boost Gel', 'beauty', 'skincareFlat', '💠', 'Water-gel that skin drinks up.', V(['50g', 750])],
  ['Forest Essentials', 'Facial Ubtan', 'beauty', 'apothecary', '🌿', 'Ayurvedic luxury, royal glow.', V(['50g', 1275], ['200g', 3650])],
  ['Kama Ayurveda', 'Rose Water', 'beauty', 'rose', '🌹', 'Pure gulab, no nasties.', V(['100ml', 495], ['200ml', 850])],
  ['Maybelline', 'Fit Me Foundation', 'beauty', 'skincareFlat', '🧴', 'Drugstore GOAT. Shade for everyone.', colors(['120', '128', '220', '230', '330'], 549)],
  ['e.l.f.', 'Halo Glow Filter', 'beauty', 'makeupFlat', '✨', 'That lit-from-within TikTok filter, IRL.', colors(['Fair', 'Light', 'Medium', 'Tan'], 1250)],
  ['Dyson', 'Airwrap Styler', 'beauty', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Dyson_Supersonic_Hair_Dryer_3_2017-01-28.jpg/960px-Dyson_Supersonic_Hair_Dryer_3_2017-01-28.jpg', '💨', 'Curls, waves, blowout — no heat damage.', colors(['Nickel/Copper', 'Blue/Blush', 'Onyx/Gold'], 45900), true],
)
// ——— K-POP MERCH ———
// ——— K-Pop: REAL album art via the iTunes/Apple Music catalog ———
// Album covers are the actual artwork for each release (fetched from the public
// iTunes Search API and pinned here), so this section shows real merch, not
// generic stock lookalikes. Non-album merch reuses verified fandom photos.
const itunes = (mid) => `https://is1-ssl.mzstatic.com/image/thumb/${mid}/600x600bb.jpg`
const KPOP_ALBUMS = [
  ['BTS', 'Love Yourself 結 \'Answer\'', 'Music126/v4/ff/00/2c/ff002c29-6da9-1a26-16b3-282a73180366/192562871591_Cover.jpg'],
  ['BTS', 'Come Over', 'Music211/v4/b4/a3/50/b4a350d5-4197-6928-eebf-e7e53ae4c2b6/823375205715_Cover.jpg'],
  ['BTS', 'MAP OF THE SOUL : 7', 'Music116/v4/bd/68/9b/bd689bf2-ef25-4973-7ecd-7eb4965019c5/195081034713_Cover.jpg'],
  ['BTS', 'The Most Beautiful Moment in Life: Young Forever', 'Music116/v4/4c/97/6f/4c976f5c-5196-1221-8517-ddfcb0ba514c/8804775070341_Cover.jpg'],
  ['BTS', 'DARK&WILD', 'Music116/v4/f2/39/97/f2399713-b036-7ef2-fb4f-8c1454569c66/8804775056895_Cover.jpg'],
  ['BTS', 'Love Yourself 轉 \'Tear\'', 'Music126/v4/02/c5/18/02c518f5-ac06-3321-622e-08d9429fd968/192562556672_Cover.jpg'],
  ['BLACKPINK', 'AS IF IT\'S YOUR LAST', 'Music124/v4/0b/d6/6e/0bd66efc-caba-41e0-7d84-c92e925b1d94/as_if_its_your_last.jpg'],
  ['BLACKPINK', 'Pink Venom', 'Music122/v4/72/48/88/72488832-558c-fcba-4aa0-03d88dc79eb3/22UMGIM87808.rgb.jpg'],
  ['BLACKPINK', 'THE ALBUM', 'Music125/v4/c3/64/46/c364465f-6271-8aae-93a8-b9979d2befe5/20UMGIM82075.rgb.jpg'],
  ['BLACKPINK', 'KILL THIS LOVE', 'Music124/v4/d6/2a/db/d62adbe1-6994-581c-b3b2-aeacafa35c1d/19UMGIM30819.rgb.jpg'],
  ['BLACKPINK', 'SQUARE TWO', 'Music125/v4/89/eb/82/89eb82a7-52ec-9e02-87e9-fcc0ac7e0377/BLACKPINK_SQUARE2-1.jpg'],
  ['BLACKPINK', 'SQUARE UP', 'Music124/v4/5e/5d/c3/5e5dc3a6-797b-dee5-9f51-2dcbf447c48e/19UMGIM05046.rgb.jpg'],
  ['Stray Kids', 'THIS & THAT', 'Music211/v4/c0/05/aa/c005aa79-a3a7-6e28-48e2-4c5e72eff603/8809928957357_Cover.jpg'],
  ['Stray Kids', 'SKZ-REPLAY 2026 Pt.1', 'Music221/v4/22/70/ea/2270ea94-60f0-94a6-bce2-99fafaa8a057/8809928957340_Cover.jpg'],
  ['Stray Kids', 'RUN IT', 'Music221/v4/01/03/f8/0103f8d4-c842-6a41-e4ce-240d6eabfc9c/8809928957500_Cover.jpg'],
  ['Stray Kids', 'ATE', 'Music211/v4/24/c1/47/24c147fc-cf70-0a4e-3e21-bd9a42617572/8809928952123_Cover.jpg'],
  ['Stray Kids', 'NOEASY', 'Music116/v4/af/dc/2b/afdc2b64-deb3-cf5f-84e2-c43be4105636/192641939495_Cover.jpg'],
  ['Stray Kids', 'KARMA', 'Music221/v4/38/22/ee/3822ee8e-c8f6-bb12-10ca-dcfd27dd166b/8809928955230_Cover.jpg'],
  ['SEVENTEEN', 'YOU MADE MY DAWN', 'Music126/v4/d3/c9/4c/d3c94ccd-6c20-af5a-403e-40a14b9f3df5/8804775120695_Cover.jpg'],
  ['SEVENTEEN', 'Darl+Ing', 'Music112/v4/9f/26/fa/9f26fae1-c93e-0d47-a0a6-b8543e2a28aa/192641997679_Cover.jpg'],
  ['SEVENTEEN', 'FML', 'Music116/v4/d1/66/eb/d166eb7e-7210-b3ff-be39-638cd37bfc89/196922401282_Cover.jpg'],
  ['SEVENTEEN', 'Heng:garæ', 'Music124/v4/fa/8d/ca/fa8dcafd-2f37-a08b-9a6d-f6b2e68ef5f5/08809704415170_Cover.jpg'],
  ['SEVENTEEN', 'Attacca', 'Music125/v4/dd/d4/d4/ddd4d456-4696-06b8-2054-6d1bb6ae6718/192641682551_Cover.jpg'],
  ['SEVENTEEN', 'Your Choice', 'Music115/v4/a5/4c/16/a54c1600-09f4-74f1-f12a-e5bae364ca42/192641604041_Cover.jpg'],
  ['TWICE', 'FANCY YOU', 'Music115/v4/03/76/e6/0376e6f9-f6d8-68f7-ae85-1a4ef17002aa/00602508875229_Cover.jpg'],
  ['TWICE', 'Formula of Love: O+T=<3', 'Music126/v4/87/f5/e0/87f5e0de-c909-f4e6-9621-123565dfbc80/738676858440_Cover.jpg'],
  ['TWICE', 'CRY FOR ME', 'Music124/v4/a5/7f/18/a57f181f-fa95-c7ce-4a62-2f1144d1ae3f/192641621130_Cover.jpg'],
  ['TWICE', 'Eyes wide open', 'Music115/v4/1f/46/44/1f46442a-ed5a-7cc8-c119-c6453b559ef7/192641580802_Cover.jpg'],
  ['TWICE', 'Feel Special', 'Music114/v4/75/bb/cc/75bbcc8c-bc12-983b-196f-bb6e355cc978/00602508875281_Cover.jpg'],
  ['TWICE', 'MOONLIGHT SUNRISE', 'Music113/v4/4e/00/f7/4e00f74a-795c-001a-2da3-d5b01b01e4d4/738676860511_Cover.jpg'],
  ['NewJeans', 'NewJeans 1st EP \'New Jeans\'', 'Music112/v4/4e/64/34/4e64344b-3ac6-c503-2c41-257a15401416/192641873096_Cover.jpg'],
  ['NewJeans', 'NewJeans 2nd EP \'Get Up\'', 'Music116/v4/d3/4b/7e/d34b7e1e-af3b-43b6-2949-7a8c652a1bc9/196922462726_Cover.jpg'],
  ['NewJeans', 'OMG (Apple Music Edition)', 'Music126/v4/d0/78/92/d07892c1-2770-7e7f-68ba-dc6409750f7a/196922401039_Cover.jpg'],
  ['NewJeans', 'How Sweet', 'Music221/v4/bf/68/ca/bf68ca64-4acd-543f-bc78-455f11f06105/196922889738_Cover.jpg'],
  ['NewJeans', 'NewJeans \'OMG\'', 'Music113/v4/48/96/08/4896085e-b550-cb0a-3e5b-1f203521cb82/196922265464_Cover.jpg'],
  ['NewJeans', 'Ditto', 'Music112/v4/f6/29/42/f629426e-92fe-535c-cbe4-76e70850819b/196922287107_Cover.jpg'],
  ['aespa', 'LEMONADE - The 2nd Album', 'Music221/v4/95/98/a0/9598a090-7948-5bf1-a6ac-7fde80d26874/888735955211_Cover.jpg'],
  ['aespa', 'SYNK : aeXIS LINE - 2026 Special Digital Single', 'Music211/v4/cc/41/23/cc4123a6-c1c0-7e86-e44a-2f0cb1f0e081/aespa_aeXIS_2026_-F.jpg'],
  ['aespa', 'Better Things', 'Music116/v4/89/9e/3e/899e3e37-a86d-1a08-d1d1-dddfe8fd94c4/888735944338.jpg'],
  ['aespa', 'KISS N TELL', 'Music221/v4/47/e5/1c/47e51c1f-8153-3f2f-11ed-781b1dbe5cac/1200214475819.jpg'],
  ['aespa', 'WDA (Whole Different Animal) [feat. G-DRAGON]', 'Music221/v4/e2/b8/2f/e2b82f49-e51b-725f-2797-ea2a3de44b55/888735955426_Cover.jpg'],
  ['aespa', 'Rich Man - The 6th Mini Album', 'Music211/v4/c5/ff/d7/c5ffd7a9-ed3c-6d02-81d7-7cc7e2dee419/888735953019_Cover.jpg'],
  ['EXO', 'The 1st Album \'XOXO\' (Repackage)', 'Music124/v4/3a/10/77/3a1077bc-cfb4-dc63-eb69-bf8bc7d7245e/asset.jpg'],
  ['EXO', 'THE WAR - The 4th Album', 'Music115/v4/e0/e6/45/e0e6457b-98c2-e86a-158f-63f234e62ed7/EXO_04_THE_WAR_DC_KOREAN_Ver.jpg'],
  ['EXO', 'EX’ACT - The 3rd Album', 'Music114/v4/8a/2d/e9/8a2de945-0ba9-d37d-fd0e-869ee72db099/EXACT_DIGITAL_COVER_IB_4000_4000.jpg'],
  ['EXO', 'SING FOR YOU - Winter Special Album, 2015', 'Music124/v4/c4/6e/09/c46e0919-9f49-debb-0e4a-ac0d54f69959/2.jpg'],
  ['EXO', 'OBSESSION - The 6th Album', 'Music125/v4/28/59/de/2859de3b-c003-816e-4f28-71d40b04697d/cover.jpg'],
  ['EXO', 'REVERXE - The 8th Album', 'Music221/v4/e2/41/ca/e241cafc-1447-2edf-4ca3-cd11ec4b376d/888735954610.png'],
  ['ENHYPEN', 'THE SIN : BLISS (Korean Ver.)', 'Music211/v4/6c/63/52/6c635245-2ee7-193d-faec-3a53b0e2d087/823375359371_Cover.jpg'],
  ['ENHYPEN', 'THE SIN : BLISS (English Ver.)', 'Music221/v4/fa/fa/6f/fafa6f4c-eb86-84c5-cecc-6e0c77562a15/823375359395_Cover.jpg'],
  ['ENHYPEN', 'THE SIN : BLISS', 'Music221/v4/9e/f2/dc/9ef2dc16-eefd-7cad-3d74-adbd0e394991/823375232841_Cover.jpg'],
  ['ENHYPEN', 'THE SIN : BLISS (Chinese Ver.)', 'Music221/v4/a6/70/79/a6707900-145d-2328-4e6e-ef4362613d66/823375359432_Cover.jpg'],
  ['ENHYPEN', 'THE SIN : BLISS (Japanese Ver.)', 'Music211/v4/ca/33/21/ca3321d1-ae6a-d703-7b59-d2ed90455551/823375359418_Cover.jpg'],
  ['ENHYPEN', 'THE SIN : VANISH', 'Music221/v4/4e/48/e2/4e48e2e1-6713-c1de-db25-7a8d27f6979e/198704914287_Cover.jpg'],
  ['LE SSERAFIM', 'HOT', 'Music221/v4/cb/5d/2c/cb5d2c9e-74e1-a562-6c40-04479aa0afdf/198704375187_Cover.jpg'],
  ['LE SSERAFIM', 'CELEBRATION', 'Music221/v4/54/4f/4a/544f4a6d-71e3-3527-7024-ff4d1b649b30/823375107163_Cover.jpg'],
  ['LE SSERAFIM', 'UNFORGIVEN', 'Music211/v4/27/13/c3/2713c389-4f01-b5e7-59f5-3204b37cb594/196922444470_Cover.jpg'],
  ['LE SSERAFIM', 'CRAZY', 'Music221/v4/38/95/ed/3895ed80-ba5b-7846-ce5b-b49805a818ef/198704101359_Cover.jpg'],
  ['LE SSERAFIM', 'ANTIFRAGILE', 'Music221/v4/c8/79/da/c879dadf-db1e-95a5-caf5-b18c7c81d2b6/192641874413_Cover.jpg'],
  ['LE SSERAFIM', 'EASY', 'Music221/v4/22/0f/fd/220ffdbf-152c-5b65-d5af-01256c1328c2/196922796531_Cover.jpg'],
]
for (const [band, album, mid] of KPOP_ALBUMS) {
  TEMPLATES.push([band, `${album} (Album)`, 'kpop', itunes(mid), '💿', `${band} — official album. Random photocard inside, collect all!`, V(['Standard Ver.', 1899], ['Deluxe + Photobook', 2799])])
}
const KPOP = ['BTS', 'BLACKPINK', 'Stray Kids', 'SEVENTEEN', 'TWICE', 'NewJeans', 'aespa', 'EXO', 'ENHYPEN', 'LE SSERAFIM']
KPOP.forEach((band) => {
  TEMPLATES.push([band, 'Official Lightstick', 'kpop', 'ksLightstick', '🪄', `${band} concert essential. ARMY/BLINK/STAY ready.`, V(['Ver. 1', 3499], ['Ver. 3 (Bluetooth)', 4999])])
  TEMPLATES.push([band, 'Photocard Binder Set', 'kpop', 'ksPhotocard', '🖼️', `${band} member photocards + collector binder. Bias secured.`, colors(['Full Set', 'Bias Pack'], 799)])
  TEMPLATES.push([band, 'Tour Hoodie', 'kpop', 'ksHoodie', '🧥', `${band} tour hoodie. Comfy + fandom flex.`, combo(['Black', 'White', 'Pink'], ['S', 'M', 'L', 'XL'].map((z) => [z, 2999]))])
  TEMPLATES.push([band, 'Poster Set', 'kpop', 'ksPoster', '📜', `${band} wall art. Bedroom = shrine.`, V(['Set of 4', 599], ['Set of 8', 999])])
})

// ——— PRIVATE JETS + hypercars (Pagani) ———
const JET_CFG = (base) => combo(['Standard Cabin', 'Executive', 'VVIP Suite'], ['Pearl White', 'Midnight Black', 'Custom Livery'].map((c) => [c, base]))
TEMPLATES.push(
  ['Gulfstream', 'G650ER', 'jets', 'jet1', '✈️', 'The billionaire benchmark. NY to Delhi non-stop.', JET_CFG(6500000000), true],
  ['Bombardier', 'Global 7500', 'jets', 'jet2', '✈️', 'Four living zones at 51,000 ft.', JET_CFG(6000000000)],
  ['Dassault', 'Falcon 8X', 'jets', 'jet1', '✈️', 'French elegance, trijet range.', JET_CFG(5200000000)],
  ['Embraer', 'Praetor 600', 'jets', 'jet2', '🛩️', 'Mid-size, best-in-class cabin altitude.', JET_CFG(2200000000)],
  ['Cessna', 'Citation Longitude', 'jets', 'plane', '🛩️', 'Super-midsize workhorse of the rich.', JET_CFG(2000000000)],
  ['HondaJet', 'Elite II', 'jets', 'plane', '🛩️', 'Over-the-wing engines, entry-level flex.', JET_CFG(550000000)],
  ['Airbus', 'ACJ TwoTwenty', 'jets', 'jet1', '✈️', 'Airliner turned flying palace.', JET_CFG(7500000000)],
  ['Pilatus', 'PC-24 Super Versatile Jet', 'jets', 'plane', '✈️', 'Lands on grass strips. Goes anywhere.', colors(['Executive', 'VIP'], 600000000)],
  // Pagani
  ['Pagani', 'Huayra', 'cars', 'carRed', '🏎️', 'Art that does 383 km/h. Only a handful exist.', car(['Coupe', 'Roadster', 'BC'], CAR_COLORS, 250000000), true],
  ['Pagani', 'Utopia', 'cars', 'carBugatti', '🏎️', 'Manual gearbox in a hypercar. Purist heaven.', car(['Standard', 'Bespoke'], CAR_COLORS, 280000000)],
  ['Pagani', 'Zonda R', 'cars', 'carRed', '🏎️', 'Track-only legend. The scream of the gods.', car(['R', 'Revolucion'], CAR_COLORS, 300000000)],
  ['Koenigsegg', 'Jesko', 'cars', 'carBlue', '🏎️', '1600 hp, 480 km/h target. Swedish madness.', car(['Absolut', 'Attack'], CAR_COLORS, 260000000)],
  ['McLaren', 'P1', 'cars', 'carRed', '🏎️', 'Hybrid hypercar holy trinity member.', car(['Standard', 'GTR'], CAR_COLORS, 180000000)],
)

// ——— Toys: LEGO + Hot Wheels ———
TEMPLATES.push(
  ['LEGO', 'Star Wars Millennium Falcon', 'toys', 'lego1', '🚀', '7541 pieces. The Ultimate Collector Series flex.', V(['Standard 75257', 12999], ['UCS 75192', 84999])],
  ['LEGO', 'Technic Bugatti Chiron', 'toys', 'lego1', '🏎️', '3599 pcs of working gearbox and W16 pistons.', V(['Standard', 39999])],
  ['LEGO', 'Icons Titanic', 'toys', 'lego1', '🚢', '9090 pieces. 1.35 metres of legend.', V(['Standard 10294', 67999])],
  ['LEGO', 'Harry Potter Hogwarts Castle', 'toys', 'lego2', '🏰', '6020 pieces of pure Potterhead joy.', V(['Standard 71043', 34999])],
  ['LEGO', 'Architecture Taj Mahal', 'toys', 'lego2', '🕌', '5923 pieces. Desi pride on the shelf.', V(['Standard 21056', 32999])],
  ['LEGO', 'City Police Station', 'toys', 'lego2', '🚓', 'Cops, robbers, a helicopter. Endless play.', V(['Standard 60316', 4999], ['Deluxe', 7499])],
  ['LEGO', 'Botanicals Bouquet', 'toys', 'lego2', '💐', 'Flowers that never wilt. Aesthetic desk goals.', combo(['Flower Bouquet', 'Wildflower', 'Orchid'], V(['Standard', 4499]))],
  ['LEGO', 'Minecraft The Crafting Table', 'toys', 'lego1', '⛏️', 'Blocky game, now actual blocks.', V(['Standard', 5999])],
  ['LEGO', 'Ninjago Temple', 'toys', 'lego1', '🐉', 'Spinjitzu ninjas ka HQ.', V(['Standard', 8999])],
  ['LEGO', 'Collectible Minifigure', 'toys', 'figure', '🧑‍🚀', 'Blind-box surprise. Gotta catch em all.', combo(['Series 25', 'Marvel', 'Disney 100'], V(['Single', 599], ['Full box of 6', 3299]))],
  ['Hot Wheels', '20-Car Gift Pack', 'toys', 'hotwheels', '🚗', 'Twenty 1:64 diecast beasts. Bachpan unlocked.', V(['20-Pack', 1899], ['50-Pack', 4299])],
  ['Hot Wheels', 'Ultimate Garage Playset', 'toys', 'hotwheels', '🅿️', 'Multi-level tower with a shark. Yes, a shark.', V(['City Garage', 12999])],
  ['Hot Wheels', 'Track Builder Loop Kit', 'toys', 'hotwheels', '🌀', 'Loops, launchers, chaos on the floor.', combo(['Loop Kit', 'Stunt Box', 'Mega Loop'], V(['Standard', 1499], ['Deluxe', 2999]))],
  ['Hot Wheels', 'Monster Trucks 5-Pack', 'toys', 'hotwheels', '👹', 'Giant tyres, tiny prices, big crashes.', V(['5-Pack', 2499])],
  ['Hot Wheels', 'Premium Car Culture', 'toys', 'hotwheels', '🏁', 'Real Riders rubber tyres. Collector grade.', combo(['JDM Legends', 'Euro Speed', 'Modern Classics'], V(['Single', 799], ['5-Pack', 3499]))],
)

// ——— Grocery: dairy, produce, bakery, dry fruits, staples ———
TEMPLATES.push(
  ['Amul', 'Toned Milk Pouch', 'grocery', 'dairyMilk', '🥛', 'Roz subah ka sabse zaroori delivery.', combo(['Toned', 'Full Cream', 'Double Toned'], V(['500ml', 27], ['1L', 54], ['Pack of 6', 310]))],
  ['Amul', 'Butter', 'grocery', 'dairyMilk', '🧈', 'Utterly butterly. Bas.', V(['100g', 62], ['500g', 285])],
  ['Amul', 'Cheese Slices', 'grocery', 'cheese', '🧀', 'Sandwich ka MVP.', V(['Pack of 5', 92], ['Pack of 10', 175])],
  ['Amul', 'Paneer Fresh Block', 'grocery', 'cheese', '🧆', 'Butter masala se pehle ka step.', V(['200g', 95], ['500g', 225])],
  ['Mother Dairy', 'Curd Cup', 'grocery', 'milkPour', '🥣', 'Khaana adhoora hai iske bina.', V(['400g', 45], ['1kg', 95])],
  ['Epigamia', 'Greek Yogurt', 'grocery', 'milkPour', '🍦', 'Protein wala dessert. Guilt-free-ish.', combo(['Mango', 'Blueberry', 'Vanilla', 'Strawberry'], V(['90g', 55], ['Pack of 4', 210]))],
  ['Nandini', 'Fresh Ghee', 'grocery', 'dairyMilk', '🫕', 'Dadi bolti thi ek chamach roz.', V(['200ml', 175], ['500ml', 410], ['1L', 780])],
  ['FarmFresh', 'Daily Vegetable Basket', 'grocery', 'vegSpread', '🥬', 'Aaj ki sabzi, aaj hi tudi.', V(['Small (5 items)', 199], ['Family (10 items)', 379], ['Weekly (15 items)', 549])],
  ['FarmFresh', 'Onion Potato Combo', 'grocery', 'potato', '🥔', 'Ghar ki foundation. Literally.', V(['1kg + 1kg', 78], ['2kg + 2kg', 149])],
  ['FarmFresh', 'Tomato', 'grocery', 'vegMix', '🍅', 'Price roz badalta hai, pyaar nahi.', V(['500g', 32], ['1kg', 60])],
  ['FarmFresh', 'Leafy Greens Pack', 'grocery', 'vegSpread', '🥗', 'Palak, methi, dhaniya — sab fresh.', combo(['Spinach', 'Methi', 'Coriander', 'Mint'], V(['250g', 25], ['500g', 45]))],
  ['FarmFresh', 'Exotic Veggies Box', 'grocery', 'vegMix', '🫑', 'Broccoli, zucchini, bell peppers.', V(['Mixed 1kg', 289])],
  ['FruitCart', 'Seasonal Fruit Box', 'grocery', 'fruits', '🍎', 'Jo season mein hai, wahi sabse meetha.', V(['Small', 249], ['Large', 449], ['Premium', 699])],
  ['FruitCart', 'Banana Bunch', 'grocery', 'banana', '🍌', 'Gym ke pehle ya baad. Dono.', V(['6 pcs', 45], ['12 pcs', 82])],
  ['FruitCart', 'Alphonso Mango Crate', 'grocery', 'fruitMix', '🥭', 'Ratnagiri se. Season ka intezaar tha.', V(['1 dozen', 899], ['2 dozen', 1699])],
  ['FruitCart', 'Imported Fruit Mix', 'grocery', 'fruitMix', '🥝', 'Kiwi, dragon fruit, avocado.', V(['Mixed pack', 549])],
  ['BakeHouse', 'Whole Wheat Bread', 'grocery', 'breadSlice', '🍞', 'Toast, sandwich, ya seedha.', combo(['Whole Wheat', 'Multigrain', 'White', 'Sourdough'], V(['400g', 45], ['800g', 82]))],
  ['BakeHouse', 'Butter Croissant', 'grocery', 'croissant', '🥐', 'Flaky layers, zero regret.', V(['Pack of 2', 110], ['Pack of 6', 299])],
  ['BakeHouse', 'Artisan Sourdough Loaf', 'grocery', 'bread', '🥖', '48-hour ferment. Crust perfection.', V(['Half', 180], ['Full', 320])],
  ['BakeHouse', 'Bakery Fresh Bun Pack', 'grocery', 'bakery', '🍔', 'Burger night ready.', combo(['Burger Buns', 'Pav', 'Brioche'], V(['Pack of 6', 55], ['Pack of 12', 99]))],
  ['BakeHouse', 'Assorted Cookie Jar', 'grocery', 'bakery', '🍪', 'Chai ke saath khatam ho jaata hai.', combo(['Choco Chip', 'Butter', 'Oatmeal'], V(['200g', 175], ['500g', 385]))],
  ['NutKing', 'Premium Almonds', 'grocery', 'almonds', '🌰', 'Roz 5 badam, mummy ka order.', V(['250g', 289], ['500g', 549], ['1kg', 1049])],
  ['NutKing', 'Cashew Whole W240', 'grocery', 'almonds', '🥜', 'Kaju katli ka raw material.', V(['250g', 349], ['500g', 675], ['1kg', 1299])],
  ['NutKing', 'Pistachio Roasted & Salted', 'grocery', 'almonds', '🥜', 'Ek baar shuru kiya toh ruk nahi sakte.', V(['200g', 399], ['500g', 949])],
  ['NutKing', 'Medjool Dates', 'grocery', 'seedsMix', '🍯', 'Nature ka caramel. Sach mein.', V(['250g', 320], ['500g', 599])],
  ['NutKing', 'Walnut Kernels', 'grocery', 'almonds', '🧠', 'Dimaag tez, yeh sab kehte hain.', V(['250g', 419], ['500g', 799])],
  ['NutKing', 'Trail Mix & Seeds', 'grocery', 'seedsMix', '🌻', 'Pumpkin, chia, flax, sunflower.', combo(['Classic Mix', 'Protein Mix', 'Seed Mix'], V(['200g', 245], ['500g', 549]))],
  ['NutKing', 'Dry Fruit Gift Hamper', 'grocery', 'almonds', '🎁', 'Diwali ka default gift. Kaam karta hai.', V(['Assorted 500g', 899], ['Deluxe 1kg', 1699])],
  ['DailyStaples', 'Basmati Rice', 'grocery', 'grocShelf', '🍚', 'Biryani ki neev.', combo(['Regular', 'Aged Premium'], V(['1kg', 120], ['5kg', 549]))],
  ['DailyStaples', 'Toor Dal', 'grocery', 'grocShelf', '🫘', 'Dal chawal = comfort food GOAT.', combo(['Toor', 'Moong', 'Chana', 'Masoor'], V(['500g', 85], ['1kg', 160]))],
  ['DailyStaples', 'Atta Whole Wheat', 'grocery', 'grocAisle', '🌾', 'Roti ka asli hero.', V(['1kg', 55], ['5kg', 249], ['10kg', 470])],
  ['DailyStaples', 'Cooking Oil', 'grocery', 'grocAisle', '🫗', 'Sunflower, mustard, ya olive.', combo(['Sunflower', 'Mustard', 'Groundnut', 'Olive'], V(['1L', 145], ['5L', 690]))],
  ['DailyStaples', 'Sugar & Salt Combo', 'grocery', 'grocShelf', '🧂', 'Kitchen ka basic pair.', V(['1kg each', 78])],
  ['DailyStaples', 'Monthly Grocery Hamper', 'grocery', 'produce', '🛒', 'Poora mahina sorted, ek click mein.', V(['Bachelor Pack', 1299], ['Family Pack', 2799], ['Jumbo Pack', 4499]), true],
  ['DailyStaples', 'Fresh Market Basket', 'grocery', 'market', '🧺', 'Mandi se seedha ghar.', V(['Weekly', 649], ['Fortnightly', 1149])],
)

// ——— Artificial / fashion jewellery ———
TEMPLATES.push(
  ['Zaveri Pearls', 'Kundan Choker Set', 'jewels', 'diamondSet', '💎', 'Shaadi season ka must-have. Real lagta hai.', colors(['Gold Tone', 'Rose Gold', 'Silver Tone'], 1299)],
  ['Zaveri Pearls', 'Temple Jewellery Set', 'jewels', 'goldChain', '🛕', 'South Indian classic. Antique finish.', colors(['Antique Gold', 'Matte Gold'], 1899)],
  ['Zaveri Pearls', 'Pearl Necklace Set', 'jewels', 'pearlSet', '🦪', 'Elegant, understated, always works.', colors(['Classic White', 'Pastel Pink', 'Grey'], 899)],
  ['Zaveri Pearls', 'Polki Bridal Set', 'jewels', 'diamondSet', '👰', 'Full bridal look without the locker.', V(['Necklace + Earrings', 2499], ['Full Set + Maang Tikka', 3799])],
  ['Accessorize', 'Jhumka Earrings', 'jewels', 'earrings', '🪘', 'Kurta ho ya dress, jhumka fits.', colors(['Gold', 'Oxidised Silver', 'Rose Gold', 'Emerald'], 449)],
  ['Accessorize', 'Oxidised Silver Earrings', 'jewels', 'earrings', '🌙', 'Boho-Indie vibe, instant.', colors(['Silver', 'Antique'], 349)],
  ['Accessorize', 'Hoop Earrings Set', 'jewels', 'earrings', '⭕', 'Small, medium, large — teeno.', V(['Set of 3', 399], ['Set of 6', 649])],
  ['Accessorize', 'Stud Earrings Pack', 'jewels', 'pearls', '✨', 'Daily wear, office safe.', V(['Pack of 6', 499], ['Pack of 12', 849])],
  ['Accessorize', 'Layered Chain Necklace', 'jewels', 'pendant', '⛓️', 'Ek pehno, teen dikhte hain.', colors(['Gold', 'Silver', 'Rose Gold'], 599)],
  ['Accessorize', 'Pendant Necklace', 'jewels', 'pendant', '💠', 'Minimal, roz pehen sakte ho.', colors(['Moon', 'Heart', 'Evil Eye', 'Initial'], 449)],
  ['Accessorize', 'Choker Necklace', 'jewels', 'necklaceWorn', '🎀', 'Neckline ko frame karta hai.', colors(['Velvet Black', 'Gold Chain', 'Pearl'], 379)],
  ['Accessorize', 'Bangle Set', 'jewels', 'bangle', '💫', 'Khan-khan wali khushi.', colors(['Gold Tone', 'Silver Tone', 'Multicolour'], 549)],
  ['Accessorize', 'Cuff Bracelet', 'jewels', 'bangle', '🔗', 'Statement piece, ek hi kaafi.', colors(['Gold', 'Silver', 'Rose Gold'], 499)],
  ['Accessorize', 'Charm Bracelet', 'jewels', 'bangle', '🍀', 'Har charm ki apni kahani.', V(['Base + 3 charms', 699], ['Base + 7 charms', 1099])],
  ['Accessorize', 'Adjustable Ring Set', 'jewels', 'pearls', '💍', 'Size ka tension khatam.', V(['Set of 4', 399], ['Set of 8', 649])],
  ['Accessorize', 'Statement Cocktail Ring', 'jewels', 'diamondSet', '🍸', 'Party mein sabki nazar yahan.', colors(['Emerald', 'Ruby', 'Sapphire', 'Clear'], 549)],
  ['Accessorize', 'Anklet Pair', 'jewels', 'bangle', '🦶', 'Payal ki awaaz, nostalgia instant.', colors(['Silver Tone', 'Gold Tone', 'Beaded'], 349)],
  ['Accessorize', 'Nose Pin Set', 'jewels', 'pearls', '💗', 'Pierced ya press-on, dono.', V(['Set of 3', 299])],
  ['Accessorize', 'Maang Tikka', 'jewels', 'goldChain', '👑', 'Ethnic look ka finishing touch.', colors(['Kundan', 'Pearl', 'Oxidised'], 649)],
  ['Accessorize', 'Hair Accessory Set', 'jewels', 'pearlSet', '🪮', 'Clips, pins, scrunchies — sab.', V(['Set of 10', 349], ['Set of 20', 599])],
)

// ——— Women's nightwear & loungewear ———
TEMPLATES.push(
  ['SnoozeCo', 'Cotton Pyjama Set', 'fashion', 'lounge', '🌙', 'Ghar pehnne wala best outfit.', combo(['Blush Pink', 'Sage', 'Navy', 'Grey'], ['S', 'M', 'L', 'XL'].map((z) => [z, 1099]))],
  ['SnoozeCo', 'Satin Night Suit', 'fashion', 'lounge', '✨', 'Silky, cool, main-character energy.', combo(['Champagne', 'Wine', 'Emerald'], ['S', 'M', 'L', 'XL'].map((z) => [z, 1699]))],
  ['SnoozeCo', 'Night Dress', 'fashion', 'romper', '👗', 'Ek dum comfy, ek dum cute.', combo(['Floral', 'Solid Black', 'Powder Blue'], ['S', 'M', 'L', 'XL'].map((z) => [z, 899]))],
  ['SnoozeCo', 'Lounge Co-ord Set', 'fashion', 'lounge', '🛋️', 'WFH uniform, honestly.', combo(['Oatmeal', 'Dusty Rose', 'Charcoal'], ['S', 'M', 'L', 'XL'].map((z) => [z, 1399]))],
  ['SnoozeCo', 'Shorts & Tee Night Set', 'fashion', 'romper', '🩳', 'Summer nights sorted.', combo(['Grey Melange', 'Mint', 'Lilac'], ['S', 'M', 'L', 'XL'].map((z) => [z, 799]))],
  ['SnoozeCo', 'Robe & Slip Set', 'fashion', 'lounge', '🕊️', 'Hotel-suite vibes at home.', combo(['Ivory', 'Blush', 'Black'], ['S', 'M', 'L'].map((z) => [z, 1999]))],
  ['SnoozeCo', 'Fleece Winter Pyjama', 'fashion', 'lounge', '🧣', 'Sardi mein nikalna hi nahi hai.', combo(['Teal', 'Maroon', 'Grey'], ['S', 'M', 'L', 'XL'].map((z) => [z, 1499]))],
  ['SnoozeCo', 'Printed Sleep Tee', 'fashion', 'romper', '🐼', 'Oversized, soft, meme-printed.', combo(['Panda', 'Cat', 'Sloth', 'Plain'], ['Free Size', 'L', 'XL'].map((z) => [z, 599]))],
)

// ——— Everyday accessories ———
TEMPLATES.push(
  ['UrbanCarry', 'Everyday Tote Bag', 'accessories', 'tanBag', '👜', 'Laptop, lunch, life — sab fit.', colors(['Tan', 'Black', 'Olive', 'Cream'], 1299)],
  ['UrbanCarry', 'Mini Sling Bag', 'accessories', 'navyBag', '👝', 'Phone, cards, lipstick. Done.', colors(['Navy', 'Beige', 'Rust', 'Black'], 799)],
  ['UrbanCarry', 'Laptop Backpack', 'accessories', 'backpack', '🎒', 'Padded, water-resistant, commute-proof.', colors(['Charcoal', 'Navy', 'Olive'], 1899)],
  ['UrbanCarry', 'Canvas Belt', 'accessories', 'fashion', '🪢', 'Simple cheez, poora look badalti hai.', colors(['Black', 'Brown', 'Tan'], 549)],
  ['UrbanCarry', 'Silk Scarf', 'accessories', 'fashion', '🧣', 'Neck pe, bag pe, ya hair pe.', colors(['Floral', 'Geometric', 'Solid Red', 'Monochrome'], 649)],
  ['UrbanCarry', 'Sunglasses Wayfarer', 'accessories', 'wayfarer', '🕶️', 'UV protection + instant confidence.', colors(['Black', 'Tortoise', 'Clear'], 999)],
  ['UrbanCarry', 'Oversized Sunglasses', 'accessories', 'beachShades', '😎', 'Beach-ready, paparazzi-ready.', colors(['Black', 'Brown Gradient', 'Rose'], 1199)],
  ['UrbanCarry', 'Card Holder Wallet', 'accessories', 'fashion', '💳', 'Slim, RFID-safe, pocket-friendly.', colors(['Black', 'Tan', 'Navy'], 699)],
  ['UrbanCarry', 'Hair Claw Clip Set', 'accessories', 'pearlSet', '🦋', 'Messy bun, but make it fashion.', V(['Set of 4', 399], ['Set of 8', 649])],
  ['UrbanCarry', 'Watch Strap Set', 'accessories', 'watchMinimal', '⌚', 'Ek watch, teen mood.', colors(['Leather Brown', 'Black Silicone', 'Steel Mesh'], 899)],
)

// ——— More stationery ———
TEMPLATES.push(
  ['InkWell', 'Hardbound Notebook', 'stationery', 'notebookFlat', '📓', 'Pehla page likhne ka pressure, har baar.', combo(['Ruled', 'Dotted', 'Plain', 'Grid'], V(['A5', 349], ['A4', 549]))],
  ['InkWell', 'Fountain Pen', 'stationery', 'penNib', '🖋️', 'Handwriting suddenly acceptable.', colors(['Black', 'Burgundy', 'Navy'], 899)],
  ['InkWell', 'Gel Pen Pack', 'stationery', 'pens', '🖊️', 'Exam se pehle ka ritual.', V(['Pack of 5', 125], ['Pack of 10', 230], ['Pack of 20', 420])],
  ['InkWell', 'Rollerball Pen', 'stationery', 'penBlack', '✒️', 'Smooth glide, zero smudge.', colors(['Matte Black', 'Silver', 'Gold'], 649)],
  ['InkWell', 'Desk Organiser Set', 'stationery', 'deskFlat', '🗂️', 'Table saaf, dimaag saaf.', V(['3-piece', 799], ['5-piece', 1249])],
  ['InkWell', 'Sticky Notes Mega Pack', 'stationery', 'deskFlat', '🗒️', 'Deadline management, physical edition.', V(['400 sheets', 249], ['800 sheets', 429])],
  ['InkWell', 'Highlighter Set', 'stationery', 'pens', '🖍️', 'Poora page yellow ho jaata hai.', V(['Pack of 5', 175], ['Pack of 10', 319])],
  ['InkWell', 'Planner & Journal', 'stationery', 'notebookFlat', '📅', 'January mein josh, February mein dust.', combo(['Daily', 'Weekly', 'Undated'], V(['Standard', 649], ['Deluxe', 999]))],
  ['InkWell', 'Sketching Pencil Kit', 'stationery', 'penNib', '✏️', '2H se 8B tak, poora range.', V(['12-piece', 449], ['24-piece', 799])],
  ['InkWell', 'Washi Tape & Sticker Set', 'stationery', 'deskFlat', '🎨', 'Journal ko pretty banane ka kit.', V(['20-piece', 349], ['50-piece', 699])],
)

// ——— More cosmetics ———
TEMPLATES.push(
  ['Glowuh', 'Matte Liquid Lipstick', 'beauty', 'lipstick', '💄', 'Transfer-proof. Chai bhi survive karti hai.', colors(['Brick Red', 'Nude Mauve', 'Berry', 'Terracotta', 'Fuchsia'], 649)],
  ['Glowuh', 'Lip & Cheek Tint', 'beauty', 'rose', '🌸', 'Ek product, do kaam. Multitasker.', colors(['Rose', 'Peach', 'Coral', 'Plum'], 549)],
  ['Glowuh', 'Eyeshadow Palette', 'beauty', 'palette', '🎨', '18 shades, infinite looks.', combo(['Nude Edit', 'Smoky Edit', 'Festive Edit'], V(['Standard', 1299], ['Pro', 1899]))],
  ['Glowuh', 'Kajal & Eyeliner Duo', 'beauty', 'kajal', '👁️', 'Winged liner ki practice zaroori hai.', colors(['Intense Black', 'Brown', 'Navy'], 449)],
  ['Glowuh', 'Mascara Volume Boost', 'beauty', 'makeupFace', '🦋', 'Lashes ko drama chahiye.', colors(['Black', 'Waterproof Black'], 599)],
  ['Glowuh', 'Foundation Stick', 'beauty', 'makeupFlat', '🧴', '12 shades — Indian skin ke liye actually.', colors(['Porcelain', 'Ivory', 'Beige', 'Sand', 'Caramel', 'Espresso'], 899)],
  ['Glowuh', 'Compact Powder', 'beauty', 'makeupFlat', '🪞', 'Oil control, touch-up ready.', colors(['Fair', 'Medium', 'Deep'], 499)],
  ['Glowuh', 'Blush & Highlighter Palette', 'beauty', 'palette', '✨', 'Glow up, literally.', combo(['Warm', 'Cool', 'Neutral'], V(['Duo', 749], ['Quad', 1149]))],
  ['Glowuh', 'Concealer', 'beauty', 'tube', '🫥', 'Raat ki neend ka alibi.', colors(['Light', 'Medium', 'Deep'], 549)],
  ['Glowuh', 'Setting Spray', 'beauty', 'perfume', '💦', 'Makeup ko lock karo, 16 ghante.', V(['100ml', 699])],
  ['Glowuh', 'Facial Kit Salon Series', 'beauty', 'skincareFlat', '🧖‍♀️', 'Parlour trip bachao. 6 steps.', combo(['Gold', 'Diamond', 'Charcoal', 'Fruit'], V(['Single use', 349], ['Pack of 3', 899]))],
  ['Glowuh', 'Sheet Mask Pack', 'beauty', 'serum', '🎭', 'Sunday self-care non-negotiable.', combo(['Hydrating', 'Brightening', 'Detox', 'Anti-acne'], V(['Pack of 5', 449], ['Pack of 10', 799]))],
  ['Glowuh', 'Vitamin C Serum', 'beauty', 'serum', '🍊', 'Glow ka science-backed shortcut.', V(['20ml', 799], ['30ml', 1099])],
  ['Glowuh', 'Makeup Brush Set', 'beauty', 'makeupFlat', '🖌️', 'Fingers se better, guaranteed.', V(['8-piece', 899], ['14-piece', 1499])],
  ['Glowuh', 'Nail Polish Set', 'beauty', 'nails', '💅', 'Weekend ka chhota project.', combo(['Nude Edit', 'Bright Edit', 'Glitter Edit'], V(['Set of 4', 449], ['Set of 8', 799]))],
)


// ——— Menswear: shirts, trousers, tees, suits across real high-street brands ———
// Photos are generic apparel stock, deliberately: a formal shirt *is* the
// product here (unlike, say, band merch where the print is the product), so
// unbranded photography reads as real. No brand's own catalog images are used.
const SZ = ['S', 'M', 'L', 'XL', 'XXL']
const apparel = (cols, price) => combo(cols, SZ.map((z) => [z, price]))

TEMPLATES.push(
  // ---- Peter England (value formal) ----
  ['Peter England', 'Formal Shirt', 'fashion', 'shWhiteTie', '👔', 'Office ka daily driver. Iron karo, chalo.', apparel(['White', 'Sky Blue', 'Light Pink', 'Cream'], 1299)],
  ['Peter England', 'Slim Fit Check Shirt', 'fashion', 'shCheck', '👔', 'Friday casuals sorted.', apparel(['Navy Check', 'Grey Check', 'Green Check'], 1499)],
  ['Peter England', 'Formal Trousers', 'fashion', 'shTrouser', '👖', 'Crease bani rehti hai, poora din.', apparel(['Black', 'Navy', 'Dark Grey', 'Beige'], 1599)],
  ['Peter England', 'Round Neck T-Shirt', 'fashion', 'shTeeWhite', '👕', 'Basic hai, par basic hi chahiye tha.', apparel(['White', 'Navy', 'Grey Melange', 'Black'], 699)],

  // ---- Van Heusen (premium formal) ----
  ['Van Heusen', 'Egyptian Cotton Formal Shirt', 'fashion', 'shFormalBlue', '👔', 'Boardroom-ready. Wrinkle-resistant weave.', apparel(['White', 'Powder Blue', 'Lavender', 'Ivory'], 2499)],
  ['Van Heusen', 'Self-Design Formal Shirt', 'fashion', 'shShirtStack', '👔', 'Subtle texture, serious intent.', apparel(['White', 'Blue', 'Grey'], 2199)],
  ['Van Heusen', 'Flat-Front Formal Trousers', 'fashion', 'shTrouser', '👖', 'Tailored fit, all-day comfort.', apparel(['Charcoal', 'Navy', 'Black', 'Stone'], 2799)],
  ['Van Heusen', 'Two-Piece Suit', 'fashion', 'suit', '🤵', 'Shaadi, interview, ya promotion. Ready.', apparel(['Navy', 'Charcoal', 'Black'], 12999), true],
  ['Van Heusen', 'Three-Piece Wedding Suit', 'fashion', 'menswearFlat', '🤵', 'Waistcoat included. Photos mein alag dikhoge.', apparel(['Midnight Blue', 'Wine', 'Beige'], 18999)],

  // ---- Allen Solly (premium casual) ----
  ['Allen Solly', 'Casual Linen Shirt', 'fashion', 'shLightBlue', '👔', 'Friday dressing ke inventors.', apparel(['Sky Blue', 'White', 'Olive', 'Sand'], 2199)],
  ['Allen Solly', 'Chambray Casual Shirt', 'fashion', 'shChambray', '👔', 'Denim-look shirt, all-year fit.', apparel(['Indigo', 'Light Wash', 'Black'], 1999)],
  ['Allen Solly', 'Slim Fit Chinos', 'fashion', 'shChinos', '👖', 'Jeans se smart, formals se comfy.', apparel(['Khaki', 'Navy', 'Olive', 'Stone', 'Rust'], 2399)],
  ['Allen Solly', 'Polo T-Shirt', 'fashion', 'shTeePink', '👕', 'Collar hai, toh smart casual hai.', apparel(['Pink', 'Navy', 'White', 'Bottle Green'], 1599)],
  ['Allen Solly', 'Printed Casual Shirt', 'fashion', 'shShirtRack', '👔', 'Brunch-appropriate print.', apparel(['Floral Blue', 'Geometric', 'Tropical'], 2099)],

  // ---- Pantaloons (fast fashion) ----
  ['Pantaloons', 'Slim Fit Casual Shirt', 'fashion', 'shShirtRack', '👔', 'Sale mein utha lo, seriously.', apparel(['Blue', 'White', 'Maroon', 'Mustard', 'Teal'], 999)],
  ['Pantaloons', 'Graphic Print T-Shirt', 'fashion', 'shTeeGraphic', '👕', 'Meme pehen ke ghoomo.', apparel(['Black', 'White', 'Navy', 'Olive'], 599)],
  ['Pantaloons', 'Slim Fit Jeans', 'fashion', 'shJeansWorn', '👖', 'Har ladke ki alkmari ka 60%.', apparel(['Dark Wash', 'Mid Blue', 'Black', 'Light Wash'], 1499)],
  ['Pantaloons', 'Oversized T-Shirt', 'fashion', 'shTeeBlack', '👕', 'Baggy is the whole point.', apparel(['Black', 'Beige', 'Lilac', 'Sage'], 799)],
  ['Pantaloons', 'Formal Trousers', 'fashion', 'shTrouser', '👖', 'Interview ke liye ek toh chahiye.', apparel(['Black', 'Navy', 'Grey'], 1199)],

  // ---- H&M (fast fashion, global) ----
  ['H&M', 'Regular Fit Cotton Shirt', 'fashion', 'shChambray', '👔', 'Scandinavian minimal, Indian summer.', apparel(['White', 'Light Blue', 'Beige', 'Black'], 1499)],
  ['H&M', 'Relaxed Fit Printed Tee', 'fashion', 'shTeeGraphic3', '👕', 'Graphic tee jo actually acchi lagti hai.', apparel(['White', 'Black', 'Washed Blue'], 799)],
  ['H&M', 'Slim Fit Jeans', 'fashion', 'shJeansHanger', '👖', 'Stretch denim, sab din pehen sakte ho.', apparel(['Dark Denim', 'Light Denim', 'Black', 'Grey'], 1999)],
  ['H&M', 'Cotton Crew-Neck 3-Pack', 'fashion', 'shTeeBlackFlat', '👕', 'Teen tees, ek daam. Maths simple hai.', apparel(['White/Black/Grey', 'Navy Mix', 'Earth Mix'], 1299)],
  ['H&M', 'Cargo Trousers', 'fashion', 'shChinos', '👖', 'Pockets. So many pockets.', apparel(['Khaki', 'Black', 'Olive'], 2299)],

  // ---- Rare Rabbit (premium contemporary) ----
  ['Rare Rabbit', 'Signature Cotton Shirt', 'fashion', 'shFormalBlue', '🐰', 'Fit itna accha, tareef aayegi.', apparel(['Ecru', 'Cobalt', 'Black', 'Olive'], 3299)],
  ['Rare Rabbit', 'Textured Resort Shirt', 'fashion', 'shShirtRack', '🐰', 'Goa trip ka official uniform.', apparel(['Sand', 'Sage', 'Terracotta'], 3599)],
  ['Rare Rabbit', 'Relaxed Trousers', 'fashion', 'shTrouser', '👖', 'Drape jo mehnga lagta hai. Kyunki hai.', apparel(['Charcoal', 'Beige', 'Black'], 3999)],
  ['Rare Rabbit', 'Heavyweight Tee', 'fashion', 'shTeeBlack', '🐰', '240 GSM. Ek baar pehen ke samjho.', apparel(['Off White', 'Black', 'Dusty Pink', 'Forest'], 1799)],
  ['Rare Rabbit', 'Overshirt', 'fashion', 'shCheck', '🐰', 'Shirt bhi, jacket bhi. Dono jeeta.', apparel(['Checked Brown', 'Navy', 'Olive'], 4299)],

  // ---- Louis Vuitton (luxury) ----
  ['Louis Vuitton', 'Monogram Cotton Shirt', 'fashion', 'shShirtStack', '💼', 'Ek shirt, ek EMI. Worth it? Aap batao.', apparel(['White', 'Navy', 'Black'], 89000)],
  ['Louis Vuitton', 'Damier Print T-Shirt', 'fashion', 'shTeeGraphicW', '💼', 'Logo hi personality hai. Fair enough.', apparel(['White', 'Black', 'Grey'], 68000)],
  ['Louis Vuitton', 'Tailored Wool Trousers', 'fashion', 'shTrouser', '💼', 'Crease permanent, price bhi.', apparel(['Charcoal', 'Black', 'Navy'], 125000)],
  ['Louis Vuitton', 'Two-Piece Wool Suit', 'fashion', 'suit', '💼', 'Shaadi mein sabse mehnga banda aap.', apparel(['Midnight', 'Charcoal', 'Black'], 385000)],
  ['Louis Vuitton', 'Denim Jeans', 'fashion', 'shJeansStack', '💼', 'Jeans ki keemat mein Activa aa jaaye.', apparel(['Indigo', 'Washed Black'], 98000)],
)

// ——— REAL FMCG via Open Food Facts ———
// Genuinely real products: names, brands and pack photographs come from the
// Open Food Facts open database (ODbL), pinned here at build time — the same
// pattern as Open Library covers for books and iTunes art for K-pop albums.
TEMPLATES.push(
  ['Parle', 'Parle-G Biscuit', 'snacks', 'https://images.openfoodfacts.org/images/products/890/171/913/4845/front_en.11.full.jpg', '🍪', 'Sham ki chai ka default partner.', V(['45gm', 17], ['Pack of 4', 67])],
  ['Nestlé', 'Perrier', 'snacks', 'https://images.openfoodfacts.org/images/products/761/303/583/3272/front_en.149.full.jpg', '🛒', 'Roz ki list mein chupke se aa jaata hai.', V(['1 l', 134], ['Pack of 4', 523])],
  ['Sting', 'Sting Energy', 'grocery', 'https://images.openfoodfacts.org/images/products/890/208/000/0227/front_en.81.full.jpg', '🥤', 'Deadline raat ka fuel.', V(['1', 124], ['Pack of 4', 484])],
  ['Britannia', 'Bourbon', 'snacks', 'https://images.openfoodfacts.org/images/products/890/106/313/9329/front_en.14.full.jpg', '🍪', 'Dunk karo. Toota to aapki galti.', V(['50g', 39], ['Pack of 4', 153])],
  ['Red Bull', 'Energy Drink', 'snacks', 'https://images.openfoodfacts.org/images/products/000/009/016/2602/front_en.134.full.jpg', '🥤', 'Deadline raat ka fuel.', V(['250 ml', 100], ['Pack of 4', 390])],
  ['Britannia', 'Good Day - Cashew Cookies', 'snacks', 'https://images.openfoodfacts.org/images/products/890/106/309/3522/front_en.28.full.jpg', '🍪', 'Dunk karo. Toota to aapki galti.', V(['52.5 g', 11], ['Pack of 4', 43])],
  ['Britannia', 'Marie Gold Biscuit', 'snacks', 'https://images.openfoodfacts.org/images/products/890/106/316/2914/front_en.3.full.jpg', '🍪', 'Sham ki chai ka default partner.', V(['64 g', 22], ['Pack of 4', 86])],
  ['Balaji', 'Mung Dal', 'grocery', 'https://images.openfoodfacts.org/images/products/890/601/050/0559/front_es.15.full.jpg', '🌾', 'Basic hai. Isliye zaroori hai.', V(['25 g', 29], ['Pack of 4', 114])],
  ['Balaji Wafers', 'Masala Sev Murmura', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/0245/front_en.20.full.jpg', '🍟', 'Ek haath packet, doosra remote. Set.', V(['40 g', 13], ['Pack of 4', 51])],
  ['Balaji', 'Wafers panjabi tadka', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/2232/front_en.6.full.jpg', '🍟', 'Ek haath packet, doosra remote. Set.', V(['22g', 22], ['Pack of 4', 86])],
  ['Balaji', 'Wheels', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/0900/front_en.20.full.jpg', '🛒', 'Ghar mein rakhne wali cheez.', V(['22 g', 69], ['Pack of 4', 270])],
  ['Coca-Cola', 'Sprite', 'snacks', 'https://images.openfoodfacts.org/images/products/890/176/403/2912/front_en.26.full.jpg', '🥤', 'Pehla ghoont. Aankh band. Samajh gaye.', V(['250 ml', 55], ['Pack of 4', 215])],
  ['Balaji', 'Potato Wafers', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/0023/front_en.8.full.jpg', '🍟', 'Chhota packet lena tha. Bada le aaye.', V(['Std pack', 16], ['Pack of 4', 63])],
  ['Cadbury', 'Original Oreo', 'snacks', 'https://images.openfoodfacts.org/images/products/762/220/222/5512/front_en.16.full.jpg', '🍪', 'Dunk karo. Toota to aapki galti.', V(['Std pack', 26], ['Pack of 4', 102])],
  ['Tata', 'Tata Salt', 'grocery', 'https://images.openfoodfacts.org/images/products/890/404/390/1015/front_en.34.full.jpg', '🌾', 'Kitchen khali ho to sabse pehle yahi.', V(['1 kg', 153], ['Pack of 4', 597])],
  ['Quaker', 'White Oats', 'grocery', 'https://images.openfoodfacts.org/images/products/500/010/847/8119/front_en.71.full.jpg', '🥣', 'Healthy khane ka irada. Shuruaat yahin se.', V(['1.73 - 3.00', 172], ['Pack of 4', 671])],
  ['Bisleri', '1ltr MADE IN INDIA', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/729/0040/front_en.8.full.jpg', '🛒', 'Roz ki list mein chupke se aa jaata hai.', V(['1', 35], ['Pack of 4', 137])],
  ['Cadbury', 'Dairy Milk', 'snacks', 'https://images.openfoodfacts.org/images/products/762/220/233/4009/front_en.9.full.jpg', '🍫', 'Fridge mein rakho. Thanda chocolate alag level hai.', V(['11 g', 47], ['Pack of 4', 184])],
  ['Balaji', 'Chataka Pataka Tangy Tomato', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/0627/front_en.4.full.jpg', '🛒', 'Zaroorat padegi. Aaj ya kal.', V(['Std pack', 38], ['Pack of 4', 149])],
  ['Kinley', 'Mineral Water 1ltr', 'snacks', 'https://images.openfoodfacts.org/images/products/890/176/408/2405/front_en.40.full.jpg', '🥤', 'Ghar se nikle to yeh saath rakhna.', V(['6', 43], ['Pack of 4', 168])],
  ['Kissan', 'Fresh Tomato', 'grocery', 'https://images.openfoodfacts.org/images/products/890/103/089/7542/front_en.22.full.jpg', '🛒', 'Zaroorat padegi. Aaj ya kal.', V(['90g', 141], ['Pack of 4', 550])],
  ['Balaji', 'Aloo Sev', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/0337/front_en.4.full.jpg', '🍟', 'Crunch itna loud, poora ghar sun leta hai.', V(['22g', 25], ['Pack of 4', 98])],
  ['Britannia', 'Jimjam 57g (57)', 'grocery', 'https://images.openfoodfacts.org/images/products/890/106/302/9255/front_en.9.full.jpg', '🍯', 'Ek packet khatam hone tak pata bhi nahi chalta.', V(['57 g', 12], ['Pack of 4', 47])],
  ['Amul', 'Pasteurized Butter', 'grocery', 'https://images.openfoodfacts.org/images/products/890/126/201/0016/front_en.53.full.jpg', '🛒', 'Dal mein ek chamach. Baaki sab bahana hai.', V(['100.0 g', 100], ['Pack of 4', 390])],
  ['Coca-Cola', 'Thumsup', 'snacks', 'https://images.openfoodfacts.org/images/products/890/176/404/2904/front_en.6.full.jpg', '🥤', 'Barf ke saath. Warna kya fayda.', V(['1 litter', 37], ['Pack of 4', 145])],
  ['Amul', 'Masti Spiced Buttermilk 200ml', 'grocery', 'https://images.openfoodfacts.org/images/products/890/126/220/0196/front_en.54.full.jpg', '🛒', 'Pet ko aaram, garmi ko jawab.', V(['200mL', 28], ['Pack of 4', 110])],
  ['Balaji', 'Chataka pataka', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/2119/front_en.7.full.jpg', '🛒', 'Kirana list ka regular member.', V(['25', 32], ['Pack of 4', 125])],
  ['Balaji Namkeen', 'Balaji Farali Chivda', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/0078/front_en.5.full.jpg', '🛒', 'Namak, masala, aur zero pachtava.', V(['22g', 56], ['Pack of 4', 219])],
  ['Kurkure', 'Puffcorn', 'snacks', 'https://images.openfoodfacts.org/images/products/890/149/136/6052/front_en.13.full.jpg', '🛒', 'Crunch itna loud, poora ghar sun leta hai.', V(['58 g', 21], ['Pack of 4', 82])],
  ['Parle', 'Krackjack', 'snacks', 'https://images.openfoodfacts.org/images/products/890/171/913/5248/front_en.25.full.jpg', '🛒', 'Sham ki chai ka default partner.', V(['56.7g', 42], ['Pack of 4', 164])],
  ['Balaji', 'Wafers Crunchex', 'grocery', 'https://images.openfoodfacts.org/images/products/890/601/050/1570/front_en.13.full.jpg', '🍟', 'Namak, masala, aur zero pachtava.', V(['32g', 29], ['Pack of 4', 114])],
  ['Ching\'s Secret', 'Schezwan Chutney', 'snacks', 'https://images.openfoodfacts.org/images/products/890/159/586/2962/front_en.51.full.jpg', '🛒', 'Roti pe, bread pe, ya chamach se seedha.', V(['250 g', 34], ['Pack of 4', 133])],
  ['Kitkat', 'Mini chocolate coated wafer', 'snacks', 'https://images.openfoodfacts.org/images/products/890/105/800/5233/front_en.26.full.jpg', '🍟', 'Crunch itna loud, poora ghar sun leta hai.', V(['11.9g', 33], ['Pack of 4', 129])],
  ['Britannia', 'Marie Gold', 'snacks', 'https://images.openfoodfacts.org/images/products/890/106/302/3901/front_en.6.full.jpg', '🍪', 'Sham ki chai ka default partner.', V(['250', 15], ['Pack of 4', 59])],
  ['Coca-Cola', 'Diet coke', 'snacks', 'https://images.openfoodfacts.org/images/products/394/876/406/1257/front_en.4.full.jpg', '🛒', 'Samosa ke saath yahi banta hai.', V(['300 ml', 24], ['Pack of 4', 94])],
  ['Parle', 'Monaco', 'snacks', 'https://images.openfoodfacts.org/images/products/890/171/913/5118/front_en.24.full.jpg', '🛒', 'Guests ke liye rakha tha. Khud kha gaye.', V(['Std pack', 42], ['Pack of 4', 164])],
  ['Maggi', 'Masala magic', 'snacks', 'https://images.openfoodfacts.org/images/products/000/008/908/0153/front_en.8.full.jpg', '🛒', 'Hostel survival kit ka item number one.', V(['6g', 14], ['Pack of 4', 55])],
  ['Kurkure', 'Masala Munch', 'grocery', 'https://images.openfoodfacts.org/images/products/890/149/136/1026/front_en.51.full.jpg', '🍫', 'Namak, masala, aur zero pachtava.', V(['41.5g', 30], ['Pack of 4', 117])],
  ['Amul', 'Taaza Milky Milk', 'snacks', 'https://images.openfoodfacts.org/images/products/890/126/226/0121/front_en.52.full.jpg', '🛒', 'Khatam ho jaye to poora din off track.', V(['500 ml', 85], ['Pack of 4', 332])],
  ['Hindustan Coca-Cola Beverages Pvt Ltd.', 'Maaza Origina', 'snacks', 'https://images.openfoodfacts.org/images/products/890/176/409/2305/front_en.4.full.jpg', '🥤', 'Gas nahi hai to cold drink kaisa.', V(['1.2L', 58], ['Pack of 4', 227])],
  ['Balaji Wafers', 'Shing Bhujiya - Nimbu Chatka', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/0863/front_en.3.full.jpg', '🛒', 'Crunch itna loud, poora ghar sun leta hai.', V(['24g', 20], ['Pack of 4', 78])],
  ['Balaji', 'Crunchm', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/0481/front_en.3.full.jpg', '🛒', 'Ghar mein rakhne wali cheez.', V(['Std pack', 11], ['Pack of 4', 43])],
  ['Munch', 'Chocolat en poudre', 'snacks', 'https://images.openfoodfacts.org/images/products/123/456/789/0128/front_en.119.full.jpg', '🥤', 'Mood kharab ho to yahi kaam aata hai.', V(['2pcs', 77], ['Pack of 4', 301])],
  ['Parle', 'Parle-G 250g', 'snacks', 'https://images.openfoodfacts.org/images/products/890/171/912/3870/front_en.27.full.jpg', '🛒', 'Kirana list ka regular member.', V(['Std pack', 37], ['Pack of 4', 145])],
  ['Coca-Cola Company', 'Sprite', 'snacks', 'https://images.openfoodfacts.org/images/products/394/876/403/2707/front_en.11.full.jpg', '🥤', 'Barf ke saath. Warna kya fayda.', V(['740ml', 43], ['Pack of 4', 168])],
  ['Balaji Wafers', 'Sev Murmura', 'grocery', 'https://images.openfoodfacts.org/images/products/890/601/050/0214/front_en.8.full.jpg', '🍟', 'Chhota packet lena tha. Bada le aaye.', V(['25g', 28], ['Pack of 4', 110])],
  ['Patanjali', 'Doodh Biscuits', 'snacks', 'https://images.openfoodfacts.org/images/products/890/603/201/8513/front_en.3.full.jpg', '🍪', 'Guests ke liye rakha tha. Khud kha gaye.', V(['35 g', 24], ['Pack of 4', 94])],
  ['Balaji Wafers', 'Simply Salted', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/0016/front_en.24.full.jpg', '🌾', 'Chhota packet lena tha. Bada le aaye.', V(['30 g', 26], ['Pack of 4', 102])],
  ['Bingo', 'Tedhe Medhe', 'snacks', 'https://images.openfoodfacts.org/images/products/890/172/511/8938/front_en.29.full.jpg', '🛒', 'Crunch itna loud, poora ghar sun leta hai.', V(['19.2g', 37], ['Pack of 4', 145])],
  ['Parle', 'Hide & Seek 120G', 'snacks', 'https://images.openfoodfacts.org/images/products/890/171/910/5913/front_en.22.full.jpg', '🛒', 'Dunk karo. Toota to aapki galti.', V(['120g', 45], ['Pack of 4', 176])],
  ['Kissan', 'Mixed Fruit Jam', 'grocery', 'https://images.openfoodfacts.org/images/products/890/103/083/1690/front_en.32.full.jpg', '🍯', 'Fridge ka darwaza kholo, yahi dikhta hai.', V(['200g', 93], ['Pack of 4', 363])],
  ['Parle', 'Happy Happy Choco Chip Biscuit', 'snacks', 'https://images.openfoodfacts.org/images/products/890/171/913/0014/front_en.3.full.jpg', '🍪', 'Ek packet khatam hone tak pata bhi nahi chalta.', V(['63gr', 26], ['Pack of 4', 102])],
  ['Lay\'s', 'Potato Chips', 'grocery', 'https://images.openfoodfacts.org/images/products/890/149/110/1844/front_en.32.full.jpg', '🍟', 'Chhota packet lena tha. Bada le aaye.', V(['50 g', 36], ['Pack of 4', 141])],
  ['Haldiram\'s', 'Aloo bhujia', 'snacks', 'https://images.openfoodfacts.org/images/products/890/400/440/0731/front_en.4.full.jpg', '🛒', 'Chhota packet lena tha. Bada le aaye.', V(['200 gm', 33], ['Pack of 4', 129])],
  ['Haldirams', 'Haldiram\'s Soya sticks', 'snacks', 'https://images.openfoodfacts.org/images/products/890/400/440/0236/front_en.14.full.jpg', '🛒', 'Chhota packet lena tha. Bada le aaye.', V(['22g', 77], ['Pack of 4', 301])],
  ['Haldiram\'s', 'Moong Dal', 'grocery', 'https://images.openfoodfacts.org/images/products/890/400/440/3718/front_en.4.full.jpg', '🌾', 'Mahine ka rashan. Romance zero, zaroorat sau percent.', V(['18', 25], ['Pack of 4', 98])],
  ['Kellogg\'s', 'Chocos', 'grocery', 'https://images.openfoodfacts.org/images/products/890/149/900/8169/front_en.16.full.jpg', '🛒', 'Mood kharab ho to yahi kaam aata hai.', V([',', 35], ['Pack of 4', 137])],
  ['Balaji', 'Potato chips', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/0818/front_en.3.full.jpg', '🍟', 'Ek haath packet, doosra remote. Set.', V(['100 gram', 20], ['Pack of 4', 78])],
  ['Parle', 'Hide & Seek', 'snacks', 'https://images.openfoodfacts.org/images/products/890/171/911/7183/front_en.17.full.jpg', '🛒', 'Dunk karo. Toota to aapki galti.', V(['100g', 14], ['Pack of 4', 55])],
  ['Haldiram', 'Moong dal', 'grocery', 'https://images.openfoodfacts.org/images/products/890/400/440/3732/front_en.8.full.jpg', '🌾', 'Basic hai. Isliye zaroori hai.', V(['200 g', 66], ['Pack of 4', 258])],
  ['Cadbury', 'Bourn Vita 500Gram Pauch', 'snacks', 'https://images.openfoodfacts.org/images/products/000/000/914/1209/front_en.18.full.jpg', '🛒', 'Zaroorat padegi. Aaj ya kal.', V(['Std pack', 20], ['Pack of 4', 78])],
  ['Amul', 'Amul Butter', 'grocery', 'https://images.openfoodfacts.org/images/products/890/126/201/0320/front_en.3.full.jpg', '🛒', 'Roti pe lagao. Zyada lagao.', V(['200gm', 163], ['Pack of 4', 636])],
  ['Lay\'s', 'Lays Classics Salted 20rs', 'grocery', 'https://images.openfoodfacts.org/images/products/890/149/110/1837/front_en.26.full.jpg', '🌾', 'Chhota packet lena tha. Bada le aaye.', V(['50g', 10], ['Pack of 4', 39])],
  ['Nestlé', 'Maggi noodles masala', 'snacks', 'https://images.openfoodfacts.org/images/products/890/105/800/0306/front_en.10.full.jpg', '🍜', 'Extra masala daalo. Judge nobody.', V(['560 gm', 44], ['Pack of 4', 172])],
  ['Balaji Wafers', 'Scoopitos Masala Flavour', 'snacks', 'https://images.openfoodfacts.org/images/products/890/601/050/1228/front_en.5.full.jpg', '🛒', 'Crunch itna loud, poora ghar sun leta hai.', V(['Std pack', 16], ['Pack of 4', 63])],
  ['Kissan', 'Fresh Tomato Ketchup', 'grocery', 'https://images.openfoodfacts.org/images/products/890/103/090/2932/front_en.5.full.jpg', '🍯', 'Bacche isi ke bharose sabzi kha lete hain.', V(['850 g', 123], ['Pack of 4', 480])],
  ['Kellogg\'s', 'Muesli Fruit, Nut & Seeds', 'grocery', 'https://images.openfoodfacts.org/images/products/890/149/901/0513/front_en.12.full.jpg', '🥣', 'Healthy khane ka irada. Shuruaat yahin se.', V(['750 g', 156], ['Pack of 4', 609])],
  ['Haldiram', 'Phalhari Chiwda', 'snacks', 'https://images.openfoodfacts.org/images/products/890/400/440/2261/front_en.3.full.jpg', '🛒', 'Ghar mein rakhne wali cheez.', V(['45g', 97], ['Pack of 4', 379])],
  ['Tata', 'Water 1ltr', 'snacks', 'https://images.openfoodfacts.org/images/products/890/375/400/0062/front_en.3.full.jpg', '🥤', 'Bas paani hai. Par sahi waqt pe sona hai.', V(['1000ml', 37], ['Pack of 4', 145])],
  ['Kurkure', 'Solid Masti Masala Twisteez Crisps', 'snacks', 'https://images.openfoodfacts.org/images/products/890/149/136/6229/front_en.15.full.jpg', '🛒', 'Crunch itna loud, poora ghar sun leta hai.', V(['61gm', 32], ['Pack of 4', 125])],
  ['Britannia', 'Vita Marie Gold', 'snacks', 'https://images.openfoodfacts.org/images/products/890/106/301/4411/front_en.9.full.jpg', '🍪', 'Dunk karo. Toota to aapki galti.', V(['Std pack', 44], ['Pack of 4', 172])],
  ['Lay\'s', 'West Indies\' Hot \'n\' Sweet Chilli Potato Chips', 'grocery', 'https://images.openfoodfacts.org/images/products/890/149/150/3051/front_en.3.full.jpg', '🍟', 'Crunch itna loud, poora ghar sun leta hai.', V(['20g', 11], ['Pack of 4', 43])],
  ['Aquafina Is Sold By Pepsico', 'Packaged Drinking Water', 'snacks', 'https://images.openfoodfacts.org/images/products/890/208/050/4060/front_en.28.full.jpg', '🥤', 'Gas nahi hai to cold drink kaisa.', V(['1 l', 150], ['Pack of 4', 585])],
  ['Frooti', 'Frooti 125ml', 'snacks', 'https://images.openfoodfacts.org/images/products/890/257/900/1360/front_en.64.full.jpg', '🥤', 'Straw daalo aur khatam karo.', V(['125 ml', 56], ['Pack of 4', 219])],
  ['Parle Agro Appy Fizz', 'Appy Fizz', 'snacks', 'https://images.openfoodfacts.org/images/products/890/257/900/2039/front_en.3.full.jpg', '🛒', 'Ghar mein rakhne wali cheez.', V(['250ml', 24], ['Pack of 4', 94])],
  ['Lay\'s', 'Lays american cream onion', 'grocery', 'https://images.openfoodfacts.org/images/products/890/149/110/1813/front_en.40.full.jpg', '🛒', 'Crunch itna loud, poora ghar sun leta hai.', V(['55 g', 24], ['Pack of 4', 94])],
  ['The Coca-Cola Company', 'Coca-Cola', 'grocery', 'https://images.openfoodfacts.org/images/products/890/176/401/2914/front_en.29.full.jpg', '🥤', 'Barf ke saath. Warna kya fayda.', V(['250 ml', 48], ['Pack of 4', 188])],
  ['Nestlé', 'KitKat win gold', 'snacks', 'https://images.openfoodfacts.org/images/products/890/105/890/3164/front_en.29.full.jpg', '🍫', 'Chhote bacche isi ke liye pyaar karte hain.', V(['38.5 gm', 22], ['Pack of 4', 86])],
  ['Sunfeast Is Sold By Itc Limited', 'Dark Fantasy', 'snacks', 'https://images.openfoodfacts.org/images/products/890/172/501/5275/front_en.25.full.jpg', '🛒', 'Samosa ke saath yahi banta hai.', V(['69 g', 34], ['Pack of 4', 133])],
)

// ——— Ice cream ———
TEMPLATES.push(
  ['Amul', 'Vanilla Royale Tub', 'icecream', 'iceScoops', '🍦', 'Family pack. Chamach se seedha, no shame.', V(['500ml', 130], ['1L', 240])],
  ['Amul', 'Chocolate Truffle Tub', 'icecream', 'iceSundae', '🍫', 'Rich, dark, dangerous.', V(['500ml', 165], ['1L', 299])],
  ['Amul', 'Butterscotch Tub', 'icecream', 'iceScoops', '🍨', 'Crunch bits ka nasha alag hai.', V(['500ml', 140], ['1L', 255])],
  ['Kwality Wall\'s', 'Cornetto Cone', 'icecream', 'iceCone', '🍦', 'Tip pe chocolate. Wahi asli treat.', combo(['Double Chocolate', 'Butterscotch', 'Strawberry'], V(['Single', 45], ['Pack of 4', 170]))],
  ['Kwality Wall\'s', 'Feast Bar', 'icecream', 'iceKulfi', '🍫', 'Choco-coated, stick wala classic.', combo(['Chocolate', 'Badam'], V(['Single', 40], ['Pack of 6', 225]))],
  ['Kwality Wall\'s', 'Trixy Cup', 'icecream', 'iceSundae', '🍨', 'Chhota cup, poora mood fix.', V(['Single', 25], ['Pack of 8', 190])],
  ['Mother Dairy', 'Kulfi Stick', 'icecream', 'iceKulfi', '🍡', 'Malai kulfi, thelewala vibes.', combo(['Malai', 'Kesar Pista', 'Matka'], V(['Single', 35], ['Pack of 6', 199]))],
  ['Mother Dairy', 'Fruit Ice Candy', 'icecream', 'iceKulfi', '🧊', 'Garmi ka five-rupee solution.', combo(['Orange', 'Mango', 'Kala Khatta'], V(['Pack of 5', 60], ['Pack of 10', 110]))],
  ['Vadilal', 'Gulab Jamun Ice Cream', 'icecream', 'iceSundae', '🍮', 'Do desserts ek mein. Genius.', V(['500ml', 195], ['1L', 349])],
  ['Vadilal', 'Roasted Almond Cone', 'icecream', 'iceCone', '🥜', 'Badam pe badam. Worth it.', V(['Single', 50], ['Pack of 4', 185])],
  ['Havmor', 'Rajwadi Kesar Pista', 'icecream', 'iceScoops', '👑', 'Shaadi wali ice cream, ghar pe.', V(['700ml', 285])],
  ['Havmor', 'Choco Dip Bar', 'icecream', 'iceKulfi', '🍫', 'Crack karke khao. Aawaz zaroori hai.', V(['Single', 45], ['Pack of 5', 199])],
  ['Naturals', 'Tender Coconut', 'icecream', 'iceScoops', '🥥', 'Real fruit, no essence. Cult favourite.', V(['500ml', 320])],
  ['Naturals', 'Alphonso Mango', 'icecream', 'iceScoops', '🥭', 'Season ka best, tub mein.', V(['500ml', 340])],
  ['Baskin Robbins', 'Ice Cream Cake', 'icecream', 'iceSundae', '🎂', 'Birthday upgrade. Instant hero banoge.', V(['500g', 899], ['1kg', 1599])],
  ['Baskin Robbins', 'Scoop Tub', 'icecream', 'iceCones2', '🍨', 'World Class Chocolate ya Very Berry.', combo(['World Class Chocolate', 'Very Berry Strawberry', 'Mississippi Mud'], V(['450ml', 449]))],
  ['Cream Bell', 'Sandwich Bar', 'icecream', 'iceKulfi', '🥪', 'Biscuit + ice cream. Cheat code.', V(['Single', 40], ['Pack of 4', 149])],
  ['Arun', 'Family Pack Neapolitan', 'icecream', 'iceCones2', '🍧', 'Teen flavour, ek dabba. Sab khush.', V(['1L', 265])],
)

// ——— Gadgets Indians actually buy ———
// Prompted by a thread listing the tech Indian households under-buy: dash cams,
// air purifiers, dishwashers, air fryers, smart watches, AirTags. Four of the six
// were missing from the catalog entirely. Photos are Wikimedia Commons (real
// product shots, keyword-searchable) — see WM_CREDITS below for attribution,
// which CC BY / CC BY-SA require.
const WM_DASHCAM = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Dashcams_P1210466.JPG/960px-Dashcams_P1210466.JPG'
const WM_PURIFIER = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Xiaomi_Smart_Air_Purifier_2S.jpg/960px-Xiaomi_Smart_Air_Purifier_2S.jpg'
const WM_DISHWASHER = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/KitchenAid_home_dishwasher_-_Open.jpg/960px-KitchenAid_home_dishwasher_-_Open.jpg'
const WM_AIRTAG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Airtag_-_5.jpg/960px-Airtag_-_5.jpg'

TEMPLATES.push(
  // Dash cams — insurance evidence, not a gadget. Nobody buys one until they need one.
  ['70mai', 'Dash Cam A510', 'gadgets', WM_DASHCAM, '🎥', 'Front + rear 2.5K. Insurance claim ka proof.', V(['Front only', 8999], ['Front + Rear Kit', 11999])],
  ['70mai', 'Dash Cam A200', 'gadgets', WM_DASHCAM, '🎥', 'Entry level, kaam poora karta hai.', V(['1080p', 3999])],
  ['Qubo', 'Dashcam Pro 4K', 'gadgets', WM_DASHCAM, '🎥', 'Hero Group ka. Emergency SOS built in.', V(['4K', 7490], ['4K + 64GB card', 8490])],
  ['DDPAI', 'Mini5 4K Dash Cam', 'gadgets', WM_DASHCAM, '🎥', 'Built-in 64GB, no card jhanjhat.', V(['4K', 12999])],

  // Air purifiers — Delhi in November makes this a medical device, not a luxury.
  ['Xiaomi', 'Smart Air Purifier 4 Lite', 'home', WM_PURIFIER, '🌬️', 'Delhi November ka sabse zaroori gadget.', V(['360 m³/h', 9999])],
  ['Xiaomi', 'Smart Air Purifier 4 Pro', 'home', WM_PURIFIER, '🌬️', 'Bade hall ke liye. App se AQI dekho.', V(['500 m³/h', 24999])],
  ['Philips', 'Air Purifier AC1215', 'home', WM_PURIFIER, '🌬️', 'HEPA + carbon. Allergy walon ka favourite.', V(['333 m³/h', 12995])],
  ['Honeywell', 'Air Touch V2', 'home', WM_PURIFIER, '🌬️', 'PM2.5 display, so you know how bad it is.', V(['300 m³/h', 14999])],
  ['Dyson', 'Purifier Cool Formaldehyde', 'home', WM_PURIFIER, '🌬️', 'Purifier + fan. Imported, so duty bhi.', colors(['White/Gold', 'Nickel'], 57900), true],

  // Dishwashers — the appliance Indian kitchens argue about most ("masala nahi jaata").
  ['Bosch', 'Series 2 Dishwasher', 'kitchen', WM_DISHWASHER, '🍽️', 'Haan, masala bhi nikal jaata hai. 12 place.', colors(['Silver Inox', 'White'], 36990)],
  ['Bosch', 'Series 4 Dishwasher', 'kitchen', WM_DISHWASHER, '🍽️', 'Intensive Kadhai mode. Literally.', colors(['Silver Inox', 'Black'], 49990), true],
  ['IFB', 'Neptune VX Dishwasher', 'kitchen', WM_DISHWASHER, '🍽️', 'Indian utensils ke liye banaya gaya.', V(['12 Place', 42990])],
  ['Voltas Beko', '8 Place Dishwasher', 'kitchen', WM_DISHWASHER, '🍽️', 'Chhote parivaar, chhota counter.', V(['8 Place', 27990])],
  ['LG', 'QuadWash Dishwasher', 'kitchen', WM_DISHWASHER, '🍽️', 'TrueSteam. Chamak dekhne layak hai.', V(['14 Place', 57990])],

  // AirTags — nobody thinks they need one until a bag goes missing at Indira Gandhi.
  ['Apple', 'AirTag', 'gadgets', WM_AIRTAG, '📍', 'Chaabi, bag, ya bhoolne wala dost.', V(['1 Pack', 3490], ['4 Pack', 11900])],
  ['Apple', 'AirTag Leather Loop', 'gadgets', WM_AIRTAG, '📍', 'Loop ke bina AirTag latkaoge kaise?', colors(['Midnight', 'Saddle Brown'], 3500)],

  // Air fryers — the catalog had exactly one. It is the most-gifted appliance in India.
  ['Instant', 'Vortex Air Fryer', 'kitchen', 'kitchen', '🍟', 'Samosa reheat karo, crisp wapas aayega.', V(['4L', 8995], ['5.7L', 11995])],
  ['Havells', 'Air Fryer Prolife', 'kitchen', 'kitchen', '🍟', 'Budget air fryer jo chalta hai.', V(['4L', 6499])],
  ['Agaro', 'Grand Air Fryer', 'kitchen', 'kitchen', '🍟', 'Bade batch ke liye. Family-size fries.', V(['12L Oven Style', 9999])],

  // Smart watches — real Indian volume brands, not the Swiss stuff in /watches.
  ['Noise', 'ColorFit Pro 5', 'gadgets', 'appleWatch', '⌚', 'AMOLED, 7-day battery, 3k ke andar.', colors(['Jet Black', 'Silver Grey', 'Rose Pink'], 3499)],
  ['boAt', 'Wave Sigma 3', 'gadgets', 'appleWatch', '⌚', 'Bada display, BT calling, sasta.', colors(['Active Black', 'Cherry Blossom', 'Teal Green'], 2299)],
  ['Fire-Boltt', 'Phoenix Ultra', 'gadgets', 'appleWatch', '⌚', 'SpO2, heart rate, 120 sports modes.', colors(['Black', 'Gold', 'Blue'], 1799)],
  ['Samsung', 'Galaxy Watch 7', 'gadgets', 'appleWatch', '⌚', 'Android walon ka Apple Watch.', combo(['Green', 'Cream'], V(['40mm', 29999], ['44mm', 32999]))],
)

// Attribution for Wikimedia Commons photos. CC BY and CC BY-SA both require
// crediting the author — the catalog used Commons images before this without any
// credit, which was a licence breach on my part. Rendered in the About sheet.
export const WM_CREDITS = [
  { what: 'Maruti Swift', file: 'Maruti Suzuki Swift 4456.JPG', author: 'Premnath Kudva', licence: 'CC BY-SA 3.0' },
  { what: 'Tata Nexon', file: '2023 Tata Nexon XZA+ front view.jpg', author: 'Dairokkan9', licence: 'CC BY-SA 4.0' },
  { what: 'Tata Harrier', file: 'Tata Buzzard Sport, GIMS 2019, Le Grand-Saconnex (GIMS0651).jpg', author: 'Matti Blume', licence: 'CC BY-SA 4.0' },
  { what: 'Mahindra XUV700', file: '2021 Mahindra XUV700 2.2 AX7 (India) front view.png', author: 'DriveSpark', licence: 'CC BY 3.0' },
  { what: 'Mahindra Thar', file: 'Mahindra Thar Photoshoot At Perupalem Beach (West Godavari District,AP,India ) Djdavid.jpg', author: 'DjDavid1998', licence: 'CC BY-SA 4.0' },
  { what: 'Mahindra Scorpio', file: 'Mahindra Scorpio 2014.JPG', author: 'Ask27', licence: 'CC BY-SA 4.0' },
  { what: 'Hyundai Creta', file: 'HYUNDAI CRETA , iX25 (SU2) China (1).jpg', author: 'Dinkun Chen', licence: 'CC BY-SA 4.0' },
  { what: 'Tata Punch', file: '2021 Tata Punch Creative (India) front view 01.png', author: 'Athira Murali', licence: 'CC BY 3.0' },
  { what: 'Tata Safari', file: 'Tata Safari 4x4 front.jpg', author: 'Rutger van der Maar', licence: 'CC BY 2.0' },
  { what: 'Maruti Baleno', file: '2022 Maruti Suzuki Baleno Alpha (India) front view.jpg', author: 'Milind Kwatra', licence: 'CC BY 3.0' },
  { what: 'Maruti Fronx', file: 'Suzuki Fronx (front).jpg', author: 'Jason Lawrence', licence: 'CC BY 2.0' },
  { what: 'iPad Pro', file: 'Apple iPad Pro 11.jpg', author: '彭家杰', licence: 'CC BY-SA 4.0' },
  { what: 'Dyson cordless vacuum', file: 'Dyson Cyclone V10 Absolute cordless stick vacuum.jpg', author: 'MattClayt', licence: 'CC BY-SA 4.0' },
  { what: 'Toyota Fortuner', file: 'Toyota Fortuner India.jpg', author: 'Saiphani02', licence: 'CC BY-SA 4.0' },
  { what: 'Toyota Innova Crysta', file: 'Toyota Innova Crysta 2.4 Z side.jpg', author: 'Premnath Kudva', licence: 'CC BY-SA 4.0' },
  { what: 'iPhone 16 Pro Max', file: 'IPhone 16 Pro Max Desert Titanium Rear.png', author: 'Padgriffin', licence: 'CC BY 4.0' },
  { what: 'iPhone 15 Pro', file: 'Apple iPhone 15 Pro.jpg', author: 'IPHONE 15', licence: 'CC BY-SA 4.0' },
  { what: 'MacBook Pro', file: 'MacBook Pro 2019 13 inch.jpg', author: 'Laptopsarena', licence: 'CC BY-SA 4.0' },
  { what: 'MacBook Air', file: 'MacBook Air M1.png', author: 'Padgriffin', licence: 'CC BY-SA 4.0' },
  { what: 'Dell XPS', file: 'Dell XPS 15 and Microsoft Surface Pro - 2020.jpg', author: 'Tom Page', licence: 'CC BY-SA 2.0' },
  { what: 'ThinkPad / HP Pavilion', file: 'Top cover of a closed Lenovo ThinkPad X220 laptop.jpg', author: 'Siarhei V', licence: 'CC BY-SA 4.0' },
  { what: 'MSI gaming laptop', file: 'MSI Gaming Laptop on wood floor.jpg', author: 'Kurt Kaiser', licence: 'CC0' },
  { what: 'Richard Mille', file: 'RM 030 Automatic.jpg', author: 'Y.Leclercq', licence: 'CC BY-SA 4.0' },
  { what: 'Patek Philippe Nautilus 5711', file: 'Patek-Philippe-Nautilus-5711-1A-010-1.jpg', author: 'Patek Philippe SA', licence: 'CC BY-SA 4.0' },
  { what: 'Patek Philippe Nautilus 5980', file: 'Patek Philippe Nautilus cronografo flyback ref. 5980 del 2015.jpg', author: 'EMore98', licence: 'CC BY-SA 4.0' },
  { what: 'Seiko Orange Monster', file: 'Seiko SKX781 Orange Monster diver watch (2026-02-13).jpg', author: 'Olgierd Rudak', licence: 'CC BY-SA 4.0' },
  { what: 'Seiko diver 200m', file: "Seiko Automatic Diver's 200m.jpg", author: 'Dnalor 01', licence: 'CC BY-SA 3.0' },
  { what: 'Hublot', file: 'Hublot Geneve.jpg', author: 'Yorqulov Husan', licence: 'CC BY 4.0' },
  { what: 'Crocs clog', file: 'Crocs-synthetic-clogs.jpg', author: 'Skyeyemx', licence: 'CC BY-SA 4.0' },
  { what: 'Flip-flops', file: 'Green flip flops on red background.jpg', author: 'Steve Johnson', licence: 'CC BY 2.0' },
  { what: 'Dash cams', file: 'Dashcams P1210466.JPG', author: 'Fernost', licence: 'Public domain' },
  { what: 'Air purifier', file: 'Xiaomi Smart Air Purifier 2S.jpg', author: 'GEEK KAZU', licence: 'CC BY 2.0' },
  { what: 'Dishwasher', file: 'KitchenAid home dishwasher - Open.jpg', author: 'Infrogmation', licence: 'CC BY-SA 4.0' },
  { what: 'AirTag', file: 'Airtag - 5.jpg', author: 'KKPCW', licence: 'CC BY-SA 4.0' },
  { what: 'Dyson Supersonic hair dryer', file: 'Dyson Supersonic Hair Dryer 1 2017-01-28.jpg', author: 'FASTILY', licence: 'CC BY-SA 4.0' },
  { what: 'Dyson Airwrap styler', file: 'Dyson Supersonic Hair Dryer 3 2017-01-28.jpg', author: 'FASTILY', licence: 'CC BY-SA 4.0' },
  { what: 'Cup soup', file: 'CupSoupChicken.jpg', author: 'Alex Jones', licence: 'Public domain' },
  { what: 'Popcorn', file: 'Bowl of Popcorn (Unsplash).jpg', author: 'Alex Munsell', licence: 'CC0' },
]

// ——— Apple hardware, laptops, high horology ———
TEMPLATES.push(
  ['Apple', 'iPhone 16 Pro Max', 'gadgets', WM_IP16, '📱', 'Desert titanium. Camera Control ka naya chakkar.', combo(['Desert Titanium', 'Natural Titanium', 'Black Titanium', 'White Titanium'], V(['256GB', 144900], ['512GB', 164900], ['1TB', 184900])), true],
  ['Apple', 'iPhone 15 Pro', 'gadgets', WM_IP15, '📱', 'Pichla flagship, aadha daam. Smart move.', combo(['Blue Titanium', 'Natural Titanium', 'Black Titanium'], V(['128GB', 119900], ['256GB', 129900]))],
  ['Apple', 'MacBook Pro 14"', 'gadgets', WM_MBP, '💻', 'M4 Pro. Fan chalta hi nahi, kaam ho jaata hai.', combo(['Space Black', 'Silver'], V(['M4 · 512GB', 169900], ['M4 Pro · 1TB', 249900])), true],
  ['Apple', 'MacBook Air 13"', 'gadgets', WM_MBA, '💻', 'Bag mein pata bhi nahi chalta. Poora din battery.', combo(['Midnight', 'Starlight', 'Silver', 'Sky Blue'], V(['M4 · 256GB', 99900], ['M4 · 512GB', 119900]))],
  ['Dell', 'XPS 15 Laptop', 'gadgets', WM_XPS, '💻', 'Windows walon ka MacBook. OLED lelo.', V(['i7 · 16GB · 512GB', 159990], ['i9 · 32GB · 1TB OLED', 219990])],
  ['Lenovo', 'ThinkPad X1 Carbon', 'gadgets', WM_THINKPAD, '💻', 'Keyboard ke liye log isse khareedte hain. Sach.', V(['i5 · 16GB', 139990], ['i7 · 32GB', 179990])],
  ['MSI', 'Katana Gaming Laptop', 'gadgets', WM_MSI, '🎮', 'RTX lagi hai. Padhai bhi ho jaayegi, kabhi.', V(['RTX 4050 · 16GB', 84990], ['RTX 4060 · 16GB', 104990])],
  ['HP', 'Pavilion 14', 'gadgets', WM_THINKPAD, '💻', 'College ka sabse safe pick.', V(['i5 · 16GB · 512GB', 62990])],

  // High horology. 'watches' is a locked tier, so these sit behind 100 coins.
  ['Richard Mille', 'RM 030 Automatic', 'watches', WM_RM, '⌚', 'Skeleton dial, titanium case. Ghadi nahi, statement.', colors(['Blue Ceramic', 'Titanium', 'Rose Gold'], 16500000), true],
  ['Richard Mille', 'RM 011 Flyback', 'watches', WM_RM, '⌚', 'F1 paddock ki official ghadi. Daam bhi F1 wala.', colors(['NTPT Carbon', 'Rose Gold'], 21000000)],
  ['Patek Philippe', 'Nautilus 5711', 'watches', WM_PATEK, '⌚', 'Waiting list saalon ki. Resale MRP se dugna.', colors(['Steel Blue Dial', 'Steel Green Dial'], 9500000), true],
  ['Patek Philippe', 'Nautilus 5980 Chronograph', 'watches', WM_PATEK2, '⌚', 'Rose gold flyback. Baap ko dikhane layak.', colors(['Rose Gold', 'Steel'], 12500000)],
  ['Patek Philippe', 'Calatrava', 'watches', WM_PATEK, '⌚', 'Dress watch ka final boss. Simple dikhta hai.', colors(['White Gold', 'Yellow Gold'], 3200000)],
  ['Hublot', 'Big Bang Unico', 'watches', WM_HUBLOT, '⌚', 'Bada, loud, aur usse koi sharam nahi.', colors(['Titanium', 'King Gold', 'All Black'], 2400000)],
  ['Hublot', 'Classic Fusion', 'watches', WM_HUBLOT, '⌚', 'Hublot ka sober version. Thoda sa hi loud.', colors(['Titanium', 'Black Ceramic'], 1150000)],
  ['Seiko', 'Prospex Orange Monster', 'watches', WM_SEIKO, '⌚', 'Enthusiast ki pehli asli ghadi. Legend hai.', colors(['Orange Dial', 'Black Dial'], 42000)],
  ['Seiko', 'SKX Diver 200m', 'watches', WM_SEIKO2, '⌚', '200m water resistant. Aap 2m jaoge, phir bhi.', colors(['Black Dial', 'Pepsi Bezel', 'Blue Dial'], 35000)],
  ['Seiko', 'Presage Cocktail Time', 'watches', WM_SEIKO2, '⌚', 'Sunburst dial. Roshni mein ghoomao, bas.', colors(['Starlight', 'Mojito Green', 'Blue Moon'], 48000)],
)

// How many products the last cron drop actually added. Used for the end-of-feed
// comeback line, so the promise is measured rather than invented.
export const LAST_DROP_COUNT = (() => {
  const byDate = {}
  for (const p of DAILY) if (p.addedOn) byDate[p.addedOn] = (byDate[p.addedOn] ?? 0) + 1
  const sizes = Object.values(byDate)
  if (!sizes.length) return 0
  return Math.min(...sizes)
})()

// ——— Daily arrivals ———
// Genuinely new real products, fetched by scripts/fetch-daily.mjs on a cron and
// committed as data. Before this, the "New in" chip rotated a FIXED catalog by
// date — so a returning visitor saw the same items reshuffled and had no reason
// to come back twice. These carry a real addedOn date.
// ——— AVIATION EXPANSION ———
//
// The first Search Console data with real volume showed one unmistakable
// pattern: '<aircraft> price in india' queries hitting page 1 within days
// (Gulfstream G650ER at position 5.2, Praetor 600 at 7.0) — a niche nobody
// else covers in INR. These 33 aircraft each get a page in that niche.
// Appended at the END of the static section so no existing templateId moves;
// the daily rebase below keeps daily ids clear of them forever.
const AIR_VARIANTS = {
  jet: (base) => combo(['Standard Cabin', 'Executive', 'VVIP Suite'], ['Pearl White', 'Midnight Black', 'Custom Livery'].map((c) => [c, base])),
  prop: (base) => colors(['Standard', 'Executive'], base),
  heli: (base) => colors(['Utility', 'VIP'], base),
}
const AIR_EMOJI = { jet: '✈️', prop: '🛩️', heli: '🚁' }
for (const a of AIRCRAFT) {
  TEMPLATES.push([a.brand, a.name, 'jets', a.img, AIR_EMOJI[a.kind], a.desc, AIR_VARIANTS[a.kind](a.price)])
}

// templateId is positional, and the slug (= the URL Google indexes) embeds it.
// Daily-cron arrivals used to continue the static section's numbering, which
// meant ANY insertion into the static catalog renumbered every daily page and
// 404'd its indexed URL — including daily items already ranking on page 1.
// Daily items now start at a fixed base, so the static catalog can grow freely
// below it and the two sections can never shift each other again.
export const DAILY_ID_BASE = 5000
const STATIC_TEMPLATE_COUNT = TEMPLATES.length
if (STATIC_TEMPLATE_COUNT >= DAILY_ID_BASE) throw new Error('static catalog reached DAILY_ID_BASE — raise the base')

for (const p of DAILY) {
  TEMPLATES.push([
    p.brand, p.name, p.cat, p.img, p.emoji || '🛒', p.desc,
    V([p.qty || 'Std pack', p.price], ['Pack of 4', p.price * 4 - Math.max(1, Math.round(p.price / 10))]),
    false, p.addedOn,
  ])
}

const hash = (n) => { let h = n * 2654435761 % 2 ** 32; h = (h ^ (h >> 15)) * 2246822519 % 2 ** 32; return Math.abs(h ^ (h >> 13)) }

export const LAUNCH_PICKS = []

const build = () => {
  const out = []
// A third of every variant used to be marked down by 33-47%, which put a fake
// strikethrough on an Apple AirTag, a Rolex Submariner and a Dubai apartment.
// Apple holds MRP in India, luxury houses do not discount, and cars, bikes,
// property and aircraft are not sold against a struck-out price at all.
const NO_DEAL_CATEGORIES = new Set(['cars', 'bikes', 'realty', 'jets', 'watches', 'luxe', 'jewels'])
const NO_DEAL_BRANDS = new Set([
  'Apple', 'Rolex', 'Omega', 'TAG Heuer', 'Louis Vuitton', 'Hermès', 'Hermes',
  'Chanel', 'Gucci', 'Prada', 'Dior', 'Cartier', 'Pagani', 'Ferrari',
])
const dealAllowed = (brand, category) => !NO_DEAL_CATEGORIES.has(category) && !NO_DEAL_BRANDS.has(brand)

// How deep a markdown is plausible. Indian FMCG and fashion genuinely run deep;
// books are price-fixed on the cover; electronics move a little.
const DISCOUNT_BANDS = { fashion: 0.45, shoes: 0.4, snacks: 0.2, grocery: 0.18, icecream: 0.12,
  beauty: 0.3, kpop: 0.15, toys: 0.25, stationery: 0.25, quirky: 0.3, home: 0.25,
  kitchen: 0.25, accessories: 0.3, gadgets: 0.15, books: 0.1, art: 0.15 }
const discountBand = (category) => DISCOUNT_BANDS[category] ?? 0.2

const OFF_MAX = 400
// normalise any Open Food Facts image URL to a sized variant
const offSized = (url) =>
  typeof url === 'string' && url.includes('images.openfoodfacts.org')
    ? url.replace(/\.(full|\d+)\.jpg$/i, `.${OFF_MAX}.jpg`)
    : url

// /images/products/890/171/913/4845/front_en.11.full.jpg -> 8901719134845
const barcodeOf = (url) => {
  const m = typeof url === 'string' && url.match(/\/products\/((?:\d+\/)+)/)
  return m ? m[1].replace(/\//g, '') : null
}
// Products with no second photo of their own borrow TYPE photos: more pictures
// of the same kind of thing, not the same object. Half this catalog is invented
// brands, so a second shot of a Glowuh serum does not exist and never will.
//
// Keyed to a SUBJECT, and only lent to a product whose own name says it IS that
// subject. The first version keyed them to the category, which gave all 64
// fashion products kurta photos — blazers, hoodies and slim jeans included —
// and put lipstick on shampoo. Of 233 products given a carousel, 22 were shown
// a photo of what they actually are. Matching on the name costs most of the
// coverage and is the only version worth shipping: one accurate photo beats
// three that look like placeholders, because that is what they looked like.
const typeAngles = (category, name, hero) => {
  const subjects = TYPE_PHOTOS[category]
  if (!subjects) return null
  for (const { match, urls } of Object.values(subjects)) {
    if (!new RegExp(match, 'i').test(name)) continue
    return [hero, ...urls.slice(0, 2)]
  }
  return null
}

const extraAngles = (photo) => {
  const code = barcodeOf(photo)
  return code ? PACKSHOTS[code] ?? null : null
}

  let id = 1
  let templateId = 0
  let row = 0
  for (const [brand, name, category, photo, emoji, desc, variants, launch, addedOn] of TEMPLATES) {
    row++
    templateId = row <= STATIC_TEMPLATE_COUNT ? row : DAILY_ID_BASE + (row - STATIC_TEMPLATE_COUNT)
    const skipBrand = brand === 'Generic' || brand === 'ThodaSa' || name.toLowerCase().startsWith(brand.toLowerCase())
    const baseName = `${skipBrand ? '' : brand + ' '}${name}`.trim()
    const slug = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + templateId
    let first = true
    for (const [label, price] of variants) {
      const h = hash(id)
      out.push({
        id, templateId, baseName, slug, addedOn,
        variantLabel: label,
        variantCount: variants.length,
        name: `${baseName}${label ? ' — ' + label : ''}`,
        brand, category, emoji, desc,
        price,
        deal: dealAllowed(brand, category) && h % 10 < 3,
        mrp: Math.round(price * (1 + discountBand(category) * (1 + (h % 5) / 10) / 1.2)),
        rating: Math.round((3.6 + ((h >> 3) % 13) / 10) * 10) / 10,
        reviews: Math.round(10 ** (1.1 + ((h >> 5) % 300) / 92)),
        grad: h % 8,
        img: I[photo] ? img(I[photo], WIDE_SUBJECT.has(category)) : offSized(photo),
        // Extra photo angles for Open Food Facts packs (front / packaging /
        // ingredients / nutrition). Real product video is not sourceable, but
        // the same pack from several sides is — and on a site about what sits
        // inside a price, the ingredients panel is the most on-theme second
        // image there is. See scripts/fetch-packshots.mjs.
        imgs: extraAngles(photo)?.map(offSized) ?? ANGLES[templateId] ?? typeAngles(category, baseName, photo) ?? null,
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
