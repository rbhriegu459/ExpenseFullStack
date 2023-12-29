const express = require("express");
const path= require("path");
const bcrypt = require('bcrypt');
const User = require('../models/user');


// ----------------------------------------------SIGNUP API ---------------------------------------------

const getSignup =async (req,res) =>{
    res.sendFile(path.join(__dirname, '../public/signup.html'));
};

const postSignup =  async (req,res) => {
    try{
            const { email,name, password } = req.body;

            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            const existingUser = await User.findOne({ where: { email } });

            if(existingUser) {
                // throw new Error("User already exists");
                res.status(404).sendFile(path.join(__dirname,'..', 'public', 'error.html'));
            }

            else{
              const newUser = await User.create({ name, email, password: hashedPassword });
              res.redirect(`/expense/${newUser.id}`);
          }
        }
      catch (err) {
        console.error("Signup failed", err);
        res.status(500).send("Signup failed" + err);
      }
    };

    // const query = 'SELECT * FROM users WHERE email = ?';
    // db.query(query, email, (err, results) => {
    //     if (err) throw err;      
    //     if (results.length > 0) {
    //         res.redirect('/login');
    //     } 
    //     else {
    //         const q = 'INSERT INTO users (email, name, password) VALUES (?, ?, ?)';
    //         db.query(q, [email,name, hashedPassword], (err, result) => {
    //             if (err) {
    //                 console.error('MySQL query error:', err);
    //                 return res.status(500).sendFile(path.join(__dirname, '../public/error.html'));
    //             }

    //             console.log('User registered successfully');
    //             db.query("SELECT id FROM users where email=?", [email], (errs, ress) =>{
    //                 res.redirect(`/expense/${ress[0].id}`);
    //             })
    //         });
    //       }
    //     });
// });

module.exports = {getSignup, postSignup};