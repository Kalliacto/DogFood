import React, { useEffect, useState, useContext } from 'react';
import './Form.css';
import { Context } from '../../context/context';
import UtilsCnt from '../../context/utils';
import { useNavigate } from 'react-router';

const Search = ({ type = 'single', setSearch, attr, search = '' }) => {
    const [text, setText] = useState('');
    const [filterText, setFilterText] = useState([]);
    const [filterTags, setFilterTags] = useState([]);
    const [filterAuthors, setFilterAuthors] = useState([]);
    const navigate = useNavigate();
    const { products } = useContext(Context);
    const { filterProducts, sortProducts, getUniqueTag, getUniqueAuthors } = useContext(UtilsCnt);

    const searchHandler = (e) => {
        const value = e.target.value;
        setText(value);

        if (value.length && value[0] === '#') {
            setFilterTags(
                getUniqueTag(products)
                    .filter((el) => {
                        const reg = new RegExp(value.slice(1), 'i');
                        return reg.test(el);
                    })
                    .sort()
            );
            setFilterText([]);
            setFilterAuthors([]);
        }
        if (value.length && value[0] !== '#') {
            setFilterText(sortProducts(filterProducts(products).byText(value).data).byName().data);
            setFilterTags(
                getUniqueTag(products)
                    .filter((el) => {
                        const reg = new RegExp(value, 'i');
                        return reg.test(el);
                    })
                    .sort()
            );
            setFilterAuthors(
                getUniqueAuthors(products)
                    .filter((el) => {
                        const reg = new RegExp(value, 'i');
                        return reg.test(el.name);
                    })
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
            );
        }
        if (value.length === 0) {
            setFilterText([]);
            setFilterAuthors([]);
            setFilterTags([]);
        }
    };

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
            {type === 'single' && (
                <>
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
                </>
            )}
            {type === 'main' && (
                <>
                    <input
                        type='text'
                        className='form__inp'
                        value={text}
                        onChange={searchHandler}
                        {...attr}
                    />
                    {text ? (
                        <button className='form__icon'>
                            <i className='lni lni-close' onClick={() => setText('')}></i>
                        </button>
                    ) : (
                        <button className='form__icon'>
                            <i className='lni lni-search-alt'></i>
                        </button>
                    )}
                    {text && (
                        <div className='search__panel'>
                            {!filterText.length && !filterTags.length && !filterAuthors.length && (
                                <span>
                                    По запросу <b>{text}</b> ничего не найдено
                                </span>
                            )}
                            {!!filterText.length && (
                                <div className='search__block search__block_text'>
                                    <h4 className='search__title'>Похожие товары</h4>
                                    {filterText.map((el) => (
                                        <span
                                            className='search__row'
                                            key={el._id}
                                            onClick={() => navigate(`/products/${el._id}`)}
                                        >
                                            {el.name.length > 30
                                                ? el.name.slice(0, 30) + '...'
                                                : el.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {/* TODO: Переход на страницу автора */}
                            {!!filterAuthors.length && (
                                <div className='search__block'>
                                    <h4 className='search__title'>Поставщики</h4>
                                    {filterAuthors.map((el) => (
                                        <span
                                            className='search__row'
                                            key={el._id}
                                            onClick={() => {
                                                setText('');
                                                navigate('/');
                                            }}
                                        >
                                            {el.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {!!filterTags.length && (
                                <div className='search__block'>
                                    <h4 className='search__title'>Теги</h4>
                                    {filterTags.map((el) => (
                                        <div
                                            className='search__row'
                                            key={el}
                                            onClick={() => navigate(`/products/category/${el}`)}
                                        >
                                            {el}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
    // TODO: добавить поиск выдачу if type = 'main'
};

export default Search;
