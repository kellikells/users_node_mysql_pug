// this is imported in: app.js line 3

const express = require('express');
const { route } = require('../app');
const router = express.Router();

// GET index page
router.get('/', (req, res, next) => {
    res.render('index', {title:"my application"});
});

// GET home page
router.get('/home', (req, res, next) => {
    res.send('this is the home page');
});

// POST login data (user submits login form)
router.post('/login', (req, res, next) => {
    res.json(req.body);
});

// POST register data (user submits register form)
router.post('/register', (req, res, next) => {
    res.json(req.body);
});



module.exports = router; 