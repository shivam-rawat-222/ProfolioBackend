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

const { mailRouter } = require("./Router/SendMail")
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for all APIs in the app',
        },
        servers: [
            {
                url: process.env.VERCEL_URL
                    ? `https://${process.env.VERCEL_URL}` // Vercel production URL
                    : `http://localhost:${process.env.PORT || 3000}`, // Local development URL
                description: process.env.VERCEL_URL ? 'Production server (Vercel)' : 'Local server',
            },
        ],
    },
    apis: ['./Router/*.js'], // Path to API route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api-docs.json', (req, res) => {
    res.send(swaggerDocs)
});
app.use(express.json());
app.use("/api/v1/about", AboutRouter);
app.use("/api/v1/expertise", expertiseRouter);
app.use("/api/v1/experience", ExperienceRouter);
app.use("/api/v1/Resume", ResumeRouter);
app.use("/api/v1/allProjects", AllProjectRouter);
app.use("/api/v1/Connect", mailRouter);

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
        console.log(`http://localhost:${process.env.PORT}/api-docs`)
        console.log("For API JSON Docs " + " " + `http://localhost:${process.env.PORT}/api-docs.json`)
    }
})