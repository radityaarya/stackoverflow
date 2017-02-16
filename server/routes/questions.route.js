var express = require('express');
var router  = express.Router();
var controller = require('../controllers/questions.controller.js')
var user    = require  ('../controllers/users.controller.js')

// GET all questions
router.get('/',  user.verifyUser, controller.showAllQuestion)
// GET single question
router.get('/:id',  user.verifyUser, controller.showAllQuestion)
// CREATE user
router.post('/:username/create', user.verifyUser, controller.createQuestion)
// ADD answer
router.post('/:id/ask', user.verifyUser, controller.addAnswer)
// // UPDATE user
// router.put('/:id', controller.verifyUser, controller.updateUser)
// // DELETE user
// router.delete('/:id', controller.verifyUser, controller.deleteUser)

// LOGIN user
// router.post('/login', controller.login)

module.exports = router;
