import "./SignUpForm.css";
import { useRef, useState } from "react";
import { SignUp } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/features/userSlice";

const SignUpForm = ({
  setFormToShow,
}: {
  setFormToShow: (string: string) => void;
}) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passInputRef = useRef<HTMLInputElement>(null);
  const passRepeatInputRef = useRef<HTMLInputElement>(null);
  const [isEmailInputValid, setIsEmailInputValid] = useState(false);
  const [isPassInputValid, setIsPassInputValid] = useState(false);
  const [isPassRepeatInputValid, setIsPassRepeatInputValid] = useState(false);
  const [isEmailErrorShown, setIsEmailErrorShown] = useState(false);
  const [isPassErrorShown, setIsPassErrorShown] = useState(false);
  const [isPassRepeatErrorShown, setIsPassRepeatErrorShown] = useState(false);
  const [isFormResponseError, setIsFormResponseError] = useState(false);
  const [formResponseError, setFormResponseError] = useState("");
  const [isInitialBtnState, setIsInitialBtnState] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailInputRef.current && passInputRef.current) {
      const emailValue = emailInputRef.current.value;
      const passValue = passInputRef.current.value;
      SignUp(emailValue, passValue)
        .then((res) => {
          dispatch(setUser(res));
          navigate("/search");
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            setFormResponseError("This Email already in use!");
            setIsEmailErrorShown(true);
          } else {
            setFormResponseError("Something went wrong");
          }
          setIsInitialBtnState(true);
          setIsEmailInputValid(false);
          setIsFormResponseError(true);
        });
    }
  };
  const validateEmail = () => {
    setIsInitialBtnState(false);
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
    if (formResponseError !== "") {
      setFormResponseError("");
      setIsFormResponseError(false);
    }
  };
  const validatePass = () => {
    setIsInitialBtnState(false);
    if (passInputRef.current) {
      const passValue = passInputRef.current.value;
      if (passRegex.test(passValue)) {
        setIsPassInputValid(true);
        setIsPassErrorShown(false);
        validateRepeatPass();
      } else {
        setIsPassInputValid(false);
        setIsPassErrorShown(true);
      }
    }
  };
  const validateRepeatPass = () => {
    setIsInitialBtnState(false);
    if (passInputRef.current && passRepeatInputRef.current) {
      const passValue = passInputRef.current.value;
      const passRepeatValue = passRepeatInputRef.current.value;
      if (passValue !== passRepeatValue) {
        setIsPassRepeatInputValid(false);
        setIsPassRepeatErrorShown(true);
      } else {
        setIsPassRepeatInputValid(true);
        setIsPassRepeatErrorShown(false);
      }
    }
  };
  return (
    <>
      <h3 className="SignUpForm__title">Sign up</h3>
      <form action="" className="SignUpForm" onSubmit={onSignUpSubmit}>
        <label className="SignUpForm__label">Email</label>
        <input
          className={`SignUpForm__input 
                    ${isEmailErrorShown ? "SignUpForm__input--invalid" : ""} 
                    ${isEmailInputValid ? "SignUpForm__input--valid" : ""}
                    `}
          type="email"
          placeholder="Enter your email"
          autoComplete="on"
          ref={emailInputRef}
          onChange={validateEmail}
        />
        <p className="SignUpForm__validation-error-message">
          {isEmailErrorShown ? "Please enter an valid email address" : ""}
        </p>
        <label className="SignUpForm__label">Password</label>
        <input
          className={`SignUpForm__input 
                        ${isPassErrorShown ? "SignUpForm__input--invalid" : ""} 
                        ${isPassInputValid ? "SignUpForm__input--valid" : ""}
                        `}
          type="password"
          placeholder="Enter your password"
          autoComplete="on"
          min="6"
          required
          ref={passInputRef}
          onChange={validatePass}
        />
        <p className="SignUpForm__validation-error-message">
          {isPassErrorShown
            ? "Min 6 chars long, contain number, upper&lower case char"
            : ""}
        </p>
        <label className="SignUpForm__label">Repeat Password</label>
        <input
          className={`SignUpForm__input 
                        ${
                          isPassRepeatErrorShown
                            ? "SignUpForm__input--invalid"
                            : ""
                        } 
                        ${
                          isPassRepeatInputValid
                            ? "SignUpForm__input--valid"
                            : ""
                        }
                        `}
          type="password"
          placeholder="Enter your password again"
          autoComplete="on"
          required
          min="6"
          ref={passRepeatInputRef}
          onChange={validateRepeatPass}
        />
        <p
          className={`
                    SignUpForm__validation-error-message
                    ${
                      isFormResponseError
                        ? "SignUpForm__validation-error-message--hidden"
                        : ""
                    }
                    `}
        >
          {isPassRepeatErrorShown ? "Passwords do not match" : ""}
        </p>
        <p
          className={`
                    SignUpForm__response-error-message
                    ${
                      isFormResponseError
                        ? ""
                        : "SignUpForm__response-error-message--hidden"
                    }
                    `}
        >
          {formResponseError}
        </p>
        <button
          className={`
                        SignUpForm__button
                        ${
                          isInitialBtnState
                            ? ""
                            : isEmailInputValid &&
                              isPassInputValid &&
                              isPassRepeatInputValid
                            ? "SignUpForm__button--valid"
                            : "SignUpForm__button--invalid"
                        }
                    `}
          type="submit"
          disabled={
            isEmailInputValid && isPassInputValid && isPassRepeatInputValid
              ? false
              : true
          }
        >
          Create Account
        </button>
      </form>
      <p className="SignUpForm__caption">
        Already have an account?
        <a
          onClick={() => {
            setFormToShow("login");
          }}
          className="SignUpForm__caption-link"
        >
          {" "}
          Login
        </a>
      </p>
    </>
  );
};

export { SignUpForm };
