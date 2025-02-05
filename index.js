const express = require("express");
const app = express();
const ENVVAR = require('dotenv').config();
const { connectDB } = require('./DatabaseConnect')
const { AboutRouter } = require("./Router/AboutRouter");
const { expertiseRouter } = require("./Router/ExpertiseRouter");
const { ExperienceRouter } = require("./Router/ExperienceRouter");
const { AllProjectRouter } = require("./Router/AllProjectRouter");
const path = require("path");
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { tokenAuth } = require("./Middlewares/Authorization");

app.use(cors());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for all APIs in the app',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',        // Specifies the type of authentication (HTTP)
          scheme: 'bearer',    // The scheme we are using for authorization (Bearer token)
          bearerFormat: 'JWT', // Specifies the format of the token (JWT)
        },
      },
    },
    security: [
      {
        bearerAuth: [], // This means that the bearerAuth security scheme applies globally
      },
    ],
    servers: [
      {
        url: process.env.VERCEL_URI
          ? 'https://shivamrawat-profolio-backend.vercel.app'
          : `http://localhost:${process.env.PORT}`,
        description: 'Production server',
      },
    ],
  },
  apis: ['./Router/*.js'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api-docs.json', (req, res) => {
  res.send(swaggerDocs)
});
app.use(express.json());
app.use(tokenAuth);
app.use("/api/v1/about", AboutRouter);
app.use("/api/v1/expertise", expertiseRouter);
app.use("/api/v1/experience", ExperienceRouter);
app.use("/api/v1/allProjects", AllProjectRouter);
// app.use("/api/v1/Connect", mailRouter);
// app.use("/api/v1/Token", TokenRouter);

connectDB().then(() => {
  console.log("database connected")
}).catch((err) => {
  console.log(err);
})

app.get("/", (req, res) => {
  res.redirect('/api-docs');
})

app.listen(process.env.PORT, (err) => {
  if (err) { console.log(err) }
  else {
    console.log("server started", process.env.PORT)
    console.log(`http://localhost:${process.env.PORT}/api-docs`)
    console.log("For API JSON Docs " + " " + `http://localhost:${process.env.PORT}/api-docs.json`)
  }
})
