/*
Drew English
4/16/2019
This is all the methods needed to access the database.
- Imported by the line: var *your_var_name* = require('./DB_Interface.js');
- Functions called by line: *your_var_name*.*insert_fun_name*();
- All functions include an optional callback function as a parameter that will be called after the function is finished
- All error arguments are null if there is no error

!! if any queries return a empty list or null, then no user / poll was found matching the search criteria !!

*/

//Sets up standard connection to the database and binds the error event so errors are printed on the console
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://SimpollUser:HADsimpollisgr8@evoting-3ak9s.mongodb.net/Simpoll?retryWrites=true', { useNewUrlParser: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//Database models:
var User = require('./Database Models/User.js')
var Poll = require('./Database Models/Poll.js')


//Poll functions:

//Creates a new Poll in the database
//Parameters: 'name' (string type) name of the poll, 'date_complete' (date type) date the poll is to be complete,
//          'questions' (list) list of JSON that contains type of question, what the question is, repsonse options, and responses
//          see './Database Models/Poll.js' for exact schema
//          final parameter is a callback function
//Callback: Error argument, poll that was created (mongoose document object)
function pollCreate(name, date_complete, questions, cb){
    //puts argurment into a json
    var pollDetail = {
        name: name,
        active: true,
        dateCompleted: date_complete,
        questions: questions
    }

    //creates a new poll and saves it
    var newPoll = new Poll(pollDetail);
    newPoll.save(function(err){
        if (err) {
            if (cb) cb(err, null)
            return
        }
        console.log('New Poll: ' + newPoll)
        if (cb) cb(null, newPoll)
    });
}

//Deletes a poll from the database by its ID
//Parameters: 'id' (string type) the id of the poll, callback function
//Callback: Error argument
function pollDelete(id, cb){
    Poll.findByIdAndDelete(id, function (err, poll){
        if (err){
            if (cb) cb(err, null)
            return
        }
        console.log('Deleted Poll: ' + poll)
        if (cb) cb(null, poll)     
    });
}

//Updates a poll of id with the votes submitted
//Parameters: 'id' (string type) the id of the poll, 'votes' (array of array of ints) lowest level array is which options from the question are to be voted for
//          and the higher level array contains the list of responses for each question 
//          (ex: [[0], [0,3]] has 2 questions, 1st question voted for the first option, 2nd question voted for the 1st and 4th option),
//          final parameter is a callback function
//Callback: error argument, poll if it was successfully updated (null otherwise) (mongoose document object)
function pollAddResponse(id, votes, cb){
    Poll.findById(id, function (err, poll){
        if (err) {
            if (cb) cb(err, null)
            return
        }
        
    
        var questions = poll.questions.toObject() // gets the questions list from the poll


        //adds one vote to each response selected in questions
        for(var i = 0; i < votes.length; i++){
            for(var j = 0; j < votes[i].length; j++){
                questions[i].responses;
                if(!questions[i].responses.length){
                    console.log("here")
                    questions[i].responses = [0,0,0,0];
                }
                questions[i].responses[votes[i][j]] += 1
            }
        }
        console.log(questions);
        poll.questions = questions // puts new questions list into the poll document
        poll.save(function(err){
            if (err) {
                if (cb) cb(err, null)
                return
            }
            console.log('Response added to Poll: ' + poll._id)
            if (cb) cb(null, poll)
        });
    });
}

//Finds all polls in the database
//Parameters: callback function
//Callback: error argument, list of all polls (mongoose document objects)
function pollAll(cb){
    Poll.find({}, function(err, pollList){
        if (err) {
            if (cb) cb(err, null)
            return
        }
        if (cb) cb(null, pollList)
    });
}

//Changes poll to inactive so it unable to be voted on, and updates the date completed
//Parameters: 'id' (string type) tbe id of the poll, callback function
//Callback: error argument 
function pollComplete(id, cb){
    var now = new Date
    
    Poll.findByIdAndUpdate(id, { active: false, dateCompleted: now }, function(err, poll){
        if (err) {
            if (cb) cb(err)
            return
        }
        console.log('Completed Poll: ' + poll);
        if (cb) cb(err)
    });
}

//Finds a poll by id
//Parameters: 'id' (string type) the id of the poll, callback function
//Callback: error argument, the poll (mongoose document object) null if there is an error or document otherwise
function pollFind(id, cb){
    Poll.findById(id, function(err, poll){
        if (err) {
            if (cb) cb(err, null)
            return
        }
        if (cb) cb(null, poll)
    });
}

