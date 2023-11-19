import React from 'react';
import './BasketInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    addBasketProduct,
    deleteProductFromBasket,
    orderProducts,
    removeBasketProduct,
} from '../../store/slices/basketSlice';

const BasketInfo = () => {
    const { basketProducts } = useSelector((s) => s.basket);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sumAllProducts = basketProducts.reduce((acc, el) => acc + el.product.price * el.count, 0);
    const saleAllProducts = basketProducts.reduce(
        (acc, el) => acc + ((el.product.discount * el.product.price) / 100) * el.count,
        0
    );
    const resultAllProduct = sumAllProducts - saleAllProducts;

    const sendData = () => {
        window.alert('Ваш заказ успешно оформлен!');
        dispatch(orderProducts());
        navigate('/products');
    };

    return (
        <div className='basket__content-wrap'>
            <div className='basket__content'>
                {basketProducts.map((elem) => {
                    return (
                        <div key={elem.product._id} className='basket__item'>
                            <Link to={`/product/${elem.product._id}`} className='card__link'>
                                <div className='basket__item-img'>
                                    <img src={elem.product.pictures} alt='Фото продукта' />
                                </div>
                            </Link>
                            <div className='basket__item-info'>
                                <div className='basket__item-name'>{elem.product.name}</div>
                                <div className='basket__item-count small'>{elem.product.wight}</div>
                                <div className='basket__price-one'>
                                    <span className='small'>Цена на штуку: </span>
                                    <span className='small'>{elem.product.price}</span>
                                </div>
                            </div>

                            <div className='basket__price'>
                                {Math.round(
                                    (elem.product.price - elem.product.discount) * elem.count
                                )}
                            </div>
                            <i
                                className='lni lni-trash-can basket__item-trash'
                                onClick={() => {
                                    dispatch(deleteProductFromBasket(elem.product));
                                }}
                            />
                            <div className='product__btns'>
                                <button
                                    className='product__btn product__btn_square'
                                    onClick={() =>
                                        dispatch(
                                            removeBasketProduct({ product: elem.product, count: 1 })
                                        )
                                    }
                                >
                                    -
                                </button>
                                <span className='product__count'>{elem.count}</span>
                                <button
                                    className='product__btn product__btn_square'
                                    disabled={elem.count >= elem.product.stock}
                                    onClick={() => {
                                        dispatch(
                                            addBasketProduct({ product: elem.product, count: 1 })
                                        );
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='basket__result'>
                <h3 className='basket__result-title'>Ваша корзина</h3>
                <div className='basket__result-info'>
                    <div className='basket__result-info-list'>
                        <span className='small'>
                            Товары ({basketProducts.reduce((acc, el) => acc + el.count, 0)})
                        </span>
                        <span>{Math.round(sumAllProducts)}&nbsp;₽</span>
                    </div>
                    <div className='basket__result-info-list'>
                        <span className='small'>Скидка</span>
                        <span className='_red'>- {Math.round(saleAllProducts)}&nbsp;₽</span>
                    </div>
                    <div className='basket__result-info-list'>
                        <span>
                            <b>Общая стоимость</b>
                        </span>
                        <span>{Math.round(resultAllProduct)}&nbsp;₽</span>
                    </div>
                </div>
                {basketProducts.length !== 0 ? (
                    <button onClick={() => sendData()} className='basket__result-btn'>
                        Оформить заказ
                    </button>
                ) : (
                    <button className='basket__result-btn'>Пока пусто</button>
                )}
            </div>
        </div>
    );
};

export default BasketInfo;
