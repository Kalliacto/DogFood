import React, { useContext } from 'react';
import Layout from '../components/Layout/Layout';
import Link from '../components/Navigate/Link';
import { Context } from '../context/context';
import { useNavigate } from 'react-router';

const Profile = (props) => {
    const navigate = useNavigate();
    const { setUserId } = useContext(Context);
    const logout = () => {
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-id');
        setUserId('');
        navigate('/');
    };

    return (
        <Layout>
            <h1>Личный кабинет</h1>
            <div>
                <button onClick={logout}>Выйти</button>
                <Link
                    path={'/product/add'}
                    title='Добавить'
                    imgType='icon'
                    imgPath='lni lni-plus'
                />
            </div>
        </Layout>
    );
};

export { Profile };
