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
    const productToUpdate = await Product.findByPk(productId);

    if (!productId) {
      res.sendStatus(404);
    } else {
      const updatedProduct = await productToUpdate.Update({
        price: req.body.price
      });
      res.status(201).send(updatedProduct);
    }
  } catch (error) {
    next(error);
  }
});
