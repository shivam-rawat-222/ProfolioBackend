const express = require("express");
const ResumeRouter = express.Router();
const multer = require("multer");
const path = require("path");
const { LocalStorage } = require("node-localstorage");

let localStorage = new LocalStorage("ResumeName");
let multerfile;

try {
    multerfile = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads");
        },
        filename: (req, file, cb) => {
            localStorage.setItem("latestFile", file.originalname);
            cb(null, file.originalname);
        }
    });
} catch (err) {
    res.json({
        error: err.message
    });
}

const upload = multer({ storage: multerfile });

/**
 * @swagger
 * tags:
 *   - name: Resume
 *     description: Resume upload and download routes
 */

/**
 * @swagger
 * /api/v1/resume/upload:
 *   post:
 *     tags:
 *       - Resume
 *     summary: Upload a resume file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The resume file to be uploaded
 *     responses:
 *       200:
 *         description: Successfully uploaded the resume file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fieldname:
 *                   type: string
 *                 originalname:
 *                   type: string
 *                 encoding:
 *                   type: string
 *                 mimetype:
 *                   type: string
 *                 destination:
 *                   type: string
 *                 filename:
 *                   type: string
 *                 path:
 *                   type: string
 *       400:
 *         description: Bad request, file not provided or invalid format
 */
ResumeRouter.post("/upload", upload.single('file'), (req, res) => {
    res.send(req.file);
});

/**
 * @swagger
 * /api/v1/resume/download:
 *   get:
 *     tags:
 *       - Resume
 *     summary: Download the latest uploaded resume file
 *     responses:
 *       200:
 *         description: Successfully downloaded the resume file
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 */
ResumeRouter.get("/download", (req, res) => {
    let filename = localStorage.getItem("latestFile");
    if (!filename) {
        return res.status(404).json({
            message: "No file found"
        });
    }
    res.download(path.join(__dirname, `../uploads/${filename}`));
});

module.exports = {
    ResumeRouter
};
