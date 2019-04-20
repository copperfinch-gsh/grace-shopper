const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    let cart = {};
    if (req.user) {
      //if the user exists, grab the full cart
      const data = await Order.getFullCart(req.user.id);
      // if the cart is empty, set the cart to equal the default session cart
      if (!data) {
        cart = req.session.cart;
      } else {
        // otherwise, populate the cart with the lineItems from the full cart you waited for
        const products = data.products;
        cart.cartProducts = [];
        cart.numProducts = 0;
        for (let i = 0; i < products.length; i++) {
          const item = products[i].dataValues;
          item.desiredQuantity = item.lineItem.quantity;
          cart.cartProducts.push(item);
          cart.numProducts += item.desiredQuantity;
        }
      }
    } else {
      // if no user, grab the session cart
      cart = req.session.cart;
    }
    res.status(200).send(cart);
  } catch (error) {
    next(error);
  }
});
