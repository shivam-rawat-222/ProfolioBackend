const jwt = require("jsonwebtoken")
const tokenAuth = (req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if(!token)
    { res.json({status:"Error", message :"Token Is Mandatory"})
    }

    try{
        let isVerified = jwt.verify(token,"SHIVAMKEY") 
        next();
    }
    catch(err)
    {
return res.json({
    status:"Invalid User",
    message :err.message
})
    }
}

module.exports = {
    tokenAuth
}