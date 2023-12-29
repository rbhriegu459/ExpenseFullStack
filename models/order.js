const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Order =sequelize.define('order', {
    id:{
        type: Sequelize.INTEGER,
    },
    userId: {type: Sequelize.STRING},
    orderId:{type: Sequelize.STRING},
    }, 
    { timestamps: false} //disables createdat and updatedat
)

module.exports = Order;