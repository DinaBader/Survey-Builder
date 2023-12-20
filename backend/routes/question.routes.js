const express = require ("express");
const {addQuestion,removeQuestion,getQuestion,getQuestionbyid} = require("../controllers/question.controllers");
const router =express.Router();

router.post('/addquestion/:id',addQuestion);
router.delete("/deletequestion/:id",removeQuestion);
router.get("/getquestions",getQuestion);
router.get("/getquestionbyid/:id",getQuestionbyid);
module.exports=router;