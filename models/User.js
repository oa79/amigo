const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// your database consists of collections / tables
// schema is a blueprint of a collection, and this file is your User schema
// creates a users collection in the DB

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('user', UserSchema);