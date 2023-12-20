const express = require("express");
const {saveAnswer}=require("../controllers/answer.controllers");
const router = express.Router();

router.post('/saveAnswer', saveAnswer);
module.exports = router;
