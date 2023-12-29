const express = require("express");
const path= require("path");
const bcrypt = require('bcrypt');

const User = require('../models/user');
const app = express();

// ----------------------------------------LOGIN API --------------------------------------------------------------------

const getLogin = app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

const postLogin = app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
      const existingUser = await User.findOne({ where: { email } });

      // console.log(existingUser.dataValues.password);
        const hashedPassword = existingUser.dataValues.password;
        if(existingUser) {
          const passwordMatch = await bcrypt.compare(password, hashedPassword);
          if(passwordMatch){
            // res.status(201).json({message: 'Login succesful'});
            res.redirect(`/expense/${existingUser.dataValues.id}`);
          }
          else{
            res.status(500).send("Incorrect Password");
          }
        } else{
          throw new Error("User doesn't exists, please Sign up first");
        }
    }
    catch(err){
      console.error("Login failed", err);
        res.status(500).send("Login failed" + err);
    }
  

    // Check credentials in the database
    // const query = 'SELECT * FROM users WHERE email = ?';

    // db.query(query, [email], async (err, results) => {
    //   if (err) throw err;
  
    //   else{
    //     if (results.length > 0) {
    //         const hashedPassword = results[0].password;
    
    //         // Compare the entered password with the hashed password using bcrypt
    //         const passwordMatch = await bcrypt.compare(password, hashedPassword);
    
    //         if (passwordMatch) {
    //             res.redirect(`/expense/${results[0].id}`);
    //         } else {
    //           res.send('Invalid username or password');
    //         }
    //       } 
          
    //       else {
    //         res.send('Invalid username or password');
    //       }
    //   }

    // });
  });

  module.exports = {getLogin, postLogin};