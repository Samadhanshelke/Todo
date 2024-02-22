import axios from "axios"
import { setTab, setTodos } from "../../slices/todoSlice"


const URL = import.meta.env.VITE_BACKEND_URL

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
             dispatch(getAllTodo(token))
         }
             
        } catch (error) {
           throw new error
        }
    }
}

export function getAllTodo(token){
    return async (dispatch)=>{
      
        try {
            const response = await axios.get(` ${URL}/getAllTodo `,
            {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })
            console.log(response)
            if(response.data.success){
              
                dispatch(setTodos(response.data.AllTodo));
               
             }
             
        } catch (error) {
            // throw new error
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
            }
       
        } catch (error) {
            // throw new error
        }
    }
    
}

export function updateTodo(data,token){
    return async(dispatch)=>{
       console.log(data,"todoapi")
        try {
            const response = await axios.post(`${URL}/updateTodo`,{data}, {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })
            console.log(response ,"ffff")
            if(response.data.success){
                dispatch(getAllTodo(token))
            }
        } catch (error) {
            // throw new error
            console.log(error)
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
                dispatch(getAllTodo(token))
            }
        } catch (error) {
            // throw new error
        }

    }
}