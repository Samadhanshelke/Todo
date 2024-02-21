import { useSelector } from "react-redux"
import Hero from "../components/Hero"
import Sidebar from "../components/Sidebar"
import AddTodo from "../components/AddTodo"
import UpdateTodo from "../components/UpdateTodo"
import Profile from "../components/Profile"



const HomePage = () => {
  const {tab,navigation} =  useSelector((state)=>state.todo)
  return (
   <div className='w-11/12 m-auto flex flex-col sm:flex-row gap-x-20'>
     
         <Sidebar/>
         {
          navigation === 0 &&  <Hero/>
         }
         {
          navigation === 1 &&  <Profile/>
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