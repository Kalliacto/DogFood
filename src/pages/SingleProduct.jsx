import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router';
import { Context } from '../context/context';
import Empty from '../components/Empty/Empty';
import Product from '../components/Product';
import { useDispatch } from 'react-redux';
import { addProductsInLocal } from '../store/slices/viewed';
import Adds from '../components/Adds/Adds';
import addsData from '../assets/data/adds.json';
import UtilsCtx from '../context/utils';

const SingleProduct = () => {
    const { id } = useParams();
    const { api } = useContext(Context);
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();
    const { getNumber } = useContext(UtilsCtx);

    useEffect(() => {
        api.getProduct(id).then((data) => {
            setProduct(data);
            dispatch(addProductsInLocal(data));
        });
    }, [id]);

    return (
        <>
            {!!Object.keys(product).length ? (
                <Layout title={product.name} dt={2}>
                    <div className='container'>
                        {!!product?.tags.length && <Product.ProductTags tags={product.tags} />}
                        <Product.ProductImage pictures={product.pictures} name={product.name} />
                    </div>
                    <Product.ProductInfo product={product} setProduct={setProduct} />
                    <Product.ProductDescription description={product.description} />
                    <Adds {...addsData[getNumber(addsData.length)]} />
                    <Adds {...addsData[getNumber(addsData.length)]} />

                    <Product.ProductReviews
                        reviews={product.reviews}
                        id={id}
                        setProduct={setProduct}
                    />
                </Layout>
            ) : (
                <Empty type='load' />
            )}
        </>
    );
};

export { SingleProduct };
