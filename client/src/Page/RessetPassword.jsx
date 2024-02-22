import { useState } from "react";
import { useFormik } from "formik";
import { IoEyeOutline,IoEyeOffOutline } from "react-icons/io5";
import { ResetPassword } from "../services/operations/authAPI";
import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswordSchema } from "../Validate";
import { useDispatch, useSelector } from "react-redux";

const RessetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  uuid  = useSelector((state) => state.auth.uuid)
 const [eye, setEye] = useState(false)
const {id} = useParams();
const onSubmit = async (values, actions) => {

if(id !==uuid){
  return
}
dispatch(ResetPassword(values.Password,values.Confirm_Password,values.Email,navigate))
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
    Confirm_Password:"",
    
  },
  validationSchema: ResetPasswordSchema,
  onSubmit,
});

  
 
  return (
    <div className="flex flex-col items-center justify-center m-auto mt-6">
       <h1 className="text-3xl mb-4">Change Password</h1>
       <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
                  <span className='flex flex-col gap-y-2 '>
                        <label htmlFor="email">Email</label>
                        <input value={values.Email} className={`${errors.Email && touched.Email ? "input-error" : ""} border w-96 border-black px-4 py-1 rounded`} type='email' name="Email" id="email" onChange={handleChange} onBlur={handleBlur} />
                        {errors.Email && touched.Email && <p className="error">{errors.Email}</p>}

                        
                    </span>
               <span className='flex flex-col gap-y-2 relative'>
                        <label htmlFor="password">New Password</label>
                        <input value={values.Password} className={`${errors.Password && touched.Password ? "input-error" : ""} border w-96 border-black px-4 py-1 rounded`} type={eye ? "text": "password"} name="Password" id="password" onChange={handleChange} onBlur={handleBlur}/>
                        {
                          eye ? <IoEyeOffOutline className="absolute right-2 top-10" onClick={()=>{setEye(!eye)}}/> : <IoEyeOutline className="absolute right-2 top-10" onClick={()=> setEye(!eye)}/>
                        }
                        {errors.Password && touched.Password && <p className="error">{errors.Password}</p>}

                    </span>
                    <span className='flex flex-col gap-y-2 relative'>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input value={values.Confirm_Password} className={`${errors.Confirm_Password && touched.Confirm_Password ? "input-error" : ""} border w-96 border-black px-4 py-1 rounded`} type={eye ? "text": "password"} name="Confirm_Password" id="confirm-password" onChange={handleChange} onBlur={handleBlur}/>
                        {
                          eye ? <IoEyeOffOutline className="absolute right-2 top-10" onClick={()=> setEye(!eye)}/> : <IoEyeOutline className="absolute right-2 top-10" onClick={()=> setEye(!eye)}/>
                        }
                        {errors.Confirm_Password && touched.Confirm_Password && <p className="error">{errors.Confirm_Password}</p>}

                    </span>
                    <button type='submit' disabled={isSubmitting} className='bg-blue-500 hover:bg-blue-400  text-white px-2 py-2 rounded' >Change Password</button>
                </form>
    </div>
  )
}

export default RessetPassword