const db = require('./conn');

// function getUserById(theId) {
//     return db.any(`SELECT * from users where id=${theId}`)
// }

// getUserById(1).then(console.log)
//     .then(() =>{
//         getUserById(2).then(console.log)
//     })


function getUserNames(theId) {
    return db.any(`SELECT first_name, last_name from users where id=${theId}`)
}

getUserNames(1).then(console.log);













// function getUserById(theId) {
//     // const theId = 3;
    
//    return db.any(`SELECT * FROM users WHERE id=${theId}`)
//         .then(function(data) {
//             console.log(data);
//         })
//         .catch(function(error) {
//             // error;
//         });

// }

// getUserById(1)
//     .then(function () {
//         getUserById(2)
//     })
//     .then(function () {
//     getUserById(3)
// })