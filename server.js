const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');

// astro is the name of the db we created in MongoDB
// admin01:12345 is our username:password we set in MongoDB
const db = "mongodb+srv://admin01:12345@cluster0-gusad.mongodb.net/astro?retryWrites=true&w=majority";

mongoose
	.connect(db, { useNewUrlParser: true }) // connect to db
	.then(() => console.log("DB connected")) // if we're connected to database, then ...
	.catch(err => console.log(err)); // otherwise catch ...

// Body parser middleware
app.use(express.urlencoded({ extended: false }));



/* GET home page. */
app.get('/', (req,res) => res.json({
	msg: "Hello! Amigoo"
}));


// enable us to pass data via the /users URL, to create a new user, and then save this user to the db
app.post('/users', (req,res) => {
	const newUser = new User(({ // invoking the User schema, imported on top
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	}))
	newUser
		.save() // there are 2 possibilities when the db attemps to save the user
		.then(user => res.json(user)) // 1. if you're successful & the user is saved, show the user saved, and Postman responds with the below:
		.catch(err => console.log(err)) // 2. or you're not successful so throw an error to let us know
});

// {
//     "_id": "5d20709b532f25b7d751058d",
//     "name": "Sonar",
//     "email": "sonar@gmail.com",
//     "password": "Sonar",
//     "date": "2019-07-06T09:57:47.661Z",
//     "__v": 0
// }
// ------------------------------

app.get('/users', (req, res) => { // fetch everything inside the users collection from the db
	User
		.find()
		.then(users => res.json(users))
		.catch(err => console.log(err))
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));



// mongodb+srv://admin01:12345@cluster0-gusad.mongodb.net/astrolabs?retryWrites=true -- OG

// mongodb+srv://admin01:<password>@cluster0-gusad.mongodb.net/test?retryWrites=true&w=majority -- originial