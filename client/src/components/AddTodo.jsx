import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../services/operations/todoAPI";
import { RxCross2 } from "react-icons/rx";
import { setTab } from "../slices/todoSlice";
import { useState } from "react";


function AddTodo() {
  const [todo,setTodo]=useState({
    Title:"",
    Description:""
  });

  const {Title,Description} = todo;

  const dispatch = useDispatch();
 const {token} = useSelector((state)=>state.auth)

 
 const handleChange = (e) => {
  setTodo({
    ...todo,
    [e.target.name]: e.target.value
  });
}
 


const handleSubmit = (e) => {

  e.preventDefault();
  if(todo.Title == "" || todo.Description == ""){
    return
  }

  dispatch(createTodo(todo,token))
    
   
   
}

  return (
    <div className="w-full sm:w-[30vw] -mt-[180px] sm:ml-[-500px] md:w-[55vw] lg:w-[30vw] lg:ml-[0px] sm:mt-4 p-4 bg-[#f5f4f5] rounded-lg  ">
    <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Add New Task:</h1>
        <RxCross2 className="text-2xl cursor-pointer" onClick={()=>dispatch(setTab(null))}/>
    </div>

        <form className="ps-2 flex flex-col gap-y-4 w-[90%]" onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={Title} name="Title" className="border px-2 py-1 rounded   focus:outline-none" onChange={handleChange}/>

            <textarea className="border px-3 py-2  rounded resize-none" name="Description" value={Description} id="" cols="30" rows="4" placeholder="Description" onChange={handleChange}></textarea>
            <button type="submit" className="mt-10 bg-slate-800 text-white px-1 py-2 hover:bg-slate-600 rounded">Create Task</button>
        </form>
    </div>
  )
}

export default AddTodo