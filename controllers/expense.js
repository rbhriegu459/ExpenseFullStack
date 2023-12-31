const express = require("express");
const path= require("path");
const sequelize = require('../util/database');
const Expense = require("../models/expense");
const { where } = require("sequelize");


const app = express();


const getExpense = async (req,res) => {
    try{
        const userId = req.params.id;
        const expenses = await Expense.findAll({where: {userId : userId}});
        res.render("../public/expensePage.ejs", {expenses : expenses, userId:userId});
    }catch(err){
        console.error('Error fetching expenses from database', err);
        res.status(500).json({error: 'Internal Server Error'});
    }

    // db.query("select * from expenses where user_id=?",[user_id], (err, result) =>{
    //     if(err){
    //         res.sendFile(path.join(__dirname, "../public/error.html"));
    //     }
    //     res.render("../public/expensePage.ejs", {expenses : result, user_id:user_id});
    // })
};

const postExpense = async (req,res) =>{
   try{
    const userId = req.params.id;
    const {description, amount, category} = req.body;

    const newExpense = await Expense.create({userId, description, amount, category});
    // res.status(201).json({newExpense});
            res.redirect(`/expense/${userId}`);
   }
   catch(err){
        console.error('Error in Adding Expense to the database', err);
        res.status(500).json({error: 'Internal Server Error'});
   }
   
//     db.query('INSERT INTO expenses SET ?', newData, (err, result) => {
//         if (err) console.log(err);
//         console.log("Expense Added");
//   });
};

// const delExpense = app.post('/deleteExpense/:id', (req,res) => {
//     const delId = req.params.id;

//     db.query("SELECT user_id FROM expenses where id=?",delId, (err, result) => {
//         const user_id = result[0].user_id;
//         db.query("DELETE FROM expenses WHERE id=?", delId, (err, result) => {
//             if(err ) throw err;
//             res.redirect(`/expense/${user_id}`);
//         })
//     })
// })

const delExpense = async (req,res) => {
    try{
        const delId = req.params.id;
        const userId = await Expense.findOne({where: {id:delId}});
        console.log(userId.userId);
        await Expense.destroy({where: {id:delId}});
        res.redirect(`/expense/${userId.userId}`);
    } catch(err){
        console.error('Unable to delete Expense the database', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const totalExpense = async (req,res) =>{
    try{
        const user_id=  req.params.id;
        const total_expense = await Expense.sum('amount', {where:{userId: user_id}});
        res.status(200).json({totalExpense: total_expense});
    } catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {getExpense, postExpense, delExpense, totalExpense}; 