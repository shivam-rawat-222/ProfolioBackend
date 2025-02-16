const express = require("express");
const AllProjectRouter = express();
const { AllProjects, AllProjectModel } = require("../Models/AllProjects");

/**
 * @swagger
 * /api/v1/allProjects/addProjectWithDomain:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Add a new domain with its associated projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Domain
 *               - AllProjects
 *             properties:
 *               Domain:
 *                 type: string
 *                 description: The domain name
 *               AllProjects:
 *                 type: array
 *                 description: List of projects associated with the domain
 *                 items:
 *                   type: object
 *                   required:
 *                     - Title
 *                     - Description
 *                   properties:
 *                     Title:
 *                       type: string
 *                       description: Project title
 *                     Description:
 *                       type: string
 *                       description: Project description
 *                     Url:
 *                       type: string
 *                       description: Project URL (optional)
 *                     Image:
 *                       type: string
 *                       description: Project image URL (optional)

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
AllProjectRouter.post("/addProjectWithDomain", async (req, res) => {
    try {

        const addProjectWithDomain = new AllProjectModel(req.body);

        const respstatus = await addProjectWithDomain.save();
        return res.json(respstatus);
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
});

/**
 * @swagger
 * /api/v1/allProjects/addProject:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Add a new project 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Domain
 *               - AllProjects
 *               - objectId
 *             properties:
 *               ObjectId:
 *                 type: string
 *                 description: The object id
 *               Project:
 *                   type: object
 *                   required:
 *                     - Title
 *                     - Description
 *                   properties:
 *                     Title:
 *                       type: string
 *                       description: Project title
 *                     Description:
 *                       type: string
 *                       description: Project description
 *                     Url:
 *                       type: string
 *                       description: Project URL (optional)
 *                     Image:
 *                       type: string
 *                       description: Project image URL (optional)

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
AllProjectRouter.put("/addProject", async (req, res) => {
    try {
        const { ObjectId, Project } = req.body;
        const allProjects = await AllProjectModel.findByIdAndUpdate(ObjectId, {
            $push: { AllProjects: Project }
        },
            { new: true, upsert: true }
        );
        return res.json(
            {
                message: "updated",
                data: allProjects,
                status: 200
            }
        );
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
});

/**
 * @swagger
 * /api/v1/allProjects/getAllProjectWithDomain:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Retrieve all domains with their associated projects
 *     responses:
 *       200:
 *         description: A list of all domains with their projects
 *       
 *       400:
 *         description: An error occurred during retrieval
 */
AllProjectRouter.get("/getAllProjectWithDomain", async (req, res) => {
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
