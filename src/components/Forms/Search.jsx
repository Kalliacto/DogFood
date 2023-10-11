import React, { useEffect, useState } from 'react';
import './Form.css';

const Search = ({ type = 'main', setState, attr }) => {
    const [text, setText] = useState('');

    const handleClear = () => {
        setText('');
    };

    useEffect(() => {
        if (setState) {
            setState(text);
        }
    }, [text]);

    return (
        <div className='form__row form__row_search'>
            <input
                type='text'
                className='form__inp'
                value={text}
                onChange={(e) => setText(e.target.value)}
                {...attr}
            />
            {text ? (
                <button className='form__icon'>
                    <i className='lni lni-close' onClick={handleClear}></i>
                </button>
            ) : (
                <button className='form__icon'>
                    <i className='lni lni-search-alt'></i>
                </button>
            )}
        </div>
    );
    // TODO: добавить поиск выдачу if type = 'main'
};

export default Search;
