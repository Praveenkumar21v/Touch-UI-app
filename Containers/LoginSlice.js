import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await axios.post(
      "https://touchapp.in/auth/login",
      credentials
    );
    localStorage.setItem("token", response.data.data.token);
    console.log(response.data.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});



const LoginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loginloading: false,
    loginerror: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginloading = true;
        state.loginerror = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginloading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginloading = false;
        state.loginerror = action.payload;
      })
  },
});

export default LoginSlice.reducer;
