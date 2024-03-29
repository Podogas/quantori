import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../api/auth";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setUser } from "../../store/features/userSlice";
const Header = () => {
  const email = useAppSelector((state) => state.user.email);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onLogoutClick = () => {
    Logout()
      .then(() => {
        dispatch(setUser(undefined));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <header className="header">
      <span className="header__user-email">{email}</span>
      <a className="header__logout" onClick={onLogoutClick}>
        Log out
      </a>
    </header>
  );
};

export { Header };
