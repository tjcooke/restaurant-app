const express = require('express');
const app = express();
const http = require('http');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const Restaurant = require('./models/restaurants')
const User = require('./models/user');

app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.getAll();
    res.json(allRestaurants);
});

app.get('/users', async (req, res) =>{
    const allUsers = await User.getAll();
    res.json(allUsers);
});
app.get('users/:id', async (req, res) => {
    const theUser = await User.getById(req.params.id);
    res.json(theUser);
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});