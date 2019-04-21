const Sequelize = require('sequelize');
const db = require('../db');
const Product = db.model('product');
const LineItem = require('./lineItem');

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

Order.prototype.mergeCarts = async function(guestCart) {
  for (let i = 0; i < guestCart.length; i++) {
    let item = guestCart[i];
    let quantity = item.lineItem.quantity;
    const unitPrice = await Product.getPrice(Number(item.id));
    const [newLineItem, wasCreated] = await LineItem.findOrCreate({
      where: {
        orderId: this.id,
        productId: item.id
      }
    });
    if (!wasCreated) {
      quantity += newLineItem.quantity;
    }
    await newLineItem.update({ quantity, unitPrice });
  }

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
