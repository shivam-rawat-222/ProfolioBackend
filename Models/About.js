const mongoose = require("mongoose");
const AboutSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:[String],
        required: true
    },
    
})

const AboutModel = mongoose.model("AboutModel",AboutSchema);
module.exports={
    AboutModel
}