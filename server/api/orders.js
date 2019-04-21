const router = require('express').Router();
const { Order, LineItem, Product } = require('../db/models');
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
      // if the item already existed in the session cart, map through and change the desiredQuantity value on the already existent cart item in order to maintain the order of the cart
      if (!wasCreated) {
        req.session.cart.cartProducts = req.session.cart.cartProducts.map(
          product => {
            if (product.id === item.id) {
              product.desiredQuantity = item.desiredQuantity;
              return product;
            }
            return product;
          }
        );
      } else {
        // otherwise, add the new item to the cart
        req.session.cart.cartProducts.push(item);
      }
    }

    //update the quantity and unitPrice attributes of the lineItem
    await newLineItem.update({ quantity: quantity, unitPrice: unitPrice });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.put('/checkout', async (req, res, next) => {
  try {
    const order = await Order.getCurrentCart(req.user, req.session.cart);

    await order.update({ isCart: false });
    clearSessionCart(req.session);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

function clearSessionCart(session) {
  session.cart.cartProducts = [];
  session.cart.id = null;
  session.cart.numProducts = 0;
}
