const express = require("express");
const db = require("./config");
const bodyParser = require("body-parser");
const path= require("path");
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/signup', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/signup.html'));
});

app.post('/signup', async (req,res) => {
    const { email,name, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, email, (err, results) => {
        if (err) throw err;      
        if (results.length > 0) {
            res.redirect('/login');
        } 
        else {
            const q = 'INSERT INTO users (email, name, password) VALUES (?, ?, ?)';
            db.query(q, [email,name, hashedPassword], (err, result) => {
                if (err) {
                    console.error('MySQL query error:', err);
                    return res.status(500).sendFile(path.join(__dirname, '/public/error.html'));
                }

                console.log('User registered successfully');
                res.sendFile(path.join(__dirname, 'public/expensePage.html'));
            });
          }
        });
});

app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.post('/login', (req, res) => {
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
                res.sendFile(path.join(__dirname, 'public/expensePage.html'));
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

app.listen("3000");
