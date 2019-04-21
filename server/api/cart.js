const router = require('express').Router();
const { Order, LineItem } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    let cart = {};
    if (req.user) {
      //if the user exists, grab the full cart
      const data = await Order.getFullCart(req.user.id);
      // if the cart is empty, set the cart to equal the default session cart
      if (!data) {
        cart = { cartProducts: [], numProducts: 0 }; // merging guest/login cart might start here
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

router.put('/', async (req, res, next) => {
  try {
    let cart = {};

    const product = req.body.product;
    const quantity = Number(req.body.desiredQuantity);

    if (req.user) {
      cart = await Order.findCart(req.user.id);
    } else {
      cart = await Order.findByPk(req.session.cart.id);
    }

    // console.log('PRODUCT:', product);
    // console.log('cart:', cart);

    const lineItem = await LineItem.findOne({
      where: {
        orderId: cart.id,
        productId: product.id
      }
    });

    // console.log('LINEITEM:', lineItem);

    if (quantity) {
      await lineItem.update({ quantity: quantity });
      product.desiredQuantity = quantity;
    } else {
      await lineItem.destroy();
    }

    console.log('SENDING PRODUCT:', product);

    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});
