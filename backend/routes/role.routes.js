const express = require("express");
const {makeRole}=require("../controllers/role.controllers");
const router = express.Router();

router.post("/makeRole",makeRole);

module.exports=router;