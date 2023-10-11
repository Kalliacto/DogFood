import React, { useContext, useState } from 'react';
import './Card.css';
import { Link, useNavigate } from 'react-router-dom';
import { getEndings } from '../../utils/utils';
import Utils from '../../context/utils';

const Card = ({ ...props }) => {
    const { name, discount, likes, pictures, price, reviews, stock, available, tags, _id } = {
        ...props,
    };
    const imgStyle = {
        backgroundImage: `url(${pictures})`,
    };
    const { setPrice } = useContext(Utils);
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
                    <span>
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
        </Link>
    );
};

export default Card;
