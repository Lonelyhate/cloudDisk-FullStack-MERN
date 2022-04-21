import Navbar from './components/navbar/Navbar';
import './app.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Authorization from './components/registration/Authorization';
import { auth, login, registration } from './redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Disk from './components/disk/Disk';
import Profile from './components/profile/Profile';

function App() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, []);

    const loginFunc = (log, password) => {
        dispatch(login(log, password));
    };

    return (
        <div className="App">
            <Navbar />
            <Routes>
                {!isAuth ? (
                    <>
                        <Route
                            path="/registration"
                            element={
                                <Authorization
                                    title="Регистрация"
                                    requestFunc={registration}
                                    btnTitle="Зарегистрироваться"
                                />
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <Authorization
                                    title="Вход"
                                    requestFunc={loginFunc}
                                    btnTitle="Войти"
                                />
                            }
                        />
                        <Route path="*" element={<Navigate replace to="/login" />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Disk />} />
                        <Route path='/profile' element={<Profile/>} />
                        <Route path="*" element={<Navigate replace to="/" />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
