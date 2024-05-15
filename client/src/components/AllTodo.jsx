import { useDispatch, useSelector } from "react-redux"
import {IoIosArrowForward } from "react-icons/io";
import { changeTodoStatus } from "../services/operations/todoAPI";
import { setSingleTodo, setTab, setTodos } from "../slices/todoSlice";


function AllTodo({todos:Todos}) {
    // const {Todos} = useSelector((state)=>state.todo)
    const {token} = useSelector((state)=>state.auth)
    
    const dispatch = useDispatch() 

    const handleTodoComplete = (e,todo) => {
        e.stopPropagation(); 

       dispatch(setTab(null))
        dispatch(changeTodoStatus(todo._id,token));
        
        const newTodos = Todos.map((t)=>{
            if(t._id === todo._id){
                t.isCompleted = !t.isCompleted
            }
            return { ...t, isCompleted: !t.isCompleted };
        });
        setTodos(newTodos);
    };

   const handleChangeTab = (todo)=>{
  
       dispatch(setSingleTodo(todo))
    dispatch(setTab(1))
   
   }
   
  

  return (
     <div className="flex flex-col gap-y-2 mt-6">
     {
        Todos?.length && Todos?.map((todo,i)=>{
                return(
                    <div key={i} className="flex text-[#505050] items-center justify-between  border w-full py-2 px-2" onClick={()=>handleChangeTab(todo)}>
                       <div className="flex items-center justify-center gap-x-2 ">
                             <input type="checkbox"
                               checked={todo.isCompleted}
                               onChange={(e)=>handleTodoComplete(e,todo)}
                               className="cursor-pointer"
                              />
                             <h1>{todo.Title}</h1>
                             {
                                todo.isCompleted ? 
                             <span className="text-[10px] font-bold bg-green-700 text-white px-2 rounded-md">Completed</span>
                             : <span className="text-[10px] font-bold bg-green-700 text-white px-2 rounded-md">Pending</span>

                             }
                       </div>
                        <IoIosArrowForward/>
                    
                    </div>
                )
            })
        }
     </div>  
  )
}

export default AllTodo