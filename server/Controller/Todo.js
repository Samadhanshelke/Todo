const Todo = require("../model/Todo");
const User = require("../model/User");

exports.createTodo = async(req,res)=>{
    try {
        const {Title,Description} = req.body;
        
        if(!Title || !Description){
            return res.status(400).json({
                success:false,
                message:'all field required',
                
            })
        }
      
        const userId = req.user.id;
        const user = await User.findById(userId)
       const todo = await Todo.create(req.body);

        //add todo to the user schema

      const newusertodo = await User.findByIdAndUpdate(
            {_id:user._id},
            {
                $push:{
                    Todos:todo._id
                }
            },
            {new:true}   
        )

        return res.status(201).json({
        success:true,
        message:'Todo created Successfully',
        todo:todo
       }) 

   } catch (error) {
    return res.status(500).json({
        success:false,
        message:'error in creating todo',
       })
   }
}


exports.getAllTodo = async(req,res)=>{
    try {
        const userId = req.user.id;
        const todos = await User.findById(userId).populate("Todos")
       
        const AllTodo = await Todo.find({});
       
        return res.status(200).json({
            success:true,
            message:"todo fetched successfully",
            AllTodo:todos.Todos
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in fetching todos"
        })
    }
}

exports.changeTodoStatus = async(req,res)=>{
    try {

        const {id} = req.body;
   
        if(!id){
            return res.status(400).json({
                success:false,
                message:"all fields required"
            })
        }
        const todo = await Todo.findById(id)

        const updatedTodo = await Todo.findByIdAndUpdate({_id:id},{isCompleted:!todo.isCompleted},{new:true})
         return res.json({
            success:true,
            message:'todo status changed successfully',
            todo:updatedTodo
         })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in fetching todos"
        })
    }
}

exports.updateTodo = async(req,res)=>{
    try {
        const {data} = req.body;
   
        const {Title,Description,_id} = data;
     
        if(!Title || !Description  || ! _id){
            return res.status(400).json({
                    success:false,
                    message:"all field required"
                 })
        }
        const updatedTodo = await Todo.findByIdAndUpdate(_id,{
            Title,
            Description,
            
        },{new:true})
        
        return res.status(200).json({
            success:true,
            message:"todo updated successfully",
            todo:updatedTodo
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in updating todo"
        })
    }
}


exports.deleteTodo = async(req,res)=>{
    try {
 
        const {id} = req.body;
        const userId = req.user.id
   
        if(!id){
            return res.status(400).json({
                success:false,
                message:"all fields required"
            })
        }
     
        const updatedTodo = await Todo.findByIdAndDelete({_id:id})
      
       //also delete from user schema 
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { Todos: id } },
            { new: true }, // To return the updated document
            
          );
          

          return res.status(200).json({
            success:true,
            message:'todo deleted successfully',
            updatedUser
         })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in deleting todo"
        })
    }
}