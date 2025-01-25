const express = require("express");
const ResumeRouter = express.Router();
const multer = require("multer")
const path = require("path");
let multerfile;
let filename;
try {
    multerfile = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads");

        },
        filename: (req, file, cb) => {
            filename = file.originalname
            cb(null, file.originalname);
        }
    })

} catch (err) {
    res.json({
        error: err.message
    })
}

const upload = multer({ storage: multerfile })

ResumeRouter.post("/upload", upload.single('file'), (req, res) => {
    res.send(req.file)
})

ResumeRouter.get("/download", (req, res) => {
    res.download(path.join(__dirname, `.././uploads/${filename}`))
})



module.exports = {
    ResumeRouter
}