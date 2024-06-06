import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    allUser:[],
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setAllUser(state, action) {
            state.allUser = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
          },
    },
});

export const {setUser, setLoading,setAllUser} = profileSlice.actions;
export default profileSlice.reducer;