const Question = require("../models/question.model");
const Survey = require("../models/survey.model"); 

const addQuestion = async(req,res)=>{
    const surveyId = req.params.id; 
    const {description} = req.body
    try{
        const question=await Question.create({
            description,
            surveyId: surveyId,
        });
        res.status(200).send({question});
    }catch(error){
        console.error('Error fetching questions by ID:', error);

        // Send a more detailed error response
        res.status(500).send({
            error: {
                message: 'Internal Server Error',
                details: error.message, // Include the error message for more details
            },
        });
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

const getQuestionbyid=async(req,res)=>{
    const surveyid=req.params.id; 
    try{
        const result=await Question.find({surveyId:surveyid});
        res.status(200).send({result});
    }catch (error) {
        res.status(500).send({
            error: {
                message: 'Error',
                details: error.message, 
            },
        });
    }
}

module.exports = {
    addQuestion,
    removeQuestion,
    getQuestion,
    getQuestionbyid,
};