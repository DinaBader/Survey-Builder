const express=require("express");
const {connectToMongoDB} =require("./configs/mongoDb.configs");
const app=express();
app.use(express.json());
require("dotenv").config();

const authRoutes = require("../backend/routes/auth.routs");
app.use("/auth", authRoutes);

const roleRoutes=require("../backend/routes/role.routes");
app.use("/role",roleRoutes);

app.listen(8000,()=>{
    console.log("Server listening on PORT: ",8000);
    connectToMongoDB();
})