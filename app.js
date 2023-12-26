const express = require("express");
const db = require("./config");
const bodyParser = require("body-parser");
const path= require("path");

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

app.post('/signup', (req,res) => {
    const { email,name, password } = req.body;

        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, email, (err, results) => {
          if (err) throw err;
      
          if (results.length > 0) {
            res.redirect('/login');
          } else {
            const q = 'INSERT INTO users (email, name, password) VALUES (?, ?, ?)';
            db.query(q, [email,name, password], (err, result) => {
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
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        res.sendFile(path.join(__dirname, 'public/expensePage.html'));
      } else {
        res.send(`
        <h1>Invalid email or password</h1>
        <a href="/login">Login</a>
        `);
      }
    });
  });

app.listen("3000");
