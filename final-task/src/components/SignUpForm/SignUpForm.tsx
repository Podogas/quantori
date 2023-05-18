import './SignUpForm.css';

const SignUpForm = () => {

    return (
        <>
            <h3 className='SignUpForm__title'>Sign up</h3>
            <form action="" className='SignUpForm'>
                <label className='SignUpForm__label'>Email</label>
                {/* SignUpForm__input--invalid  SignUpForm__input--valid*/}
                <input className='SignUpForm__input' type="email" placeholder='Enter your email' autoComplete="on"/>
                <p className='SignUpForm__validation-error-message'></p>
                <label className='SignUpForm__label'>Password</label>
                <input className='SignUpForm__input' type="password" placeholder='Enter your password' autoComplete="on"/>
                <p className='SignUpForm__validation-error-message'>dfgd</p>
                <label className='SignUpForm__label'>Repeat Password</label>
                <input className='SignUpForm__input' type="password" placeholder='Enter your password again' autoComplete="on"/>
                <p className='SignUpForm__validation-error-message'></p>
                {/* SignUpForm__button--valid */}
                <p className='SignUpForm__response-error-message SignUpForm__response-error-message--hidden'>Login failed! Please,  check you password and email and try again</p>
                <button className='SignUpForm__button' type='button'>Create Account</button>
            </form>
            <p className='SignUpForm__caption'>Already have an account?  
                <a className='SignUpForm__caption-link'> Login</a>
            </p>
        </>
    )
}

export {SignUpForm};