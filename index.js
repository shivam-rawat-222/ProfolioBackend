const express = require("express");
const app = express();
const ENVVAR = require('dotenv')

ENVVAR.config();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("helo")
})


app.get("/hallo", (req, res) => {
    res.send("hallo")
})

app.listen(process.env.PORT, (err) => {
    if (err) { console.log(err) }
    else {
        console.log("server started", process.env.PORT)
    }
})