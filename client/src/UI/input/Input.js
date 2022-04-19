import React from 'react';
import './Input.scss';

const Input = ({ type, placeholder, value, setValue }) => {
    return (
        <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type={type}
            placeholder={placeholder}
        />
    );
};

export default Input;
