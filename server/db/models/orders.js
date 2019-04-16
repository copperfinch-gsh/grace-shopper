const Sequelize = require('sequelize');
const db = require('../db');

const Orders = db.define('orders', {
    total: {
        type: Sequelize.FLOAT
    }
})

module.exports = Orders;