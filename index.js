const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const Restaurant = require('./models/restaurants')
const User = require('./models/user')

const server = http.createServer(async (req,res)=> {
    console.log(req);

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');

    // if req.url is "/restaurants" send them all restaurants
    // if it's /"users" send a list of users
    // else if it doesn't match either, send a welcome message
    
    const method = req.method;

    if (req.url.startsWith("/restaurants")) {
        if(method === "GET") {
        const allRestaurants = await Restaurant.getAll();
        const restaurantJSON = JSON.stringify(allRestaurants)
        res.end(restaurantJSON);
        }  else if (method === "POST") {
            res.end('{message: "no soup for you"}');
        } else if (method === "PUT") {
            res.end('{ message: "you wanna update, doncha?"}');
        } else if (method === "DELETE") {
            res.end('{ message: "rm the restaurant"}')
        }

    } else if (req.url.startsWith("/users")) {


        const parts = req.url.split("/");
        console.log(parts);
        // when the req.url is "/users", parts is "[ '', 'users' ]"
        // when req.url is "users/3" parts is "[ '', 'users', '3' ]"

        if (method === "GET") {
            
            if (parts.length === 2) {
                const allUsers = await User.getAll();
                const userJSON = JSON.stringify(allUsers)
                res.end(userJSON)
    
            } else if (parts.length === 3) {
                // the id will be parts[2]
                const userId = parts[2];
                // get user by id
                const theUser = await User.getById(userId);
                const userJSON = JSON.stringify(theUser);
                res.end(userJSON);
    
            } else {
                res.statusCode = 404;
                res.end('SYNTAX ERROR: YOUR ACCESS TO THIS WEB PAGE HAS BEEN DECIDEDLY DENIED.')
            }

        } else if (method === "POST") {
            res.end('{message: "no soup for you"}');
        } else if (method === "PUT") {
            res.end('{ message: "you wanna update, doncha?"}');
        } else if (method === "DELETE") {
            res.end('{ message: "rm the user"}')
        }


    } else {
        res.end(`{message: "Thank you for your patronage. Please send bitcoin."}`);
    }
});

server.listen(port, hostname, () => {
    console.log(`listening on http://${hostname}:${port}`)
})