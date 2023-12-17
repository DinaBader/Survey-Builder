const mongoose = require("mongoose");

const userRoleSchema= new mongoose.Schema({
    role:{
        type:String,
    },
});

const Role=mongoose.model("Role",userRoleSchema);
module.exports=Role;