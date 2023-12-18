const express = require ("express");
const {addQuestion,removeQuestion,getQuestion} = require("../controllers/question.controllers");
const router =express.Router();

router.post('/addquestion',addQuestion);
router.delete("/deletequestion/:id",removeQuestion);
router.get("/getquestions",getQuestion);
module.exports=router;