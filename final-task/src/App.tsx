import "./App.css"

import { Fragment, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { SearchPage } from './components/SearchPage/SearchPage';
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import {InitialPage} from './components/InitialPage/InitialPage';
import { AuthPage } from './components/AuthPage/AuthPage';
import { ProteinPage } from "./components/ProteinPage/ProteinPage";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./store/store";
import { auth } from "./utils/FirebaseApp";
import { setUser } from "./store/features/userSlice";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";
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
          path='/'
          element={
            <ProtectedRoute redirect='/search' condition={!user.isAuth}>
              <InitialPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/auth'
          element={
            <ProtectedRoute redirect='/search' condition={!user.isAuth}>
              <AuthPage/>
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
        <Route
          path='/proteins/*'
          element={
          <ProtectedRoute redirect='/auth' condition={user.isAuth}>
            <ProteinPage/>
          </ProtectedRoute>
          }
        />
        <Route
          path="/not-found"
          element={<NotFoundPage/>}
        />  
        <Route
          path="/*"
          element={<Navigate to={'/not-found'} replace/>}
        />                 
      </Routes> 
}
                 
    </Fragment>
  )
}

export default App


