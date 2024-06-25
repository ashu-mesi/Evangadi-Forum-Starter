// Express router to organize routes
const express =  require('express');
const router = express.Router()
// authentication middleware
const authMiddleware = require('../middleware/authMiddleware')

// user controllers
const {register, login, checkUser} = require('../controller/userController')


// Login routes...data memtat alebet wede server(POST)
router.post("/register", register)

// Register routes...data memtat alebet wede server(POST)
router.post("/login", login)

// Check user routes...(GET)
router.get("/check", authMiddleware, checkUser)

module.exports = router