import React, { useEffect } from 'react';
import './Form.css';

const Search = ({ type = 'main', setSearch, attr, search = '' }) => {
    const handleClear = () => {
        setSearch('');
    };

    useEffect(() => {
        if (setSearch) {
            setSearch(search);
        }
    }, [search]);

    return (
        <div className='form__row form__row_search'>
            <input
                type='text'
                className='form__inp'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                {...attr}
            />
            {search ? (
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
