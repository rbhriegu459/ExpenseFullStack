const express = require("express");
const db = require("../config");
const path= require("path");

const app = express();

const getExpense = app.get('/expense/:id', (req,res) => {
    const user_id= req.params.id;
    db.query("select * from expenses where user_id=?",[user_id], (err, result) =>{
        if(err){
            res.sendFile(path.join(__dirname, "../public/error.html"));
        }
        res.render("../public/expensePage.ejs", {expenses : result, user_id:user_id});
    })
});

const postExpense = app.post('/expense/:id', (req,res) =>{
    const user_id = req.params.id;
    const {description, amount, category} = req.body;
    const newData = {user_id, description, amount, category};

    db.query('INSERT INTO expenses SET ?', newData, (err, result) => {
        if (err) console.log(err);
        console.log("Expense Added");
        res.redirect(`/expense/${user_id}`);
  });
});

const delExpense = app.post('/deleteExpense/:id', (req,res) => {
    const delId = req.params.id;

    db.query("SELECT user_id FROM expenses where id=?",delId, (err, result) => {
        const user_id = result[0].user_id;
        db.query("DELETE FROM expenses WHERE id=?", delId, (err, result) => {
            if(err ) throw err;
            res.redirect(`/expense/${user_id}`);
        })
    })
})

module.exports = {getExpense, postExpense, delExpense};