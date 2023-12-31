const express = require("express");
const bodyParser = require("body-parser");
const path= require("path");
const sequelize = require('./util/database');
const Razorpay = require('razorpay');

const app = express();

const loginController = require("./controllers/login");
const signupController = require("./controllers/signup");
const expenseController = require("./controllers/expense");
const Expense = require("./models/expense");
const User = require("./models/user");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

User.hasMany(Expense);
Expense.belongsTo(User);

//Signup API call
app.get('/signup', signupController.getSignup);
app.post('/signup', signupController.postSignup);

// // Login API call
app.get("/login", loginController.getLogin);
app.post("/login", loginController.postLogin);

// // expense API call
app.get("/expense/:id", expenseController.getExpense);
app.post("/expense/:id", expenseController.postExpense);
app.post("/deleteExpense/:id", expenseController.delExpense);
app.post('/totalExpense', expenseController.totalExpense);


// IMPLEMENTING RAZORPAY
const Payment = require('./models/order');

const razorpay = new Razorpay({
    key_id: 'rzp_test_w9RAuqqQaVeilM',
    key_secret: 'yviui68I1jfo1BBXkreL8i1k',
  });
  
  // Handle Razorpay payment success callback
  app.post('/razorpay/callback', async (req, res) => {
    // Verify the webhook signature (optional but recommended)
    const attributes = req.body;
  
    // Save payment details to the database
    await Payment.create({
      orderId: attributes.payload.payment.entity.orderId,
      amount: attributes.payload.payment.entity.amount,
      // Save other fields as needed
    });
  
    res.sendStatus(200);
  });



sequelize.sync()
.then(result=>{
    app.listen(4000, ()=>{
      console.log("Server running");
    })
}) 
.catch((err)=>{
    console.log("Database Error setting Sequelize",err);
});
