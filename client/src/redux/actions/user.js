import axios from 'axios';
import { LOGOUT, SET_USER } from '../reducers/userReducer';

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/registration`, {
            email,
            password,
        });
        alert(response.data.message);
    } catch (e) {
        alert(e.response.data.message);
    }
};

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/login`, {
                email,
                password,
            });
            dispatch({
                type: SET_USER,
                payload: response.data,
            });
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            alert(e.response.data.message);
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LOGOUT,
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const auth = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch({
                type: SET_USER,
                payload: response.data,
            });
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            
            localStorage.removeItem('token');
        }
    };
};
