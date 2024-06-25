const {StatusCodes} = require("http-status-codes")
const jwt =require("jsonwebtoken")

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if(!authHeader|| !authHeader.startsWith("Bearer")){

        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication invalid" })
    }
        // if the token is found we have to extract token
        const token = authHeader.split(' ')[1]
        // console.log(authHeader)
        // console.log(token)
    try {
        // payload-->data
        // const data(replace with username and password) neber
        const {username, userid}= jwt.verify(token, process.env.JWT_SECRET)
        // return res.status(StatusCodes.OK).json({data})
        // next will navigate us to middleware
        req.user ={username, userid}
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication invalid" })
    }
}

module.exports = authMiddleware