import React, { useState } from 'react';
import '../Form.css';

const Tag = ({ name, label, attr, state }) => {
    // TODO: сделать другую реализацию тегов,когда изначально это пустая строка, в боди получать строки и их в массив
    const [val, setVal] = useState('');
    const stops = [' ', ',', ';'];

    const tagsHandler = (e) => {
        let text = e.target.value;
        if (stops.includes(text[text.length - 1])) {
            text = text.slice(0, -1).toLowerCase();
            if (text) {
                state[1]((prev) => (!prev.includes(text) ? [...prev, text] : prev));
            }
            setVal('');
        } else {
            setVal(text);
        }
    };

    const blurHandler = (e) => {
        let text = e.target.value.toLowerCase();
        if (text) {
            state[1]((prev) => (!prev.includes(text) ? [...prev, text] : prev));
        }
        setVal('');
    };
    const delTag = (tag) => {
        state[1]((prev) => prev.filter((el) => el !== tag));
    };

    return (
        <div className='form__row'>
            <label className='form__lbl' htmlFor={name}>
                {label}
                {attr?.required && (
                    <>
                        &nbsp;<span className='form__lbl_req'>*</span>
                    </>
                )}
            </label>
            <input
                className='form__inp'
                id={name}
                {...attr}
                value={val}
                onChange={tagsHandler}
                onBlur={blurHandler}
            />
            <div className='form__tags'>
                {state[0].map((el) => (
                    <button
                        type='button'
                        key={el}
                        className='form__link form__tag'
                        onClick={() => delTag(el)}
                    >
                        {el}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tag;
