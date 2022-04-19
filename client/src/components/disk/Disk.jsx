import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createDir,
    getFiles,
    popupVisable,
    setCurrentDir,
    uploadFile,
} from '../../redux/actions/file';
import './Disk.scss';
import FileList from './fileList/FileList';
import Popup from './Popup/Popup';
import Uploader from './uploader/Uploader';

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);
    const dirStack = useSelector((state) => state.files.dirStack);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('type')

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
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));

        setDragEnter(false)
    }

    return !dragEnter ? (
        <div className="disk" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="container">
                <div className="disk__btns">
                    {currentDir && (
                        <button onClick={backClickHandler} className="disk__back">
                            Назад
                        </button>
                    )}
                    <button onClick={() => createDirHandler()} className="disk__create-dir">
                        Создать папку
                    </button>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__label">
                            Загрузить файл
                        </label>
                        <input
                            multiple={true}
                            onChange={(e) => fileUploadHandler(e)}
                            type="file"
                            id="disk__upload-input"
                            className="disk__upload-input"
                        />
                    </div>
                    <select value={sort} onChange={e => setSort(e.target.value)} className='disk__select'>
                        <option value='name' >По имени</option>
                        <option value='type' >По типу</option>
                        <option value='date' >По дате</option>
                    </select>
                </div>
                <FileList />
                <Popup />
                <Uploader/>
            </div>
        </div>
    ) : (
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <h2>Перетащите файлы сюда</h2>
        </div>
    );
};

export default Disk;
