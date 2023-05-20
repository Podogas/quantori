import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../utils/FirebaseApp";
const initialState = {
    isAuth: false,
    email: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, isAuth } = action.payload;
      state.isAuth = isAuth;
      state.email = email;
    }
}
});

const {
  setUser,
} = userSlice.actions;

export {
  userSlice,
  setUser,
};