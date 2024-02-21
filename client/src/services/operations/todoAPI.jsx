import axios from "axios"
import { setTab, setTodos } from "../../slices/todoSlice"


export function createTodo(todo,token){
    return async (dispatch)=>{
     
        try {
             const response = await axios.post('http://localhost:3001/createTodo',todo,
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
            const response = await axios.get('http://localhost:3001/getAllTodo',
            {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })
            
            if(response.data.success){
              
                dispatch(setTodos(response.data.AllTodo));
               
             }
             
        } catch (error) {
            throw new error
        }
    }
}

export function changeTodoStatus(id,token){
    return async (dispatch)=>{
        try {
            
            const response = await axios.post('http://localhost:3001/changeTodoStatus',{id},
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

export function updateTodo(data,token){
    return async(dispatch)=>{
       
        try {
            const response = await axios.post('http://localhost:3001/updateTodo',{data}, {
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

export function DeleteTodo(id,token){
    return async(dispatch)=>{
        
        try {
            const response = await axios.post('http://localhost:3001/deleteTodo',{id}, {
                headers: {
                 Authorization: `Bearer ${token}`,
              }
            })
            if(response.data.success){
                dispatch(setTab(null))
                dispatch(getAllTodo(token))
            }
        } catch (error) {
            throw new error
        }

    }
}