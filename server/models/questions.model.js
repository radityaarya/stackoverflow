
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title     : { type: String, required: true},
    question  : String,
    category  : Schema.Types.Mixed,
    postedBy  : Schema.Types.Mixed ,
    answer    : Schema.Types.Mixed,
    vote      : Number
},{
  timestamps : true
});

var Question = mongoose.model("Question",questionSchema)
module.exports = Question
