import "./AuthPage.css";
import { useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";

const AuthPage = () => {
  const [formToShow, setFormToShow] = useState("login");
  return (
    <div className="authPage__wrapper">
      <section className="authPage__popup">
        {formToShow === "login" ? (
          <LoginForm setFormToShow={setFormToShow} />
        ) : (
          <SignUpForm setFormToShow={setFormToShow} />
        )}
      </section>
    </div>
  );
};

export { AuthPage };
