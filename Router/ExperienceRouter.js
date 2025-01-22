const express = require("express");
const ExperienceRouter = express();
const {ExperienceModel} = require("../Models/Experience")
ExperienceRouter.get("/allExperience", (req, res) => {
    res.send("Sent")
})
ExperienceRouter.post("/postExperience", async (req, res) => {
    try{
        const { Profile, Company, FromDate, ToDate, Present } = req.body;
        const experience = new ExperienceModel({
            Profile, Company, FromDate, ToDate, Present
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
module.exports = {
    ExperienceRouter
}