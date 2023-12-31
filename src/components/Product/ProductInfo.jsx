import React, { useContext } from 'react';
import './index.css';
import { getEndings, changeEnds, checkingEnd, stockAvailability } from '../../utils/utils';
import UtilsCtx from '../../context/utils';
import { Context } from '../../context/context';
import { useNavigate } from 'react-router';
import { addBasketProduct, removeBasketProduct } from '../../store/slices/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import Adds from '../Adds/Adds';
import addsData from '../../assets/data/adds.json';
import { updateProductsInLocalLike } from '../../store/slices/viewed';

const ProductInfo = ({ product, setProduct }) => {
    const { api, userId, setProducts, setFavorite } = useContext(Context);
    const { setPrice, setRating, setStars } = useContext(UtilsCtx);
    const isLike = product.likes.includes(userId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { basketProducts } = useSelector((s) => s.basket);
    let productCount = basketProducts.filter((el) => el.product._id === product._id);
    const { getNumber } = useContext(UtilsCtx);

    const likeHandler = () => {
        api.setLike(product._id, isLike)
            .then((data) => {
                setProducts((state) => state.map((el) => (el._id === product._id ? data : el)));
                setProduct(data);
                if (isLike) {
                    setFavorite((state) => state?.filter((el) => el._id !== data._id));
                } else {
                    setFavorite((state) => [...state, data]);
                }
                dispatch(updateProductsInLocalLike(data));
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
                <span className='product__stars'>{setStars(setRating(product, true))}</span>
                <span>{product.reviews.length + getEndings(product.reviews.length, 'отзыв')}</span>
                <span>
                    <i className='lni lni-thumbs-up' />
                    &nbsp;
                    {product.likes.length}
                </span>
                <span className='product__heart' onClick={likeHandler}>
                    {isLike ? (
                        <i className='lni lni-heart-fill heart' />
                    ) : (
                        <i className='lni lni-heart heart' />
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
                    <tr>
                        <th>Поставщик:</th>
                        <td>
                            <span
                                className='product__table_link'
                                onClick={() => navigate(`/author/${product.author._id}`)}
                            >
                                ИП {product.author.name}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='product__btns'>
                {!!productCount.length ? (
                    <>
                        <button className='product__btn' onClick={() => navigate('/basket')}>
                            Перейти в корзину
                        </button>
                        <button
                            className='product__btn product__btn_square'
                            onClick={() => dispatch(removeBasketProduct({ product, count: 1 }))}
                        >
                            -
                        </button>
                        <span className='product__count'>{productCount.map((el) => el.count)}</span>
                        <button
                            className='product__btn product__btn_square'
                            disabled={productCount.filter((el) => el.count >= product.stock).length}
                            onClick={() => {
                                dispatch(addBasketProduct({ product, count: 1 }));
                            }}
                        >
                            +
                        </button>
                    </>
                ) : (
                    <button
                        className='product__btn'
                        disabled={product.stock === 0 || !product.available}
                        onClick={() => dispatch(addBasketProduct({ product: product, count: 1 }))}
                    >
                        Купить
                    </button>
                )}
            </div>
            <Adds {...addsData[getNumber(addsData.length)]} />
        </div>
    );
};

export default ProductInfo;
