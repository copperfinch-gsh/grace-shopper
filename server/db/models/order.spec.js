/* global describe beforeEach it */

const chai = require('chai');
const expect = chai.expect;
const db = require('../index');
const Order = db.model('order');
const User = db.model('user');

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

          order.setUser(cody);
          console.log('order:', order);
        } catch (error) {
          console.error(error);
        }
      });

      it('returns the cart', () => {
        return Order.findCart(1).then(data => expect(data).to.equal(1));
      });

      it('if the cart does not exist, return null', () => {
        return Order.findCart(2).then(data => expect(data).to.equal(null));
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
