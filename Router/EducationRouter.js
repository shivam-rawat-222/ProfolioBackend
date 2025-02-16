const express = require("express");
const EducationRouter = express();
const { EducationModel } = require("../Models/Education");


/**
 * @swagger
 * /api/v1/Education/postEducation:
 *   post:
 *     tags:
 *       - Education
 *     summary: Add a new Education
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Course
 *               - NameOfInstitute
 *               - FromDate
 *               - ToDate
 *               - Score
 *               - Description
 *             properties:
 *               Course:
 *                 type: string
 *                 description: The job title or role
 *               NameOfInstitute:
 *                 type: string
 *                 description: The name of the company
 *               FromDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the Education
 *               ToDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the Education
 *               Score:
 *                 type: boolean
 *                 description: Indicates if this is the current job
 *               Description:
 *                 type: string
 *                 description: A brief description of the role or responsibilities
 *     responses:
 *       200:
 *         description: Successfully added Education
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Course:
 *                   type: string
 *                 NameOfInstitute:
 *                   type: string
 *                 FromDate:
 *                   type: string
 *                 ToDate:
 *                   type: string
 *                 Score:
 *                   type: String
 *                 Description:
 *                   type: string
 *                 _id:
 *                   type: string
 *       400:
 *         description: Bad request (e.g., missing required fields)
 */
EducationRouter.post("/postEducation", async (req, res) => {
    try {
        const { Course, NameOfInstitute, FromDate, ToDate, Score, Description } = req.body;
        const Education = new EducationModel({ Course, NameOfInstitute, FromDate, ToDate, Score, Description });
        const savedata = await Education.save();
        return res.json(savedata);
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
});

/**
 * @swagger
 * /api/v1/Education/getAllEducation:
 *   get:
 *     tags:
 *       - Education
 *     summary: Retrieve all Education records
 *     responses:
 *       200:
 *         description: A list of all Education entries
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
EducationRouter.get("/getAllEducation", async (req, res) => {
    try {
        const allEducation = await EducationModel.find({});
        if (allEducation == null) {
            throw new Error("No Data Found");
        }
        return res.json(allEducation);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

module.exports = {
    EducationRouter,
};
