const express = require("express");
const { AboutModel } = require("../Models/About");
const { tokenAuth } = require("../Middlewares/Authorization");

const AboutRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: About Me
 *     description: Routes for managing "About Me" entries
 */

/**
 * @swagger
 * /api/v1/about/postabout:
 *   post:
 *     tags:
 *       - About Me
 *     summary: Add a new "About Me" entry
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the "About Me" section
 *               description:
 *                 type: string
 *                 description: The description of the "About Me" section
 *     responses:
 *       200:
 *         description: Successfully added the "About Me" entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Bad request, missing title or description
 *       401:
 *         description: Unauthorized, missing or invalid JWT token
 *       500:
 *         description: Internal server error
 */
AboutRouter.post("/postabout",async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) throw new Error("Please provide both title and description.");

        const PostAboutModel = new AboutModel({
            title,
            description,
        });

        const resp = await PostAboutModel.save();
        return res.status(200).send(resp);
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
});

/**
 * @swagger
 * /api/v1/about/getabout:
 *   get:
 *     tags:
 *       - About Me
 *     summary: Retrieve all "About Me" entries
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: A list of all "About Me" entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       401:
 *         description: Unauthorized, missing or invalid JWT token
 *       500:
 *         description: Internal server error
 */
AboutRouter.get("/getabout", async (req, res) => {
    try {
        const allAboutMe = await AboutModel.find({});
        if (!allAboutMe || allAboutMe.length === 0) {
            return res.status(404).json({
                message: "No data found",
            });
        }

        return res.status(200).send(allAboutMe);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});

/**
 * @swagger
 * /api/v1/about/deleteabout/{id}:
 *   delete:
 *     tags:
 *       - About Me
 *     summary: Delete a specific "About Me" entry by ID
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the "About Me" entry to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the "About Me" entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *       400:
 *         description: Bad request, invalid ID
 *       404:
 *         description: Entry not found
 *       401:
 *         description: Unauthorized, missing or invalid JWT token
 *       500:
 *         description: Internal server error
 */
AboutRouter.delete("/deleteabout/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "ID is mandatory",
            });
        }

        const About = await AboutModel.findByIdAndDelete(id);
        if (!About) {
            return res.status(404).json({
                message: "Entry not found",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Deleted successfully",
            data: About,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = { AboutRouter };
