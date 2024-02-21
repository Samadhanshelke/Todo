import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '../slices/profileSlice'
import authReducer from '../slices/authSlice'
import todoReducer from '../slices/todoSlice'
export const store = configureStore({
  reducer: {
    profile:profileReducer,
    auth:authReducer,
    todo:todoReducer
  },
})