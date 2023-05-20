import "./App.css"

import { Fragment, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { SearchPage } from './components/SearchPage/SearchPage';
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Main } from './components/Main/Main';
import { auth } from "./utils/FirebaseApp";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
// Fix this routes!!!
  useEffect(()=>{
    if(auth.currentUser){
      setIsLoggedIn(true)
      console.log('logged')
    } else {
      setIsLoggedIn(false)
      console.log('notlogged')
    }
    
  },[isLoggedIn])
  return (
    <Fragment>
      <Routes>
      <Route
        path='/*'
        element={<Main/>}
      />
      <Route
                    path='/search'
                    element={
                      <ProtectedRoute redirect='/auth' condition={isLoggedIn}>
                        <SearchPage/>
                      </ProtectedRoute>
                    }
                />     
      </Routes>            
    </Fragment>
  )
}

export default App


