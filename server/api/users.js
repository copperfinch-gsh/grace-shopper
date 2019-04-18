const router = require('express').Router();
const { User, Order, Product } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const users = await User.findAll({
        attributes: ['id', 'email', 'firstName', 'lastName']
      });
      res.json(users);
    } else {
      res.sendStatus(401);
    }
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
      res.send(401);
    }
  } catch (error) {
    next(error);
  }
});
