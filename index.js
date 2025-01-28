const express = require("express");
const app = express();
const ENVVAR = require('dotenv').config();
const { connectDB } = require('./DatabaseConnect')
const { AboutModel } = require("./Models/About");
const { AboutRouter } = require("./Router/AboutRouter");
const { expertiseRouter } = require("./Router/ExpertiseRouter");
const { ExperienceRouter } = require("./Router/ExperienceRouter");
const { ResumeRouter } = require("./Router/Resume");
const { AllProjectRouter } = require("./Router/AllProjectRouter");

const {mailRouter} = require("./Router/SendMail")

app.use(express.json());
app.use("/api/v1/about", AboutRouter);
app.use("/api/v1/expertise", expertiseRouter);
app.use("/api/v1/experience", ExperienceRouter);
app.use("/api/v1/Resume", ResumeRouter);
app.use("/api/v1/allProjects",AllProjectRouter);
app.use("/api/v1/Connect",mailRouter);

connectDB().then(() => {
    console.log("database connected")
}).catch((err) => {
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