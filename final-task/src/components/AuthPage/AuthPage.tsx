import './AuthPage.css';
import {LoginForm} from '../LoginForm/LoginForm';

const AuthPage = () => {

    return (
        <section className='authPopup'>
            <LoginForm/>
        </section>
    )
}

export {AuthPage};