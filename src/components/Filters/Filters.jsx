import React, { useContext, useState, useEffect } from 'react';
import './Filters.css';
import UtilCtx from '../../context/utils';
import { Input, Search, Switch } from '../Forms/Form';

// TODO: исправить баг с полем выбрать цену
const Filters = ({ goods, filterGoods, setFilterGoods }) => {
    const { filterProducts, getUniqueTag, getUniqueAuthors, setPrice } = useContext(UtilCtx);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [max, setMax] = useState(0);
    const [min, setMin] = useState(0);
    const [search, setSearch] = useState('');
    const [filterMin, setFilterMin] = useState(min);
    const [filterMax, setFilterMax] = useState(max);
    const [filterTags, setFilterTags] = useState([]);
    const [filterAuthors, setFilterAuthors] = useState([]);
    const [filterAvailable, setFilterAvailable] = useState(false);
    const [filterDiscount, setFilterDiscount] = useState(false);
    const [filterReviews, setFilterReviews] = useState(false);
    const [filterLikes, setFilterLikes] = useState(false);

    const tagsHandler = (tag) => {
        setFilterTags((state) =>
            state.includes(tag) ? state.filter((el) => el !== tag) : [...state, tag]
        );
    };
    const authorsHandler = (id) => {
        setFilterAuthors((state) =>
            state.includes(id) ? state.filter((el) => el !== id) : [...state, id]
        );
    };

    const clearFilters = () => {
        setFilterTags([]);
        setFilterAuthors([]);
        setFilterMin(min);
        setFilterMax(max);
        setSearch('');
        setFilterAvailable(false);
        setFilterReviews(false);
        setFilterLikes(false);
        setFilterDiscount(false);
    };

    useEffect(() => {
        if (goods.length) {
            setAuthors(getUniqueAuthors(goods));
            setTags(getUniqueTag(goods));
            setMin(Math.min(...filterGoods.map((el) => setPrice(el))));
            setMax(Math.max(...filterGoods.map((el) => setPrice(el))));
        }
    }, [goods]);

    useEffect(() => {
        if (filterMax !== max) {
            setFilterMax(max);
        }
        if (filterMin !== min) {
            setFilterMin(min);
        }
    }, [max, min]);

    useEffect(() => {
        let arr = [...goods];

        if (filterTags.length) {
            arr = filterProducts(arr).byTag(filterTags).data;
        }
        if (filterAuthors.length) {
            arr = filterProducts(arr).byAuthor(filterAuthors).data;
        }
        if (search) {
            arr = filterProducts(arr).byText(search).data;
        }
        if (filterMin !== min || filterMax !== max) {
            arr = filterProducts(arr).byPrice(filterMin, filterMax).data;
        }
        if (filterDiscount) {
            arr = filterProducts(arr).withDiscount().data;
        }
        if (filterReviews) {
            arr = filterProducts(arr).withReviews().data;
        }
        if (filterLikes) {
            arr = filterProducts(arr).withLikes().data;
        }
        if (filterAvailable) {
            arr = filterProducts(arr).isAvailable().data;
        }
        setFilterGoods(arr);
    }, [
        search,
        filterMin,
        filterMax,
        filterTags,
        filterAuthors,
        filterAvailable,
        filterDiscount,
        filterReviews,
        filterLikes,
    ]);

    return (
        <div className='filter'>
            <Search
                setState={setSearch}
                attr={{
                    placeholder: 'Поиск по названию',
                }}
                type='single'
            />
            <div className='filter__item'>
                <h4 className='filter__title'>Выбрать цену</h4>
                <div className='filter__price'>
                    <Input
                        name='min'
                        state={[min, setMin]}
                        attr={{
                            placeholder: 'min',
                            type: 'number',
                            step: '0.01',
                            min: min,
                            max: max,
                        }}
                    />
                    -
                    <Input
                        name='max'
                        state={[max, setMax]}
                        attr={{
                            placeholder: 'min',
                            type: 'number',
                            step: '0.01',
                            min,
                            max,
                        }}
                    />
                </div>
            </div>
            <div className='filter__item'>
                <Switch
                    label='Товары со скидкой'
                    state={[filterDiscount, setFilterDiscount]}
                    name='discount'
                />
                <Switch
                    label='Товары с отзывами'
                    state={[filterReviews, setFilterReviews]}
                    name='reviews'
                />
                <Switch
                    label='Товары в наличии'
                    state={[filterAvailable, setFilterAvailable]}
                    name='available'
                />
                <Switch
                    label='Понравившиеся товары'
                    state={[filterLikes, setFilterLikes]}
                    name='likes'
                />
            </div>
            {!!tags.length && (
                <div className='filter__item'>
                    <h4 className='filter__title'>Фильтр по тегам</h4>
                    <ul className='filter__content'>
                        {tags.map((el) => {
                            return (
                                <li
                                    key={el}
                                    className={`filter__content_line ${
                                        filterTags.includes(el) ? 'filter__content_line_active' : ''
                                    }`}
                                    onClick={() => tagsHandler(el)}
                                >
                                    {el}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
            {!!authors.length && (
                <div className='filter__item'>
                    <h4 className='filter__title'>Поставщики</h4>
                    <ul className='filter__content'>
                        {authors.map((el) => {
                            return (
                                <li
                                    className={`filter__content_line ${
                                        filterAuthors.includes(el)
                                            ? 'filter__content_line_active'
                                            : ''
                                    }`}
                                    onClick={() => authorsHandler(el)}
                                    key={el}
                                >
                                    {el}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
            <button onClick={clearFilters}>Сбросить фильтры</button>
        </div>
    );
};

export default Filters;
