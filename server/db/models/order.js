const Sequelize = require('sequelize');
const db = require('../db');
const Product = db.model('product');

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

  return cart;
};

Order.getFullCart = async function(userId) {
  const cart = await this.findOne({
    include: [{ model: Product }],
    where: {
      userId: userId,
      isCart: true
    }
  });

  return cart;
};

Order.getFullGuestCart = async function(cartId) {
  const cart = await this.findOne({
    include: [{ model: Product }],
    where: {
      id: cartId,
      isCart: true
    }
  });

  return cart;
};

module.exports = Order;
