
import { Link, useNavigate } from "react-router-dom";
import signupImg from '../Assets/Images/signup.avif'
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../services/operations/authAPI";

import * as Yup from 'yup';

import { useFormik } from "formik";
import { signupSchema } from "../Validate";
const Signup = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   




 

   const onSubmit = async (values, actions) => {
    console.log("data",values);
    
    dispatch(setSignupData(values))
    dispatch(sendOtp(values.Email, navigate))
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
    Email: "",
    Password: "",
    Phone:"",
    Name:""
    
  },
  validationSchema: signupSchema,
  onSubmit,
});





  return (
    <form className='w-full sm:w-11/12 m-auto flex-col gap-y-5  justify-start sm:flex-row flex sm:justify-center items-center h-screen gap-x-20 ' onSubmit={handleSubmit}>
    <div>
        <img src={signupImg} alt="no" className='h-[120px] w-[100vw] sm:h-[400px]  sm:w-[500px]'/>
    </div>
    <div className='flex flex-col gap-y-6'>
    <span className='flex flex-col gap-y-2'>
            <label htmlFor="text">Name</label>
            <input value={values.Name} className={`${errors.Name && touched.Name ? "input-error" : ""} border w-[300px] sm:w-96 border-black px-4 py-1 rounded`} type="text" name="Name" id="name" onChange={handleChange} onBlur={handleBlur}/>
            {errors.Name && touched.Name && <p className="error">{errors.Name}</p>}

         </span>
         <span className='flex flex-col gap-y-2'>
            <label htmlFor="email">Email</label>
            <input value={values.Email} className={`${errors.Email && touched.Email ? "input-error" : ""} border w-[300px] sm:w-96 border-black px-4 py-1 rounded`} type="email" name="Email" id="email" onChange={handleChange} onBlur={handleBlur}/>
            {errors.Email && touched.Email && <p className="error">{errors.Email}</p>}

         </span>
         <span className='flex flex-col gap-y-2'>
            <label htmlFor="password">Password</label>
            <input value={values.Password} className={`${errors.Password && touched.Password ? "input-error" : ""} border w-[300px] sm:w-96 border-black px-4 py-1 rounded`} type="password" name="Password" id="password" onChange={handleChange} onBlur={handleBlur}/>
            {errors.Password && touched.Password && <p className="error">{errors.Password}</p>}
         </span>
         <span className='flex flex-col gap-y-2'>
            <label htmlFor="phone">Phone</label>
            <input value={values.Phone} className={`${errors.Phone && touched.Phone ? "input-error" : ""} border w-[300px] sm:w-96 border-black px-4 py-1 rounded`} type="tel" name="Phone" id="phone" onChange={handleChange} onBlur={handleBlur}/>
            {errors.Phone && touched.Phone && <p className="error">{errors.Phone}</p>}
         </span>
         <button type='submit' disabled={isSubmitting} className='bg-blue-500 hover:bg-blue-400  text-white px-2 py-2 rounded'>SignUp</button>
         <div>
            <Link to={'/login'}>Already have an account? Login</Link>
         </div>
    </div>
                
</form>
  )
}

export default Signup