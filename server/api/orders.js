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

      itemToDB.price = await Product.getPrice(Number(item.id));
      itemToDB.orderId = order.id;
      itemToDB.productId = item.id;

      lineItems.push(itemToDB);
    }

    // const cart = items.map(async item => {
    //   console.log('SINGLE ITEMMMM', item);
    //   item.price = await Product.getPrice(Number(item.id));
    //   item.orderId = order.id;
    //   item.productId = item.id;
    //   console.log('PRODUCTT IDDD', item.productId);
    //   return item;
    // });

    await LineItem.bulkCreate(lineItems);

    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});
