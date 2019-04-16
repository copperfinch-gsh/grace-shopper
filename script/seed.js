'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderHistory} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'The Dog',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Sean',
      lastName: 'Murphy',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Saul',
      lastName: 'Hudson',
      email: 'slash@email.com',
      password: 'shred'
    }),
    User.create({
      firstName: 'Trey',
      lastName: 'Anastasio',
      email: 'trey@email.com',
      password: 'jam'
    })
  ])
  const products = await Promise.all([
    Product.create({
      name: 'Les Paul Traditional',
      description:
        "The Gibson USA Les Paul Traditional pays homage to one of the most highly sought-after incarnations of the legendary Gibson Les Paul. Built in pure Les Paul tradition, this Les Paul comes jam-packed with old-style features including a set of vintage-voiced Burstbucker pickups and classic hardware. If you're a guitarist looking for a vintage-inspired guitar in a modern instrument, the Les Paul Traditional is perfect for you.",
      type: 'electric',
      price: 2499,
      color: 'sunburst',
      manufacturer: 'Gibson',
      quantity: 2000
    }),
    Product.create({
      name: 'Stratocaster',
      description:
        "The Stratocaster has withstood the test of time. As a versatile instrument that's been around since the early days, it's certainly had its modifications. But the American performer Stratocaster HSS has gone from one small step for man, to one giant leap for mankind with the American Performer Series. Featuring gorgeous Fender craftsmanship, classic Strat appointments, and an evolutionary Fender DoubleTap humbucker, this guitar is for Strat players who want some innovative sound options in that classically reliable Fender package.",
      type: 'electric',
      price: 1000,
      color: 'seafoam green',
      manufacturer: 'Fender',
      quantity: 3000
    }),
    Product.create({
      name: 'Academy 10',
      description:
        "Designed and built with beginner guitar players in mind, the Academy Series 10 combines the full-bodied tone and response of the classic dreadnought shape with Taylor's standards of comfort and playability. The Academy 10's trademark neck, devised as a more practical take on the traditional guitar neck, makes it easier to fret strings, hold chords, and bend notes, thanks to a slimmer profile and the slightly shorter 24-7/8-inch scale length of the Academy Series. Plus, the Academy 10 ships with one of Taylor's most premium features: an armrest, which provides a more comfortable fit for players who are just learning how to manage the larger body of an acoustic guitar. With a solid spruce top and layered sapele back and sides, the dreadnought shape of the Academy 10 produces a warm sound with a strong low end and clear, ringing high tones, smoothened out by the punchy midrange of layered sapele. Between its rich sound and a comfortable shape built to invite inspiration, the Academy 10 provides a perfect solution for beginner players or those looking to buy on a budget.",
      type: 'acoustic',
      price: 499,
      color: 'natural',
      manufacturer: 'Taylor',
      quantity: 3000
    }),
    Product.create({
      name: "Builder's Edition 517",
      description:
        "Among the first generation of Taylor's Grand Pacific dreadnought guitars, the mahogany/torrefied spruce Builder’s Edition 517 dramatically expands the Taylor line’s sonic palette with a new flavor of acoustic tone that may surprise players who think they know the Taylor sound. An exciting new entry into the dreadnought category, this round-shoulder Grand Pacific resonates with a finely-honed balance of low-end power and clarity across the middle and upper registers, producing warm, rounded tone in which notes blend seamlessly together to create a seasoned sound. Back and sides of neo-tropical mahogany flavor the sound with dry, woody character, coupling beautifully with the dynamic response of the torrefied Sitka spruce top. The Builder’s Edition stamp means that the 517 is detailed with premium features designed to maximize player comfort, including chamfered body edges and a new compound-carve neck profile that compensates for the change in your hand position as you move along the neck. Subtly contoured fretboard edges and a rounded, ridgeless heel add to the guitar’s pleasing fretting-hand feel, while a refined bridge shape brings extra comfort to your pick hand. Under the hood, V-Class bracing enables the guitar to pump out stunning projection and sustain, plus nearly perfect intonation, which means you won’t have to contend with sour notes on the fretboard. Between its sound and feel, the Builder’s Edition 517 once again raises the bar on the Taylor playing experience.",
      type: 'acoustic',
      price: 2699,
      color: 'natural',
      manufacturer: 'Taylor',
      quantity: 1500
    }),
    Product.create({
      name: 'AF55',
      description:
        "Ibanez goes old school with their take on traditional hollow bodied guitars. The AF55 Hollow Body Electric Guitar is a traditional arch top jazz guitar. The single cutaway hollow body features a maple top, back & sides. The flat finishes really accentuate the grain of the maple while offering a well-worn feel and aesthetic. The electronics feature a pair of open-coil Ibanez ceramic Humbuckers that'll dish out tons of smooth, warm jazz tones with bottom-end to spare from the neck pickup and high-end twang from the bridge pickup.\nThe neck on the Ibanez AF55 is carved from mahogany into a comfortable, tapered profile which starts at a 20mm thickness at the 1st fret to 24mm at the 12th fret. The tapered neck will feel at home in your fretting hand. A bound rosewood fingerboard with pearloid dot inlays and jumbo frets will facilitate total ease of playability. The chrome hardware complements the old school vibe beautifully. Case not included.",
      type: 'hollow body',
      price: 329,
      color: 'tobacco',
      manufacturer: 'Ibanez',
      quantity: 1200
    }),
    Product.create({
      name: 'Lightning Bolt Strap',
      description:
        'Make a statement with a Gibson Lightning Bolt strap. This safety belt style guitar strap features a sturdy vinyl backing. The plastic tri-glide buckle makes this 2” strap fully adjustable from 41 to 55 inches.',
      type: 'accessory',
      price: 16.99,
      color: 'Ferrari Red',
      manufacturer: 'Gibson',
      quantity: 150
    }),
    Product.create({
      name: 'Switchblade Guitar Strap',
      description:
        'The Gibson Switchblade Guitar Strap is choc full of innovative design and comfort features. The quick release-connect and elastic high-tech nylon buckle is just the beginning of what this high quality strap has to offer. Continuing with the top of the line accoutrements is the half-inch thick memory foam padding. It is covered by thick, full grain top leather. The black strap includes a wide, thick and soft leather pad and soft garment leather backing and is detail stitched.',
      type: 'accessory',
      price: 129.99,
      color: 'Black',
      manufacturer: 'Gibson',
      quantity: 150
    }),
    Product.create({
      name: 'Gator Picks (set of 12)',
      description:
        'These classic, affordable, 1.5 gauge picks will have you shredding sixteenth notes better than Dick Dale. Come in a variety of colors to fit every rocker aesthetic.',
      type: 'accessory',
      price: 3.79,
      color: 'various',
      manufacturer: 'Dunlop',
      quantity: 150
    })
  ])

  const orders = await Promise.all([
    Order.create({userId: 1, total: 2003.79}),
    Order.create({userId: 1, total: 650 * 3 + 3.79 * 2}),
    Order.create({userId: 2, total: 18 * 3 + 3500 * 3}),
    Order.create({userId: 3, total: 3500})
  ])

  const orderHistories = await Promise.all([
    OrderHistory.create({
      productId: 1,
      productPrice: 2000,
      quantity: 1,
      orderId: 1
    }),
    OrderHistory.create({
      productId: 8,
      productPrice: 3.79,
      quantity: 1,
      orderId: 1
    }),
    OrderHistory.create({
      productId: 3,
      productPrice: 650,
      quantity: 3,
      orderId: 2
    }),
    OrderHistory.create({
      productId: 8,
      productPrice: 3.79,
      quantity: 2,
      orderId: 2
    }),
    OrderHistory.create({
      productId: 6,
      productPrice: 18,
      quantity: 3,
      orderId: 3
    }),
    OrderHistory.create({
      productId: 2,
      productPrice: 3500,
      quantity: 3,
      orderId: 3
    }),
    OrderHistory.create({
      productId: 1,
      productPrice: 3500,
      quantity: 1,
      orderId: 4
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderHistories.length} order histories`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
