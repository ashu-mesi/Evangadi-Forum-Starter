require("dotenv").config()
// test express
const express =require('express');
const app = express();//call express on app
// const port = 5500
const port = process.env.PORT || 4000;

const cors = require('cors')
app.use(cors())

// db connection
const dbConnectoin = require("./db/dbConfig")

// test if the express server is working
// app.get("/", (req, res)=>{
//     res.send("Welcome")
// }) //end of test

// json middleware to extract json data
app.use(express.json())

// user routes middleware
const userRoutes = require("./routes/userRoute")

// question routes middleware
const questionsRoutes = require("./routes/questionRoute");

// answer routes middleware
const answersRoutes = require("./routes/answerRoute");

// authentication middleware
const authMiddleware = require('./middleware/authMiddleware');

// base URL: user routes middleware file
app.use("/api/users", userRoutes)

// question routes middleware
app.use("/api/questions",authMiddleware, questionsRoutes)

// answers routes middleware
app.use("/api/answers", authMiddleware, answersRoutes);


async function start() {
    try {
        const result =  await dbConnectoin.execute("select 'test' ")
        await app.listen(port)
        console.log("database connection established")
        console.log(`listening on ${port}`)
     } catch (error) {
         console.log(error.message)
         
     }     
}
start()


// app.listen(port, (err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(`listening on ${port}`);
//     }
// })
