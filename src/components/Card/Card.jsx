import React, { useState } from 'react';
import './Card.css';
import { Link, useNavigate } from 'react-router-dom';
import { getEndings } from '../../utils/utils';

const Card = ({ ...props }) => {
    const {
        name,
        created_at,
        description,
        discount,
        likes,
        pictures,
        price,
        reviews,
        stock,
        tags,
        wight,
        _id,
    } = { ...props };
    const imgStyle = {
        backgroundImage: `url(${pictures})`,
    };
    const [isLike, setIsLike] = useState(likes.includes(3));
    const [inBasket, setInBasket] = useState(false);
    const navigate = useNavigate();
    const tag = tags[tags.length - 1];
    const rate = reviews?.length
        ? (
              reviews.reduce((acc, value) => Math.round(acc + value.rating), 0) / reviews.length
          ).toFixed(1)
        : '0';

    const tagHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/products/category/${tag}`);
    };

    const basketHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInBasket(!inBasket);
    };

    const likeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLike(!isLike);
    };

    return (
        <div className='card'>
            {tag && (
                <button className={`card__btn card__tag card__tag_${tag}`} onClick={tagHandler}>
                    {tag}
                </button>
            )}
            <Link to={`/product/${_id}`}>
                <span className='card__img' style={imgStyle}></span>
                <span className='card__content'>
                    <span className='card__title'>
                        {name.length >= 40 ? name.slice(0, 40) + '...' : name}
                    </span>
                    <span className='card__info'>
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
                                {Math.ceil(price * ((100 + discount) / 100))} ₽
                                <del className='card__price_discount'>{price} ₽</del>
                            </>
                        ) : (
                            <span>{price} ₽</span>
                        )}
                    </span>
                </span>
            </Link>
            <span className='card__buttons'>
                {inBasket ? (
                    <button className='card__btn card__btn_basket' onClick={basketHandler}>
                        <i className='lni lni-cart-full' />В корзине
                    </button>
                ) : (
                    <button className='card__btn card__btn_basket' onClick={basketHandler}>
                        <i className='lni lni-cart' />В корзину
                    </button>
                )}

                <button className='card__btn' onClick={likeHandler}>
                    {isLike ? (
                        <i className='lni lni-heart-fill' />
                    ) : (
                        <i className='lni lni-heart' />
                    )}
                </button>
            </span>
        </div>
    );
};

export default Card;
