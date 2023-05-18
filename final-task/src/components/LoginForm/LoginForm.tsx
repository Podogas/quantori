import './LoginForm.css';

const LoginForm = () => {

    return (
        <>
            <h3 className='loginForm__title'>Login</h3>
            <form action="" className='loginForm'>
                <label className='loginForm__label'>Email</label>
                {/* loginForm__input--invalid  loginForm__input--valid*/}
                <input className='loginForm__input' type="email" placeholder='Enter your email' autoComplete="on"/>
                <p className='loginForm__validation-error-message'></p>
                <label className='loginForm__label'>Password</label>
                <input className='loginForm__input' type="password" placeholder='Enter your password' autoComplete="on"/>
                <p className='loginForm__validation-error-message'>dfgd</p>
                {/* loginForm__button--valid */}
                <p className='loginForm__response-error-message loginForm__response-error-message--hidden'>Login failed! Please,  check you password and email and try again</p>
                <button className='loginForm__button' type='button'>Login</button>
            </form>
            <p className='loginForm__caption'>Don’t have an account? 
                <a className='loginForm__caption-link'> Sign up</a>
            </p>
        </>
    )
}

export {LoginForm};