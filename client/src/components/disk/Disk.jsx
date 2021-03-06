import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createDir,
    getFiles,
    popupVisable,
    setCurrentDir,
    setView,
    uploadFile,
} from '../../redux/actions/file';
import './Disk.scss';
import FileList from './fileList/FileList';
import Popup from './Popup/Popup';
import Uploader from './uploader/Uploader';
import plateImg from '../../assets/img/Union.svg'
import listImg from '../../assets/img/Vector.svg'

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);
    const dirStack = useSelector((state) => state.files.dirStack);
    const loading = useSelector((state) => state.files.loading);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('type');

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort]);

    const createDirHandler = () => {
        dispatch(popupVisable('flex'));
    };

    const backClickHandler = () => {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    };

    const fileUploadHandler = (e) => {
        const files = [...e.target.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    };

    const dragEnterHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    };

    const dragLeaveHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    };

    const dropHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));

        setDragEnter(false);
    };

    if (loading === true) {
        return (
            <div>
                <div className="lds-dual-ring"></div>
            </div>
        );
    }

    return !dragEnter ? (
        <div
            className="disk"
            onDrop={dropHandler}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}>
            <div className="container">
                <div className="disk__btns">
                    {currentDir && (
                        <button onClick={backClickHandler} className="disk__back">
                            ??????????
                        </button>
                    )}
                    <button onClick={() => createDirHandler()} className="disk__create-dir">
                        ?????????????? ??????????
                    </button>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__label">
                            ?????????????????? ????????
                        </label>
                        <input
                            multiple={true}
                            onChange={(e) => fileUploadHandler(e)}
                            type="file"
                            id="disk__upload-input"
                            className="disk__upload-input"
                        />
                    </div>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="disk__select">
                        <option value="name">???? ??????????</option>
                        <option value="type">???? ????????</option>
                        <option value="date">???? ????????</option>
                    </select>
                    <button onClick={() => dispatch(setView('plate'))} className="disk__plate"> <img src={plateImg} alt="" /> </button>
                    <button onClick={() => dispatch(setView('list'))} className="disk__list"> <img src={listImg} alt="" /> </button>
                </div>
                <FileList />
                <Popup />
                <Uploader />
            </div>
        </div>
    ) : (
        <div
            className="drop-area"
            onDrop={dropHandler}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}>
            <h2>???????????????????? ?????????? ????????</h2>
        </div>
    );
};

export default Disk;
