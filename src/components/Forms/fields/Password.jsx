import React, { useEffect, useState } from 'react';
import Input from './Input';

const Password = ({ name, label, attr, state, compare = false, setSimilar, compareRwd }) => {
    const pwd = useState('');

    useEffect(() => {
        if (pwd[0].length) {
            setSimilar(pwd[0] === state[0]);
        }
    }, [pwd[0], state[0]]);

    return (
        <>
            <Input name={name} label={label} attr={attr} state={state} />
            {compareRwd && (
                <Input
                    name='pwd'
                    label='Повторите пароль'
                    attr={{ type: 'password', required: true }}
                    state={pwd}
                />
            )}
        </>
    );
};

export default Password;
