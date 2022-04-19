import React from 'react';
import './Navbar.scss';
import logo from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/user';

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch()

    return (
        <header className="navbar">
            <div className="container navbar__container">
                <Link to="/">
                    <img className="navbar__logo" src={logo} alt="" />
                    <div className="navbar__header">MERN CLOUD</div>
                </Link>
                {isAuth ? (
                    <div onClick={() => dispatch(logout())} className="navbar__login">Выйти</div>
                ) : (
                    <>
                        <div className="navbar__login">
                            <Link to="login">Войти</Link>
                        </div>
                        <div className="navbar__registration">
                            <Link to="registration">Регистрация</Link>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
