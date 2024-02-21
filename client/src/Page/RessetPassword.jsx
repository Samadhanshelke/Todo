import { useState } from "react";


import { IoEyeOutline,IoEyeOffOutline } from "react-icons/io5";
import { ResetPassword } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const RessetPassword = () => {
  const navigate = useNavigate();
 const [eye, setEye] = useState(false)
 const [data,setData]=useState({
  Password:"",
  Confirm_Password:"",
  Email:""
});
   
const handleChange = (e) => {
  setData({
    ...data,
    [e.target.name]: e.target.value
  });
}

  const handleSubmit = () => {
   if(data.Email == "" || data.Password == "" || data.Confirm_Password == ""){
    return
   }
    if(data.Password === data.Confirm_Password){
     
       ResetPassword(data.Password,data.Confirm_Password,data.Email,navigate)
    } 
  }

 
  return (
    <div className="flex flex-col items-center justify-center m-auto mt-6">
       <h1 className="text-3xl mb-4">Change Password</h1>
       <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
                  <span className='flex flex-col gap-y-2 '>
                        <label htmlFor="email">Email</label>
                        <input value={data.Email} className='border w-96 border-black px-4 py-1 rounded' type='email' name="Email" id="email" onChange={handleChange} />
                       
                        
                    </span>
               <span className='flex flex-col gap-y-2 relative'>
                        <label htmlFor="password">Password</label>
                        <input value={data.Password} className='border w-96 border-black px-4 py-1 rounded' type={eye ? "text": "password"} name="Password" id="password" onChange={handleChange}/>
                        {
                          eye ? <IoEyeOffOutline className="absolute right-2 top-10" onClick={()=>{setEye(!eye)}}/> : <IoEyeOutline className="absolute right-2 top-10" onClick={()=> setEye(!eye)}/>
                        }
                        
                    </span>
                    <span className='flex flex-col gap-y-2 relative'>
                        <label htmlFor="confirm-password">Password</label>
                        <input value={data.Confirm_Password} className='border w-96 border-black px-4 py-1 rounded' type={eye ? "text": "password"} name="Confirm_Password" id="confirm-password" onChange={handleChange}/>
                        {
                          eye ? <IoEyeOffOutline className="absolute right-2 top-10" onClick={()=> setEye(!eye)}/> : <IoEyeOutline className="absolute right-2 top-10" onClick={()=> setEye(!eye)}/>
                        }
                    </span>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-400  text-white px-2 py-2 rounded' >Change Password</button>
                </form>
    </div>
  )
}

export default RessetPassword