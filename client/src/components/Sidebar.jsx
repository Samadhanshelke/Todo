
import { BsFillStickyFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

import { FaSignOutAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiAdminLine } from "react-icons/ri";
import { useSelector } from "react-redux"
import { logout } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LuListTodo } from "react-icons/lu";
import { setNavigation } from "../slices/todoSlice";
const Sidebar = ({open,setOpen}) => {
  const {user} =  useSelector((state)=>state.profile)
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const logoutUser = ()=>{  
    dispatch(logout(navigate))
 }


if (!open){
  return(
    <div className=" text-[22px] text-[#505050] cursor-pointer   mt-4 sm:h-screen sm:max-h-[calc(100vh-32px)] pt-4" onClick={()=>setOpen(!open)}>   
       <GiHamburgerMenu/>
    </div>
  )
}

  return (
  
    
    <div className="text-[#505050] flex flex-col gap-y-2  sm:w-[20vw] mt-4 rounded-lg h-screen max-h-[calc(100vh-32px)] bg-[#f4f4f4] pt-4 px-5">
      <div className="flex items-center text-[22px] justify-between">
          <h1 className="font-bold  mb-2">Menu</h1>
          <GiHamburgerMenu onClick={()=>setOpen(!open)} className="cursor-pointer"/>

      </div>
      <div className="flex flex-col gap-y-12 mt-6">
        <div>
          <h2 className="flex items-center gap-x-2 mb-2 cursor-pointer" onClick={()=>dispatch(setNavigation(0))}> <LuListTodo/>Todos</h2>
          <h2 className="flex items-center gap-x-2 cursor-not-allowed">
              <BsFillStickyFill />
              Sticky Wall
            </h2>
         
        </div>

       

        <div className="flex flex-col gap-y-2">
        {
          user.accountType === "Admin" || user.accountType === "SuperAdmin" 
          ?   <span className="flex items-center gap-x-2 cursor-pointer" onClick={()=>dispatch(setNavigation(2))}>
               <RiAdminLine/>
                Manage Admin
             </span>
          : null
        }
          

            <span className="flex items-center gap-x-2 cursor-pointer" onClick={()=>dispatch(setNavigation(1))}>
              <FaRegUser />
              Profile
            </span>

           
            <span className="flex items-center gap-x-2 cursor-pointer" onClick={logoutUser}>
              <FaSignOutAlt />
              Sign Out
            </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
