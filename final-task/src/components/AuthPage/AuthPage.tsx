import './AuthPage.css';
import {LoginForm} from '../LoginForm/LoginForm';
import {SignUpForm} from '../SignUpForm/SignUpForm';

const AuthPage = () => {

    return (
        <section className='authPopup'>
            {/* <LoginForm/> */}
            <SignUpForm/>
        </section>
    )
}

export {AuthPage};