import axios from 'axios';
import {
    ADD_FILE,
    DELETE_FILE,
    PUSH_TO_STACK,
    SET_CURRENT_DIR,
    SET_FILES,
    SET_POPUP_DISPLAY,
} from '../reducers/fileReducer';
import { addUploadFile, changeUploadFile, showUploader } from './upload';

export const getFiles = (dirId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                },
            );
            dispatch({
                type: SET_FILES,
                payload: response.data,
            });
        } catch (e) {
            alert(e.response.data.message);
        }
    };
};

export const createDir = (dirId, name) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/files',
                {
                    name,
                    parent: dirId,
                    type: 'dir',
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                },
            );
            dispatch({
                type: ADD_FILE,
                payload: response.data,
            });
        } catch (e) {
            alert(e.response.data.message);
        }
    };
};

export const popupVisable = (display) => {
    return (dispatch) => {
        dispatch({
            type: SET_POPUP_DISPLAY,
            payload: display,
        });
    };
};

export const setCurrentDir = (dir) => {
    return (dispatch) => {
        dispatch({
            type: SET_CURRENT_DIR,
            payload: dir,
        });
    };
};

export const pushToStack = (dir) => {
    return (dispatch) => {
        dispatch({
            type: PUSH_TO_STACK,
            payload: dir,
        });
    };
};

export const uploadFile = (file, dirId) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId);
            }
            const uploadFile = { name: file.name, progress: 0, id: Date.now() };
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
                headers: { Authorization: `bearer ${localStorage.getItem('token')}` },
                onUploadProgress: (progressEvent) => {
                    const totalLength = progressEvent.lengthComputable
                        ? progressEvent.total
                        : progressEvent.target.getResponseHeader('content-length') ||
                          progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
                        dispatch(changeUploadFile(uploadFile))
                    }
                },
            });
            dispatch({
                type: ADD_FILE,
                payload: response.data,
            });
        } catch (e) {
            alert(e.response.data.message);
        }
    };
};

export const downloadFile = async (file) => {
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`,
        },
    });

    if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
};

export const deleteFile = (file) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            dispatch({
                type: DELETE_FILE,
                payload: file._id,
            });
            alert(response.data.message);
        } catch (e) {
            alert(e?.response?.data?.message);
        }
    };
};
