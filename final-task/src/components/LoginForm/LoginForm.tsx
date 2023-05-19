import './LoginForm.css';
import {useRef, useState} from 'react';

const LoginForm = ({setFormToShow}:{setFormToShow:(string:string)=>void}) => {

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passInputRef = useRef<HTMLInputElement>(null);
    const [isEmailInputValid, setIsEmailInputValid] = useState(false);
    const [isPassInputValid, setIsPassInputValid] = useState(false);
    const [isEmailErrorShown, setIsEmailErrorShown] = useState(false);
    const [isPassErrorShown, setIsPassErrorShown] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    // TODO mb create functions that returns related error messages. Refactor ugly ternary operators in jsx.
    const login = () => {
        console.log('LOGIN')
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
                <p className='loginForm__validation-error-message'>{
                    isPassErrorShown ? 'Min 6 chars long, contain number, upper&lower case char' : ''
                }</p>
                <p className='loginForm__response-error-message loginForm__response-error-message--hidden'>Login failed! Please,  check you password and email and try again</p>
                <button 
                    className={
                        `loginForm__button 
                        ${ isEmailInputValid&&isPassInputValid ? 'loginForm__button--valid' : ''}
                        `} 
                    type='button'
                    disabled={isEmailInputValid&&isPassInputValid? false : true}
                    onClick={login}
                    >Login</button>
            </form>
            <p className='loginForm__caption'>Don’t have an account? 
                <a onClick={() => {setFormToShow('sign-up')}} className='loginForm__caption-link'> Sign up</a>
            </p>
        </>
    )
}

export {LoginForm};

