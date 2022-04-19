import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir, popupVisable } from '../../../redux/actions/file';
import Input from '../../../UI/input/Input';
import './Popup.scss';

const Popup = () => {
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()
    const closePopup = () => {
        dispatch(popupVisable('none'))
    }
    const createDirClick = () => {
        dispatch(createDir(currentDir, dirName))
        closePopup()
        setDirName('')
    }

    return (
        <div onClick={closePopup} className="popup" style={{display: popupDisplay}}>
            <div onClick={e => e.stopPropagation()} className="popup__content">
                <div className="popup__header">
                    <h2 className="popup__title">Создать новую папку</h2>
                    <button onClick={closePopup} className="popup__close">X</button>
                </div>
                <Input
                    placeholder="Введите название папки"
                    setValue={setDirName}
                    value={dirName}
                    type="text"
                />
                <button onClick={createDirClick} className="popup__create">Создать</button>
            </div>
        </div>
    );
};

export default Popup;
