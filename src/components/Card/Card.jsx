import React, { useContext, useState } from 'react';
import './Card.css';
import { Link, useNavigate } from 'react-router-dom';
import { getEndings } from '../../utils/utils';
import Utils from '../../context/utils';
import { Context } from '../../context/context';
import { useDispatch, useSelector } from 'react-redux';
import { addBasketProduct } from '../../store/slices/basketSlice';

const Card = ({ ...props }) => {
    const { name, discount, likes, pictures, price, reviews, stock, available, tags, _id } = {
        ...props,
    };
    const imgStyle = {
        backgroundImage: `url(${pictures})`,
    };
    const { api, userId, setProducts } = useContext(Context);
    const { setPrice } = useContext(Utils);
    const isLike = likes.includes(userId);
    const { basketProducts } = useSelector((s) => s.basket);
    let inBasket = basketProducts.filter((el) => el.product._id === _id).length;
    const navigate = useNavigate();
    const tag = tags[tags.length - 1];
    const rate = reviews?.length
        ? (
              reviews.reduce((acc, value) => Math.round(acc + value.rating), 0) / reviews.length
          ).toFixed(1)
        : '0';
    const dispatch = useDispatch();

    const tagHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/products/category/${tag}`);
    };

    const basketHandler = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addBasketProduct({ product, count: 1 }));
    };

    const toBasket = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/basket');
    };

    const likeHandler = (e, id, isLike) => {
        e.preventDefault();
        e.stopPropagation();
        api.setLike(id, isLike).then((data) => {
            setProducts((state) => state.map((el) => (el._id === id ? data : el)));
        });
    };

    return (
        <Link
            to={`/product/${_id}`}
            className={`card ${!available || !stock === 0 ? 'card_disabled' : ''}`}
        >
            {!!tags.length && (
                <span className='card__tags_container'>
                    {tags.map((el) => (
                        <button
                            key={el}
                            className={`card__btn card__tag card__tag_${el}`}
                            onClick={tagHandler}
                        >
                            {el}
                        </button>
                    ))}
                </span>
            )}
            {!!discount && <span className='card__discount'>{`${discount}%`}</span>}
            <span className='card__img' style={imgStyle}></span>
            <span className='card__content'>
                <span className='card__title'>
                    {name.length >= 40 ? name.slice(0, 40) + '...' : name}
                </span>
                <span className='card__info'>
                    <span onClick={() => {}}>
                        <i className='lni lni-thumbs-up'>&#160;{likes?.length}</i>
                    </span>
                    {rate ? (
                        <span className='card__rate'>
                            <i className='lni lni-star-fill' /> {rate}
                        </span>
                    ) : (
                        <span className='card__rate card__rate_empty'>
                            <i className='lni lni-star-fill' />
                        </span>
                    )}
                    <span className='card__review'>
                        {reviews?.length
                            ? `${reviews?.length} ${getEndings(reviews?.length, 'отзыв')}`
                            : 'Нет отзывов'}
                    </span>
                </span>
                <span className='card__price'>
                    {discount ? (
                        <>
                            {setPrice({ price, discount })}
                            <del className='card__price_discount'>{price} ₽</del>
                        </>
                    ) : (
                        <span>{price} ₽</span>
                    )}
                </span>
            </span>
            <span className='card__buttons'>
                {!!inBasket ? (
                    <button className='card__btn card__btn_basket' onClick={(e) => toBasket(e)}>
                        <i className='lni lni-cart-full' />
                        Уже в корзинe
                    </button>
                ) : (
                    <button
                        className='card__btn card__btn_basket'
                        onClick={(e) => basketHandler(e, props)}
                    >
                        <i className='lni lni-cart' />В корзину
                    </button>
                )}

                <button className='card__btn' onClick={(e) => likeHandler(e, _id, isLike)}>
                    {isLike ? (
                        <i className='lni lni-heart-fill heart' />
                    ) : (
                        <i className='lni lni-heart heart' />
                    )}
                </button>
            </span>
        </Link>
    );
};

export default Card;
