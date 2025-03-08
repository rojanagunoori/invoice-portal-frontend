import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import axios from "axios";

export const signup = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await API.post("/auth/register", userData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response?.data?.message || "Signup failed");
  }
});


// Async login function
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try{
  const response = await API.post("/auth/login", credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
  }catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data?.message || "Login failed"); // ✅ Return backend error message
  }
});

// Logout function
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false,
    token: localStorage.getItem("token") || null, // Store token in Redux state
    isAuthenticated: !!localStorage.getItem("token"), error: null },
    reducers: {
      logout: (state) => {
        localStorage.removeItem("token");
        state.user = null;
        state.token = null; // Clear token
        state.isAuthenticated = false;
      },
    },
  extraReducers: (builder) => {
    builder
    .addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.role = action.payload.role;  
      state.isAuthenticated = true;
      //state.message=action.message;
    })
    .addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role;  
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(state, action);

        state.loading = false;
        
        state.error =action.payload;// action.error.message;
        
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.role = "";  
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
