const { ENGINE_METHOD_ALL } = require('constants');
const express = require('express');
const path = require('path');

const app = express();

// for body parser 
app.use(express.urlencoded( { extended : false } ));

// serve static files 
app.use(express.static(path.join(__dirname, 'public')));


// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// serving the index page
app.get('/', function(req, res) {
    res.render('index');
});

// setting up the server
app.listen(9000, () => {
    console.log('server running on port 9000');
});

module.exports = app;