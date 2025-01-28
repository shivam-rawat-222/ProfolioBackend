const nodemailer = require("nodemailer")
const express = require("express")
const env = require("dotenv").config();

const mailRouter = express.Router();
const createtransport = new nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"222rawatshivam@gmail.com",
        pass: "gdfn ulxn gkqa jsli"
    }
})



mailRouter.get("/sendMail",(req,res)=>{
    const {name,email,subject,message} = req.body;
    const mailOptions = {
        from: "222rawatshivam@gmail.com",
        to: "shivambuddy222@gmail.com",
        subject: subject,
        text: `this is the message from ${name} from ${email}`,
        html: `<h1 style="color:blue;">this is the message from ${name} from ${email}</h1>
        <p>${message}</p>
        `
      };
    createtransport.sendMail(mailOptions,(err,info)=>{
        if(err)
        {
            console.log(err)
        }
        
   
    })  
    res.send("Mail Sent Successfully")
})

module.exports = {
    mailRouter
}
