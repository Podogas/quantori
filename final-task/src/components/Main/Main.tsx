import './Main.css';
import { Route, Routes } from "react-router-dom";
import {InitialPage} from '../InitialPage/InitialPage';

import { AuthPage } from '../AuthPage/AuthPage';

const Main = () => {

    return(
        <main className="main">
            <Routes>
                <Route
                    path='/'
                    element={
                        <InitialPage/>}
                />
                 <Route
                    path='/auth'
                    element={<AuthPage/>}
                />
            </Routes>
            {/*  */}
        </main>
    )
}
export {Main};