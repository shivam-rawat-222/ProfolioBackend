const mongoose = require("mongoose")
const env = require("dotenv").config();
const connectDB = async()=>{
const connection =await mongoose.connect(process.env.MONGO_URL)
}
module.exports = {
    connectDB
}