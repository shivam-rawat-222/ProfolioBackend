const express = require("express");
const expertiseRouter = express.Router();
const { ExpertiseModel } = require("../Models/Expertise");

/**
 * @swagger
 * tags:
 *   - name: Expertise
 *     description: Expertise-related routes
 */

/**
 * @swagger
 * /api/v1/expertise/postexpertise:
 *   post:
 *     tags:
 *       - Expertise
 *     summary: Add a new expertise
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the expertise
 *               description:
 *                 type: string
 *                 description: A brief description of the expertise
 *               image:
 *                 type: string
 *                 description: A URL to the image representing the expertise
 *     responses:
 *       200:
 *         description: Successfully added expertise
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 image:
 *                   type: string
 *       400:
 *         description: Bad request (e.g., missing required fields)
 */
expertiseRouter.post("/postexpertise", async (req, res) => {
    try {
        let { name, description, image } = req.body;
        if (!name || !description || !image) {
            throw new Error("Input is not valid");
        }
        const expertiseEntry = new ExpertiseModel({
            name,
            description,
            image
        });
        const data = await expertiseEntry.save();

        return res.json(data);
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
});

/**
 * @swagger
 * /api/v1/expertise/getallexpertise:
 *   get:
 *     tags:
 *       - Expertise
 *     summary: Retrieve all expertise entries
 *     responses:
 *       200:
 *         description: A list of all expertise entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allExpertise:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       image:
 *                         type: string
 */
expertiseRouter.get("/getallexpertise", async (req, res) => {
    const allExpertise = await ExpertiseModel.find({});
    res.json({ allExpertise });
});

module.exports = {
    expertiseRouter
};
