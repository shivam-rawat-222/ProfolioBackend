const express = require("express");
const AllProjectRouter = express();
const {AllProjects, AllProjectModel} = require("../Models/AllProjects")
AllProjectRouter.get("/allProjects", (req, res) => {
    res.send("Sent")
})
AllProjectRouter.post("/addDomainWithProject", async (req, res) => {
    try{
        
    console.log(req.body)
      const resp = new AllProjectModel(req.body);
      const respstatus = await resp.save();
        return res.json(respstatus)
    }
    catch(err)
    {
        return res.status(400).json({
            message:err.message
        })
    }
})

AllProjectRouter.get("/getAllDomainWithProject", async (req, res) => {
    try{
let allDomainWithProject = await AllProjectModel.find({});

        return res.json(allDomainWithProject)
    }
    catch(err)
    {
        return res.status(400).json({
            message:err.message
        })
    }
})

module.exports = {
    AllProjectRouter
}