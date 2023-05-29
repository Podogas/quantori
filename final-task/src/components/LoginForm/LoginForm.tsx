import "./LoginForm.css";
import { useRef, useState } from "react";
import { Login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/features/userSlice";

const LoginForm = ({
  setFormToShow,
}: {
  setFormToShow: (string: string) => void;
}) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passInputRef = useRef<HTMLInputElement>(null);
  const [isEmailInputValid, setIsEmailInputValid] = useState(false);
  const [isPassInputValid, setIsPassInputValid] = useState(false);
  const [isEmailErrorShown, setIsEmailErrorShown] = useState(false);
  const [isPassErrorShown, setIsPassErrorShown] = useState(false);
  const [isFormResponseError, setIsFormResponseError] = useState(false);
  const [formResponseError, setFormResponseError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //refactoring zone

  // TODO mb create functions that returns related error messages. Refactor ugly ternary operators in jsx.
  const onLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailInputRef.current && passInputRef.current) {
      const emailValue = emailInputRef.current.value;
      const passValue = passInputRef.current.value;
      Login(emailValue, passValue)
        .then((res) => {
          console.log(res);
          dispatch(setUser(res));
          navigate("/search");
        })
        .catch((err) => {
          if (err.code === "auth/user-not-found") {
            setFormResponseError("This E-mail is already in use");
          } else {
            setFormResponseError(
              "Login failed! Please,  check you password and email and try again"
            );
            setIsFormResponseError(true);
          }
        });
    }
  };
  const validateEmail = () => {
    if (emailInputRef.current) {
      const emailValue = emailInputRef.current.value;
      if (emailRegex.test(emailValue)) {
        setIsEmailInputValid(true);
        setIsEmailErrorShown(false);
      } else {
        setIsEmailInputValid(false);
        setIsEmailErrorShown(true);
      }
    }
    if (isFormResponseError) {
      setIsFormResponseError(false);
    }
  };
  const validatePass = () => {
    if (passInputRef.current) {
      const passValue = passInputRef.current.value;
      if (passRegex.test(passValue)) {
        setIsPassInputValid(true);
        setIsPassErrorShown(false);
      } else {
        setIsPassInputValid(false);
        setIsPassErrorShown(true);
      }
    }
    if (isFormResponseError) {
      setIsFormResponseError(false);
    }
  };
  return (
    <>
      <h3 className="loginForm__title">Login</h3>

      <form action="" className="loginForm" onSubmit={onLoginSubmit}>
        <label className="loginForm__label">Email</label>
        <input
          className={`loginForm__input 
                        ${isEmailErrorShown ? "loginForm__input--invalid" : ""}
                        ${
                          isEmailInputValid ? "loginForm__input--valid" : ""
                        }        
                        `}
          onChange={validateEmail}
          ref={emailInputRef}
          type="email"
          placeholder="Enter your email"
          autoComplete="on"
        />
        <p className="loginForm__validation-error-message">
          {isEmailErrorShown ? "Please enter an valid email address" : ""}
        </p>
        <label className="loginForm__label">Password</label>
        <input
          className={`loginForm__input 
                        ${isPassErrorShown ? "loginForm__input--invalid" : ""}
                        ${isPassInputValid ? "loginForm__input--valid" : ""}    
                        `}
          onChange={validatePass}
          ref={passInputRef}
          type="password"
          placeholder="Enter your password"
          autoComplete="on"
          required
          min="6"
        />
        <p
          className={`loginForm__validation-error-message
                    ${
                      isFormResponseError
                        ? "loginForm__validation-error-message--hidden"
                        : ""
                    }
                    `}
        >
          {isPassErrorShown
            ? "Min 6 chars long, contain number, upper&lower case char"
            : ""}
        </p>
        <p
          className={`
                    loginForm__response-error-message
                    ${
                      isFormResponseError
                        ? ""
                        : "loginForm__response-error-message--hidden"
                    }
                `}
        >
          {formResponseError}
        </p>
        <button
          className={`loginForm__button 
                        ${
                          isEmailInputValid && isPassInputValid
                            ? "loginForm__button--valid"
                            : ""
                        }
                        `}
          type="submit"
          disabled={isEmailInputValid && isPassInputValid ? false : true}
        >
          Login
        </button>
      </form>
      <p className="loginForm__caption">
        Don’t have an account?
        <a
          onClick={() => {
            setFormToShow("sign-up");
          }}
          className="loginForm__caption-link"
        >
          {" "}
          Sign up
        </a>
      </p>
    </>
  );
};

export { LoginForm };
