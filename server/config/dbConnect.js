const mongoose = require('mongoose')
require('dotenv').config();
exports.dbConnect = ()=>{
   mongoose.connect(process.env.MONGO_URL)
   .then(()=>{
      console.log("db connected successfully");
   })
   .catch((err)=>{
    console.log("error in db connection",err);
   })
}

