import axios from "axios"

import {setUser} from '../../slices/profileSlice';
import {setLoading, setToken, setUuid} from '../../slices/authSlice'
import toast from "react-hot-toast";
const URL = import.meta.env.VITE_BACKEND_URL
// const URL = 'http://localhost:3001'

// sendotp function
export function sendOtp(Email,navigate){
   return async (dispatch)=>{
  
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
  
    try {
      
          const response = await axios.post(`${URL}/sendotp`, {Email})
        
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
    
          toast.success("OTP Sent Successfully")
          navigate("/verify-email")
        } catch (error) {
          
          toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
   }
}

//signup function

export function signUp( Name,Email,Phone,Password,otp,navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
   
    dispatch(setLoading(true))
    try {
      const response = await axios.post(`${URL}/signup`, {
        Name,
        Email,
        Phone,
        Password,
        otp
      })
  
      
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login") 
    } catch (error) {
      
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}



//login function
export function login(data,navigate){
  return async (dispatch)=>{
  
    axios.post(`${URL}/login`,data).then((response)=>{
      
      dispatch(setUser(response.data.user))
      dispatch(setToken(response.data.token))

      localStorage.setItem("user",JSON.stringify(response.data.user))
      localStorage.setItem("token",JSON.stringify(response.data.token))
      toast.success('Login Successfully.');
      navigate("/")
    }).catch((err)=>{
      toast.error('Something went wrong.');
      throw new err
    })
  }
    
}

//logout
export function logout(navigate){
  return async (dispatch)=>{
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    dispatch(setUser(null))
    dispatch(setToken(null))
  toast.success("logout successfully")
   navigate("/")

  }
}

//update user
export function updateUser(userData,token){
  return async (dispatch)=>{
    try {
      const response = await axios.post(`${URL}/updateUser`,userData,{
        headers: {
          Authorization: `Bearer ${token}`,
       }
      })
    
  
      if(response.data.success){
        dispatch(setUser(response.data.updatedUser))
     
        localStorage.setItem("user",JSON.stringify(response.data.updatedUser))
        toast.success('Updated Successfully.');
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something Went wrong.');
    }
    

  }
}




//forgot otp
export function forgotPassword(email,navigate){
  return async (dispatch)=>{
    try {
      const response =await axios.post(`${URL}/reset-password-token`,{email})
       if(!response.data.success){
        toast.error(response.data.message)
          throw new Error(response.data.message)
       }else{
   
        localStorage.setItem("uuid",JSON.stringify(response.data.uuid))
      }
      dispatch(setUuid(response.data.uuid))
    
       toast.success("please check Email")
       navigate('/')

    } catch (error) {
      toast.error("something went wrong")
    }
  }
}


export  function ResetPassword(Password,Confirm_Password,Email,navigate){
  return async (dispatch)=>{
  try {
    const response =await axios.post(`${URL}/reset-password`,{Password,Confirm_Password,Email});
    if(!response.data.success){
      toast.error(response.data.message)
      throw new Error(response.data.message)
   }
    
   toast.success("Password Changed Successfully,Please login")
   localStorage.removeItem("uuid")
   navigate('/login')
  } catch (error) {
    toast.error("something went wrong")
  }
  }
}

export  function ChangePassword(token,passwordData){
  return async (dispatch)=>{
    try {
      const response = await axios.post(`${URL}/ChangePassword`, passwordData,{
        headers: {
          Authorization: `Bearer ${token}`,
       }
      })

    
      if(response.data.success){
        toast.success("Password Changed Successfully.")
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('something went wrong')
    }

  }
}

