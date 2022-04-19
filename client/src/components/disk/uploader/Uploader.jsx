import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { hideUploader } from '../../../redux/actions/upload';
import './Uploader.scss';
import UploadFile from './UploadFile';

const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisable = useSelector(state => state.upload.isVisable)
    const dispatch = useDispatch()

    return ( isVisable &&
        <div className="uploader">
            <div className="uploader__header">
                <h3 className="uploader__title">Загрузка...</h3>
                <button onClick={() => dispatch(hideUploader())} className="uploader__close">Х</button>
            </div>
            {files.map(file => (
                <UploadFile key={file.id} file={file} />
            ))}
        </div>
    );
};

export default Uploader;
