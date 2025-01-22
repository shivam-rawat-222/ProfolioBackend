const express = require("express");
const { AboutModel } = require("../Models/About");

const AboutRouter = express.Router();

AboutRouter.post("/postabout", async (req, res) => {
    try {
        const { title, description } = req.body;
        const PostAboutModel = new AboutModel({
            title, description
        });
        const resp = await PostAboutModel.save();
        return res.send(resp)
    }
    catch (err) 
    {
        throw new Error(err);
    }
})

AboutRouter.get("/getabout", async (req, res) => {
    try {
        const allAboutMe = await AboutModel.find({});
        return res.send(allAboutMe)
    }
    catch (err) {
        throw new Error(err);
    }
})

AboutRouter.delete("/deleteabout/:id", async (req, res) => {
    try {
        const {id} = req.params; 
        if(!id)
        {
            return res.status(404).json({
                status:404,
                message:"Id is required"
            })
        }
        const About = await AboutModel.findOneAndDelete(id)
        console.log(About)
        if(!About)
        {
            return res.status(404).json({
                status:404,
                message:"data not found"
            })
        }
        return res.send({
            status:200,
            message:"delete successfully",
            data:About
        })
    }
    catch(err) {
        return res.status(500).json({
            status:500,
            message:"internal server error"
        })
    }
})

module.exports = { AboutRouter }