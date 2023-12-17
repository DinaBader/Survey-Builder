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
});

userSchema.pre(
    "save",
    async function (next){
        try{
            const salt= await bcrypt.genSalt(10);
            this.password=await bcrypt.hash(this.password,salt);
            next();
        }catch(error){
            console.log(error);
            next(error);
        }
    }
)

const User=mongoose.model("User",userSchema);
module.exports=User;