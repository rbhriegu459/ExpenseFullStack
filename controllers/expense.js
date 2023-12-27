const express = require("express");
const db = require("../config");
const path= require("path");

const app = express();

const getExpense = app.get('/expense', (req,res) => {
    
    db.query("select * from expenses", (err, result) =>{
        if(err){
            res.sendFile(path.join(__dirname, "../public/error.html"));
        }
        res.render("../public/expensePage.ejs", {expenses : result});
    })
});

const postExpense = app.post('/expense', (req,res) =>{
    const {description, amount, category} = req.body;
    const newData = {description, amount, category};

    db.query('INSERT INTO expenses SET ?', newData, (err, result) => {
        if (err) console.log(err);
        console.log("Expense Added");
        res.redirect('/expense');
  });
});

const delExpense = app.post('/deleteExpense/:id', (req,res) => {
    const delId = req.params.id;
    db.query("DELETE FROM expenses WHERE id=?", delId, (err, result) => {
        if(err ) throw err;
        res.redirect('/expense');
    })
})

module.exports = {getExpense, postExpense, delExpense};