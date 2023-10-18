import React, { useContext } from 'react';
import './index.css';
import UtilsCtx from '../../context/utils';

const ProductDescription = ({ description }) => {
    const { setDescription } = useContext(UtilsCtx);

    return (
        <div className='product__description'>
            <h2 className='product__title'>Описание товара</h2>
            {setDescription(description).map((el, i) => (
                <p key={i}>{el}</p>
            ))}
        </div>
    );
};

export default ProductDescription;
