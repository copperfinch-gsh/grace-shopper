const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('lineItem', {
  unitPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
});

module.exports = LineItem;
