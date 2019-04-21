const router = require('express').Router();
const { Order, LineItem } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    let cart = {},
      data;
    if (req.user) {
      //if the user exists, grab the full cart
      data = await Order.getFullCart(req.user.id);
    } else if (req.session.cart.id) {
      // if no user, grab the full guest session cart
      data = await Order.getFullGuestCart(req.session.cart.id);
    }
    //populate the cart with the lineItems from the full cart you waited for
    if (data) {
      const products = data.products;
      cart.cartProducts = [];
      cart.numProducts = 0;
      for (let i = 0; i < products.length; i++) {
        const item = products[i].dataValues;
        item.desiredQuantity = item.lineItem.quantity;
        cart.cartProducts.push(item);
        cart.numProducts += item.desiredQuantity;
      }
    } else {
      // if the cart is empty, set the cart to equal the default session cart
      cart = { cartProducts: [], numProducts: 0 };
    }
    if (!req.user) {
      req.session.cart.cartProducts = cart.cartProducts;
      req.session.cart.numProducts = cart.numProducts;
    }
    res.status(200).send(cart);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    let cart = {};

    const product = req.body.product;
    const quantity = Number(req.body.desiredQuantity);

    if (req.user) {
      // grab user cart if exists
      cart = await Order.findCart(req.user.id);
    } else {
      // otherwise, grab session cart
      cart = await Order.findByPk(req.session.cart.id);
    }

    //grab the related lineItem
    const lineItem = await LineItem.findOne({
      where: {
        orderId: cart.id,
        productId: product.id
      }
    });

    if (quantity) {
      // if a new desiredQuantity was passed in -> update
      await lineItem.update({ quantity });
      product.desiredQuantity = quantity;
    } else {
      // otherwise, we're deleting
      await lineItem.destroy();
    }

    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});
