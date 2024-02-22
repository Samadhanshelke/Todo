import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import loginImg from '../Assets/Images/login.avif'
import * as Yup from 'yup';
import {loginSchema} from '../Validate'
import { useFormik } from "formik";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
  
    dispatch(login(values, navigate));
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
      
    },
    validationSchema: loginSchema,
    onSubmit,
  });

 
 
  return (
   
        <div className='flex justify-center flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-center sm:m-auto items-center w-full sm:w-11/12 h-screen sm:gap-x-10' >
            <div>
                <img src={loginImg} alt="" className='h-[200px] sm:h-[300px] '/>
            </div>
            <div>
                <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
                    <span className='flex flex-col gap-y-2'>
                        <label htmlFor="email">Email</label>
                        <input value={values.Email}
                         className={`${errors.Email && touched.Email ? "input-error" : ""} border w-[300px] sm:w-96 border-black px-4 py-1 rounded`} type="email" name="Email" id="email" onChange={handleChange} onBlur={handleBlur}

                         />
                        {errors.Email && touched.Email && <p className="error">{errors.Email}</p>}
                    </span>

                    <span className='flex flex-col gap-y-2'>
                        <label htmlFor="password">Password</label>
                        <input value={values.Password} className={`${errors.Password && touched.Password ? "input-error" : ""} border w-[300px] sm:w-96 border-black px-4 py-1 rounded`} type="password" name="Password" id="password" onChange={handleChange} onBlur={handleBlur}/>
                        {errors.Password && touched.Password && <p className="error">{errors.Password}</p>}
                    </span>
                    <button type='submit' disabled={isSubmitting} className='bg-blue-500 hover:bg-blue-400  text-white px-2 py-2 rounded' >LogIn</button>
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
