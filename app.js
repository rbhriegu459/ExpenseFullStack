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
    const { username,name, password } = req.body;
    const query = 'INSERT INTO users (username, name, password) VALUES (?, ?, ?)';
        db.query(query, [username,name, password], (err, result) => {
            if (err) {
                console.error('MySQL query error:', err);
                return res.status(500).sendFile(path.join(__dirname, '/public/error.html'));
            }

            console.log('User registered successfully');
            res.sendFile(path.join(__dirname, 'public/expensePage.html'));
        });
});

app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    // Check credentials in the database
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        res.sendFile(path.join(__dirname, 'public/expensePage.html'));
      } else {
        res.send(`
        <h1>Invalid Username or password</h1>
        <a href="/login">Login</a>
        `);
      }
    });
  });

app.listen("3000");
