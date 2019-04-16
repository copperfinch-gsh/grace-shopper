const db = require('../db');
const User = require('./user');
const Product = require('./product');
const Orders = require('./orders');
const OrderHistory = require('./orderHistory')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Orders.belongsTo(User);
User.hasMany(Orders);

Product.belongsToMany(Orders, {through: OrderHistory});
Orders.belongsToMany(Product, {through: OrderHistory});



/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Product,
  Orders,
  OrderHistory
}
