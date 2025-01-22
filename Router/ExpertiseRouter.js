const express = require("express");
const expertiseRouter = express.Router();
const {ExpertiseModel}  = require("../Models/Expertise")

expertiseRouter.post("/postexpertise",async(req,res)=>{
    try{
        let {name,description,image} = req.body;
        if(!name || !description || !image)
        {
            throw new Error("input is not valid")
        }
    const  expertiseEntry = new ExpertiseModel({
        name,
        description,
        image
    });
    const data = await expertiseEntry.save();
    
        return res.json(data);
    }
    catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
})

expertiseRouter.get("/getallexpertise",async(req,res)=>{
    const allExpertise = await ExpertiseModel.find({});
    res.json({allExpertise});
})
module.exports = {
        expertiseRouter
}