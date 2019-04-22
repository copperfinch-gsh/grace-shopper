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

router.get('/:id/orders', async (req, res, next) => {
  try {
    if (req.user && Number(req.user.id) === Number(req.params.id)) {
      const orders = await Order.findAll({
        include: [
          { model: Product, attributes: ['name', 'color', 'manufacturer'] }
        ],
        where: {
          userId: req.user.id,
          isCart: false
        }
      });
      res.status(200).json(orders);
    } else {
      res.send(401);
    }
  } catch (error) {
    next(error);
  }
});
