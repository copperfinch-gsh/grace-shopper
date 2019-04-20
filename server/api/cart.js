const router = require('express').Router();
const { Order, Product } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    let cart = {};
    if (req.user) {
      let userCart = await Order.findCart(Number(req.user.id));

      //if there already exists a guest cart on the session, merge the carts
      if (req.session.cart.id) {
        const guestCart = await Order.findOne({
          include: [{ model: Product }],
          where: {
            id: req.session.cart.id,
            isCart: true
          }
        });
        if (!userCart) {
          // if there is no user cart yet, just use the guest cart
          userCart = guestCart;

          // set the user on the guest cart to the current user
          if (!userCart.userId) await userCart.setUser(req.user);
        } else {
          //if a user cart already existed, merge the two carts
          await userCart.mergeCarts(guestCart.products);
        }

        //set req.session.cart to default so that ID doesn't exist
        req.session.cart = { cartProducts: [], numProducts: 0 };
      }

      //grab the full cart
      const data = await Order.getFullCart(req.user.id);
      if (!data) {
        /* if the cart doesn't exist, set the cart to equal the default session cart
      (this means that there was no merge, and we don't want to create a cart unless someone actually adds something to their cart )
      */
        cart = { cartProducts: [], numProducts: 0 };
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
