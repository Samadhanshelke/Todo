import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tab:null,
    Todos:[],
    Loading:true,
    singleTodo:null,
    navigation:0
}

const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        setTab(state,action){
            state.tab = action.payload;
        },
        setTodos(state,action){
            state.Todos = action.payload;
        },
        setLoading(state,action){
            state.Loading = action.payload
        },
        setSingleTodo(state,action){
            state.singleTodo=action.payload
        },
        setNavigation(state,action){
            state.navigation = action.payload
        }
    }
})

export const {setTab,setTodos,setLoading,setSingleTodo,setNavigation} = todoSlice.actions
export default todoSlice.reducer