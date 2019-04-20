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

// eslint-disable-next-line complexity
router.post('/', async (req, res, next) => {
  try {
    //one item at a time coming to post route
    const item = req.body.product;
    let quantity = req.body.desiredQuantity;
    let order;
    //grab user
    if (req.user) {
      //find 'cart' order if it exits
      //else create new order
      order = (await Order.findCart(req.user.id)) || (await Order.create());

      // if we created a new order, set the user on the session to it
      if (!order.userId) await order.setUser(req.user);
    } else if (req.session.cart.id) {
      //if there's no logged in user, but the session cart has been added to
      order = await Order.findByPk(req.session.cart.id);
      req.session.cart.numProducts += quantity;
    } else {
      //otherwise, we need to create a new order for the non-logged in user
      order = await Order.create();
      //establish session cart id
      req.session.cart.id = order.id;
      req.session.cart.numProducts += quantity;
    }

    const unitPrice = await Product.getPrice(Number(item.id));

    const [newLineItem, wasCreated] = await LineItem.findOrCreate({
      where: {
        orderId: order.id,
        productId: item.id
      }
    });

    // if the lineItem already exists, add the quantities (aka desiredQuantity values) to each other
    if (!wasCreated) {
      quantity += newLineItem.quantity;
    }
    //if there is no user, set the item's desiredQuantity equal to either the original quantity passed in or the newly summed up quantity from the !wasCreated check above
    if (!req.user) {
      item.desiredQuantity = quantity;
      // if the item already existed in the session cart, map through and change the desiredQuantity value on the already existent cart item in order to maintain the order of the cart
      if (!wasCreated) {
        let cart = req.session.cart.cartProducts;
        let cartLength = cart.length;
        for (let i = 0; i < cartLength; i++) {
          if (cart[i].id === item.id) {
            req.session.cart.cartProducts[i].desiredQuantity =
              item.desiredQuantity;
            break;
          }
        }
      } else {
        // otherwise, add the new item to the cart
        req.session.cart.cartProducts.push(item);
      }
    }

    //update the quantity and unitPrice attributes of the lineItem
    await newLineItem.update({ quantity: quantity, unitPrice: unitPrice });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});
