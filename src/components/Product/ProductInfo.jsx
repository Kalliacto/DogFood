import React, { useContext, useState } from 'react';
import './index.css';
import { getEndings, changeEnds, checkingEnd, stockAvailability } from '../../utils/utils';
import UtilsCtx from '../../context/utils';
import { Context } from '../../context/context';
import { useNavigate } from 'react-router';

const ProductInfo = ({ product, setProduct }) => {
    const { api, userId, setProducts } = useContext(Context);
    const { setPrice, setRating, setStars } = useContext(UtilsCtx);
    const [isLike, setIsLike] = useState(product.likes.includes(userId));
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    const handleLike = () => {
        setIsLike(!isLike);
        api.setLike(product._id, !isLike)
            .then((data) => {
                setProduct(data);
                setProducts((state) => state.map((el) => (el._id === product._id ? data : el)));
            })
            .catch((err) => console.log('Ooops: ' + err.message));
    };

    return (
        <div className='product__info'>
            <h3 className='product__price'>
                {!!product.discount ? (
                    <>
                        <span>{setPrice(product)} &#8381;</span>
                        <del className='product__price_del'> {product.price} &#8381;</del>
                        <span className='product__price_dis'>-{product.discount}%</span>
                    </>
                ) : (
                    <span>{product.price}</span>
                )}
            </h3>
            <div className='product__rate'>
                <span>{setStars(setRating(product, true))}</span>
                <span>{product.reviews.length + getEndings(product.reviews.length, 'отзыв')}</span>
                <span>
                    <i className='lni lni-thumbs-up' />
                    &nbsp;
                    {product.likes.length}
                </span>
                <span className='product__heart' onClick={handleLike}>
                    {isLike ? (
                        <i className='lni lni-heart-fill' />
                    ) : (
                        <i className='lni lni-heart' />
                    )}
                </span>
            </div>
            <table className='product__table'>
                <tbody>
                    <tr>
                        <th>{changeEnds(product.wight)}</th>
                        <td>
                            {!!product.wight
                                ? `${checkingEnd(product.wight)}`
                                : 'информация отсутствует'}
                        </td>
                    </tr>
                    <tr>
                        <th>Наличие: </th>
                        <td>
                            {product.stock === 0 || !product.available ? (
                                <span>Нет в наличии</span>
                            ) : (
                                stockAvailability(product.stock)
                            )}
                        </td>
                    </tr>
                    {/* TODO: перейти на страницу автора */}
                    <tr>
                        <th>Поставщик:</th>
                        <td>ИП {product.author.name}</td>
                    </tr>
                </tbody>
            </table>

            <div className='product__btns'>
                {count ? (
                    <>
                        <button className='product__btn' onClick={() => navigate('/basket')}>
                            Перейти в корзину
                        </button>
                        <button
                            className='product__btn product__btn_square'
                            onClick={() => setCount(count - 1)}
                        >
                            -
                        </button>
                        <span className='product__count'>{count}</span>
                        <button
                            className='product__btn product__btn_square'
                            disabled={count >= product.stock}
                            onClick={() => setCount(count + 1)}
                        >
                            +
                        </button>
                    </>
                ) : (
                    <button
                        className='product__btn'
                        disabled={product.stock === 0 || !product.available}
                        onClick={() => setCount(count + 1)}
                    >
                        Купить
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductInfo;
