import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChangePassword, updateUser } from "../services/operations/authAPI"
import {userSchema,passwordSchema} from '../Validate'
import { useFormik } from "formik"
import { setUser } from "../slices/profileSlice"

const Profile = ({open,setOpen}) => {
   const {user} =  useSelector((state)=>state.profile)
   const {token} =  useSelector((state)=>state.auth)
   const [tab,setTab] = useState(1)
   const dispatch = useDispatch()

  

   const onSubmitProfile = async (values,actions ) => {
  
      dispatch(updateUser(values,token))
    await new Promise((resolve) => setTimeout(resolve,1000));
    setTab(1)
    actions.resetForm();
  };

  const onSubmitPassword = async (values, actions) => {
 
    dispatch(ChangePassword(token,values))
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTab(1)
    actions.resetForm();
  };


  const profileFormik = useFormik({
    initialValues: {
        Name: user.Name,
        Email: user.Email,
        Phone: user.Phone,
    },
    validationSchema: userSchema,
    onSubmit: onSubmitProfile,
    enableReinitialize: true,
});
const {values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit} = profileFormik

    const passwordFormik = useFormik({
      initialValues: {
        Password:"",
        NewPassword:"",
        ConfirmNewPassword:""
      },
      validationSchema: passwordSchema,
      onSubmit: onSubmitPassword,
  });
  // const {values,
  //   errors,
  //   touched,
  //   isSubmitting,
  //   handleBlur,
  //   handleChange,
  //   handleSubmit} = passwordFormik

//   useEffect(()=>{
//     dispatch(setUser(values))
// },[tab,dispatch,values])


  return (
    <div  className="flex flex-row  gap-x-16 mt-4 pt-4 ">
          {
            tab === 1 && (
              <div className={`${open === true ? "hidden sm:flex": ""} flex flex-col justify-center items-start ml-7`}>
                <h1 className="text-3xl sm:text-4xl+ font-bold mb-6">PROFILE DETAILS</h1>

              <span className="w-[150px] rounded-full  flex justify-center items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6euyc3Jc6YlucryJdwUmV_oNwbkC0ZKbMQ"/>
              </span>
              <div className="mt-5">
                 <div className="flex border-b gap-x-5 pt-2 ps-2 mb-2">
                  <span>Name</span>
                  <span>{values.Name}</span>
                 </div>

                 <div className="flex border-b gap-x-5 pt-2 ps-2 mb-2">
                  <span>Email</span>
                  <span>{user.Email}</span>
                 </div>

                 <div className="flex border-b gap-x-5 pt-2 ps-2 mb-2">
                  <span>Phone</span>
                  <span>{user.Phone}</span>
                 </div>

              </div>
              <div className="flex gap-x-5 mt-5">
                <button className="bg-red-500 p-2 text-white rounded-md" onClick={()=>setTab(3)}>Change Password</button>
                <button className="bg-green-500 p-2 text-white rounded-md" onClick={()=>setTab(2)}>Edit Profile</button>
                
              </div>
             



              </div>
            )
          }
          
          {
            tab === 2 && (
              <form className="flex flex-col justify-center items-center gap-y-5"  onSubmit={handleSubmit}>
                 <h2 className="text-3xl sm:text-4xl font-bold mb-6">Edit Profile</h2>
                 <span>
                 <input value={values.Name} onChange={handleChange} onBlur={handleBlur} name="Name" className={`${errors.Name && touched.Name ? "input-error" : ""} w-[260px] p-2 outline-none border-2`}  type="text"/>
                 {errors.Name && touched.Name && <p className="error">{errors.Name}</p>}

                 </span>
<span>
                 <input value={values.Email} onChange={handleChange} onBlur={handleBlur} name="Email" className={`${errors.Email && touched.Email ? "input-error" : ""} w-[260px] p-2 outline-none border-2`} type="email"/>
                 {errors.Email && touched.Email && <p className=" error p-0 m-0">{errors.Email}</p>}

</span>
                 <span>
                 <input value={values.Phone} onChange={handleChange} onBlur={handleBlur} name="Phone" className={`${errors.Phone && touched.Phone ? "input-error" : ""} w-[260px] p-2 outline-none border-2`} type="tel"/>
                 {errors.Phone && touched.Phone && <p className="error">{errors.Phone}</p>}

                 </span>

                  <div className="flex gap-x-5 mt-5">
                    <button  className=" p-2 border-2  text-black rounded-md" onClick={()=>setTab(1)}>Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="bg-green-500 p-2 text-white rounded-md">Submit</button>
                  </div>
              </form>
            )
          }
           
           {
            tab === 3 && (
              <form className="flex flex-col justify-center items-center gap-y-5" onSubmit={passwordFormik.handleSubmit}>
                 <h2 className="text-3xl sm:text-4xl font-bold mb-6">Update Password</h2>
                 <span>
                 <input value={passwordFormik.values.Password} onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} name="Password" placeholder="Password" className={`${passwordFormik.errors.Password && passwordFormik.touched.Password ? "input-error" : ""} w-[260px] p-2 outline-none border-2`}  type="password"/>
                 {passwordFormik.errors.Password && passwordFormik.touched.Password && <p className="error">{passwordFormik.errors.Password}</p>}

                 </span>
                 <span>
                 <input value={passwordFormik.values.NewPassword} onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} name="NewPassword" placeholder="New Password" className={`${passwordFormik.errors.NewPassword && passwordFormik.touched.NewPassword ? "input-error" : ""} w-[260px] p-2 outline-none border-2`} type="password"/>
                 {passwordFormik.errors.NewPassword && passwordFormik.touched.NewPassword && <p className="error">{passwordFormik.errors.NewPassword}</p>}

                 </span>
                 <span>
                 <input value={passwordFormik.values.ConfirmNewPassword} onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} name="ConfirmNewPassword" placeholder="Confirm New Password" className={`${passwordFormik.errors.ConfirmNewPassword && passwordFormik.touched.ConfirmNewPassword ? "input-error" : ""} w-[260px] p-2 outline-none border-2`} type="password"/>
                 {passwordFormik.errors.ConfirmNewPassword && passwordFormik.touched.ConfirmNewPassword && <p className="error">{passwordFormik.errors.ConfirmNewPassword}</p>}

                 </span>
                  <div className="flex gap-x-5 mt-5">
                    <button  className=" p-2 border-2  text-black rounded-md" onClick={()=>setTab(1)}>Cancel</button>
                    <button type="submit" disabled={passwordFormik.isSubmitting} className="bg-green-500 p-2 text-white rounded-md">Submit</button>
                  </div>
            </form>
            )
           }
           
         
    </div>
  )
}

export default Profile