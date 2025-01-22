const mongoose = require("mongoose");
const ExpertiseSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required : true
    }

})

const ExpertiseModel = mongoose.model("Expertise",ExpertiseSchema);
module.exports = {
    ExpertiseModel
}