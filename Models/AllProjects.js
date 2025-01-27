const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
    {
        Title: { type: String, required: true },
        Description: { type: String, required: true },
        Url: { type: String },
        Image: { type: String }
    })
const AllProjectSchema = new mongoose.Schema({
    Domain: {
        type: String,
        require: true
    },
    AllProjects: {
        type: [ProjectSchema],
        require: true
    }
})
const AllProjectModel = mongoose.model("AllProjects", AllProjectSchema)
module.exports = {
    AllProjectModel
}

