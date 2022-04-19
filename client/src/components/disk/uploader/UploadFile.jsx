import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUploadFile } from '../../../redux/actions/upload';
import './Uploader.scss';

const UploadFile = ({ file }) => {
    const dispatch = useDispatch()


    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <h4 className="upload-file__name">{file.name}</h4>
                <button onClick={() => dispatch(removeUploadFile(file.id))} className="upload-file__remove uploader__close">X</button>
            </div>
            <div className="upload-file__progress-bar">
                <div
                    style={{ width: file.progress + '%' }}
                    className="upload-file__upload-bar"></div>
                <span className="upload-file__percent">{file.progress}%</span>
            </div>
        </div>
    );
};

export default UploadFile;
