import React, { useState } from 'react';
import formData from '../../../assets/data/form.json';
import useFormState from '../../../hooks/useFormState';
import '../Form.css';
import { renderTags } from '../utils';

const AuthForm = ({ fields, btnText, compareRwd = false, cb = () => {} }) => {
    const data = formData.user;
    const states = useFormState('user')();
    const [similarPwd, setSimilarPwd] = useState(false);

    const formHandler = (e) => {
        e.preventDefault();
        const body = {};
        fields.forEach((el) => {
            body[el] = states[el][0];
        });
        cb(body);
    };

    return (
        <form onSubmit={formHandler} className='form form_auth'>
            {renderTags(fields, data, states, compareRwd, setSimilarPwd)}
            <button type='submit' disabled={compareRwd && !similarPwd} className='form__btn'>
                {btnText}
            </button>
        </form>
    );
};

export default AuthForm;
