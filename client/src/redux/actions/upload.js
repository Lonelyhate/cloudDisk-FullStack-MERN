import { ADD_UPLOAD_FILE, CHANGE_UPLOAD_FILE, HIDE_UPLOADER, REMOVE_UPLOAD_FILE, SHOW_UPLOADER } from '../reducers/uploadReducer';

export const showUploader = () => {
    return dispatch => {
        dispatch({type: SHOW_UPLOADER})
    }
};

export const hideUploader = () => {
    return (dispatch) => {
        dispatch({
            type: HIDE_UPLOADER,
        });
    };
};

export const addUploadFile = (file) => {
    return dispatch => {
        dispatch({
            type: ADD_UPLOAD_FILE,
            payload: file
        })
    }
}

export const removeUploadFile = (fileId) => {
    return dispatch => {
        dispatch({
            type: REMOVE_UPLOAD_FILE,
            payload: fileId
        })
    }
}

export const changeUploadFile = (files) => {
    return dispatch => {
        dispatch({
            type: CHANGE_UPLOAD_FILE,
            payload: files
        })
    }
}