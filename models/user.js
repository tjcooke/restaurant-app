// bring in the database connection

const db = require('./conn');

const Review = require('./reviews');

const bcrypt = require('bcryptjs');

// classes should start with an Upper-Case letter
// instances of classes

class User {

    constructor(id, first_name, last_name, email, password){
        // in python we say "self" in javascript "this"
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
    }
    // static means that the function is something the class can do
    // but an instance of the class cannot.
    static getById(id){
        // db.any always returns an array
        
        return db.one(`select * from users where id=${id}`)
                    .then((userData)=>{
                        const userInstance = new User(userData.id, userData.first_name, userData.last_name, userData.email, userData.password);
                        return userInstance;
                    })
                    .catch(()=>{
                        return null;
                    })
    }
    // no "static" because this is an "instance method"
    // the active instance of this class can use this method.
        static getAll() {
            return db.any(`select * from users`)
            .then((arrayofUsers) => {
                return arrayofUsers.map((eaUser) => {
                    return new User(
                        eaUser.id,
                        eaUser.first_name,
                        eaUser.last_name,
                        eaUser.email,
                        eaUser.password
                    )
                })
            })
        }


        static add(userData) {
            // do an insert into the database
            // not using ${} because I don't want to interpolate
            // using ${} so that pg-promise does *safe* interpolation
            return db.one(`
            insert into users 
                (first_name, last_name, email, password 
            values 
                ($1, $2, $3, $4)
                returning id
                `, [userData.first_name, userData.last_name, userData.email, userData.password])
            .then((data) => {
                console.log("you did the thing! Good job!")

                return data;
            })
        }

    save(){
        // use .result when you might want a report about 
        // how many rows got affected
        return db.result(`

        update users set
            first_name='${this.firstName}',
            last_name='${this.lastName}',
            email='${this.email}',
            password='${this.password}'
        where id = ${this.id}
        
        `)
    }

    setPassword(newPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt)
        this.password = hash;
    }

    checkPassword(aPassword) {
        // const isCorrect = bcrypt.compareSync(aPassword, this.password);
        return bcrypt.compareSync(aPassword, this.password);
    }
    get reviews() {
        return db.any(`select * from reviews where user_id=${this.id}`)
            .then((arrayOfReviewData) => {
                const arrayOfReviewInstances = [];
            
                arrayOfReviewData.forEach((data) => {
                    const newInstance = new Review(
                        data.id,
                        data.score,
                        data.textContent,
                        data.restaurant_id,
                        data.user_id
                    );
                    arrayOfReviewInstances.push(newInstance);
                });


                return arrayOfReviewInstances;
            });
    }
}

User.getById(3)
    .then((user)=>{
        // console.log(user)
    })

// export my User model
module.exports = User;