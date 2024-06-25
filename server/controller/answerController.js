const dbConnection = require('../db/dbConfig')

async function addAnswer(req, res) {
  const { userid, questionid, answer } = req.body;
  if (!questionid || !userid || !answer) {
    return res.status(400).json({ msg: "Please provide all required fields" })
  }



  try {
    await dbConnection.query("INSERT INTO answers (userid,questionid,answer) VALUES (?,?,?)", [userid, questionid, answer])
    return res.status(201).json({ msg: "answer posted" })

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ msg: "something went wrong, try again later" })
  }

}
async function allAnswer(req, res) {
  // const questionid = req.query.questionid;

  const questionId = req.headers['questionid'];
  // console.log(questionId)
  try {
    const [allanswer] = await dbConnection.query("SELECT answer from answers where questionid=?", [questionId])
    return res.status(200).json({ msg: "All answer retrieved successfully", allanswer })

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ msg: "Something went wrong, try again later" })
  }

}


module.exports = { addAnswer, allAnswer };