const mongoose = require("mongoose")

const Certificateschema = new mongoose.Schema(
    {
        Title: { type: String, required: true },
        Description: { type: String, required: true },
        Url: { type: String },
        Image: { type: String }
    })
const AllCertificateschema = new mongoose.Schema({
    Domain: {
        type: String,
        require: true
    },
    AllCertificates: {
        type: [Certificateschema],
        require: true
    }
})
const AllCertificatesModel = mongoose.model("AllCertificates", AllCertificateschema)
module.exports = {
    AllCertificatesModel
}

