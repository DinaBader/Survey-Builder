const express= require("express");
const {addSurvey,getSurvey} = require("../controllers/survey.controllers");
const router=express.Router();

router.post("/addSurvey",addSurvey);
router.get("/getSurveys",getSurvey);


module.exports=router;