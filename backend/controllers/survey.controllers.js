const Survey=require("../models/survey.model");
const Question=require("../models/question.model");
const addSurvey=async(req,res)=>{
    const {title, description}=req.body;
    try{
        const survey=await Survey.create({
            title,
            description,
            userId:req.user._id
        });
        res.status(200).send({survey});
    }catch(error){
        res.status(500).send({error});
    }
};

const getSurvey=async(req,res)=>{
    try{
        const surveys=await Survey.find({});
        res.status(200).send({surveys});
    }catch(error){
        res.status(500).send({error});
    }
};

const deleteSurvey=async(req,res)=>{
    const surveyId=req.params.id;
    try{
        const questions = await Question.find({ surveyId });
        await Promise.all(
            questions.map(async (question) => {
              await Question.deleteOne({ _id: question._id });
            })
          );

        const survey=await Survey.deleteOne({_id:surveyId});
        if (survey.deletedCount === 1) {
            res.status(200).send({ message: 'Survey deleted successfully' });
          } else {
            res.status(404).send({ message: 'Survey not found' });
          }
        } catch (error) {
          res.status(500).send({ error });
        }
}

module.exports={
    addSurvey,
    getSurvey,
    deleteSurvey
};