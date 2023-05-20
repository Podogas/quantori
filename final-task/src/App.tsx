import "./App.css"

import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { SearchPage } from './components/SearchPage/SearchPage';

import { Main } from './components/Main/Main';
const App = () => {
// Fix this routes!!!
  return (
    <Fragment>
      <Routes>
      <Route
        path='/*'
        element={<Main/>}
      />
      
      <Route
                    path='/search'
                    element={<SearchPage/>}
                />
      </Routes>            
    </Fragment>
  )
}

export default App


