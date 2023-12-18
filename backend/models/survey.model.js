const mongoose = require("mongoose");

const surveySchema= new mongoose.Schema(
    {
        title: {
            type:String,
            required:true,
            unique:true
        },
        description:{
            type:String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },

    },
)

const Survey=mongoose.model("Survey",surveySchema);
module.exports=Survey;