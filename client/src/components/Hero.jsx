import { FaPlus } from "react-icons/fa"
import {useDispatch, useSelector} from 'react-redux'
import { setTab } from "../slices/todoSlice"
import { useEffect } from "react"
import { getAllTodo } from "../services/operations/todoAPI"
import AllTodo from "./AllTodo"
const Hero = () => {
  const dispatch = useDispatch()
  const {token} = useSelector((state)=>state.auth)
  useEffect(()=>{
    dispatch(getAllTodo(token))

  },[dispatch,token])
  
  const {Todos} = useSelector((state)=>state.todo)
 

  const handleAddTodo = ()=>{
      dispatch(setTab(0))
  }
  return (
    <div  className="flex w-full   sm:w-[50vw] flex-col  gap-x-16 mt-4 pt-4">
          <h1 className="text-4xl font-bold mb-6">TODOS</h1>
          <div className="p-2 text-[#505050] ps-4 border">
             <span className="flex gap-x-2 items-center cursor-pointer" onClick={handleAddTodo}><FaPlus/> Add New Task</span>        
          </div>

          {
            Todos?.length === 0 ? <h1 className="text-3xl font-bold mt-10">No Todo Found</h1>
            : <AllTodo todos={Todos}/>                         
          }
          

    </div>
  )
}

export default Hero