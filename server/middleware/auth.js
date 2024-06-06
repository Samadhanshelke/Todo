const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../model/User");


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

exports.isAdmin = async(req,res,next)=>{
    try {
		const userDetails = await User.findOne({ Email: req.user.Email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
}



exports.isSuperAdmin = async(req,res,next)=>{
    try {
		const userDetails = await User.findOne({ Email: req.user.Email });

		if (userDetails.accountType !== "SuperAdmin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for SuperAdmin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
}

 exports.isAdminOrSuperAdmin = async(req, res, next) => {
    const userDetails = await User.findOne({ Email: req.user.Email });
    if (req.user && (userDetails.accountType === 'Admin' || userDetails.accountType === 'SuperAdmin')) {
        return next();
    }
    return res.status(403).send({ error: 'Access denied, admin or super admin only.' });
};
