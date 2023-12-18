const Question = require("../models/question.model");
const Survey = require("../models/survey.model"); 

const addQuestion = async(req,res)=>{
    const {description , surveyName} = req.body
    try{
        const survey = await Survey.findOne({ title: surveyName });
        if (!survey) {
            return res.status(404).send("Survey not found");
        }
        const question=await Question.create({
            description,
            surveyId: survey._id,
            surveyName:survey.title
        });
        res.status(200).send({question});
    }catch(error){
        res.status(500).send({error});
    }
};

const removeQuestion = async(req,res)=>{
    const questionId = req.params.id; 

    try {
        const result = await Question.deleteOne({ _id: questionId });

        if (result.deletedCount === 0) {
            console.log('Received request to delete question with ID:', questionId);

            return res.status(404).send("Question not found");
        }

        res.status(200).send("Question deleted successfully");
    } catch (error) {
        res.status(500).send({ error });
    }
}

const getQuestion = async(req,res)=>{
    try{
        const questions=await Question.find({});
        res.status(200).send({questions});
    }catch(error){
        res.status(500).send({error});
    }
}

module.exports = {
    addQuestion,
    removeQuestion,
    getQuestion
};