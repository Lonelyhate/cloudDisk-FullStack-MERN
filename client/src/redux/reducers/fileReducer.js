export const SET_FILES = 'SET_FILES'
export const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
export const ADD_FILE = 'ADD_FILE'
export const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY'
export const PUSH_TO_STACK = 'PUSH_TO_STACK'
export const POP_FROM_STACK = 'POP_FROM_STACK'
export const DELETE_FILE = 'DELETE_FILE'

const defaultState = {
    files: [],
    currentDir: null,
    popupDisplay: 'none',
    dirStack: []
}

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload
            }
        case ADD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        case PUSH_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }
        case SET_POPUP_DISPLAY:
            return {
                ...state, 
                popupDisplay: action.payload
            }
        case DELETE_FILE:
            return {
                ...state,
                files: [...state.files.filter(file => file._id != action.payload)]
            }
        default: 
            return state
    }
}