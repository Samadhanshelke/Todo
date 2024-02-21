
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../services/operations/authAPI";
import { useState } from "react";
import * as Yup from 'yup';
import toast from "react-hot-toast";
const Signup = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   
const [data,setData] = useState({
  Name:"",
  Email:"",
  Phone:"",
  Password:""
});

const handleChange = (e)=>{
  setData({
    ...data,
    [e.target.name]: e.target.value
  });
}
const validationSchema = Yup.object().shape({
   Name: Yup.string()
     .matches(/^[a-zA-Z ]*$/, 'Name must contain only letters and spaces')
     .required('Name is required'),
   Email: Yup.string().email('Invalid email').required('Email is required'),
   Phone: Yup.string()
     .matches(/^[0-9]{10}$/, 'Phone must be a 10-digit number')
     .required('Phone is required'),
   Password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
 });
 

const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     await validationSchema.validate(data, { abortEarly: false });
     dispatch(setSignupData(data))
     dispatch(sendOtp(data.Email, navigate))
   } catch (error) {
     console.error(error);
     toast.error("Please Fill Properly")
   }
 }





  return (
    <form className='w-full sm:w-11/12 m-auto flex-col gap-y-5  justify-start sm:flex-row flex sm:justify-center items-center h-screen gap-x-20 ' onSubmit={handleSubmit}>
    <div>
        <img src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="no" className='h-[120px] w-[100vw] sm:h-[400px]  sm:w-[500px]'/>
    </div>
    <div className='flex flex-col gap-y-6'>
    <span className='flex flex-col gap-y-2'>
            <label htmlFor="text">Name</label>
            <input value={data.Name} className='border w-[300px] sm:w-96 border-black px-4 py-1 rounded' type="text" name="Name" id="name" onChange={handleChange}/>
         </span>
         <span className='flex flex-col gap-y-2'>
            <label htmlFor="email">Email</label>
            <input value={data.Email} className='border w-[300px] sm:w-96 border-black px-4 py-1 rounded' type="email" name="Email" id="email" onChange={handleChange}/>

         </span>
         <span className='flex flex-col gap-y-2'>
            <label htmlFor="password">Password</label>
            <input value={data.Password} className='border w-[300px] sm:w-96 border-black px-4 py-1 rounded' type="password" name="Password" id="password" onChange={handleChange}/>

         </span>
         <span className='flex flex-col gap-y-2'>
            <label htmlFor="phone">Phone</label>
            <input value={data.Phone} className='border w-[300px] sm:w-96 border-black px-4 py-1 rounded' type="tel" name="Phone" id="phone" onChange={handleChange}/>
         </span>
         <button type='submit' className='bg-blue-500 hover:bg-blue-400  text-white px-2 py-2 rounded'>SignUp</button>
         <div>
            <Link to={'/login'}>Already have an account? Login</Link>
         </div>
    </div>
                
</form>
  )
}

export default Signup