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
    const item = req.body.item;
    const itemToDB = {};
    itemToDB.unitPrice = await Product.getPrice(Number(item.id));
    itemToDB.orderId = order.id;
    itemToDB.productId = item.id;
    itemToDB.quantity = item.desiredQuantity;
    let order;

    //grab user
    if (req.user) {
      //find 'cart' order if it exits
      //if cart order exists, set ordererId variable for lineitem to that orderid
      //else create new order and set this user to the order
      order = (await Order.findCart(req.user.id)) || (await Order.create());
      await order.setUser(req.user);
    }

    //if there is no user on the session, // does req.session.cart.id exist ? if it does, find that order and add to it below. if it doesn't, create the order and set req.session.card.id to that order id

    //create new items array, only taking the product id from the items array in the req body

    let lineItems = [];

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemToDB = {};

      lineItems.push(itemToDB);
    }

    const lineItemArr = await LineItem.bulkCreate(lineItems);

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});
