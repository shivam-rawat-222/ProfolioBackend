const express = require("express");
const ExperienceRouter = express();
const { ExperienceModel } = require("../Models/Experience");

/**
 * @swagger
 * /api/v1/experience/postExperience:
 *   post:
 *     tags:
 *       - Experience
 *     summary: Add a new experience
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Profile
 *               - Company
 *               - FromDate
 *               - ToDate
 *               - Present
 *               - description
 *             properties:
 *               Profile:
 *                 type: string
 *                 description: The job title or role
 *               Company:
 *                 type: string
 *                 description: The name of the company
 *               FromDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the experience
 *               ToDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the experience
 *               Present:
 *                 type: boolean
 *                 description: Indicates if this is the current job
 *               description:
 *                 type: string
 *                 description: A brief description of the role or responsibilities
 *     responses:
 *       200:
 *         description: Successfully added experience
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Profile:
 *                   type: string
 *                 Company:
 *                   type: string
 *                 FromDate:
 *                   type: string
 *                 ToDate:
 *                   type: string
 *                 Present:
 *                   type: boolean
 *                 description:
 *                   type: string
 *                 _id:
 *                   type: string
 *       400:
 *         description: Bad request (e.g., missing required fields)
 */
ExperienceRouter.post("/postExperience", async (req, res) => {
    try {
        const { Profile, Company, FromDate, ToDate, Present, description } = req.body;
        const experience = new ExperienceModel({
            Profile,
            Company,
            FromDate,
            ToDate,
            Present,
            description,
        });
        const savedata = await experience.save();
        return res.json(savedata);
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
});

/**
 * @swagger
 * /api/v1/experience/getAllExperience:
 *   get:
 *     tags:
 *       - Experience
 *     summary: Retrieve all experience records
 *     responses:
 *       200:
 *         description: A list of all experience entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   Profile:
 *                     type: string
 *                   Company:
 *                     type: string
 *                   FromDate:
 *                     type: string
 *                     format: date
 *                   ToDate:
 *                     type: string
 *                     format: date
 *                   Present:
 *                     type: boolean
 *                   description:
 *                     type: string
 *       404:
 *         description: No data found
 *       400:
 *         description: An error occurred
 */
ExperienceRouter.get("/getAllExperience", async (req, res) => {
    try {
        const allExperience = await ExperienceModel.find({});
        if (allExperience == null) {
            throw new Error("No Data Found");
        }
        return res.json(allExperience);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

module.exports = {
    ExperienceRouter,
};
