const mongoose = require("mongoose");
const ExperienceSchema = new mongoose.Schema(
    {
        Profile:{
            type:String,
            require:true,
        },
        Company:{
            type:String,
            require:true
        },
        FromDate:{
            type:Date,
            require:true
        },
        ToDate:{
            type:Date,
        },
        Present:{
            type:Boolean,
        }
    }
)
const ExperienceModel = mongoose.model("Experience",ExperienceSchema);
module.exports = {ExperienceModel}