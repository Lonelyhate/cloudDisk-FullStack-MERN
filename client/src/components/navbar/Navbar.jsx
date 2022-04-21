import React, { useState } from 'react';
import './Navbar.scss';
import logo from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/user';
import { getFiles, searchFiles } from '../../redux/actions/file';
import avatarImg from '../../assets/img/avatar.svg';

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const currentDir = useSelector((state) => state.files.currentDir);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const avatar = currentUser.avatar ? `http://localhost:5000/${currentUser.avatar}` : avatarImg;

    const searchHandler = (e) => {
        setSearchName(e.target.value);
        if (searchTimeout != false) {
            clearTimeout(searchTimeout);
        }
        if (e.target.value != '') {
            setSearchTimeout(
                setTimeout(
                    (value) => {
                        dispatch(searchFiles(value));
                    },
                    500,
                    e.target.value,
                ),
            );
        } else {
            dispatch(getFiles(currentDir));
        }
    };

    return (
        <header className="navbar">
            <div className="container navbar__container">
                <Link to="/">
                    <img className="navbar__logo" src={logo} alt="" />
                    <div className="navbar__header">MERN CLOUD</div>
                </Link>
                {isAuth ? (
                    <>
                        <input
                            value={searchName}
                            onChange={(e) => searchHandler(e)}
                            className="navbar__search"
                            type="text"
                            placeholder="Поиск..."
                        />
                        <div onClick={() => dispatch(logout())} className="navbar__login">
                            Выйти
                        </div>
                        <Link to='/profile'>
                            <img className='avatar' src={avatar} alt="Автар.ком" />
                        </Link>
                    </>
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
