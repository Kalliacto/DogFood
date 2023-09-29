import React from 'react';
import Layout from '../components/Layout/Layout';
import Form from '../components/Forms/Form';

const AddProduct = (props) => {
    const handlerAdd = (body) => {
        console.log(body);
    };

    return (
        <Layout>
            <h2>Добавить товар</h2>
            <Form type={'product'} cb={handlerAdd} />
        </Layout>
    );
};

export { AddProduct };
