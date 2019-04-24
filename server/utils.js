const { Order } = require('./db/models');
const nodemailer = require('nodemailer');

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

function formatWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function sumCartProducts(cartArr) {
  return cartArr.reduce((accum, cur) => {
    return accum + cur.price * cur.desiredQuantity;
  }, 0);
}

function emailConfirmation(user, order, total) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'graceshredder@gmail.com',
      pass: 'almonds123'
    }
  });
  const mailOptions = {
    from: 'graceshredder@gmail.com',
    to: user.email,
    subject: "Thanks for shreddin' with us!",
    html: `<h1>Thank you for shopping with us. Please see your order number and total below!<h3>Order Number: ${
      order.id
    }</h3><h3>Total: $${total}</h3>`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  checkMerge,
  clearSessionCart,
  formatWithCommas,
  sumCartProducts,
  emailConfirmation
};
