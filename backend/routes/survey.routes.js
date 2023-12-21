const express= require("express");
const {addSurvey,getSurvey,deleteSurvey} = require("../controllers/survey.controllers");
const router=express.Router();

router.post("/addSurvey",addSurvey);
router.get("/getSurveys",getSurvey);
router.delete("/deleteSurvey/:id",deleteSurvey);

module.exports=router;