import './Header.css';
import { auth } from "../../utils/FirebaseApp";
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../api/auth';
import { useAppDispatch, useAppSelector } from "../../store/store";
const Header = () => {
//change <a> 
const email = useAppSelector((state) => state.user.email);
const navigate = useNavigate();
const onLogoutClick = () => {
    console.log('123');
    Logout().then(() => {
        console.log('signedout')
        navigate('/')
      }).catch((error) => {
        console.log(error, 'ERROR WHILE SIGNOUT')
        // An error happened.
      });
}    
return (
        <header className="header">
            <span className="header__user-email">{email}</span>
            <a className="header__logout" onClick={onLogoutClick}>Log out</a>
        </header>
    )
}

export {Header}