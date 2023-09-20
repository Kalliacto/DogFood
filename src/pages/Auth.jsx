import React, { useContext, useState } from 'react';
import Layout from '../components/Layout/Layout';
import Form from '../components/Forms/Form';
import '../components/Forms/Form.css';
import { Context } from '../context/context';
import { useNavigate } from 'react-router';

const Auth = () => {
    const [index, setIndex] = useState(0);
    const types = ['login', 'signup', 'getToken', 'updPwd'];
    const nameTitle = ['Войти', 'Зарегестрироваться', 'Получить токен', 'Обновить пароль'];
    const { api, setUserId } = useContext(Context);
    const navigate = useNavigate();

    const authHandler = (data) => {
        api.login(data)
            .then((data) => {
                localStorage.setItem('user-token', data.token);
                localStorage.setItem('user-id', data.data._id);
                setUserId(data.data._id);
                navigate('/profile');
            })
            .catch((err) => {
                window.alert(err.message);
            });
    };

    const regHandler = (data) => {
        data.group = 'group-11';
        api.signup(data)
            .then((res) => {
                authHandler({ email: res.email, password: data?.password });
            })
            .catch((err) => {
                window.alert(err.message);
                setIndex(0);
            });
    };

    const tokenHandler = (data) => {
        console.log(data);
        api.forgotPwd(data)
            .then((res) => {
                window.alert(res.message);
                if (res) {
                    setIndex(3);
                }
            })
            .catch((err) => {
                window.alert(err.message);
            });
    };
    const passwordHandler = (data) => {
        api.resetPwd(data)
            .then((res) => {
                if (data) {
                    localStorage.setItem('user-token', data.token);
                    localStorage.setItem('user-id', data.data._id);
                    setUserId(data.data._id);
                    navigate('/profile');
                    window.alert('Пароль успешно изменен!');
                }
            })
            .catch((err) => {
                window.alert(err.message);
            });
    };

    const handlers = [authHandler, regHandler, tokenHandler, passwordHandler];

    return (
        <Layout>
            <div className='form__wrapper'>
                <h1>{nameTitle[index]}</h1>
                <Form type={'auth'} fieldsType={types[index]} cb={handlers[index]} />
                <div className='form__links'>
                    {index !== 0 && (
                        <button className='form__link' onClick={() => setIndex(0)}>
                            Войти
                        </button>
                    )}
                    {index !== 1 && (
                        <button className='form__link' onClick={() => setIndex(1)}>
                            Зарегестрироваться
                        </button>
                    )}
                    {index !== 2 && index !== 3 && (
                        <button className='form__link' onClick={() => setIndex(2)}>
                            Восстановить пароль
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export { Auth };
