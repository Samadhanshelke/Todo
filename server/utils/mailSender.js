const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
exports.mailSender = async(Email,Subject,Message)=>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
       
          let info =  await transporter.sendMail({
            from:'ArtFarm - Pramod shelke',
            to:`${Email}`,
            subject:`${Subject}`,
            html:`${Message}`
        })
        return info;
        
    } catch (error) {
        
    }
}