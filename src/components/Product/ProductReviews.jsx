import React, { useContext, useEffect, useState } from 'react';
import UtilsCtx from '../../context/utils';
import './index.css';
import Layout from '../Layout/Layout';
import { Default } from '../../assets/img';
import { Context } from '../../context/context';
import Form from '../Forms/Form';

const ProductReviews = ({ reviews, id, setProduct }) => {
    const { setStars } = useContext(UtilsCtx);
    const { api, setProducts, userId } = useContext(Context);
    const [reviewsCount, setReviewsCount] = useState(4);
    const [showAll, setShowAll] = useState(false);
    const [addReview, setAddReview] = useState(false);

    useEffect(() => {
        setReviewsCount(showAll ? reviews.length : 4);
    }, [showAll]);

    const reviewHandler = (body) => {
        api.addReview(id, body).then((data) => {
            setAddReview(false);
            setProduct(data);
            setProducts((state) => state.map((el) => (el._id === id ? data : el)));
        });
    };
    const delReview = (review) => {
        api.deleteReview(id, review).then((data) => {
            setProduct(data);
            setProducts((state) => state.map((el) => (el._id === id ? data : el)));
        });
    };

    return (
        <div className='product__reviews'>
            <h2 className='product__title'>Отзывы</h2>

            <div className='reviews__add'>
                {!addReview && (
                    <button className='form__btn' onClick={() => setAddReview(!addReview)}>
                        Оставить отзыв
                    </button>
                )}
                {addReview && (
                    <>
                        <Form type='review' cb={reviewHandler} />
                        <button className='form__btn' onClick={() => setAddReview(!addReview)}>
                            Отменить
                        </button>
                    </>
                )}
            </div>

            <Layout dt={4} mb={2}>
                {!!reviews.length ? (
                    reviews.slice(0, reviewsCount).map((el) => (
                        <div className='review'>
                            {userId === el.author._id && (
                                <div className='review__pen' onClick={() => delReview(el._id)}>
                                    <i class='lni lni-pencil'></i>
                                </div>
                            )}

                            <div
                                className='review__img'
                                style={{
                                    backgroundImage: `url(${
                                        el.author?.avatar ? el.author?.avatar : Default
                                    })`,
                                }}
                            />
                            <h4 className='review__author'>{el.author.name}</h4>
                            <h4 className='review__rate product__stars'>{setStars(el.rating)}</h4>
                            <p className='review__text'>{el.text}</p>
                            <div className='review__date'>
                                {new Date(el.created_at).toLocaleString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Здесь пока нет отзывов {'=('} </div>
                )}
                {reviews.length > 4 && (
                    <button onClick={() => setShowAll(!showAll)} className='reviews__btn'>
                        {showAll ? 'Скрыть все отзывы' : 'Показать отзывы'}
                    </button>
                )}
            </Layout>
        </div>
    );
};

export default ProductReviews;
