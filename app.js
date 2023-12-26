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

    // Insert user into the database
    const query = 'INSERT INTO users (username, name, password) VALUES (?, ?, ?)';
    db.query(query, [username,name, password], (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).sendFile(path.join(__dirname, '/public/error.html'));
        }

        console.log('User registered successfully');
        res.send('User registered successfully');
    });
});

app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.post('/login', (req,res) => {
    // const { username, password } = req.body;

    // // Insert user into the database
    // const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    // db.query(query, [username, password], (err, result) => {
    //     if (err) {
    //         console.error('MySQL query error:', err);
    //         return res.status(500).sendFile(path.join(__dirname, '/public/error.html'));
    //     }

    //     console.log('User registered successfully');
    //     res.send('User registered successfully');
    // });
    res.sendFile(path.join(__dirname , 'public/error.html'));
});

app.listen("3000");
