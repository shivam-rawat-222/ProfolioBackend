const express = require("express")
const TokenRouter = express.Router();
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * tags:
 *   - name: Token
 *     description: Operations related to generating and managing JWT tokens
 * 
 * /api/v1/Token/getToken:
 *   post:
 *     tags:
 *       - Token
 *     summary: Generate a JWT token
 *     description: This endpoint generates a JWT token based on the provided username and password.
 *     operationId: getToken
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: 'JohnDoe'
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: 'myPassword123'
 *     responses:
 *       200:
 *         description: Successfully generated JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'Success'
 *                 Token:
 *                   type: string
 *                   description: The generated JWT token
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJKb2huRG9lIiwicGFzc3dvcmQiOiJteVBhc3N3b3JkMTIzIiwiaWF0IjoxNjA3OTI3NzY5LCJleHBpcmVkX2luIjoiN2QiLCJpc3MiOiJodHRwczovL...'
 *       400:
 *         description: Invalid input, missing or incorrect data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Bad request, missing name or password'
 */


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