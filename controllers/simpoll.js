/*
* Name: Harry Collet
* Date: 4/15/19
* Description: Main route module that sets up all the routes for our website using controllers established in the controllers folder.
*/

var express = require('express');
var router = express.Router();

//require our controllers from earlier
var userController = require("./UserController");
var pollController = require("./PollController");

//GET request for root, redirects to home simpoll page
router.get('/', function (req,res,next){
    res.redirect('/simpoll');
    //res.send("NOT IMPLEMENTED: Site home page will be displayed here");
});

//GET request for homepage, displays homepage
router.get('/simpoll', function(req,res,next){
    res.render('../views/index.pug');
});

//GET and POST requests for registration
router.get('/simpoll/users/register', userController.userRegisterGet);
router.post('/simpoll/users/register', userController.userRegisterPost);

//GET and POST requests for login
router.get('/simpoll/users/login', userController.userLoginGet);
router.post('/simpoll/users/login', userController.userLoginPost);

//GET requests for displaying user data
router.get('/simpoll/users/:id',userController.userDetail);

//GET request for displaying all users
router.get('/simpoll/users', userController.userList);

//GET request for logging out a user
router.get('simpoll/users/logout', userController.userLogoutGet);

//GET request for displaying all polls
router.get('/simpoll/polls', pollController.pollList);

//GET and POST requests for creating a poll
router.get('/simpoll/polls/create', pollController.pollCreateGet);
router.post('/simpoll/polls/create', pollController.pollCreatePost);

//GET request for displaying a specific poll
router.get('/simpoll/polls/:id', pollController.pollDetail);

//GET and POST requests for completion of a poll
router.get('/simpoll/polls/:id/complete', pollController.pollCompleteGet);
router.post('/simpoll/polls/:id/complete', pollController.pollCompletePost);

//GET and POST requests for ending a poll
router.get('/simpoll/polls/:id/end', pollController.pollEndGet);
router.post('/simpoll/polls/:id/end', pollController.pollEndPost);

//GET and POST requests for deletion of a poll
router.get('/simpoll/polls/:id/delete', pollController.pollDeleteGet);
router.post('/simpoll/polls/:id/delete', pollController.pollDeletePost);

//GET and POST requests for sharing of a poll
router.get('/simpoll/polls/:id/share', pollController.pollShareGet);
router.get('/simpoll/polls/:id/share', pollController.pollSharePost);

module.exports = router;