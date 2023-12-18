const Answer=require("../models/answer.model");

const saveAnswer = async(req,res)=>{
    const {text}=req.body;
    try{
        const answer= await Answer.create({
            text,
            userId:req.user._id,
        });
        res.status(200).send({answer});
    }catch(error){
        res.status(500).send({error});
    }
}

module.exports={
    saveAnswer
}