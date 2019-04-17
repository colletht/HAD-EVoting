/*
Drew English
4/13/2019
Creates the model for a poll in the database from a schema of what a poll includes

Virtual properties are used like any other properties, but are not actually stored in the database

!! pollID property is the unique object id every document in mongoDB has, access it by 'object.id' !!
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// !! Assumes preprocessing of strings !!
// 'type' property in questions list defines whether the question allows multiple response selections, or just one 
//      will be a string labeled 'multiple' or 'single'
var PollSchema = new Schema({
    name = String,
    active = Boolean,
    dateCreated = { type: Date, default: new Date() }, // creates a new date object that holds the current time
    dateCompleted = Date,
    questions = [{ type: String, question: String, options: [String], responses: [Number] }] //contains a list of JSON, which holds the question and responses for each question of a poll
});

//Virtual property 'Url' returns the url of the poll (called by Poll.Url())
PollSchema.virtual('Url').get(function(){
    return '/polls/' + this._id;
});

module.exports = mongoose.module('Poll', PollSchema);