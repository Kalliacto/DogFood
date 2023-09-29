import React from 'react';
import Input from './fields/Input';
import Select from './fields/Select';
import Textarea from './fields/Textarea';
import Password from './fields/Password';
import Search from './Search';
import AuthForm from './forms/AuthForm';
import Image from './fields/Image';
import './Form.css';
import ProductForm from './forms/ProductForm';
import ReviewForm from './forms/ReviewForm';
import Switch from './fields/Switch';
import Tag from './fields/Tag';

// TODO: компонент с чекбокс
// TODO: компонент с тегами

const Form = ({ type, fieldsType, cb = () => {} }) => {
    const authFields = ['email', 'password'];
    const reqFields = ['email', 'name', 'avatar', 'about', 'password'];
    const pwdFields = ['email', 'token', 'password'];
    const productFields = [
        'name',
        'pictures',
        'price',
        'discount',
        'stock',
        'wight',
        'description',
        'tags',
        'available',
        'isPublished',
    ];
    const reviewFields = ['rating', 'text'];

    return (
        <>
            {type === 'auth' && (
                <>
                    {fieldsType === 'login' && (
                        <AuthForm
                            fields={authFields}
                            btnText={'Войти'}
                            compareRwd={false}
                            cb={cb}
                        />
                    )}
                    {fieldsType === 'signup' && (
                        <AuthForm
                            fields={reqFields}
                            compareRwd={true}
                            btnText={'Зарегестрироваться'}
                            cb={cb}
                        />
                    )}
                    {fieldsType === 'getToken' && (
                        <AuthForm
                            fields={pwdFields.slice(0, 1)}
                            btnText={'Получить токен'}
                            cb={cb}
                        />
                    )}
                    {fieldsType === 'updPwd' && (
                        <AuthForm
                            fields={pwdFields.slice(1)}
                            compareRwd={true}
                            btnText={'Обновить пароль'}
                            cb={cb}
                        />
                    )}
                </>
            )}
            {type === 'product' && (
                <ProductForm fields={productFields} btnText='Добавить товар' cb={cb} />
            )}
            {type === 'review' && <ReviewForm />}
        </>
    );
};

export {
    Input,
    Search,
    Select,
    Textarea,
    Image,
    Password,
    AuthForm,
    ReviewForm,
    ProductForm,
    Switch,
    Tag,
};
export default Form;
