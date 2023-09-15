import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Form from '../components/Forms/Form';
import '../components/Forms/Form.css';

const Auth = (props) => {
    const [index, setIndex] = useState(0);
    const types = ['login', 'signup', 'getToken', 'updPwd'];
    const nameTitle = ['Войти', 'Зарегестрироваться', 'Получить токен', 'Обновить пароль'];
    const authHandler = () => {};
    const regHandler = () => {};
    const tokenHandler = () => {
        setIndex(3);
    };
    const passwordHandler = () => {};
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
