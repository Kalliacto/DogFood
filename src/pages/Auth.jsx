import React from 'react';
import Layout from '../components/Layout/Layout';
import Form from '../components/Forms/Form';

const Auth = (props) => {
    return (
        <Layout>
            <p>Страница авторизации</p>
            <div style={{ width: '400px' }}>
                <Form />
            </div>
        </Layout>
    );
};

export { Auth };
