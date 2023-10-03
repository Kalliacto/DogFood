import React, { useContext } from 'react';
import Layout from '../components/Layout/Layout';
import Form from '../components/Forms/Form';
import { Context } from '../context/context';
import { useNavigate } from 'react-router';

const AddProduct = () => {
    const { api, setProducts } = useContext(Context);
    const navigate = useNavigate();

    const handlerAdd = (body) => {
        api.addProduct(body).then((data) => {
            setProducts((prev) => [...prev, data]);
            navigate('/products');
        });
    };

    return (
        <Layout>
            <h2>Добавить товар</h2>
            <Form type={'product'} cb={handlerAdd} />
        </Layout>
    );
};

export { AddProduct };
