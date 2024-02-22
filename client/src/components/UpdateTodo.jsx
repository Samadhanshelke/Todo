
import { useDispatch, useSelector } from "react-redux";
// import { createTodo } from "../services/operations/todoAPI";
import { setSingleTodo, setTab } from "../slices/todoSlice";
import { DeleteTodo, updateTodo } from "../services/operations/todoAPI";
import { RxCross2 } from "react-icons/rx";
import { useFormik } from "formik";
import { todoSchema } from "../Validate";
import { useEffect, useState } from "react";

function UpdateTodo() {
  
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth)
  const todo = useSelector((state)=>state.todo.singleTodo)

  const onSubmit = async (values, actions) => {
    const data = {...values,id:todo._id}
    console.log("data",values);
    dispatch(updateTodo(data,token))
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      Title: todo.Title,
      Description: todo.Description,
      
    },
    validationSchema: todoSchema,
    onSubmit,
    enableReinitialize: true,
  });


 

  const handleDeleteTodo = ()=>{
    dispatch(DeleteTodo(todo._id,token))
    
  }


  return (
    <div className="w-full sm:w-[30vw] -mt-[180px] sm:ml-[-500px] md:w-[55vw] lg:w-[30vw] lg:ml-[0px] sm:mt-4 p-4 bg-[#f5f4f5] rounded-lg  ">
        <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Update Task:</h1>
        <RxCross2 className="text-2xl cursor-pointer" onClick={()=>dispatch(setTab(null))}/>
        </div>
        <form className="ps-2 flex flex-col gap-y-4 w-[90%]" onSubmit={handleSubmit}>
            <input type="text" value={values.Title} name="Title"  placeholder="Title" className={`${errors.Title && touched.Title ? "input-error" : ""} border px-2 py-1 rounded   focus:outline-none`}  onChange={handleChange} onBlur={handleBlur}/>
            {errors.Title && touched.Title && <p className="error">{errors.Title}</p>}

            <textarea className={`${errors.Description && touched.Description ? "input-error" : ""} border px-3 py-2   rounded resize-none`} name="Description" value={values.Description} id="" cols="30" rows="4" placeholder="Description" onChange={handleChange} onBlur={handleBlur}></textarea> 
            {errors.Description && touched.Description && <p className="error">{errors.Description}</p>}

            <div className="flex gap-x-4">
              <button  className="mt-10 text-black font-bold px-2 py-2 hover:bg-red-500 rounded border" onClick={handleDeleteTodo}>Delete Todo</button>
              <button type="submit" disabled={isSubmitting} className="mt-10 bg-yellow-500 font-bold px-2 py-2 hover:bg-slate-600 text-white hover:text-white rounded">Save Changes</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateTodo