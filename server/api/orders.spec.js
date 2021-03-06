/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');
const Product = db.model('product');

describe('Orders routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/orders/', () => {
    const newOrder = {};
    beforeEach(() => {
      return Order.create(newOrder);
    });

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200);

      expect(res.body).to.be.an('array');
    });
    // it('POST /api/orders', async () => {
    //   await Product.create({
    //     name: 'Les Paul',
    //     price: 10500,
    //     quantity: 1
    //   });

    //   const body = {
    //     product: {
    //       name: 'Les Paul',
    //       id: 1,
    //       price: 10500
    //     },
    //     desiredQuantity: 1
    //   };
    //   request(app)
    //     .post('/api/orders')
    //     .send(body)
    //     .expect(201);
    // });
  }); // end describe('/api/orders')
}); // end describe('Products orders')
