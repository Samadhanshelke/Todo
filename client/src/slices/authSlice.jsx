import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  uuid:localStorage.getItem("uuid") ? JSON.parse(localStorage.getItem("uuid")) : null
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUuid(state,action){
      state.uuid = action.payload
    }
  },
});

export const { setSignupData, setLoading, setToken,setUuid } = authSlice.actions;

export default authSlice.reducer;