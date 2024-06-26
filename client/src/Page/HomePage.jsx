import { useSelector } from "react-redux"
import Hero from "../components/Hero"
import Sidebar from "../components/Sidebar"
import AddTodo from "../components/AddTodo"
import UpdateTodo from "../components/UpdateTodo"
import Profile from "../components/Profile"
import { useState } from "react"
import AllUsers from "../components/AllUsers"




const HomePage = () => {
  const {tab,navigation} =  useSelector((state)=>state.todo)
  const {user} =  useSelector((state)=>state.profile)
  console.log(user)
  const [open,setOpen] = useState(false);
  return (
   <div className='w-11/12 m-auto flex flex-col sm:flex-row gap-x-20'>
       
         <Sidebar open={open} setOpen={setOpen}/>
         {
          navigation === 0 &&  <Hero/>
         }
         {
          navigation === 1 &&  <Profile open={open} setOpen={setOpen}/>
         }

         {
          navigation === 2 &&  <AllUsers/>
         }
        
         {
          tab === 0 && <AddTodo/>
         }
         {
          tab === 1 && <UpdateTodo/>

         }


   </div>
  )
}

export default HomePage