export const SHOW_UPLOADER = 'SHOW_UPLOADER';
export const HIDE_UPLOADER = 'HIDE_UPLOADER';
export const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE';
export const REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE';
export const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE';

const defaultState = {
    isVisable: false,
    files: [],
};

export default function uploadReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_UPLOADER:
            return {
                ...state,
                isVisable: true,
            };

        case HIDE_UPLOADER:
            return {
                ...state,
                isVisable: false,
            };

        case ADD_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files, { ...action.payload}],
            };
        case REMOVE_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files.filter((file) => file.id != action.payload)],
            };
        case CHANGE_UPLOAD_FILE:
            return {
                ...state,
                files: [
                    ...state.files.map((file) =>
                        file.id == action.payload.id
                            ? { ...file, progress: action.payload.progress }
                            : { ...file },
                    ),
                ],
            };
        default:
            return state;
    }
}
