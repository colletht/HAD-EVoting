/*
Drew English
4/13/2019
Creates the model for a user in the database from a schema of what a user includes

!! UserID property is the unique object id every document in mongoDB has, access it by 'object.id' !!
*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema of a user (used to create a model in the database)
// !! Assumes preprocessing of strings !!
var UserSchema = new Schema({
   username: { type: String, required: true },
   password: { type: String, required: true },
   fullName: String,
   email: String,
   polls: [{ type: Schema.Types.ObjectId, ref: 'Poll'}] // list of objectID's of polls the user has created
});


module.exports = mongoose.model('User', UserSchema);