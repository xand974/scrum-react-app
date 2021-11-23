import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: auth.currentUser,
    pending: false,
    error: false,
    searchUsers: [],
  },
  reducers: {
    loginStart: (state) => {
      state.pending = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.pending = false;
    },
    loginFailure: (state) => {
      state.error = true;
      state.pending = false;
    },
    registerStart: (state) => {
      state.pending = true;
    },
    registerSuccess: (state) => {
      state.pending = false;
    },
    registerFailure: (state) => {
      state.error = true;
      state.pending = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.pending = false;
      state.searchUsers = [];
    },
  },
});

export default userSlice.reducer;
export const {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  logoutSuccess,
  logoutFailure,
  logoutStart,
  getSearchUsersFailure,
  getSearchUsersStart,
  getSearchUsersSuccess,
  getUserFriendsSuccess,
  addFriend,
  removeFriend,
} = userSlice.actions;
