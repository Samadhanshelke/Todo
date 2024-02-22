import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../services/operations/todoAPI";
import { RxCross2 } from "react-icons/rx";
import { setTab } from "../slices/todoSlice";
import { useState } from "react";
import {todoSchema} from '../Validate'
import { useFormik } from "formik";

function AddTodo() {
  const dispatch = useDispatch();
 const {token} = useSelector((state)=>state.auth)

 
 const onSubmit = async (values, actions) => {
  console.log("data",values);
  dispatch(createTodo(values,token)) 
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
    Title: "",
    Description: "",
    
  },
  validationSchema: todoSchema,
  onSubmit,
});





  return (
    <div className="w-full sm:w-[30vw] -mt-[180px] sm:ml-[-500px] md:w-[55vw] lg:w-[30vw] lg:ml-[0px] sm:mt-4 p-4 bg-[#f5f4f5] rounded-lg  ">
    <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Add New Task:</h1>
        <RxCross2 className="text-2xl cursor-pointer" onClick={()=>dispatch(setTab(null))}/>
    </div>

        <form className="ps-2 flex flex-col gap-y-4 w-[90%]" onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={values.Title} name="Title" className={`${errors.Title && touched.Title ? "input-error" : ""} border px-2 py-1 rounded   focus:outline-none`} onChange={handleChange} onBlur={handleBlur}/>
            {errors.Title && touched.Title && <p className="error">{errors.Title}</p>}

            <textarea className={`${errors.Description && touched.Description ? "input-error" : ""} border px-3 py-2  rounded resize-none`} name="Description" value={values.Description} id="" cols="30" rows="4" placeholder="Description" onChange={handleChange} onBlur={handleBlur}></textarea>
            {errors.Description && touched.Description && <p className="error">{errors.Description}</p>}
            <button type="submit" disabled={isSubmitting} className="mt-10 bg-slate-800 text-white px-1 py-2 hover:bg-slate-600 rounded">Create Task</button>
        </form>
    </div>
  )
}

export default AddTodo