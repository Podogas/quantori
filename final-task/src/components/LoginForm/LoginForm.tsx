import './LoginForm.css';
import {useRef, useState} from 'react';
import { Login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({setFormToShow}:{setFormToShow:(string:string)=>void}) => {

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passInputRef = useRef<HTMLInputElement>(null);
    const [isEmailInputValid, setIsEmailInputValid] = useState(false);
    const [isPassInputValid, setIsPassInputValid] = useState(false);
    const [isEmailErrorShown, setIsEmailErrorShown] = useState(false);
    const [isPassErrorShown, setIsPassErrorShown] = useState(false);
    const [isFormResponseError, setIsFormResponseError] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const navigate = useNavigate();


    //refactoring zone

    // TODO mb create functions that returns related error messages. Refactor ugly ternary operators in jsx.
    const onLoginClick = () => {
        console.log('SIGN-UP')
        if(emailInputRef.current && passInputRef.current){
            const emailValue = emailInputRef.current.value;
            const passValue = passInputRef.current.value;
            Login(emailValue, passValue)
            .then(res => {
                console.log(res)
                navigate('/search')
            })
            .catch(err => {
                console.log(err.code)
                    setIsFormResponseError(true);
            })
        }
        
    }
    const validateEmail = () => {
        if(emailInputRef.current){
            const emailValue = emailInputRef.current.value;
            if(emailRegex.test(emailValue)){
                setIsEmailInputValid(true);
                setIsEmailErrorShown(false);
               } else {
                setIsEmailInputValid(false);
                setIsEmailErrorShown(true);
               }
        }
        if(isFormResponseError){
            setIsFormResponseError(false)
        }
    }
    const validatePass = () => {
        if(passInputRef.current) {
            const passValue = passInputRef.current.value;
           if(passRegex.test(passValue)){
            setIsPassInputValid(true);
            setIsPassErrorShown(false);
           } else {
            setIsPassInputValid(false);
            setIsPassErrorShown(true);
           }
        }
        if(isFormResponseError){
            setIsFormResponseError(false)
        }
    }
    return (
        <>
            <h3 className='loginForm__title'>Login</h3>
            
            <form action="" className='loginForm'>
                <label className='loginForm__label'>Email</label>
                <input 
                    className={
                        `loginForm__input 
                        ${isEmailErrorShown 
                            ? 'loginForm__input--invalid' 
                            : ''}
                        ${isEmailInputValid ? 'loginForm__input--valid' : ''}        
                        `}
                    onChange={validateEmail} 
                    ref={emailInputRef} 
                    type="email" 
                    placeholder='Enter your email' 
                    autoComplete="on"
                />
                <p className='loginForm__validation-error-message'>{
                    isEmailErrorShown ? 'Please enter an valid email address' : ''
                }</p>
                <label className='loginForm__label'>Password</label>
                <input className={
                        `loginForm__input 
                        ${isPassErrorShown 
                            ? 'loginForm__input--invalid' 
                            : ''}
                        ${isPassInputValid ? 'loginForm__input--valid' : ''}    
                        `}
                        onChange={validatePass} 
                        ref={passInputRef} 
                        type="password" 
                        placeholder='Enter your password' 
                        autoComplete="on" 
                        required 
                        min="6"
                />
                <p className={`loginForm__validation-error-message
                    ${isFormResponseError ? 'loginForm__validation-error-message--hidden' : ''}
                    `}>
                    {isPassErrorShown ? 'Min 6 chars long, contain number, upper&lower case char' : ''}
                </p>
                <p className={`
                    loginForm__response-error-message
                    ${isFormResponseError ? '' : 'loginForm__response-error-message--hidden'}
                `}>
                    Login failed! Please,  check you password and email and try again
                </p>
                <button 
                    className={
                        `loginForm__button 
                        ${ isEmailInputValid&&isPassInputValid ? 'loginForm__button--valid' : ''}
                        `} 
                    type='button'
                    disabled={isEmailInputValid&&isPassInputValid? false : true}
                    onClick={onLoginClick}
                    >Login</button>
            </form>
            <p className='loginForm__caption'>Don’t have an account? 
                <a onClick={() => {setFormToShow('sign-up')}} className='loginForm__caption-link'> Sign up</a>
            </p>
        </>
    )
}

export {LoginForm};

