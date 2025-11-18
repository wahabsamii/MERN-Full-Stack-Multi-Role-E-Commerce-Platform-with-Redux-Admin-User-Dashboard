import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// Initial state
const initialState = {
  user: getStoredUser(),
  isLoading: !!getStoredUser(),
  isAuth: false,
  isError: false,
  message: "",
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isError = false;
      state.message = "";
    },
    UpdateUser: (state, action) => {
      state.user = action.payload;
    },
    signOutSuccess: (state) => {
      state.user = null;
      state.isAuth = false;
      state.isError = false;
      state.message = "";
    },
    setError: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetState: (state) => {
      state.user = null;
      state.isAuth = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
});

export const { signInSuccess, signOutSuccess, setError, setLoading, resetState, UpdateUser } = authSlice.actions;
export default authSlice.reducer;
