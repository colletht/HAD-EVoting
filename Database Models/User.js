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

//UserSchema static function which checks for successfull login by searching the database (called by User.Login())
//Input: Username, Password
//Returns: JSON containing a boolean 'successfull' (whether the login would be successful or not),
//          containing 'fault' which gives a string of what caused an unsuccessful login (null if successful login)
//          and containing 'user' which is the user document if found (null if unsuccessful login)
UserSchema.statics.login = function(username, pass){
   return this.findOne({ username: username }, function(err, user){
      if (err) return handleError(err);

      if (user == null) return { successfull: false, fault: 'username', user: null }
      else if (user.password != pass) return { successfull: false, fault: 'password', user: null}
      return { successfull: true, fault: null, user: user }
   });
};


module.exports = mongoose.model('User', UserSchema);