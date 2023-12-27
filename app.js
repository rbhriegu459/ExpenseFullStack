const express = require("express");
const bodyParser = require("body-parser");
const path= require("path");

const app = express();

const loginController = require("./controllers/login");
const signupController = require("./controllers/signup");
const expenseController = require("./controllers/expense");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Signup API call

app.get('/signup', signupController.getSignup);
app.post('/signup', signupController.postSignup);

// Login API call
app.get("/login", loginController.getLogin);
app.post("/login", loginController.postLogin);

// expense API call
app.get("/expense/:id", expenseController.getExpense);
app.post("/expense/:id", expenseController.postExpense);
app.post("/deleteExpense/:id", expenseController.delExpense);

app.listen("3000");
