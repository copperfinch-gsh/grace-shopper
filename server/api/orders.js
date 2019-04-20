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

router.post('/', async (req, res, next) => {
  try {
    //one item at a time coming to post route
    const item = req.body;
    let order;
    //grab user
    if (req.user) {
      //find 'cart' order if it exits
      //else create new order
      order = (await Order.findCart(req.user.id)) || (await Order.create());

      // if we created a new order, set the user on the session to it
      if (!order.userId) await order.setUser(req.user);
    } else if (req.session.cart.id) {
      //if there's no logged in user, but the session cart has been added to
      order = await Order.findByPk(req.session.cart.id);
    } else {
      //otherwise, we need to create a new order for the non-logged in user
      order = await Order.create();
      //establish session cart id
      req.session.cart.id = order.id;
    }

    //this will be the lineItem to be sent in

    const unitPrice = await Product.getPrice(Number(item.id));
    const quantity = item.desiredQuantity;

    const [newLineItem, wasCreated] = await LineItem.findOrCreate({
      where: {
        orderId: order.id,
        productId: item.id
      }
    });

    await newLineItem.update({ quantity: quantity, unitPrice: unitPrice });

    res.status(201).json(newLineItem);
  } catch (err) {
    next(err);
  }
});
