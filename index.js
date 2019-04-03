const express = require('express');
const app = express();
const handlers = require('./handlers');
const es6Renderer = require('express-es6-template-engine')
app.use(express.urlencoded({extended:true}));
const {getRestaurants, postRestaurants, putRestaurants, deleteRestaurants, getUsers, getUserById, postUsers, deleteUser} = handlers;
const port = 3000;

app.engine('html', es6Renderer) // introduce them:
// "hey app, meet es6Renderer, they speak HTML"

app.set('view engine', 'html'); // tell express to use as its view engine the thing that speaks html.

app.set('views', 'views'); // tell express where to find the view files. (The second argument is the name of the directory where my template files will live.)

// When they ask for the login page, send the login form.
app.get('/login', (req, res) => {
    // res.send('this is the login form')
    res.render('login-form');
});

app.get('/restaurants', getRestaurants);

app.post('/restaurants', postRestaurants);

app.put('/restaurants', putRestaurants);

app.delete('/restaurants', deleteRestaurants);

app.get('/users', getUsers);

app.get('/users/:id', getUserById);

app.post('/users', postUsers);

app.delete('/users/:id', deleteUser);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});