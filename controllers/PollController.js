/*
* Name: Harry Collet
* Date: 4/15/19
* Description: Controller module defined here that defines the callback functions responsible for handling Poll HTTP requests. 
*              This object is resposible for processing these requests and calling the 
*              appropriate database functions and then eachoing the appropriate result back
*              to the web.
*/

//require model that drew made
//var poll = require(<path to poll module>)

exports.pollList = function(req,res){
    res.send("Print out a list of all polls in database");
};

exports.pollDetail = function(req,res){
    res.send("Print out the data for a specific poll from database");
};

exports.pollCreateGet = function(req,res){
    res.send("Handles the creation from for a poll GET");
};

exports.pollCreatePost = function(req,res){
    res.send("Handles the creation form for a poll POST");
};

exports.pollDeleteGet = function(req,res){
    res.send("Handles the deletion from for a poll GET");
};

exports.pollDeletePost = function(req,res){
    res.send("Handles the deletion form for a poll POST");
};

exports.pollCompleteGet = function(req,res){
    res.send("Handles the completion of poll by user GET");
};

exports.pollCompletePost = function(req,res){
    res.send("Handles the completion of the poll by user POST");
};

exports.pollEndGet = function(req,res){
    res.send("Handles the ending of polling period GET");
};

exports.pollEndPost = function(req,res){
    res.send("Handles the ending of polling period POST");
};

exports.pollShareGet = function(req,res){
    res.send("Handles the share form for poll GET");
};

exports.pollSharePost = function(req,res){
    res.send("Handles the share form for a poll POST");
};

