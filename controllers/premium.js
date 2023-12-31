const express = require('express');
const app = express();
const Razorpay = require('razorpay');
// require('dotenv').config(); 

// Create Razorpay instance with your Razorpay Key Id and Secret Key
const instance = new Razorpay({
    key_id: 'rzp_test_gdQcFBOZGefKtL',
    key_secret: 'izPgEjFFgTx0sv7I1qZMqoMi',
  });
  
// Handle premium account purchase
const premium = async (req, res) => {
    console.log("created orderId request", req.body);
    var options = {
        amount:req.body.amount,
        currency:'INR',
        receipt:'rcp1'
      };
    
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({orderId: order.id});
      })
  };

  module.exports=  premium;

// const User = require("../models/user");
// const Expense = require("../models/expense");
// const sequelize = require("../util/database");

// const getUserLeaderboard = async (req, res) => {
//   try {
//     const leaderboardofusers = await User.findAll({
//       order: [["total", "DESC"]],
//     });

//     res.status(200).json(leaderboardofusers);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// };

// module.exports = {
//   getUserLeaderboard,
// };
