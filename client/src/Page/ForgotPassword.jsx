import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { forgotPassword } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
 
  const[email,setEmail] = useState("")
  const handleForgotPassword = (e)=>{
     e.preventDefault();

   
     if(email == ""){
      toast.error("email is required")
      return
     }
     dispatch(forgotPassword(email,navigate))
     

  }
  return (
    <div className="">
    <div className="w-fit flex flex-col m-auto justify-center items-center mt-6 gap-y-2 border border-black rounded px-4 py-6">

        <span className="text-4xl text-green-600"><MdErrorOutline/></span>
        <h1 className="text-2xl">Forgot Password</h1>
        <p className="text-[14px] text-gray-600 mb-2">Enter your email and we will send you a link to reset your password.</p>
        <form className="flex flex-col gap-y-4 items-center justify-center" onSubmit={handleForgotPassword}>
            <input type="email"  className="border w-[300px] border-black focus:outline-none rounded p-1" value={email} onChange={(e) =>{setEmail(e.target.value)}} />
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded  w-fit">Submit</button>
        </form>
    </div>

    </div>
  )
}

export default ForgotPassword