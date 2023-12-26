const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "rishita",
    database:"expensetracker"
});

connection.connect((err)=>{
    if(err) console.log(err);
    console.log("Connected to Database");
});

module.exports = connection;