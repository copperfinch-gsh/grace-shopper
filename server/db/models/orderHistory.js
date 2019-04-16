const Sequelize = require('sequelize');
const db = require('../db');

const OrderHistory = db.define('orderHistory', {
    price: {
        type: Sequelize.FLOAT
    },
    quantity: {
        type: Sequelize.INTEGER
    }
})

module.exports = OrderHistory;