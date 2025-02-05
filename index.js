const express = require("express");
const app = express();
const ENVVAR = require('dotenv').config(); // Load environment variables
const { connectDB } = require('./DatabaseConnect'); // Database connection
const { AboutRouter } = require("./Router/AboutRouter");
const { expertiseRouter } = require("./Router/ExpertiseRouter");
const { ExperienceRouter } = require("./Router/ExperienceRouter");
const { ResumeRouter } = require("./Router/Resume");
const { AllProjectRouter } = require("./Router/AllProjectRouter");
const path = require("path");
const cors = require('cors');
const { mailRouter } = require("./Router/SendMail");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { TokenRouter } = require("./Router/TokenRouter");
const { tokenAuth } = require("./Middlewares/Authorization");

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

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
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply Bearer token authentication globally
      },
    ],
    servers: [
      {
        url: process.env.VERCEL_URI
          ? 'https://shivamrawat-profolio-backend.vercel.app'
          : `http://localhost:${process.env.PORT || 3000}`, // Fallback to port 3000 if PORT is not defined
        description: 'Production server',
      },
    ],
  },
  apis: ['./Router/*.js'], // Path to your API route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve Swagger JSON docs
app.get('/api-docs.json', (req, res) => {
  res.json(swaggerDocs);
});

// Routes
// app.use(tokenAuth); 
app.use("/api/v1/about", AboutRouter);
app.use("/api/v1/expertise", expertiseRouter);
app.use("/api/v1/experience", ExperienceRouter);
app.use("/api/v1/Resume", ResumeRouter);
app.use("/api/v1/allProjects", AllProjectRouter);
app.use("/api/v1/Connect", mailRouter);
app.use("/api/v1/Token", TokenRouter);

// Redirect root route to Swagger UI
app.get("/", (req, res) => {
  res.redirect('/api-docs');
});

// Database connection
connectDB()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

// Start the server
const PORT = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not defined
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server error:", err);
  } else {
    console.log("Server started on port", PORT);
    console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
    console.log(`Swagger JSON Docs: http://localhost:${PORT}/api-docs.json`);
  }
});