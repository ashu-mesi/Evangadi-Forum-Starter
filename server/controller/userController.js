// db connection
const dbConnection =require('../db/dbConfig')

// import bcrypt
const bcrypt = require('bcrypt')
const {StatusCodes} = require('http-status-codes')

const jwt =require('jsonwebtoken')

async function register(req, res){
    // Automatically destructure from req.body??
    const {username, firstname, lastname, email, password} = req.body;
    // Handle/check the information
    if(!email || !password || !firstname || !lastname || !username){
        // Here we can use json with relevant status
        return res.status(400).json({msg: "Please provide all required fields"})
    }
    try {
        // Check if user exist
        const [user] = await dbConnection.query("select username, userid from users where username = ? or email = ? ", [username, email])
        if(user.length > 0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already exist"})
        }
        // Check password length
        if(password.length <= 8){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be atleat 9 characters"})
        }
        // encrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        await dbConnection.query("INSERT INTO users(username, firstname, lastname, email, password) VALUES (?, ?, ?, ?,?) ", [username, firstname, lastname, email, hashedPassword])
        return res.status(StatusCodes.CREATED).json({msg:"user registered successfully"}) 
    } catch (error) {
        console.log(error.message)
        // huelete response endaylik, 500--server error
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong, try again later!"})
    }
}    
        
async function login(req, res){
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please enter all required fields"});
    }
    try {
        // check if user doesn't exist
        const [user] = await dbConnection.query("select username, username, userid, password from users where email = ? ", [email])
        if(user.length ==0){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"invalid credential"});
        }
        // If user is valid/registered user
        // compare password--first decrypt hashedPassword
        const isMatch = await bcrypt.compare(password, user[0].password);
        if(!isMatch){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"invalid credential"});
        }
        // return res.json({user:user[0].password})
        // return res.json({user:user})
        const username = user[0].username
        const userid = user[0].userid;
        const token = jwt.sign({username, userid}, process.env.JWT_SECRET, {expiresIn: "1d"})
        return res.status(StatusCodes.OK).json({msg:"user login successfully", token, username})
        
    } catch (error) {
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong, try again later!"})
        
    }

}

async function checkUser(req, res){
    const username = req.user.username
    const userid =req.user.userid
    res.status(StatusCodes.OK).json({msg:"valid user", username, userid})
    // res.send("check user")
}

module.exports = {register, login, checkUser}