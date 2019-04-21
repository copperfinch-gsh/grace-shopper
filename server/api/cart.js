const router = require('express').Router();
const { Order, Product, LineItem } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    let cart = {},
      data;
    if (req.user) {
      let userCart = await Order.findCart(Number(req.user.id));

      //if there already exists a guest cart on the session, merge the carts
      if (req.session.cart.id) {
        const guestCart = await Order.findByPk(req.session.cart.id)
        if (!userCart) {
          // if there is no user cart yet, just use the guest cart
          userCart = guestCart;

          // set the user on the guest cart to the current user
          if (!userCart.userId) await userCart.setUser(req.user);
        } else {
          //if a user cart already existed, merge the two carts
          await userCart.mergeCarts(guestCart.id);
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
