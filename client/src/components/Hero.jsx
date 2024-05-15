import { FaPlus } from "react-icons/fa"
import {useDispatch, useSelector} from 'react-redux'
import { setTab } from "../slices/todoSlice"
import { useEffect, useState } from "react"
import { getAllTodo } from "../services/operations/todoAPI"
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import AllTodo from "./AllTodo"
const Hero = () => {
  const dispatch = useDispatch()
  const {token} = useSelector((state)=>state.auth)
  const [sortBy, setSortBy] = useState("");
  const [sortedTodo,setSortedTodo] = useState(null)
const [search,setSearch] = useState("")
const [currentPage, setCurrentPage] = useState(1);

const PAGE_SIZE = 5;

  useEffect(()=>{
    dispatch(getAllTodo(token))

  },[dispatch,token])
  
  const {Todos} = useSelector((state)=>state.todo)
 

  const handleAddTodo = ()=>{
      dispatch(setTab(0))
  }

  useEffect(()=>{
    if(sortBy === ""){
      setSortedTodo(Todos)
    }

  },[Todos,sortBy])

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
     console.log(e.target.value)
    // Sort Todos array based on the selected option
    if (e.target.value === "A-Z") {
      const todos = [...Todos].sort((a, b) => a.Title.localeCompare(b.Title));
      setSortedTodo(todos)
      console.log("sortedtodos",todos)
      
    } else if (e.target.value === "Z-A") {
      const todos = [...Todos].sort((a, b) => b.Title.localeCompare(a.Title));
        setSortedTodo(todos)
      console.log("sortedtodos",todos)
    }
    else if (e.target.value === "Completed") {
      const todos = [...Todos].sort((a, b) => b.isCompleted - a.isCompleted);
      setSortedTodo(todos)
    } 
    else if (e.target.value === "Pending") {
      const todos = [...Todos].sort((a, b) => a.isCompleted - b.isCompleted);
      setSortedTodo(todos)
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    // Filter Todos based on the search query
    const filteredTodos =Todos.filter((todo) =>
      todo.Title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSortedTodo(filteredTodos);
  };

  useEffect(() => {
    // Update sortedTodos whenever currentPage or Todos change
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    setSortedTodo(Todos.slice(startIndex, endIndex));
  }, [currentPage, Todos]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(Todos.length / PAGE_SIZE))
    );
  };

  return (
    <div  className="flex w-full   sm:w-[50vw] flex-col  gap-x-16 mt-4 pt-4">
          <h1 className="text-4xl font-bold mb-6">TODOS</h1>
          <section className="flex justify-end gap-4 items-center mb-4 w-full">
              <div>
                <input type="text" value={search} onChange={handleSearch} placeholder="Search Here" className="border focus:outline-none p-2 rounded-md"/>
              </div>
              <div className="gap-2 flex items-center justify-center">
              Sort By: 
              <select 
                value={sortBy}
                onChange={handleSortChange} 
                className=" border rounded-md p-2 pe-4 focus:outline-none">
                <option value=''>Select</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
                <option value='Completed'>Completed</option>
                <option value='Pending'>Pending</option>
              </select>

              </div>

          </section>
          <div className="p-2 text-[#505050] ps-4 border">
             <span className="flex gap-x-2 items-center cursor-pointer" onClick={handleAddTodo}><FaPlus/> Add New Task</span>        
          </div>

          {
            sortedTodo?.length === 0 ? <h1 className="text-3xl font-bold mt-10">No Todo Found</h1>
            : <AllTodo todos={sortedTodo}/>                         
          }
          
          <div className="flex justify-end items-center gap-x-2 mt-4">
          <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`mx-1 py-2 px-4 rounded-md ${
            currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-blue-500 text-white"
          }`}
        >
          <GoArrowLeft/>
         
        </button>
        {[...Array(Math.ceil(Todos.length / PAGE_SIZE)).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`mx-1 py-2 px-4 rounded-md ${
              page + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(Todos.length / PAGE_SIZE)}
          className={`mx-1 py-2 px-4 rounded-md ${
            currentPage === Math.ceil(Todos.length / PAGE_SIZE)
              ? "bg-gray-200 text-gray-400"
              : "bg-blue-500 text-white"
          }`}
        >
        <GoArrowRight/>
        
        </button>
      </div>

    </div>
  )
}

export default Hero