//Updates the property of a poll with newValue
//Parameters: 'id' (string type) the poll id, 'property' (string type) the property name, 'newValue' (changes type based on the type of the property (examine schema))
//          the value to replace the old value, final parameter is a callback function
//Callback: error argument, poll (mongoose document object) if there is no error or null if there is an error
function pollUpdate(id, property, newValue, cb){
    Poll.findByIdAndUpdate(id, { [property]: newValue }, function(err, poll){
        if (err) {
            if (cb) cb(err, null)
            return
        }
        if (cb) cb(null, poll)        
    });
}


//User Functions:

//Creates a new user and adds to the database
//Parameters: (all string type) 'username', 'password', 'fullName', 'email', and a callback function
//Callback: error argument, new user (mongoose document object) if there is no error or null otherwise
function userCreate(username, password, fullName, email, cb){
    //puts arguments into a JSON
    userDetails = {
        username: username,
        password: password,
        fullName: fullName,
        email: email,
    }

    newUser = new User(userDetails); // uses JSON to make a new user

    //saves new user
    newUser.save(function(err){
        if (err){
            cb(err, null);
            return;
        }

        console.log('New User: ' + newUser);
        if (cb) cb(null, newUser);
    });
}

//Finds a user by its id and deletes it from the database
//Parameters: 'id' (string type) id of the user, callback function
//Callback: error argument, deleted user (monoose document object) if there is no error or null otherwise
function userDelete(id, cb){
    User.findByIdAndDelete(id, function (err, user) {
        if (err) {
            if (cb) cb(err, null)
            return
        }
        console.log('Deleted User: ' + user);
        if (cb) cb(null, user)
    });
}

//Updates the property of a user with newValue
//Parameters: 'id' (string type) the user id, 'property' (string type) the property name, 'newValue' (changes type based on the type of the property (examine schema))
//          the value to replace the old value, final parameter is a callback function
//Callback: error argument, updated user (mongoose document object) if there is no error or null otherwise
function userUpdate(id, property, newValue, cb){
    User.findByIdAndUpdate(id, { [property]: newValue }, function (err, user) {
        if (err) {
            if (cb) cb(err, null)
            return
        }
        if (cb) cb(null, user)
    });
}

//Returns list of all users
//Parameters: callback function
//Callback: error argument, list of users (list of mongoose document objects) if there is no error or null otherwise
function userAll(cb){
    User.find({}, function (err, userList) {
        if (err) {
            if (cb) cb(err, null)
            return
        }
        if (cb) cb(null, userList)
    });
}

//Finds success of a user logging in based on username and password
//Parameters: (all string type) 'username', 'password', callback function
//Callback: error argument, fault (string) which states whether the fault was the username or password (null if successful login),
//          and the user (mongoose document object) will be returned if it's a successful login (null if unsuccessful) 
function userLogin(username, pass, cb){
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            if (cb) cb(err, null, null)
            return
        }

        if (user == null) {
            if (cb) cb(null, 'username', null)
            return
        }

        else if (user.password != pass) {
            if (cb) cb(null, 'password', null)
            return
        }

        if (cb) cb(null, null, user)
    });
}

//Finds a user by its id
//Parameters: 'id' (string type) id of the user, callback function
//Callback: error argument, user (mongoose document object) if there is no error or null otherwise
function userFind(id, cb){
    User.findById(id, function (err, user) {
        if (err){
            if (cb) cb(err, null);
            return;
        }
        if (cb) cb(null, user);
    });
}

//adds a poll to a users list of polls
//Parameters: (all string types) 'userID' the id of the user, 'pollID' the id of the poll to add, callback function
//Callback: error argument, updated user
function userAddPoll(userID, pollID, cb){
    User.findById(userID, function(err, user){
        if (err) {
            if (cb) cb(err, null)
            return
        }

        user.polls = user.polls.concat([pollID]);
        user.save(function(err){
            if (err) {
                if (cb) cb(err, null)
                return
            }
            if (cb) cb(null, user)
        });
    });
}

//gets the list of polls the user has created
//Parameters: 'userID' (string type), callback function
//Callback: error argument, poll list
function userGetPolls(userID, cb){
    User.findById(userID).populate('polls').exec(function(err, user){
        if(err) {
            if (cb) cb(err, null)
            return
        }

        if (cb) cb(null, user.polls)
    })
}

//exporting functions so they are able to be used in other files
module.exports = {
    pollCreate,
    pollDelete,
    pollAddResponse,
    pollAll,
    pollComplete,
    pollFind,
    pollUpdate,
    userCreate,
    userDelete,
    userUpdate,
    userAll,
    userLogin,
    userFind,
    userAddPoll,
    userGetPolls
}