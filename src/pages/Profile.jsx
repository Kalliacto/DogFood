import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import Link from '../components/Navigate/Link';
import { Context } from '../context/context';
import { useNavigate } from 'react-router';
import Preloader from '../components/Preloader/Preloader';
import UserInfo from '../components/UserInfo/userInfo';

const Profile = () => {
    const navigate = useNavigate();
    const { setUserId, userId, api } = useContext(Context);
    const [userInfo, setUserInfo] = useState({});
    const logout = () => {
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-id');
        setUserId('');
        navigate('/');
    };

    useEffect(() => {
        api.getUser(userId)
            .then((data) => setUserInfo(data))
            .catch((err) => console.log(err));
    }, [userId]);

    return (
        <Layout>
            <h1>Личный кабинет</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button className='profile_btn' onClick={logout}>
                    Выйти
                </button>
                <Link
                    path={'/product/add'}
                    title='Добавить'
                    imgType='icon'
                    imgPath='lni lni-plus'
                />
            </div>
            {Object.keys(userInfo).length ? (
                <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
            ) : (
                <Preloader />
            )}
        </Layout>
    );
};

export { Profile };
