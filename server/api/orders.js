const router = require('express').Router()
const {Order, OrderHistory} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const total = Number(req.body.total)
    const items = req.body.items
    const order = await Order.create({
      total
    })

    //grab user
    if (req.user) {
      await order.setUser(req.user)
    }

    const cart = items.map(item => {
      item.orderId = order.id
      item.productId = item.id
      return item
    })

    await OrderHistory.bulkCreate(cart)

    res.status(201).send(order)
  } catch (err) {
    next(err)
  }
})
