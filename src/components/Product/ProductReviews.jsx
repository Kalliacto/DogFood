import React from 'react';
import './index.css';

const ProductReviews = ({ reviews }) => {
    return (
        <div className='product__reviews'>
            <h2 className='product__title'>Отзывы</h2>
            {!!reviews.length ? (
                reviews.map((el) => (
                    <div>
                        {el.text} {el.rating}
                    </div>
                ))
            ) : (
                <div>Здесь пока нет отзывов {'=('} </div>
            )}
        </div>
    );
};

export default ProductReviews;
