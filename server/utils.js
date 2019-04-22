const { Order } = require('./db/models');

async function checkMerge(user, sessionId) {
  try {
    //if there already exists a guest cart on the session, merge the carts
    if (sessionId) {
      let userCart = await Order.findCart(Number(user.id));
      const guestCart = await Order.findByPk(sessionId);
      if (!userCart) {
        // if there is no user cart yet, just use the guest cart
        userCart = guestCart;
        // set the user on the guest cart to the current user
        if (!userCart.userId) await userCart.setUser(user);
      } else {
        //if a user cart already existed, merge the two carts
        await userCart.mergeCarts(guestCart.id);
        await Order.destroy({
          where: {
            id: guestCart.id
          }
        });
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

function clearSessionCart(session) {
  session.cart.cartProducts = [];
  session.cart.id = null;
  session.cart.numProducts = 0;
}

module.exports = { checkMerge, clearSessionCart };
