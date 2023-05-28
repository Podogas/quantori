import "./NotFoundPage.css";
import { useAppSelector } from "../../store/store";
import {Header} from '../Header/Header';
import { useNavigate } from 'react-router-dom';
const NotFoundPage = () => {
    console.log('what?')
    const isAuth = useAppSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();
    if(isAuth){
        return(
            <>
                <Header/>
                <div className="not-found">
                    <h1 className="not-found__title">404</h1>
                    <p className="not-found__description">Page not found</p>
                    <button className="not-found__button" onClick={()=> {navigate('/search')}} type="button">Back to Search</button>
                </div>
            </>    
        )
    } else {
        return(
            <div className="not-found">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__description">Page not found</p>
                <button className="not-found__button" onClick={()=> {navigate('/')}} type="button">Back to Main</button>
            </div>
        )
    }
}
export {NotFoundPage}