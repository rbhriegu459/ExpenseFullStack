const express = require("express");
const db = require("../config");
const path= require("path");
const bcrypt = require('bcrypt');

const app = express();


// ----------------------------------------LOGIN API --------------------------------------------------------------------

const getLogin = app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

const postLogin = app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    // Check credentials in the database
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
      if (err) throw err;
  
      else{
        if (results.length > 0) {
            const hashedPassword = results[0].password;
    
            // Compare the entered password with the hashed password using bcrypt
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
    
            if (passwordMatch) {
                res.redirect(`/expense/${results[0].id}`);
            } else {
              res.send('Invalid username or password');
            }
          } 
          
          else {
            res.send('Invalid username or password');
          }
      }

    });
  });

  module.exports = {getLogin, postLogin};