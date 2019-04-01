const express = require('express');
const app = express();
const http = require('http');
const querystring = require('querystring');
app.use(express.urlencoded({extended:true}))

const hostname = '127.0.0.1';
const port = 3000;

const Restaurant = require('./models/restaurants')
const User = require('./models/user');

app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.getAll();
    res.json(allRestaurants);
});

app.post('/restaurants', async (req, res) => {
    res.send('You added a restaurant!')
});

app.put('/restaurants', async (req, res) => {
    res.send('you updated the restaurant!')
});

app.delete('/restaurants', async (req, res) => {
    res.send('you deleted a restaurant!')
});

app.get('/users', async (req, res) =>{
    const allUsers = await User.getAll();
    res.json(allUsers);
});

app.get('/users/:id', async (req, res) => {
    const {id} = req.params;
    const theUser = await User.getById(id);
    res.json(theUser);
});

app.post('/users', async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    await User.add(first_name, last_name, email, password)
    res.send(`added a new user ${req.body}`);
});

app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;
    await User.delete(id);
    res.send(`You deleted user: ${id}`);
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});