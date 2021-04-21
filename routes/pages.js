// this is imported in: app.js line 3
const express = require('express');
const router = express.Router();

// const { route } = require('../app');

//require User class to query the db as POST request are received
const User = require('../core/user');

// create an object from the class User in the file core/user.js
const user = new User();


// GET index page
router.get('/', (req, res, next) => {
    res.render('index', { title: "my application" });
});

// GET home page
router.get('/home', (req, res, next) => {
    res.send('this is the home page');
});

// POST login data (user submits login form)
router.post('/login', (req, res, next) => {
    // res.json(req.body);

    user.login(req.body.username, req.body.password, function (result) {
        if (result) {
            res.send('logged in as : ' + result.username);
        } else {
            res.send('Username/Password incorrect!');
        };
    });
});

// POST register data (user submits register form)
router.post('/register', (req, res, next) => {
    // res.json(req.body);

    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };



    user.create(userInput, function (lastId) {
        if (lastId) {
            res.send('Welcome ' + userInput.username);
        } else {
            console.log('Error creating a new user');
        }
    });
});



module.exports = router; 