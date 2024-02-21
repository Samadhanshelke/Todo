const mongoose  =require('mongoose');
const {mailSender} = require("../utils/mailSender")
const emailTemplate = require('../mail/template/emailVerificationTemplate')
const OTPSchema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
      
    },
    otp:{
        type:String,
        required:true,

    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60, 
    }
})

//function to send email
async function sendVerificationEmail(Email,otp){
    try {
        const mailResponse = await mailSender(Email,"Verification Email from ArtFarm",emailTemplate(otp))
        
    } catch (error) {
        
        throw error;
    }
}

OTPSchema.pre("save",async function(next){
// Only send an email when a new document is created
if (this.isNew) {
    await sendVerificationEmail(this.Email, this.otp);
}
    next();
} )
module.exports = mongoose.model("OTP",OTPSchema)