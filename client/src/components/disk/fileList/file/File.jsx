import React from 'react';
import './File.scss';
import { useDispatch, useSelector } from 'react-redux';
import dirImg from '../../../../assets/img/dir.svg';
import fileImg from '../../../../assets/img/file.svg';
import { deleteFile, downloadFile, pushToStack, setCurrentDir } from '../../../../redux/actions/file';
import DownloadImg from '../../../../assets/img/download.svg';
import DeleteImg from '../../../../assets/img/delete.svg';
import sizeFormat from '../../../../utils/sizeFormat';

const File = ({ file }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);

    const openDirHandler = (type) => {
        if (type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    };

    const downloadClickHandler = (e) => {
        e.stopPropagation()
        downloadFile(file)
    }

    const deleteClickHandler = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    return (
        <div onClick={() => openDirHandler(file.type)} className="file">
            <img src={file.type === 'dir' ? dirImg : fileImg} alt="" />
            <h4 className="file__name">{file.name}</h4>
            <span className="file__date">{file.date.slice(0, 10)}</span>
            <span className="file__size">{sizeFormat(file.size)}</span>
            {file.type !== 'dir' && (
                <button onClick={(e) => downloadClickHandler(e)} className="file__download">
                    <img src={DownloadImg} alt="Скачать" />
                </button>
            )}
            <button onClick={(e) => deleteClickHandler(e)} className="file__delete">
                <img src={DeleteImg} alt="Удалить" />
            </button>
        </div>
    );
};

export default File;
