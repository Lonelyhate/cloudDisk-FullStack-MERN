import React from 'react';
import { useSelector } from 'react-redux';
import File from './file/File';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './FileList.scss';

const FileList = () => {
    const files = useSelector((state) => state.files.files);

    if(files.length === 0) {
        return <div className='notFound'>Файлы не найдены</div>
    }

    return (
        <div className="file-list">
            <div className="file-list__header">
                <div className="file-list__name">Название</div>
                <div className="file-list__date">Дата</div>
                <div className="file-list__size">Размер</div>
            </div>
            <TransitionGroup>
                {files.map((file) => (
                    <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false} >
                        <File file={file} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default FileList;
