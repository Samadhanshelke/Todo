const express = require("express")
const router = express.Router()
const {signUp,login,SendOtp,ResetPasswordToken,ResetPassword, updateUser, ChangePassword} = require("../Controller/Auth")
const { auth } = require("../middleware/auth")


router.post("/signup",signUp)
router.post("/login",login)
router.post("/sendotp",SendOtp)
router.post("/reset-password-token",ResetPasswordToken)
router.post("/reset-password",ResetPassword)

router.post("/updateUser",auth,updateUser)
router.post("/ChangePassword",auth,ChangePassword)

module.exports = router


