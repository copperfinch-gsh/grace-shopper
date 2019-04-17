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

    console.log('ITEMSSSS', items);

    //grab user
    if (req.user) {
      await order.setUser(req.user);
    }

    const cart = items.map(async item => {
      item.price = await Product.getPrice(item.id);
      item.orderId = order.id;
      item.productId = item.id;
      return item;
    });

    await LineItem.bulkCreate(cart);

    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});
