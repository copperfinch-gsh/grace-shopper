const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

Order.findCart = async function(userId) {
  const cart = await this.findOne({
    where: {
      userId: userId,
      isCart: true
    }
  });
  console.log('cart:', cart);
  return cart;
};

module.exports = Order;
