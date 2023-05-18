import './Main.css';
import {InitialPage} from '../InitialPage/InitialPage';
import { AuthPage } from '../AuthPage/AuthPage';

const Main = () => {

    return(
        <main className="main">
            {/* <InitialPage/> */}
            <AuthPage/>
        </main>
    )
}
export {Main};