// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('expensetracker', 'root', 'rishita', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// const Payment = sequelize.define('order', {
//   orderId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   amount: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });

// module.exports = Payment;

const Sequelize = require('sequelize');
const User = require('./user');
const sequelize = require('../util/database');

  const Order = sequelize.define('order', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    paymentid:Sequelize.STRING,
    orderid:Sequelize.STRING,
    status:Sequelize.STRING,

  });

//User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;