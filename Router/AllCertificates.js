const express = require("express");
const { AllCertificatesModel } = require("../Models/Certificates");
const AllCertificatesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Certificates
 *     description: Certificates and domain management routes
 */

/**
 * @swagger
 * /api/v1/certificates/allCertificates:
 *   get:
 *     tags:
 *       - Certificates
 *     summary: Retrieve all certificates with their associated domains
 *     responses:
 *       200:
 *         description: Successfully retrieved all certificates data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   Domain:
 *                     type: string
 *                   AllCertificates:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Title:
 *                           type: string
 *                         Description:
 *                           type: string
 *                         Url:
 *                           type: string
 *                         Image:
 *                           type: string
 *       400:
 *         description: An error occurred during retrieval
 */
AllCertificatesRouter.get("/allCertificates", async (req, res) => {
    try {
        let allCertificatesData = await AllCertificatesModel.find({});
        if (!allCertificatesData) {
            throw new Error("No Certificates Found");
        }
        return res.json(allCertificatesData);
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
});

/**
 * @swagger
 * /api/v1/certificates/addCertificates:
 *   post:
 *     tags:
 *       - Certificates
 *     summary: Add a new domain with its associated certificates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Domain
 *               - AllCertificates
 *             properties:
 *               Domain:
 *                 type: string
 *                 description: The domain name
 *               AllCertificates:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Title:
 *                       type: string
 *                     Description:
 *                       type: string
 *                     Url:
 *                       type: string
 *                     Image:
 *                       type: string
 *     responses:
 *       200:
 *         description: Successfully added the domain with its certificates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 Domain:
 *                   type: string
 *                 AllCertificates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Title:
 *                         type: string
 *                       Description:
 *                         type: string
 *                       Url:
 *                         type: string
 *                       Image:
 *                         type: string
 *       400:
 *         description: Bad request (e.g., missing required fields or validation errors)
 */
AllCertificatesRouter.post("/addCertificates", async (req, res) => {
    try {
        const resp = new AllCertificatesModel(req.body);
        const respstatus = await resp.save();
        return res.json(respstatus);
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
});


module.exports = {
    AllCertificatesRouter
};
