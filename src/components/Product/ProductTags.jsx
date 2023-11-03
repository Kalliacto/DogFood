import React from 'react';
import './index.css';
import { useNavigate } from 'react-router';

const ProductTags = ({ tags }) => {
    const navigate = useNavigate();
    // TODO: перезаписать тэги и здесь через блэк лист
    return (
        <div className='product__tags'>
            {tags?.map((el) => {
                return (
                    <button
                        className='product__tag'
                        key={el}
                        onClick={() => navigate(`/products/category/${el}`)}
                    >
                        {el}
                    </button>
                );
            })}
        </div>
    );
};

export default ProductTags;
