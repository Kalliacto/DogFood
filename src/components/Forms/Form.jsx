import React from 'react';
import Input from './fields/Input';
import Search from './Search';
import Select from './fields/Select';
import Textarea from './fields/Textarea';
import Image from './fields/Image';
import formData from '../../assets/data/form.json';
import './Form.css';
import useFormState from '../../hooks/useFormState';

// TODO: компонент с чекбокс
// TODO: компонент с тегами
// TODO: компонент для проверки пароля

const Form = () => {
    const type = 'user';
    const names = ['email', 'name', 'about', 'avatar', 'password', 'passwordAccept'];
    // const type = 'product';
    // const names = ['name', 'price', 'discount', 'pictures', 'description'];
    const states = useFormState(type)();

    const handlerSubmit = (e) => {
        e.preventDefault();
        const body = {};
        names.forEach((el) => {
            body[el] = states[el][0];
        });
        console.log(body);
    };

    return (
        <form onSubmit={handlerSubmit} className='form'>
            {names.map((el) => {
                const elData = formData[type][el];
                switch (elData.format) {
                    case 'textarea':
                        return <Textarea key={el} name={el} {...elData} state={states[el]} />;
                    case 'select':
                        return <Select key={el} name={el} {...elData} state={states[el]} />;
                    case 'image':
                        return <Image key={el} name={el} {...elData} state={states[el]} />;
                    default:
                        return <Input key={el} name={el} {...elData} state={states[el]} />;
                }
            })}
            <button type='submit'>Отправить</button>
        </form>
    );
};

export { Input, Search, Select, Textarea };
export default Form;
