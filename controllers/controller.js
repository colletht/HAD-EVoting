/*
* Name: Harry Collet
* Date: 4/15/19
* Description: Controller module defined here that processes all routing and HTTP requests. 
*              This object is resposible for processing these requests and calling the 
*              appropriate database functions and then eachoing the appropriate result back
*              to the web.
*/


//require necessary modules
var express = require('express');
var router = express.Router();

//homepage
router.get('simpoll/', function (req, res){
    res.send("Homepage");   //temp response just to set up the blueprint for functions
    //later use res.render() renders HTML from out data
});

//login page getter
router.get('simpoll/login/', function(req, res){
    res.send("Login Page");     //
});

router.get('simpoll/polls/', function(req, res){
    res.send("There a no polls at the moment: Be the first to create one!");
});

module.exports = router;