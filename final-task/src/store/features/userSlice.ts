import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../utils/FirebaseApp";
const initialState = {
    email: '',
    uid: '',
    isLoggedIn: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload, 'slice')
      if(action.payload){
        const { email, uid } = action.payload;
        state.email = email;
        state.uid = uid;
        state.isLoggedIn = true
      } else {
        state.email = '';
        state.uid = '';
        state.isLoggedIn = false
      }
      
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