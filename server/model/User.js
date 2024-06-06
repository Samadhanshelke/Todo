const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    Todos:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo",
        }
     ],
     

    Phone:{
        type:String,
        required:true,
    },
    token:{
      type:String
    },
    accountType:{
        type:String,
        enum:["Admin","User","SuperAdmin"],
        default:"User",
        
    },
})

module.exports = mongoose.model("User", UserSchema)

