import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import fileReducer from './reducers/fileReducer'
import uploadReducer from './reducers/uploadReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))