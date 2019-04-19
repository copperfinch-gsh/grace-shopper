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
    const items = req.body.items;
    const order = await Order.create();

    //grab user
    if (req.user) {
      await order.setUser(req.user);
    }

    //create new items array, only taking the product id from the items array in the req body
    let lineItems = [];

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemToDB = {};

      itemToDB.unitPrice = await Product.getPrice(Number(item.id));
      itemToDB.orderId = order.id;
      itemToDB.productId = item.id;
      itemToDB.quantity = item.desiredQuantity;

      lineItems.push(itemToDB);
    }

    const lineItemArr = await LineItem.bulkCreate(lineItems);

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});
