import axios from "axios"
import { setTab, setTodos } from "../../slices/todoSlice"
import toast from "react-hot-toast"
import { setAllUser } from "../../slices/profileSlice"


const URL = import.meta.env.VITE_BACKEND_URL
// const URL = 'http://localhost:3001'


export function createTodo(todo,token){
    return async (dispatch)=>{
     
        try {
             const response = await axios.post(`${URL}/createTodo`,todo,
             {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })

         if(response.data.success){
            toast.success("Created SuccessFully")
             dispatch(getAllTodo(token))

         }else{
            toast.error(response.data.message)
         }
             
        } catch (error) {
            toast.error('something went wrong')
        }
    }
}

export function getAllTodo(token){
    return async (dispatch)=>{
      
        try {
            const response = await axios.get(`${URL}/getAllTodo`,
            {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })
         
            if(response.data.success){ 

               dispatch(setTodos(response.data.AllTodo));     
             }else{
                toast.error(response.data.message)
             }
             
        } catch (error) {
            toast.error('something went wrong')
        }
    }
}

export function changeTodoStatus(id,token){
    return async (dispatch)=>{
        try {
            
            const response = await axios.post(`${URL}/changeTodoStatus`,{id},
            {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })
          
            if(response.data.success){
                dispatch(getAllTodo(token))
            }else{
                toast.error(response.data.message)
             }
       
        } catch (error) {
            toast.error('something went wrong')
        }
    }
    
}

export function updateTodo(data,token){
    return async(dispatch)=>{
     
        try {
            const response = await axios.post(`${URL}/updateTodo`,{data}, {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })
           
            if(response.data.success){
                toast.success(response.data.message)
                dispatch(getAllTodo(token))
            }else{
                toast.error(response.data.message)
             }
        } catch (error) {
            toast.error('something went wrong')
        }

    }
}

export function DeleteTodo(id,token){
    return async(dispatch)=>{
        
        try {
            const response = await axios.post(`${URL}/deleteTodo`,{id}, {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })
            if(response.data.success){
                dispatch(setTab(null))
                toast.success(response.data.message)
                dispatch(getAllTodo(token))
            }
        } catch (error) {
            toast.error('something went wrong')
        }

    }
}

export function getAllUser(token){
    return async (dispatch)=>{
      
        try {
            const response = await axios.get(` ${URL}/getAllUser`,
            {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })
         
            if(response.data.success){ 

               dispatch(setAllUser(response.data.AllUser));     
             }else{
                toast.error(response.data.message)
             }
             
        } catch (error) {
            toast.error('something went wrong')
        }
    }
}

export function ChangeAccess(id,token){
    return async(dispatch)=>{
     
        try {
            const response = await axios.post(`${URL}/changeAccess`,{id}, {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })
           
            if(response.data.success){
                toast.success(response.data.message)
                dispatch(getAllUser(token))
            }else{
                toast.error(response.data.message)
             }
        } catch (error) {
            toast.error('something went wrong')
        }

    }
}