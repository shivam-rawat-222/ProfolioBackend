const express = require("express")
const TokenRouter = express.Router();
const jwt = require("jsonwebtoken");


TokenRouter.post("/getToken",(req,res)=>{
    try{
        let {name ,password}= req.body;
        let payload = {
            name,password
        }
        let jwttoken = jwt.sign(payload,"SHIVAMKEY",{expiresIn:"7d"})
        res.json({
            status:"Success",
            Token:jwttoken
        });
    }
    catch(err){
        res.json(
            {
            message:err.message
            }
        )
    }
})

module.exports={
    TokenRouter
}