import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAvatar, uploadAvatar } from '../../redux/actions/user';
import './Profile.scss';

const Profile = () => {
    const dispatch = useDispatch()
    const uploadAvatarHandler = (e) => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
        
    }
    return (
        <div>
            <button onClick={() => dispatch(deleteAvatar())} >Удалить автар</button>
            <input accept='image/*' onChange={e => uploadAvatarHandler(e)} type='file' placeholder='загрузить автар' ></input>
        </div>
    );
};

export default Profile;
