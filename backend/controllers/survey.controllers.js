const Survey=require("../models/survey.model");

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

module.exports={
    addSurvey,
    getSurvey,
};