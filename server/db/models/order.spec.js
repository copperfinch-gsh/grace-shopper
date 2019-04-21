/* global describe beforeEach it */

const chai = require('chai');
const expect = chai.expect;
const db = require('../index');
const { Order, User, Product, LineItem } = require('./index');

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('classMethods', () => {
    describe('findCart', () => {
      beforeEach(async () => {
        try {
          const cody = await User.create({
            firstName: 'Cody',
            lastName: 'ThePug',
            email: 'cody@puppybook.com',
            password: 'bones'
          });

          const order = await Order.create({});

          await order.setUser(cody);
        } catch (error) {
          console.error(error);
        }
      });

      it('returns the cart', () => {
        return Order.findCart(1).then(data => expect(data.userId).to.equal(1));
      });

      it('if the cart does not exist, return null', () => {
        return Order.findCart(2).then(data => expect(data).to.equal(null));
      });
    }); // end describe('correctPassword')
    describe('getFullCart', () => {
      beforeEach(async () => {
        try {
          const cody = await User.create({
            firstName: 'Cody',
            lastName: 'ThePug',
            email: 'cody@puppybook.com',
            password: 'bones'
          });

          const order = await Order.create({});

          await order.setUser(cody);

          const productA = await Product.create({
            name: 'Les Paul',
            price: 10500,
            quantity: 1
          });
          const productB = await Product.create({
            name: 'Strat',
            price: 30500,
            quantity: 3
          });

          productA.desiredQuantity = 2;
          productB.desiredQuantity = 3;

          let itemA = {},
            itemB = {};

          itemA.unitPrice = productA.price;
          itemA.orderId = order.id;
          itemA.productId = productA.id;
          itemA.quantity = productA.desiredQuantity;

          itemB.unitPrice = productB.price;
          itemB.orderId = order.id;
          itemB.productId = productB.id;
          itemB.quantity = productB.desiredQuantity;

          await LineItem.create(itemA);
          await LineItem.create(itemB);
        } catch (error) {
          console.error(error);
        }
      });

      it('returns the full cart', () => {
        return Order.getFullCart(1).then(data =>
          expect(data.userId).to.equal(1)
        );
      });

      it('returns the correct lineItems', () => {
        return Order.getFullCart(1).then(data =>
          expect(data.products[0].lineItem.unitPrice).to.equal(10500)
        );
      });

      it('if the cart does not exist, return null', () => {
        return Order.findCart(2).then(data => expect(data).to.equal(null));
      });
    }); // end describe('get full cart')
    describe('getCurrentCart', () => {
      describe('it creates a new cart if no user or cart is on the session', () => {
        it('new cart has no user id', () => {
          return Order.getCurrentCart(null, {}).then(data =>
            expect(data.userId).to.equal(null)
          );
        });
        it(`new cart exists`, () => {
          return Order.getCurrentCart(null, {}).then(data =>
            expect(data.id).to.equal(1)
          );
        });
      });
    });
  }); // end describe('instanceMethods')
}); // end describe('User model')
