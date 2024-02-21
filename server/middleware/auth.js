const jwt = require("jsonwebtoken")
require("dotenv").config();



//auth 
exports.auth = async(req,res,next)=>{
    try {
        //extract token 
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
		
        //if token missing , then return response
        if(!token){
             return res.status(401).json({
                success:false,
                message:"Token is Missing",
             })
        }
        //verify the token
        try {
            const decode = jwt.verify(token,"samadhan");
            
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            })
        }

        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"something went wrong while validating the token",
        })
    }
}




