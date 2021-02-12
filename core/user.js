const pool = require('./pool');
const bcrypt = require('bcrypt');


function User() { };

User.prototype = {
    // ----------------------------------------------

    // find user data by id or username
    find: function (user = null, callback) {
        // if the user variable is defined
        if (user) {
            // if (user = number), return field = id || if (user = string), return field=username
            var field = Number.isInteger(user) ? 'id' : 'username';
        }
        //prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;


        pool.query(sql, user, function (err, result) {
            if (err) throw err

            if (result.length) {
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object 
    // ----------------------------------------------
    create: function (body, callback) {
        let pwd = body.password;

        // hashing the password before putting it into db 
        body.password = bcrypt.hashSync(pwd, 10);

        // this array holds the values of the fileds
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for (prop in body) {
            bind.push(body[prop]);
        }

        // prepare sql query
        let sql = `INSERT INTO users(username, fullname, password) VALUES (?, ?, ?)`;

        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function (err, result) {
            if (err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });

        // pool.query(sql, bind, function (err, lastId) {
        //     if (err) throw err;
        //     callback(lastId);
        // });
    },
    // ----------------------------------------------

    login: function (username, password, callback) {

        // find user data by username
        this.find(username, function (user) {

            //if there is a matching username in db
            if (user) {
                // check if passwords match
                if (bcrypt.compareSync(password, user.password)) {
                    // return user data
                    callback(user);
                    return;
                }
            }

            // if the username/password is wrong then return null
            callback(null);
        });
    }
}



// ----------------------------------------------
// QUERY the database as we receive post requests

// this is imported in /routes/pages.js
module.exports = User;