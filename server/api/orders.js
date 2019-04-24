const router = require('express').Router();
const { Order, LineItem, Product } = require('../db/models');
const {
  clearSessionCart,
  formatWithCommas,
  emailConfirmation
} = require('../utils');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line complexity
router.post('/', async (req, res, next) => {
  try {
    //one item at a time coming to post route
    const item = req.body.product;
    let quantity = req.body.desiredQuantity;

    const order = await Order.getCurrentCart(
      req.user,
      req.session.cart,
      quantity
    );

    const unitPrice = await Product.getPrice(Number(item.id));

    const [newLineItem, wasCreated] = await LineItem.findOrCreate({
      where: {
        orderId: order.id,
        productId: item.id
      }
    });

    // if the lineItem already exists, add the quantities (aka desiredQuantity values) to each other
    if (!wasCreated) {
      quantity += newLineItem.quantity;
    }
    //if there is no user, set the item's desiredQuantity equal to either the original quantity passed in or the newly summed up quantity from the !wasCreated check above
    if (!req.user) {
      item.desiredQuantity = quantity;
      // if the item already existed in the session cart, loop through and change the desiredQuantity value on the already existent cart item in order to maintain the order of the cart
      if (!wasCreated) {
        let cart = req.session.cart.cartProducts;
        let cartLength = cart.length;
        for (let i = 0; i < cartLength; i++) {
          if (cart[i].id === item.id) {
            req.session.cart.cartProducts[i].desiredQuantity =
              item.desiredQuantity;
            break;
          }
        }
      } else {
        // otherwise, add the new item to the cart
        req.session.cart.cartProducts.push(item);
      }
    }

    //update the quantity and unitPrice attributes of the lineItem
    await newLineItem.update({ quantity, unitPrice });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.put('/checkout', async (req, res, next) => {
  try {
    let order;
    if (req.user) {
      order = await Order.getFullUserCart(req.user.id);
    } else {
      order = await Order.getFullCart(req.session.cart.id);
    }

    const cart = order.products;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      let quantity = cart[i].quantity; // actual quantity
      let item = cart[i].lineItem;
      let desiredQuantity = item.quantity; // quantity ordered
      let remainingQuantity = quantity - desiredQuantity;
      let productId = item.productId;

      total += item.unitPrice / 100 * desiredQuantity;
      await Product.update(
        {
          quantity: remainingQuantity
        },
        {
          where: {
            id: productId
          }
        }
      );
    }
    if (req.user) {
      total = formatWithCommas(total);
      emailConfirmation(req.user, order, total);
    }
    await order.update({ isCart: false });
    clearSessionCart(req.session);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});
