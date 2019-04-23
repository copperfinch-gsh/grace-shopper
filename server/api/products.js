const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const product = await Product.findByPk(productId);
    const price = Number(req.body.price) * 100;

    if (!productId) {
      res.sendStatus(404);
    } else {
      const updatedProduct = await product.update({
        price
      });

      res.status(200).send(updatedProduct);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const product = await Product.findByPk(productId);

    if (!productId) {
      res.sendStatus(404);
    } else {
      await product.destroy();

      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
});
