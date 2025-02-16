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
 * /api/v1/certificates/addCertificatesWithDomain:
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
AllCertificatesRouter.post("/addCertificatesWithDomain", async (req, res) => {
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

/**
 * @swagger
 * /api/v1/certificates/addCertificate:
 *   put:
 *     tags:
 *       - Certificates
 *     summary: Add a new certificate to an existing domain
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ObjectId
 *               - Certificate
 *             properties:
 *               ObjectId:
 *                 type: string
 *                 description: The unique identifier of the domain
 *               Certificate:
 *                 type: object
 *                 required:
 *                   - Title
 *                   - Description
 *                 properties:
 *                   Title:
 *                     type: string
 *                     description: The certificate title
 *                   Description:
 *                     type: string
 *                     description: A brief description of the certificate
 *                   Url:
 *                     type: string
 *                     description: Link to the certificate (optional)
 *                   Image:
 *                     type: string
 *                     description: Image URL of the certificate (optional)
 *     responses:
 *       200:
 *         description: Successfully added the certificate to the domain
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the domain
 *                 Domain:
 *                   type: string
 *                   description: The domain name
 *                 AllCertificates:
 *                   type: array
 *                   description: List of certificates associated with the domain
 *                   items:
 *                     type: object
 *                     properties:
 *                       Title:
 *                         type: string
 *                         description: The certificate title
 *                       Description:
 *                         type: string
 *                         description: A brief description of the certificate
 *                       Url:
 *                         type: string
 *                         description: Link to the certificate (optional)
 *                       Image:
 *                         type: string
 *                         description: Image URL of the certificate (optional)
 *       400:
 *         description: Bad request (e.g., missing required fields or validation errors)
 */

AllCertificatesRouter.put("/addCertificate", async (req, res) => {
    try {
        const { ObjectId, Certificate } = req.body;
        const allCertificate = await AllCertificatesModel.findByIdAndUpdate(ObjectId, {
            $push: { AllCertificates: Certificate }
        },
            { new: true, upsert: true }
        );
        return res.json(
            {
                message: "updated",
                data: allCertificate,
                status: 200
            }
        );
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
});


module.exports = {
    AllCertificatesRouter
};
