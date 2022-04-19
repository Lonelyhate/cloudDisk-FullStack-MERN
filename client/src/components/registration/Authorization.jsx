import React, { useState } from 'react';
import Input from '../../UI/input/Input';
import './Authorization.scss';

const Authorization = ({title, requestFunc, btnTitle}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="authorization">
            <h2 className="authorization__title">{title}</h2>
            <Input
                value={email}
                setValue={setEmail}
                type="text"
                placeholder="Введите адрес электронной почты..."
            />
            <Input
                value={password}
                setValue={setPassword}
                type="password"
                placeholder="Введите пароль..."
            />
            <button onClick={() => requestFunc(email, password)} className="authorization__btn">{btnTitle}</button>
        </div>
    );
};

export default Authorization;
