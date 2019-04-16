/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const newProduct = {
      name: 'TestProduct',
      imageUrl: 'default_image.jpg',
      description: 'A cool fake product for testing',
      type: 'acoustic',
      price: 200,
      color: 'black',
      manufacturer: 'gibson',
      quantity: 1
    }
    beforeEach(() => {
      return Product.create(newProduct)
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('TestProduct')
      expect(res.body[0].type).to.be.equal('acoustic')
    })
  }) // end describe('/api/products')
}) // end describe('Products routes')
