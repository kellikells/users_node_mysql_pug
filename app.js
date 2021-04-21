const { ENGINE_METHOD_ALL } = require('constants');
const express = require('express');
const pageRouter = require('./routes/pages');
const path = require('path');

const app = express();

// for body parser 
app.use(express.urlencoded( { extended : false } ));

// serve static files 
app.use(express.static(path.join(__dirname, 'public')));


// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// (p2)
// ---------------------------------
// // serving the index page
// app.get('/', function(req, res) {
//     res.render('index');
// });
// ---------------------------------

// (p3)
// ---------------------------------
//routers
app.use('/', pageRouter);
// ---------------------------------


// errors: page not found 404
app.use((req, res, next) => {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
});

// handling errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
})

// setting up the server
app.listen(9000, () => {
    console.log('server running on port 9000');
});

module.exports = app;