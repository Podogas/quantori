import "./App.css"

import { Fragment, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { SearchPage } from './components/SearchPage/SearchPage';
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Main } from './components/Main/Main';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./store/store";
import { auth } from "./utils/FirebaseApp";
import { setUser } from "./store/features/userSlice";
const App = () => {


  const [isAuthPending, setIsAuthPending] = useState(true);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userObj = {
        email: user.email,
        isAuth: true
      }
      dispatch(setUser(userObj));
    } else {
      const userObj = {
        email: '',
        isAuth: false
      }
      dispatch(setUser(userObj));
    }
    setIsAuthPending(false);
  });
  return (
    <Fragment>
      {isAuthPending ? null :
      <Routes>
      <Route
                    path='/*'
                    element={
                      <ProtectedRoute redirect='/search' condition={!user.isAuth}>
                        <Main/>
                      </ProtectedRoute>
                    }
                />  
      <Route
                    path='/search'
                    element={
                      <ProtectedRoute redirect='/auth' condition={user.isAuth}>
                        <SearchPage/>
                      </ProtectedRoute>
                    }
                />     
      </Routes> 
}
                 
    </Fragment>
  )
}

export default App


