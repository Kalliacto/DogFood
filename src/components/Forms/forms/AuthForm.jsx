import React, { useContext, useState } from 'react';
import formData from '../../../assets/data/form.json';
import useFormState from '../../../hooks/useFormState';
import Input from '../fields/Input';
import Select from '../fields/Select';
import Textarea from '../fields/Textarea';
import Password from '../fields/Password';
import Image from '../fields/Image';
import '../Form.css';
import { Context } from '../../../context/context';

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
            {fields?.map((el) => {
                const elData = data[el];
                switch (elData.format) {
                    case 'textarea':
                        return <Textarea key={el} name={el} {...elData} state={states[el]} />;
                    case 'select':
                        return <Select key={el} name={el} {...elData} state={states[el]} />;
                    case 'image':
                        return <Image key={el} name={el} {...elData} state={states[el]} />;
                    case 'password':
                        return (
                            <Password
                                key={el}
                                name={el}
                                {...elData}
                                state={states[el]}
                                compare={true}
                                setSimilar={setSimilarPwd}
                                compareRwd={compareRwd}
                            />
                        );
                    default:
                        return <Input key={el} name={el} {...elData} state={states[el]} />;
                }
            })}
            <button type='submit' disabled={compareRwd && !similarPwd} className='form__btn'>
                {btnText}
            </button>
        </form>
    );
};

export default AuthForm;
