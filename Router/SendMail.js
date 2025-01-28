const nodemailer = require("nodemailer");
const express = require("express");
const env = require("dotenv").config();

const mailRouter = express.Router();
const createtransport = new nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "222rawatshivam@gmail.com",
        pass: "gdfn ulxn gkqa jsli", // Remember to use environment variables instead of hardcoding credentials
    }
});

/**
 * @swagger
 * tags:
 *   - name: Mail
 *     description: Email-related routes
 */

/**
 * @swagger
 * /api/v1/connect/sendMail:
 *   get:
 *     tags:
 *       - Mail
 *     summary: Send an email from the server
 *     description: This endpoint sends an email using the provided user details (name, email, subject, and message).
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the person sending the email.
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email address of the sender.
 *       - in: query
 *         name: subject
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject of the email.
 *       - in: query
 *         name: message
 *         required: true
 *         schema:
 *           type: string
 *         description: Message content of the email.
 *     responses:
 *       200:
 *         description: Successfully sent the email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mail Sent Successfully"
 *       400:
 *         description: Invalid or missing parameters
 *       500:
 *         description: Internal server error
 */
mailRouter.get("/sendMail", (req, res) => {
    const { name, email, subject, message } = req.query;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            message: "Missing required parameters"
        });
    }

    const mailOptions = {
        from: "222rawatshivam@gmail.com",
        to: "shivambuddy222@gmail.com",
        subject: subject,
        text: `This is the message from ${name} from ${email}`,
        html: `<h1 style="color:blue;">This is the message from ${name} from ${email}</h1>
               <p>${message}</p>`
    };

    createtransport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Failed to send email"
            });
        }
        res.json({
            message: "Mail Sent Successfully",
            info: info
        });
    });
});

module.exports = {
    mailRouter
};
