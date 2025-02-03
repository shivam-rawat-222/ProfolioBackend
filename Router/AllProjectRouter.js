const express = require("express");
const AllProjectRouter = express();
const { AllProjects, AllProjectModel } = require("../Models/AllProjects");

/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Projects and domain management routes
 */

/**
 * @swagger
 * /api/v1/allProjects/allProjects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Simple test route to send a message
 *     responses:
 *       200:
 *         description: Sends a simple "Sent" message
 */
AllProjectRouter.get("/allProjects", async (req, res) => {
    let allProjectsData = await AllProjectModel.find({});
    if(!allProjectsData) {throw new Error ("No Project Found")}
    return res.json(allProjectsData);
});

/**
 * @swagger
 * /api/v1/allProjects/addDomainWithProject:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Add a new domain with its associated project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - domain
 *               - projectName
 *             properties:
 *               domain:
 *                 type: string
 *                 description: The domain name
 *               projectName:
 *                 type: string
 *                 description: The associated project name
 *     responses:
 *       200:
 *         description: Successfully added the domain with its project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 domain:
 *                   type: string
 *                 projectName:
 *                   type: string
 *       400:
 *         description: Bad request (e.g., missing required fields or validation errors)
 */
AllProjectRouter.post("/addDomainWithProject", async (req, res) => {
    try {
        console.log(req.body);
        const resp = new AllProjectModel(req.body);
        const respstatus = await resp.save();
        return res.json(respstatus);
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
});

/**
 * @swagger
 * /api/v1/allProjects/getAllDomainWithProject:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Retrieve all domains with their associated projects
 *     responses:
 *       200:
 *         description: A list of all domains with their projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   domain:
 *                     type: string
 *                   projectName:
 *                     type: string
 *       400:
 *         description: An error occurred during retrieval
 */
AllProjectRouter.get("/getAllDomainWithProject", async (req, res) => {
    try {
        let allDomainWithProject = await AllProjectModel.find({});
        return res.json(allDomainWithProject);
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
});

module.exports = {
    AllProjectRouter,
};
