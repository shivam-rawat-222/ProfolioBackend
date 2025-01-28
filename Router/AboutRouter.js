const express = require("express");
const { AboutModel } = require("../Models/About");

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
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 _id:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
AboutRouter.post("/postabout", async (req, res) => {
    try {
        const { title, description } = req.body;
        const PostAboutModel = new AboutModel({
            title,
            description,
        });
        const resp = await PostAboutModel.save();
        return res.send(resp);
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
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
 *       500:
 *         description: Internal server error
 */
AboutRouter.get("/getabout", async (req, res) => {
    try {
        const allAboutMe = await AboutModel.find({});
        return res.send(allAboutMe);
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the "About Me" entry to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the entry
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
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */
AboutRouter.delete("/deleteabout/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                status: 404,
                message: "Id is required",
            });
        }
        const About = await AboutModel.findByIdAndDelete(id);
        if (!About) {
            return res.status(404).json({
                status: 404,
                message: "Data not found",
            });
        }
        return res.send({
            status: 200,
            message: "Deleted successfully",
            data: About,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
});

module.exports = { AboutRouter };
