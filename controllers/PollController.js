/*
* Name: Harry Collet
* Date: 4/15/19
* Description: Controller module defined here that defines the callback functions responsible for handling Poll HTTP requests. 
*              This object is resposible for processing these requests and calling the 
*              appropriate database functions and then eachoing the appropriate result back
*              to the web.
*/

//require the needed modules for validating and sanitizing form results
const {body, validationResult} = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const dbInterface = require('../DB_Interface');

//require model that drew made
//var poll = require(<path to poll module>)

exports.pollList = function(req,res){
    res.send("NOT IMPLEMENTED: Print out a list of all polls in database");
};

exports.pollDetail = function(req,res){
    res.send("NOT IMPLEMENTED: Print out the data for a specific poll from database");
};

exports.pollCreateGet = function(req,res){
    //res.send("NOT IMPLEMENTED: Handles the creation from for a poll GET");
    res.locals.title = "pollCreateGet";
    res.locals.session = req.session;
    res.render('pollCreate');
};

exports.pollCreatePost = [
    //checks that pollname is there and is within 50 characters
    body('pollName').trim().isLength({min:1,max:50}).withMessage('You must enter a name for your poll within 1-50 characters'),

    //checks that the first question is of appropriate length. NOTE: no need to check type because that will always be a valid value
    body('question-1').trim().isLength({min:1,max:200}).withMessage("You must enter at least one question within 200 characters"),

    //checks mandatory first response is given and that it is of appropriate length (50 characters)
    body("option-1-1").isLength({min:1}).withMessage('Must have at least two options for an answer').isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //checks mandatory second response in same manner as first response
    body("option-1-2").isLength({min:1}).withMessage('Must have at least two options for an answer').isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //optional check of third response if it is entered to make sure it is within the 50 character limit
    body("option-1-3").optional({checkFalsy:true}).isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //optional check of fourth response if it is entered to make sure it is within the 50 character limit
    body("option-1-4").optional({checkFalsy:true}).isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //NOTE: Everything hereafter until the main callback follows the same pattern as the above code.
    //However everything below here is optional as only one question is required to make a poll

    //Question 2

    //checks that the first question is of appropriate length. NOTE: no need to check type because that will always be a valid value
    body('question-2').optional({checkFalsy:true}).trim().isLength({min:1,max:200}).withMessage("You must enter at least one question within 200 characters"),

    //checks mandatory first response is given and that it is of appropriate length (50 characters)
    //custom function added here checks if question-2 field is defined
    //TODO: make this work: .custom((value, {req}) => req.body.question-2 !== undefined)
    body("option-2-1").optional({checkFalsy:true}).isLength({min:1}).withMessage('Must have at least two options for an answer').isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //checks mandatory second response in same manner as first response
    body("option-2-2").optional({checkFalsy:true}).isLength({min:1}).withMessage('Must have at least two options for an answer').isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //optional check of third response if it is entered to make sure it is within the 50 character limit
    body("option-2-3").optional({checkFalsy:true}).isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //optional check of fourth response if it is entered to make sure it is within the 50 character limit
    body("option-2-4").optional({checkFalsy:true}).isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //Question 3

    //checks that the first question is of appropriate length. NOTE: no need to check type because that will always be a valid value
    body('question-3').optional({checkFalsy:true}).trim().isLength({min:1,max:200}).withMessage("You must enter at least one question within 200 characters"),

    //checks mandatory first response is given and that it is of appropriate length (50 characters)
    //custom function added here checks if question-2 field is defined
    //TODO: make this work: .custom((value, {req}) => req.body.question-2 !== undefined)
    body("option-3-1").optional({checkFalsy:true}).isLength({min:1}).withMessage('Must have at least two options for an answer').isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //checks mandatory second response in same manner as first response
    body("option-3-2").optional({checkFalsy:true}).isLength({min:1}).withMessage('Must have at least two options for an answer').isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //optional check of third response if it is entered to make sure it is within the 50 character limit
    body("option-3-3").optional({checkFalsy:true}).isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //optional check of fourth response if it is entered to make sure it is within the 50 character limit
    body("option-3-4").optional({checkFalsy:true}).isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //Question 4

    //checks that the first question is of appropriate length. NOTE: no need to check type because that will always be a valid value
    body('question-4').optional({checkFalsy:true}).trim().isLength({min:1,max:200}).withMessage("You must enter at least one question within 200 characters"),

    //checks mandatory first response is given and that it is of appropriate length (50 characters)
    //custom function added here checks if question-2 field is defined
    //TODO: make this work: .custom((value, {req}) => req.body.question-2 !== undefined)
    body("option-4-1").optional({checkFalsy:true}).isLength({min:1}).withMessage('Must have at least two options for an answer').isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //checks mandatory second response in same manner as first response
    body("option-4-2").optional({checkFalsy:true}).isLength({min:1}).withMessage('Must have at least two options for an answer').isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //optional check of third response if it is entered to make sure it is within the 50 character limit
    body("option-4-3").optional({checkFalsy:true}).isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //optional check of fourth response if it is entered to make sure it is within the 50 character limit
    body("option-4-4").optional({checkFalsy:true}).isLength({max:50}).withMessage('Option may not exceed 50 characters'),

    //sanitize everything
    sanitizeBody('pollName').escape(),
    sanitizeBody('question-1').escape(),
    sanitizeBody('question-1-1').escape(),
    sanitizeBody('question-1-2').escape(),
    sanitizeBody('question-1-3').escape(),
    sanitizeBody('question-1-4').escape(),
    sanitizeBody('question-2').escape(),
    sanitizeBody('question-2-1').escape(),
    sanitizeBody('question-2-2').escape(),
    sanitizeBody('question-2-3').escape(),
    sanitizeBody('question-2-4').escape(),
    sanitizeBody('question-3').escape(),
    sanitizeBody('question-3-1').escape(),
    sanitizeBody('question-3-2').escape(),
    sanitizeBody('question-3-3').escape(),
    sanitizeBody('question-3-4').escape(),
    sanitizeBody('question-4').escape(),
    sanitizeBody('question-4-1').escape(),
    sanitizeBody('question-4-2').escape(),
    sanitizeBody('question-4-3').escape(),
    sanitizeBody('question-4-4').escape(),

    (req,res,next) => {
        res.locals.title = 'pollCreatePost';
        res.locals.session = req.session;
        console.log(req.body);

        //extract errors
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            //errors exist so rerender file with error messages
            console.log("errors in input, rerendering");
            res.render('pollCreate',{errors:errors.array()});
            return;
        }else{
            //put poll into database
            dbInterface.pollCreate(req.body.pollName, null, [{type: {type: req.body['questionType-1']}, question: req.body['question-1'], options: [req.body['option-1-1'],req.body['option-1-2'],req.body['option-1-3'],req.body['option-1-4']], responses: [] },
                                                             {type: {type: req.body['questionType-2']}, question: req.body['question-2'], options: [req.body['option-2-1'],req.body['option-2-2'],req.body['option-2-3'],req.body['option-2-4']], responses: [] },                                                             {type: {type: req.body.questionType-3}, question: req.body.question-3, options: [req.body.option-3-1,req.body.option-3-2,req.body.option-3-3,req.body.option-3-4], responses: [] },
                                                             {type: {type: req.body['questionType-3']}, question: req.body['question-3'], options: [req.body['option-3-1'],req.body['option-3-2'],req.body['option-3-3'],req.body['option-3-4']], responses: [] },          
                                                             {type: {type: req.body['questionType-4']}, question: req.body['question-4'], options: [req.body['option-4-1'],req.body['option-4-2'],req.body['option-4-3'],req.body['option-4-4']], responses: [] }],
                                                             function(err, newPoll){
                                                                if(err){
                                                                    //if error display error when rerender page
                                                                    console.log("errors in database insertion, errors displayed to page. Error: " + String(err));
                                                                    res.render('pollCreate',{errors: [err]});
                                                                }else{
                                                                    //else if no error redirect to the given poll information page and also add that poll to the current users polls
                                                                    dbInterface.userAddPoll(res.locals.session.user_id, newPoll._id, (err) => console.log(err));
                                                                    res.redirect('/simpoll/polls/' + newPoll._id);
                                                                }
                                                             });
        }
    }
]

/*function(req,res){
    res.send("NOT IMPLEMENTED: Handles the creation form for a poll POST");
};*/

exports.pollDeleteGet = function(req,res){
    res.send("NOT IMPLEMENTED: Handles the deletion from for a poll GET");
};

exports.pollDeletePost = function(req,res){
    res.send("NOT IMPLEMENTED: Handles the deletion form for a poll POST");
};

exports.pollCompleteGet = function(req,res){
    res.send("NOT IMPLEMENTED: Handles the completion of poll by user GET");
};

exports.pollCompletePost = function(req,res){
    res.send("NOT IMPLEMENTED: Handles the completion of the poll by user POST");
};

exports.pollEndGet = function(req,res){
    res.send("NOT IMPLEMENTED: Handles the ending of polling period GET");
};

exports.pollEndPost = function(req,res){
    res.send("NOT IMPLEMENTED: Handles the ending of polling period POST");
};

exports.pollShareGet = function(req,res){
    res.send("NOT IMPLEMENTED: Handles the share form for poll GET");
};

exports.pollSharePost = function(req,res){
    res.send("NOT IMPLEMENTED: Handles the share form for a poll POST");
};

