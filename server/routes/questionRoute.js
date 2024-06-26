// Express router to organize routes
const express =  require('express');
const authMiddleware = require('../middleware/authMiddleware')
const { addQuestion, allQuestions } = require('../controller/questionController');
const router = express.Router()
// // authentication middleware
// const authMiddleware = require('../middleware/authMiddleware')


// router.get("/all-questions", (req, res)=>{
//     res.send("Hey questions")
// })

// Add questions routes...
router.post("/add-questions", addQuestion)
// router.post("/add-questions", (req, res)=>{
//     res.send("Start Adding questions here")
// })

router.get("/all-questions", allQuestions)





module.exports =router