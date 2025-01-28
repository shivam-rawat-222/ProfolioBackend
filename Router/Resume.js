const express = require("express");
const ResumeRouter = express.Router();
const multer = require("multer")
const path = require("path");
const {LocalStorage} = require("node-localstorage");

let localStorage = new LocalStorage("ResumeName")
let multerfile;
try {
    multerfile = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads");

        },
        filename: (req, file, cb) => {
            localStorage.setItem("latestFile",file.originalname)
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
    let filename = localStorage.getItem("latestFile")
    res.download(path.join(__dirname, `.././uploads/${filename}`))
})



module.exports = {
    ResumeRouter
}