const router = require('express').Router();
const { User, Order, Product } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/orders', async (req, res, next) => {
  try {
    if (req.user) {
      const orders = await Order.findAll({
        include: [
          { model: Product, attributes: ['name', 'color', 'manufacturer'] }
        ],
        where: {
          userId: req.user.id
        }
      });
      res.status(200).send(orders);
    } else {
      res.send(404);
    }
  } catch (error) {
    next(error);
  }
});
