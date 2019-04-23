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
  try {
    const cart = await this.findOne({
      where: {
        userId: userId,
        isCart: true
      }
    });
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

Order.getFullUserCart = async function(userId) {
  try {
    const cart = await this.findOne({
      include: [{ model: Product }],
      where: {
        userId: userId,
        isCart: true
      }
    });

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

Order.prototype.mergeCarts = async function(guestCartId) {
  try {
    const data = await Order.getFullCart(guestCartId);
    const guestCart = data.products;
    let orderId = this.id;
    for (let i = 0; i < guestCart.length; i++) {
      let item = guestCart[i];
      let quantity = item.lineItem.quantity;
      const unitPrice = await Product.getPrice(Number(item.id));
      const [newLineItem, wasCreated] = await LineItem.findOrCreate({
        where: {
          orderId,
          productId: item.id
        }
      });

      if (!wasCreated) {
        quantity += newLineItem.quantity;
      }
      await newLineItem.update({ orderId, quantity, unitPrice });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

Order.getCurrentCart = async function(
  userOnSession,
  cartOnSession,
  quantity = 0
) {
  try {
    let order;
    //determine if there's a user on session
    if (userOnSession) {
      //find cart if order exists
      //else create new order
      order =
        (await Order.findCart(userOnSession.id)) || (await Order.create());
      !order.userId && (await order.setUser(userOnSession));
    } else if (cartOnSession.id) {
      //if there's no logged in user but session cart has been added to
      order = await Order.findByPk(cartOnSession.id);
      cartOnSession.numProducts += quantity;
    } else {
      //otherwise we need to create a new order for non-logged in user
      order = await Order.create();
      //establish session cart id
      cartOnSession.id = order.id;
      cartOnSession.numProducts += quantity;
    }

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

Order.getFullCart = async function(cartId) {
  try {
    const cart = await this.findOne({
      include: [{ model: Product }],
      where: {
        id: cartId,
        isCart: true
      }
    });
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = Order;
