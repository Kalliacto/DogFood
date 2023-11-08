import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Context } from '../context/context';
import { useParams } from 'react-router';
import Empty from '../components/Empty/Empty';
import UtilsCtx from '../context/utils';
import Link from '../components/Navigate/Link';
import Card from '../components/Card/Card';

const Author = (props) => {
    const { id: authorId } = useParams();
    const { api, products } = useContext(Context);
    const { filterProducts } = useContext(UtilsCtx);
    const [userInfo, setUserInfo] = useState({});
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        setGoods(filterProducts(products).byAuthor(authorId).data);
        api.getUser(authorId)
            .then((data) => setUserInfo(data))
            .catch((err) => console.log(err));
    }, [authorId]);

    useEffect(() => {
        setGoods(filterProducts(products).byAuthor(authorId).data);
    }, [products]);

    return (
        <>
            {userInfo.name ? (
                <>
                    <Layout mb={1} dt={2}>
                        <table className='user-table'>
                            <caption>{userInfo.name}</caption>
                            <tbody>
                                <tr>
                                    <th>Информация</th>
                                    <td>{userInfo.about}</td>
                                </tr>
                                <tr>
                                    <th>Адрес для связи</th>
                                    <td>
                                        <Link
                                            title={userInfo.email}
                                            path={`mailto:${userInfo.email}`}
                                            as={'a'}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <img src={userInfo.avatar} alt={userInfo.name} style={{ width: '100%' }} />
                    </Layout>
                    {!!goods.length ? (
                        <Layout title='Товары пользователя' mb={2} dt={4}>
                            {goods.map((el) => (
                                <Card key={el._id} {...el} />
                            ))}
                        </Layout>
                    ) : (
                        <Empty type='noGoods' />
                    )}
                </>
            ) : (
                <Empty type='load' />
            )}
        </>
    );
};

export { Author };
