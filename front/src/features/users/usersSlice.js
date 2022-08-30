import {createSlice,createAsyncThunk,} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = { 
    loggedStatus: false,
    authStatus:false,
    userInfo: {},
    error:null,
    loading:true
    

};

export const register = createAsyncThunk("api/register", async (data) => {
    const response = await axios.post("http://localhost:8080/api/register", data);
    return response.data;
});

export const login = createAsyncThunk("api/login", async (data) => {
    const response = await axios.post("http://localhost:8080/api/login", data,{withCredentials:true}
    );
    return response.data;
});


export const auth = createAsyncThunk("api/auth", async () => {
    const response = await axios.post("http://localhost:8080/api/auth");
    return response.data;
});

export const logout = createAsyncThunk("api/logout", async () => {
    const response = await axios.post("http://localhost:8080/api/logout");
    return response.data;
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(register.fulfilled, (state,action) => {
                state.userInfo=action.payload;
            })
            
            .addCase(login.fulfilled,(state,action)=>{
                state.userInfo=action.payload;
                state.loggedStatus = true;
            })
            // eslint-disable-next-line no-unused-vars
            .addCase(auth.fulfilled,(state,action)=>
            {
                state.authStatus=true;
                state.loading=false;
            })
            // eslint-disable-next-line no-unused-vars
            .addCase(logout.fulfilled,(state,action)=>
            {
                state.authStatus=false;
                state.loggedStatus=false;
                state.userInfo={};
            });
    },
});


export const getUsersLoggedStatus = (state) => state.users.loggedStatus;
export const getUsersAuthStatus = (state) => state.users.authStatus;
export const getUsersLoading = (state) => state.users.loading;


export default userSlice.reducer;