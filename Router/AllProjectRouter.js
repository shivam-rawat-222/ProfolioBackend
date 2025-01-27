const express = require("express");
const AllProjectRouter = express();

const {AllProjects} = require("../Models/AllProjects")
AllProjectRouter.get("/allProjects", (req, res) => {
    res.send("Sent")
})
AllProjectRouter.post("/addDomainWithProject", async (req, res) => {
    try{
        const data = req.body;
       console.log(data);
        return res.json({})
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