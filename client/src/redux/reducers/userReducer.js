export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const USER_LOADING = 'USER_LOADING'

const defaultState = {
    currentUser: {},
    isAuth: false,
    loading: false
}

export default function userReducer(state = defaultState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true,
                loading: false
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }            
        default:
            return state
    }
}