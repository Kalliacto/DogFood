import React, { useContext, useEffect, useState } from 'react';
import './UserInfo.css';
import { Context } from '../../context/context';
import Layout from '../Layout/Layout';
import Form from '../Forms/Form';

const UserInfo = ({ userInfo, setUserInfo }) => {
    const [formActive, setFormActive] = useState(false);
    const { api } = useContext(Context);

    const handlerChangesSave = (body) => {
        if (body.avatar !== userInfo?.avatar && body.avatar !== '') {
            api.updateProfileAvatar({ avatar: body.avatar }).then((data) => {
                setUserInfo(data);
            });
        }
        api.updateProfile({ name: body.name, about: body.about }).then((data) => {
            setUserInfo(data);
        });
        setFormActive(!formActive);
    };

    return (
        <div className='profile__container'>
            <div className='profile__info'>
                <div className='avatar__wrap'>
                    <img src={userInfo?.avatar} alt='avatar' className='avatar__img' />
                </div>
                <div className='profile__info_detail'>
                    <p className='profile__name'>{userInfo.name}</p>
                    <span className='profile__contact'>{userInfo.about}</span>
                    <span className='profile__contact'>{userInfo.email}</span>
                </div>
            </div>
            <button onClick={() => setFormActive(!formActive)} className='profile_btn'>
                Изменить
            </button>
            <div style={{ marginTop: '3rem' }}>
                {formActive && (
                    <Layout>
                        <h2>Изменить данные</h2>
                        <Form type={'userInfo'} cb={handlerChangesSave} setUserInfo={setUserInfo} />
                    </Layout>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
