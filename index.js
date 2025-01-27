const express = require("express");
const app = express();
const ENVVAR = require('dotenv').config();
const {connectDB} = require('./DatabaseConnect')
const {AboutModel} = require("./Models/About");
const { AboutRouter } = require("./Router/AboutRouter");
const { expertiseRouter } = require("./Router/ExpertiseRouter");
const { ExperienceRouter } = require("./Router/ExperienceRouter");
const { AllProjectRouter } = require("./Router/AllProjectRouter");


app.use(express.json());
app.use("/api/v1/about",AboutRouter);
app.use("/api/v1/expertise",expertiseRouter);
app.use("/api/v1/experience",ExperienceRouter);
app.use("/api/v1/allProjects",AllProjectRouter);

connectDB().then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err);
})

app.get("/", (req, res) => {
    res.send("hello");
})

app.listen(process.env.PORT, (err) => {
    if (err) { console.log(err) }
    else {
        console.log("server started", process.env.PORT)
    }
})