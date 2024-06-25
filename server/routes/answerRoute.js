const express = require('express')
const router = express.Router()
const { addAnswer, allAnswer } = require('../controller/answerController')


router.post("/add-answers", addAnswer)

router.get("/all-answers", allAnswer)

module.exports = router