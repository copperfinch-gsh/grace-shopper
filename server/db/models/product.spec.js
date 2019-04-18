/* global describe beforeEach it */

const chai = require('chai');
const expect = chai.expect;
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('classMethods', () => {
    describe('getPrice', () => {
      beforeEach(async () => {
        try {
          await Product.create({
            name: 'Harrison',
            price: 10000,
            quantity: 1,
            manufacturer: 'My Parents'
          });
        } catch (error) {
          console.error(error);
        }
      });

      it('returns the price', () => {
        return Product.getPrice(1).then(data => expect(data).to.equal(10000));
      });

      it('if the product id does not exist, return null', () => {
        return Product.getPrice(2).then(data => expect(data).to.equal(null));
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
