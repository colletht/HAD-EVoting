/*
* Name: Harry Collet
* Date: 4/17/19
* Description: Controller module defined here that defines callback functions for HTTP requests having to do with Users. 
*              This object is resposible for processing these requests and calling the 
*              appropriate database functions and then eachoing the appropriate result back
*              to the web.
*/

//here we require the model that drew made for user
//var user = require(<path to user model>)

exports.userList = function(req, res){
    res.send("Print list of users");
};

exports.userDetail = function(req, res){
    res.send("Display details of user");
};

exports.userRegisterGet = function(req, res){
    res.send("Display form for user registration GET");
};

exports.userRegisterPost = function(req, res){
    res.send("Display form for user registration POST");
};

exports.userLoginGet = function(req, res){
    res.send("Display form for user login GET");
};

exports.userLoginPost = function(req, res){
    res.send("Display form for user login POST");
};