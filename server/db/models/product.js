const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://www.long-mcquade.com/images/departmentHeaders/department_5.jpg'
    },
    description: {
        type: Sequelize.TEXT
    },
    type: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    color: {
        type: Sequelize.STRING
    },
    manufacturer: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    }
})

module.exports = Product;