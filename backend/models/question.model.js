const mongoose = require("mongoose");

const questionSchema=new mongoose.Schema(
    {
        description:{
            type:String,
            required:true,
        },
        surveyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Survey',
            required: true,
        },
        surveyName:{
            type:String,
        }

    }
)

const Question = mongoose.model("Question",questionSchema);
module.exports=Question;