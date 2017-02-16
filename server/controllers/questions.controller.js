const Question = require('../models/questions.model')

module.exports = {

  createQuestion : (req, res) => {
        var newQuestion = new Question({
          title     : req.body.title,
          question  : req.body.question,
          category  : [req.body.category1, req.body.category2],
          postedBy  : {
            username: req.params.username
          },
          answer    : [],
          vote      : 0,
        })
        newQuestion.save( (err) => {
          if(err) throw err
          res.json(newQuestion)
        })
    },

  showQuestion : (req, res) => {
    Question.find( {_id : req.params.id}, (err, data) =>{
      if(err) throw err
      res.json(data)
    })
  },

  showAllQuestion : (req, res) => {
    Question.find().then( (data) => {
      res.send(data)
    })
  },

  addAnswer : (req, res) => {
    Question.find( {_id:req.params.id}, (err,data) => {
      data.update(
        { $push:{
          answer: {
          id: 1,
          answer: req.body.answer,
          vote: 0}
        }
      })
    }).then( (result) => {
      res.json(result)
    })
  }


}
