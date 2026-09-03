// Turns the fetched aircraft photo candidates into src/data/aircraft.js.
//
// PICKS maps each model to the candidate index chosen BY EYE from the contact
// sheets (/tmp/air-*.html). The automated filters were necessary but not
// sufficient — things they let through that the eyeball pass rejected:
//   * "Noble M600 at Goodwood" — a British sports car, filed under Piper M600
//   * a Dilma Rousseff press conference, filed under Citation XLS
//   * three-view line DRAWINGS of the Global 8000
//   * cabin interiors, cockpit panels and cabin MOCK-UPS (G280, Falcon 6X,
//     Praetor 500, CJ4) where the card needs the aircraft
//   * military/police liveries (Bangladesh Army Bell 407, LAPD H125,
//     Philippine AF S-76) on what the catalog sells as private aviation
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const cands = JSON.parse(fs.readFileSync(path.join(root, 'tmp-aircraft-candidates.json'), 'utf8'))

// searchKey -> [pickIndex, displayName, kind, priceINR, desc]
// kind: jet | prop | heli  (drives variant sets and emoji)
const PICKS = {
  'Gulfstream G700': [2, 'G700', 'jet', 6.7e9, 'The new flagship. Five living areas, 13,890 km legs.'],
  'Gulfstream G280': [0, 'G280', 'jet', 2.1e9, 'The sensible Gulfstream. Still not sensible.'],
  'Bombardier Global 8000': [3, 'Global 8000', 'jet', 6.8e9, 'Fastest civil jet since Concorde. Mach 0.94.'],
  'Bombardier Challenger 350': [1, 'Challenger 350', 'jet', 2.25e9, 'The best-selling bizjet of its class, every year.'],
  'Bombardier Challenger 650': [1, 'Challenger 650', 'jet', 2.75e9, 'Wide cabin, old money energy.'],
  'Dassault Falcon 2000LXS': [1, 'Falcon 2000LXS', 'jet', 3.1e9, 'Short runways, long range. French maths.'],
  'Dassault Falcon 900LX': [1, 'Falcon 900LX', 'jet', 3.75e9, 'Three engines when two would do. Style.'],
  'Dassault Falcon 6X': [3, 'Falcon 6X', 'jet', 3.95e9, 'The widest cabin in a purpose-built bizjet.'],
  'Embraer Praetor 500': [1, 'Praetor 500', 'jet', 1.5e9, 'Midsize jet that flies like a big one.'],
  'Embraer Phenom 300': [2, 'Phenom 300E', 'jet', 1.0e9, "World's best-selling light jet, ten years running."],
  'Embraer Phenom 100': [0, 'Phenom 100EX', 'jet', 4.2e8, 'The entry ticket to jet ownership.'],
  'Cessna Citation M2': [1, 'Citation M2', 'jet', 5.3e8, 'Single-pilot jet. Fly yourself to Goa.'],
  'Cessna Citation CJ4': [3, 'Citation CJ4', 'jet', 1.0e9, 'The light jet that thinks it is a midsize.'],
  'Cessna Citation XLS': [2, 'Citation XLS', 'jet', 1.34e9, 'The most produced bizjet family ever. This is why.'],
  'Cessna Citation Latitude': [1, 'Citation Latitude', 'jet', 1.68e9, 'Flat floor, stand-up cabin, NetJets favourite.'],
  'Cirrus Vision Jet': [1, 'Vision Jet', 'jet', 2.9e8, 'The jet with a whole-airframe parachute.'],
  'Cessna Grand Caravan EX': [1, 'Grand Caravan EX', 'prop', 2.8e8, 'Hauls anything, lands anywhere. The workhorse.'],
  'Beechcraft King Air 360': [0, 'King Air 360', 'prop', 7.4e8, 'Sixty years of King Air. The default turboprop.'],
  'Beechcraft King Air 260': [0, 'King Air 260', 'prop', 5.9e8, 'The smaller King Air. Still a King Air.'],
  'Pilatus PC-12': [0, 'PC-12 NGX', 'prop', 5.5e8, 'Swiss single that outsells everything above it.'],
  'Daher TBM 960': [3, 'TBM 960', 'prop', 4.2e8, 'Fastest single-engine turboprop in production.'],
  'Piper M600': [1, 'M600 SLS', 'prop', 3.4e8, 'Lands itself if the pilot cannot. Halo autoland.'],
  'Cirrus SR22': [1, 'SR22T', 'prop', 9.5e7, 'The best-selling piston aircraft on earth.'],
  'Diamond DA62': [1, 'DA62', 'prop', 1.25e8, 'Twin diesels, sips jet fuel, seats seven.'],
  'Robinson R44': [1, 'R44 Raven II', 'heli', 4.6e7, "The world's best-selling civil helicopter."],
  'Robinson R66': [2, 'R66 Turbine', 'heli', 8.8e7, 'The R44 with a turbine heart.'],
  'Bell 407GXi': [1, '407GXi', 'heli', 3.4e8, 'Corporate classic. Farmhouse to boardroom.'],
  'Bell 429': [2, 'Bell 429', 'heli', 7.1e8, 'Twin-engine safety, VIP cabin.'],
  'Airbus H125': [1, 'H125', 'heli', 3.0e8, 'Holds the Everest landing record. Literally.'],
  'Airbus H130': [2, 'H130', 'heli', 3.4e8, 'The quiet one. Seven seats, panoramic glass.'],
  'Airbus H145': [1, 'H145', 'heli', 9.2e8, 'Five rotor blades, hospital-grade smooth.'],
  'Leonardo AW139': [2, 'AW139', 'heli', 1.26e9, 'The VIP heavy twin. Governments and billionaires.'],
  'Sikorsky S-76': [0, 'S-76D', 'heli', 1.34e9, 'The executive Sikorsky. Flew the British royals.'],
}

const out = []
const credits = []
for (const [key, [idx, name, kind, price, desc]] of Object.entries(PICKS)) {
  const brand = key.split(' ')[0]
  const c = cands[key]?.[idx]
  if (!c) { console.error(`MISSING pick for ${key}`); process.exit(1) }
  // The API sometimes hands back thumb.wikimedia.org (the newer thumbor host).
  // It serves fine today, but the rest of the catalog uses the canonical
  // upload.wikimedia.org, which shares the same path shape — normalise so all
  // Wikimedia traffic rides one host.
  const img = c.url.replace('https://thumb.wikimedia.org/', 'https://upload.wikimedia.org/')
  out.push({ brand, name, kind, price, desc, img })
  credits.push({ what: `${brand} ${name}`, file: c.file, author: c.author, licence: c.licence })
}

fs.writeFileSync(
  path.join(root, 'src/data/aircraft.js'),
  '// GENERATED by scripts/fetch-aircraft.mjs + scripts/curate-aircraft.mjs.\n' +
  '// Every photo was verified live (HTTP 200, free licence) and then chosen by\n' +
  '// eye from a contact sheet — see curate-aircraft.mjs for what that caught.\n' +
  '// Prices are indicative list prices converted to INR and rounded.\n' +
  'export const AIRCRAFT = ' + JSON.stringify(out, null, 1) + '\n\n' +
  'export const AIRCRAFT_CREDITS = ' + JSON.stringify(credits, null, 1) + '\n',
)
console.log('aircraft:', out.length, '| credits:', credits.length)
console.log('kinds:', out.reduce((a, x) => (a[x.kind] = (a[x.kind] || 0) + 1, a), {}))
