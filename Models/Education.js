const mongoose = require("mongoose");
const EducationSchema = new mongoose.Schema(
    {
        Course: {
            type: String,
            require: true,
        },
        NameOfInstitute: {
            type: String,
            require: true
        },
        FromDate: {
            type: Date,
            require: true
        },
        ToDate: {
            type: Date,
        },
        Score: {
            type: String,
            require:true
        },
        Description: {
            type: String,
            require:true
        }
    }
)
const EducationModel = mongoose.model("Education", EducationSchema);
module.exports = { EducationModel }