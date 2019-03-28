const pgp = require('pg-promise')();
const options = {
    host: 'localhost',
    database:'restaurant-app'
};


const db = pgp(options);
module.exports = db;

// db.any('SELECT * FROM users WHERE id=1')
//     .then(function(data) {
//         console.log(data);
//     })
//     .catch(function(error) {
//         // error;
//     });