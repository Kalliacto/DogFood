import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router';
import { Context } from '../context/context';
import Empty from '../components/Empty/Empty';
import { Link } from 'react-router-dom';
import UtilsCtx from '../context/utils';
import { changeEnds, checkingEnd, getEndings, stockAvailability } from '../utils/utils';

const SingleProduct = (props) => {
    const { id } = useParams();
    const { api } = useContext(Context);
    const { setPrice, setRating, setDescription } = useContext(UtilsCtx);
    const [product, setProduct] = useState({});

    useEffect(() => {
        api.getProduct(id).then((data) => setProduct(data));
    }, [id]);

    return (
        <>
            {!!Object.keys(product).length ? (
                <Layout title={product.name} dt={2}>
                    <div>
                        <div>
                            {product.tags.map((el) => {
                                return (
                                    <Link to={`/products/category/${el}`} key={el}>
                                        <button>{el}</button>
                                    </Link>
                                );
                            })}
                        </div>
                        <img className='product__img' src={product.pictures} alt={product.name} />
                    </div>
                    <div>
                        <h3>
                            {!!product.discount ? (
                                <>
                                    <span>{setPrice(product)} &#8381;</span>
                                    <del> {product.price} &#8381;</del>
                                    <span>-{product.discount}%</span>
                                </>
                            ) : (
                                <span>{product.price}</span>
                            )}
                        </h3>
                        <div>
                            <span>{setRating(product, true)}</span>
                            <span>
                                {product.reviews.length +
                                    getEndings(product.reviews.length, 'отзыв')}
                            </span>
                            <span>
                                <i className='lni lni-thumbs-up' />
                                {product.likes.length}
                            </span>
                            <span>
                                <i className='lni lni-heart' />
                            </span>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>{changeEnds(product.wight)}</th>
                                    <td>{`${product.wight} ${checkingEnd(product.wight)}`}</td>
                                </tr>
                                <tr>
                                    <th>Наличие: </th>
                                    <td>
                                        {!!product.stock ? (
                                            stockAvailability(product.stock)
                                        ) : (
                                            <span>Нет в наличии</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Поставщик:</th>
                                    <td>{product.author.name}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div>
                            <button>Купить</button>
                            <button>Перейти в корзину</button>

                            <button>-</button>
                            <span></span>
                            <button>+</button>
                        </div>
                    </div>
                    <div style={{ gridColumnEnd: 'span 2' }}>
                        <h2>Описание товара</h2>
                        {setDescription(product.description).map((el, i) => (
                            <p key={i}>{el}</p>
                        ))}
                    </div>
                    <div style={{ gridColumnEnd: 'span 2' }}>
                        <h2>Отзывы</h2>
                    </div>
                </Layout>
            ) : (
                <Empty type='load' />
            )}
        </>
    );
};

export { SingleProduct };
