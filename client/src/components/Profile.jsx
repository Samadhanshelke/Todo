import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChangePassword, updateUser } from "../services/operations/authAPI"


const Profile = () => {
   const {user} =  useSelector((state)=>state.profile)
   const {token} =  useSelector((state)=>state.auth)
   const [tab,setTab] = useState(1)
   const [userData,setUserData] = useState(user)
   const [passwordData,setPasswordData] = useState({
    Password:"",
    NewPassword:"",
    ConfirmNewPassword:""
   })

const dispatch = useDispatch()

   const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }
  const handlePasswordChange = (e)=>{
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
   
    dispatch(updateUser(userData,token))
  }

  const handlePasswordSubmit = (e)=>{
       e.preventDefault();
       dispatch(ChangePassword(token,passwordData))

  }

  return (
    <div  className="flex flex-row  gap-x-16 mt-4 pt-4">
          {
            tab === 1 && (
              <div className="flex flex-col justify-center items-start ml-5">
                <h1 className="text-4xl font-bold mb-6">PROFILE DETAILS</h1>

              <span className="w-[150px] rounded-full  flex justify-center items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6euyc3Jc6YlucryJdwUmV_oNwbkC0ZKbMQ"/>
              </span>
              <div className="mt-5">
                 <div className="flex border-b gap-x-5 pt-2 ps-2 mb-2">
                  <span>Name</span>
                  <span>{user.Name}</span>
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
              <form className="flex flex-col justify-center items-center gap-y-5 relative" onSubmit={handleSubmit}>
                 <h2 className="text-4xl font-bold mb-6">Edit Profile</h2>
                 <span className="absolute w-[40px] rounded-full h-[1px] bg-red-400 left-[90px] top-[30%] "></span>
                 <input value={userData.Name} onChange={handleChange} name="Name" className="w-[260px] p-2 outline-none border-2"  type="text"/>
                 <input value={userData.Email} onChange={handleChange} name="Email" className="w-[260px] p-2 outline-none border-2" type="email"/>
                 <input value={userData.Phone} onChange={handleChange} name="Phone" className="w-[260px] p-2 outline-none border-2" type="tel"/>
                  <div className="flex gap-x-5 mt-5">
                    <button  className=" p-2 border-2  text-black rounded-md" onClick={()=>setTab(1)}>Cancel</button>
                    <button type="submit" className="bg-green-500 p-2 text-white rounded-md">Submit</button>
                  </div>
            </form>
            )
          }
           
           {
            tab === 3 && (
              <form className="flex flex-col justify-center items-center gap-y-5 relative" onSubmit={handlePasswordSubmit}>
                 <h2 className="text-4xl font-bold mb-6">Update Password</h2>
                 <span className="absolute w-[80px] rounded-full h-[1px] bg-red-400 left-[65px] top-[30%] "></span>
                 <input value={passwordData.Password} onChange={handlePasswordChange} name="Password" placeholder="Password" className="w-[260px] p-2 outline-none border-2"  type="password"/>
                 <input value={passwordData.NewPassword} onChange={handlePasswordChange} name="NewPassword" placeholder="New Password" className="w-[260px] p-2 outline-none border-2" type="password"/>
                 <input value={passwordData.ConfirmNewPassword} onChange={handlePasswordChange} name="ConfirmNewPassword" placeholder="Confirm New Password" className="w-[260px] p-2 outline-none border-2" type="password"/>
                  <div className="flex gap-x-5 mt-5">
                    <button  className=" p-2 border-2  text-black rounded-md" onClick={()=>setTab(1)}>Cancel</button>
                    <button type="submit" className="bg-green-500 p-2 text-white rounded-md">Submit</button>
                  </div>
            </form>
            )
           }
           
         
    </div>
  )
}

export default Profile