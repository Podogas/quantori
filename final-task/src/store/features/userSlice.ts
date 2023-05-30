import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  uid: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        const { email, uid } = action.payload;
        state.email = email;
        state.uid = uid;
        state.isLoggedIn = true;
      } else {
        state.email = "";
        state.uid = "";
        state.isLoggedIn = false;
      }
    },
  },
});

const { setUser } = userSlice.actions;

export { userSlice, setUser };
