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