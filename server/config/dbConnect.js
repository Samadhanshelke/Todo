const mongoose = require('mongoose')
require('dotenv').config();
exports.dbConnect = ()=>{
   mongoose.connect('mongodb+srv://samadhanshelke2145:dGqTY7WlCzlfBCPV@cluster0.ijfn0pi.mongodb.net/ArtFarm')
   .then(()=>{
      console.log("db connected successfully");
   })
   .catch((err)=>{
    console.log("error in db connection",err);
   })
}

