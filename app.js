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


sequelize.sync()
.then(result=>{
    app.listen(3000, ()=>{
            console.log("Server running");
    })
}) 
.catch((err)=>{
    console.log("Database Error setting Sequelize",err);
})


// app.listen("3000");
