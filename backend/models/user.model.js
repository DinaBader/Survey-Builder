const mongoose=require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    isCompleted:{
        type:Number,
        default:0,
    },
    image:{
        type:String,
        data:Buffer,
    },
    Role:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Role",
       required:true, 
    }
})

const User=mongoose.model("User",userSchema);
module.exports=User;