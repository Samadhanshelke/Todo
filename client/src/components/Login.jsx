

// import {useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useState } from "react";

import * as Yup from 'yup';
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data,setData] = useState({
    Email:"",
    Password:""
  });
  const validationSchema = Yup.object().shape({
    Email: Yup.string().email('Invalid email').required('Email is required'),
    Password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
  });
  
  //  const {user} = useSelector((state)=>state.profile);
  const handleChange = (e)=>{
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(data, { abortEarly: false });
      dispatch(login(data, navigate));
    } catch (error) {
      toast.error("Please Fill Properly")
    }
  };
 
  return (
   
        <div className='flex justify-center flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-center sm:m-auto items-center w-full sm:w-11/12 h-screen sm:gap-x-10' >
            <div>
                <img src="./Images/loginImg.avif" alt="" className='h-[200px] sm:h-[300px] '/>
            </div>
            <div>
                <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
                    <span className='flex flex-col gap-y-2'>
                        <label htmlFor="email">Email</label>
                        <input value={data.Email} className='border w-[300px] sm:w-96 border-black px-4 py-1 rounded' type="email" name="Email" id="email" onChange={handleChange}/>
                    </span>
                    <span className='flex flex-col gap-y-2'>
                        <label htmlFor="password">Password</label>
                        <input value={data.Password} className='border w-[300px] sm:w-96 border-black px-4 py-1 rounded' type="password" name="Password" id="password" onChange={handleChange}/>
                    </span>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-400  text-white px-2 py-2 rounded' >LogIn</button>
                </form>
                <div className="mt-2 text-right text-gray-700">
                  <Link to={'/reset-password'}>Forgot Password?</Link>
                </div>
                <div>
                  <Link to={'/signup'}>Dont have an account? Signup</Link>
                </div>

            </div>
        </div>
  
  )
}

export default Login
