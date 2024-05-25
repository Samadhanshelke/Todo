const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
   
 isCompleted:{
    type:Boolean,
    default:false
 },
 DueDate:{
    type:String,
    required:true
 }

   
},{timestamps:true})

module.exports = mongoose.model("Todo", TodoSchema)