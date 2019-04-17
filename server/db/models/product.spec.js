/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('classMethods', () => {
    describe('getPrice', () => {
      beforeEach(async () => {
        await Product.create({
          name: 'Harrison',
          price: 10000,
          quantity: 1,
          manufacturer: 'My Parents'
        });
      });

      it('returns the price', () => {
        expect(Product.getPrice(1).to.be.equal(2000));
      });

      it('if the product id does not exist, return null', () => {
        expect(Product.getPrice(2).to.equal(null));
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
