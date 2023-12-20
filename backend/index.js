const express=require("express");
const {connectToMongoDB} =require("./configs/mongoDb.configs");
const app=express();
app.use(express.json());
require("dotenv").config();
var cors = require('cors')

app.use(cors()) 

const authRoutes = require("../backend/routes/auth.routs");
app.use("/auth", authRoutes);

const roleRoutes=require("../backend/routes/role.routes");
app.use("/role",roleRoutes);

const surveyRoutes=require("../backend/routes/survey.routes")
const { authMiddleware } = require("./middlewares/auth.middleware");
app.use("/survey",authMiddleware,surveyRoutes);

const questionRoutes=require("../backend/routes/question.routes");
app.use("/question",authMiddleware,questionRoutes);

const answerRoutes=require("../backend/routes/answer.routes");
app.use("/answer",authMiddleware,answerRoutes);

app.listen(8000,()=>{
    console.log("Server listening on PORT: ",8000);
    connectToMongoDB();
})