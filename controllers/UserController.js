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

//here we require the model that drew made for user
//var user = require(<path to user model>)

exports.userList = function(req, res){
    res.send("NOT IMPLEMENTED: Print list of users");
};

exports.userDetail = function(req, res){
    res.send("NOT IMPLEMENTED: Display details of user");
};

//handles get request and renders and displays form for user registration
exports.userRegisterGet = function(req, res){
    //res.render('UserRegisterForm', {title: 'Register User' });
    res.send("Display form for user registration GET");
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
    body('fullname').isLength({min:1}).withMessage('Must enter a name').isAlpha().withMessage('Must use only letters in name'),

    sanitizeBody('fullname').escape(),

    //validate email address
    body('email').isLength({min:1}).withMessage('Must enter an email').isEmail().withMessage('Must enter a valid email'),

    sanitizeBody('email').escape(),

    //now process request when fields has been validated and sanitized
    (req,res,next) => {
        //extract errors from req
        const errors = validationResult(req);

        //create new user from the data in form
        var user = new User({   
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            email: req.body.email
        });

        if(!errors.isEmpty()){
            //errors exist so rerender page with error messages
            res.render('UserRegistrationForm', {title: 'Register User', user: user, errors: errors.array()});
            return;
        }else{
            //TODO: no errors and can add user to the database
        }

    }
];

exports.userLoginGet = function(req, res){
    //res.render('UserLoginForm', {title: 'Login'});
    res.send("Display form for user login GET");
};

//array of middelware functions to process the input given to the login form
exports.userLoginPost = [
    //validating and sanitizing the username field, will verify that it actually matches a username later
    body('username').isLength({min:1}).withMessage('You must enter a username').trim(),

    sanitizeBody('username').escape(),

    //validating and sanitizing the password field, will verify that it actually matches a username later
    body('password').isLength({min:1}).withMessage("You must enter a password").trim(),

    sanitizeBody('password').escape(),

    //process request
    (req,res,next) => {
        const errors = validationResult(req);

        //check here if username password matches with one in the database, if not passback that error as well
        var success = true;

        if(!errors.isEmpty()){
            res.render('UserLoginForm', {title: 'Login', errors: errors.array()});
            return;
        }else if(!success){ //username and password pair not found in database
            //sets the loginerr field to display an error message, loginerr being a field specified in the form
            res.render('UserLoginForm', {title: 'Login', loginerr: 'Either the username or password field is incorrect, please try again'}); 
            return;
        }else{
            //TODO: login successfull, must figure out how to make the user be logged in now
        }
    }

];
    