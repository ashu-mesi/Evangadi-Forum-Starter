// db connection
const dbConnection =require('../db/dbConfig')
const {StatusCodes} = require('http-status-codes')
const generateUniqueId = require('generate-unique-id');

async function addQuestion(req, res) {
    const {title, description, tag} = req.body;
    const {userid } = req.user;
    if(!title || !description || !tag){
      return res.status(400).json({msg: "Please provide all required fields"})
    }
    try {
      // Generate unique ID before database insertion
      const id2 = generateUniqueId({
        length: 4,
        useLetters: false, // Adjust configuration as needed
        useNumbers: true,
      });
  
      // Modify your query to include the generated ID and userid
      await dbConnection.query(
        "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
        [id2, userid, title, description, tag] // Bind generated ID, user ID, and other data
      );
      return res.status(StatusCodes.CREATED).json({ msg: "Question added successfully" });
    } catch (error) {
      console.error(error.message); // Log the error for debugging
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later!" });
    }
  }
  async function allQuestions(req, res) {

    try {
      const [allquestion] = await dbConnection.query(`SELECT q.questionid, q.userid, q.title, q.description, 
        u.username
        FROM questions q
        JOIN users u ON q.userid = u.userid
        ORDER BY q.id DESC`
      );
  
      const questionid = allquestion[0].questionid;
      // console.log(questionid)
      return res.status(200).json({ msg: "All question retrieved succesfully", allquestion, questionid })
  
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ msg: "Something went wrong, try again later" })
    }
  
  }
  
  
  
  module.exports = { addQuestion, allQuestions};