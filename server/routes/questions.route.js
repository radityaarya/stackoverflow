var express = require('express');
var router  = express.Router();
var controller = require('../controllers/questions.controller.js')
var user    = require  ('../controllers/users.controller.js')

// GET all questions
router.get('/',  user.verifyUser, controller.showAllQuestion)
router.get('/:id',  user.verifyUser, controller.showQuestion)
router.post('/create/:username', controller.createQuestion)
router.put('/:id/ask/:username', controller.addAnswer)
router.put('/:id/upvoteq/:username',controller.upvoteQuestion)
router.put('/:id/upvoteq/:username',controller.upvoteQuestion)
router.put('/:id/downvoteq/:username',controller.downvoteQuestion)
router.put('/:id/upvoteans/:ansId/:username', controller.upvoteAnswer)
router.put('/:id/downvoteans/:ansId/:username', controller.downvoteAnswer)

// // UPDATE user
// router.put('/:id', controller.verifyUser, controller.updateUser)
// // DELETE user
// router.delete('/:id', controller.verifyUser, controller.deleteUser)

// LOGIN user
// router.post('/login', controller.login)

module.exports = router;
