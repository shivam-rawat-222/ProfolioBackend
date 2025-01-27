const express = require("express");
const ExperienceRouter = express();
const {ExperienceModel} = require("../Models/Experience")
ExperienceRouter.get("/allExperience", (req, res) => {
    res.send("Sent")
})
ExperienceRouter.post("/postExperience", async (req, res) => {
    try{
        const { Profile, Company, FromDate, ToDate, Present ,description} = req.body;
        const experience = new ExperienceModel({
            Profile, Company, FromDate, ToDate, Present,description
        })
        const savedata = await experience.save();
        return res.json(savedata)
    }
    catch(err)
    {
        return res.status(400).json({
            message:err.message
        })
    }
})


ExperienceRouter.get("/getAllExperience",async (req,res)=>{
    try{
        const allExperience = await ExperienceModel.find({});
        if(allExperience == null)
            {
                throw new Error("No Data Found")
            }  
        return res.json(allExperience);
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
})
module.exports = {
    ExperienceRouter
}