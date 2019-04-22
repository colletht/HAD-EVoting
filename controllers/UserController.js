/*
* Name: Harry Collet
* Date: 4/17/19
* Description: Controller module defined here that defines callback functions for HTTP requests having to do with Users. 
*              This object is resposible for processing these requests and calling the 
*              appropriate database functions and then eachoing the appropriate result back
*              to the web.
*/

const {body, validationResult} = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const dbInterface = require('../DB_Interface');

exports.userList = function(req, res){
    res.send("NOT IMPLEMENTED: Print list of users");
};

exports.userDetail = function(req, res){
    res.send("TODO: Implement the user detail page");
    //res.render('userInfo', {title: "User Information"});
};

//handles get request and renders and displays form for user registration
exports.userRegisterGet = function(req, res){
    res.locals.title = 'RegisterGet' // can set variables in the pug file this way
    res.locals.session = req.session // transfer session to new page
    res.render('userRegister', {title: 'Register' });
    //res.send("Display form for user registration GET");
};

//TODO: Check that username is not already in database
//array of middleware functions to be called in order in the process of validating the user form
exports.userRegisterPost = [
    //validate that the username is not empty
    body('username','Username required').isLength({min:1}).trim(),
    //sanitize username of dangerous characters
    sanitizeBody('username').escape(),

    //check password is there
    body('password','Password required').isLength({min:1}).trim(),
    //sanitize of dangerous characters NOTE: skipped two password authentication for now, that seems tricky
    sanitizeBody('password').escape(),

    //validate the name
    body('fullname').isLength({min:1}).withMessage('Must enter a name'),

    sanitizeBody('fullname').escape(),

    //validate email address
    body('email').isLength({min:1}).withMessage('Must enter an email').isEmail().withMessage('Must enter a valid email'),

    sanitizeBody('email').escape(),

    //now process request when fields has been validated and sanitized
    (req,res,next) => {
        res.locals.title = 'RegisterPost' // can set variables in the pug file this way
        res.locals.session = req.session // adds the session variable to the pug file so we are able to access it
        console.log(req.body) // prints body of request
        //extract errors from req
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            //errors exist so rerender page with error messages
            res.render('userRegister', {title: 'Register User', errors: errors.array()});
            return;
        }else{
            //TODO: no errors and can add user to the database
            dbInterface.userCreate(req.body.username,req.body.password,req.body.fullname,req.body.email, function(err, newUser){
                if(err){
                    console.log("An error occured: " + err);
                    res.render('userRegister', {title: 'Register User', errors: err.array()});
                }else{
                    console.log("succesfully registered user " + newUser.username + ", with id: " + newUser._id);
                    res.locals.session.curUserId = newUser._id;
                    res.redirect('/simpoll/users/' + newUser._id);

                }
                
                //figure out what to do with user here, do we need to do something?
            });
        }

    }
];

exports.userLoginGet = function(req, res){
    res.locals.title = 'LoginGet';
    res.locals.session = req.session // transfer session to new page
    res.render('userLogin', {title: 'Login'});
    //res.send("Display form for user login GET");
};

//array of middelware functions to process the input given to the login form
exports.userLoginPost = [
    //validating and sanitizing the username field, will verify that it actually matches a username later
    body('username','You must enter a username').isLength({min:1}),

    //validating and sanitizing the password field, will verify that it actually matches a username later
    body('password','You must enter a password').isLength({min:1}),

    sanitizeBody('username').escape(),

    sanitizeBody('password').escape(),

    //process request
    (req,res,next) => {
        res.locals.title = 'LoginPost' // can set variables in the pug file this way
        res.locals.session = req.session // adds the session variable to the pug file so we are able to access it
        console.log(req.body) // prints body of request
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render('userLogin', {title: 'Login', username: req.body.username, password: req.body.password, errors: errors.array()});
            return;
        }else{
            //TODO: login successfull, must figure out how to make the user be logged in now
            dbInterface.userLogin(req.body.username, req.body.password, function(nameErr, passErr, newUser){
                if(nameErr && passErr)
                    res.render('userLogin', {title: 'Login', loginerr: 'Either the username or password field is incorrect, please try again'}); 
                else if(nameErr)
                    res.render('userLogin', {title: 'Login', loginerr: 'That username does not match any in our database, please try again'}); 
                else if(passErr)
                    res.render('userLogin', {title: 'Login', loginerr: 'That password does not correspond to the given username, please try again'}); 
                else{
                    console.log("Succesfully logged user " + newUser.username + " in with id: " + newUser._id);
                    res.locals.session.curUserId = newUser._id;
                    res.redirect('/simpoll/users/' + newUser._id);
                }
                
                    //figure out how to store newUser
            });
        }
    }

];
    

exports.userLogoutGet = function(req,res){
    //TODO: Figure out what else is needed to log out a user
    res.redirect('/simpoll');
}