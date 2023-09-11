import React from 'react';
import Input from '../components/Forms/Input';
import Select from '../components/Forms/Select';
import Textarea from '../components/Forms/Textarea';
import Search from '../components/Forms/Search';
import Layout from '../components/Layout/Layout';

const Auth = (props) => {
    return (
        <Layout>
            <p>Страница авторизации</p>
            <div style={{ width: '400px' }}>
                <Input />
                <Select values={[1, 2, 3, 4]} />
                <Textarea />
                <Search />
            </div>
        </Layout>
    );
};

export { Auth };
