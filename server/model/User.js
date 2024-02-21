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
     ListOptions:{
        type: [{
            type: String,
            required: true,
        }],
        default: ["Personal", "Work", "Home", "Other"] 
    },

    Phone:{
        type:String,
        required:true,
    },
    token:{
      type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("User", UserSchema)

