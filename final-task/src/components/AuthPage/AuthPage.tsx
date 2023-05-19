import './AuthPage.css';
import {useState} from 'react';
import {LoginForm} from '../LoginForm/LoginForm';
import {SignUpForm} from '../SignUpForm/SignUpForm';

const AuthPage = () => {
    const [formToShow, setFormToShow] = useState('login');
    return (
        <section className='authPopup'>
            {formToShow === 'login' 
                ? <LoginForm setFormToShow={setFormToShow}/> 
                : <SignUpForm setFormToShow={setFormToShow}/>
            }    
        </section>
    )
}

export {AuthPage};