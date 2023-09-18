import { Route, Routes } from 'react-router';
import './App.css';
import {
    About,
    AddProduct,
    Auth,
    Author,
    Basket,
    Delivery,
    Home,
    Products,
    Profile,
    SingleProduct,
    FAQ,
    NotFoundPage,
} from './pages';
import { NavLink } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllNews,
    getAllNewsLenta,
    getStaticNews,
    getStaticNewsLenta,
} from './store/slices/newsSlice';
import staticNews from './assets/data/news.json';
import staticNewsLenta from './assets/data/newslenta.json';
import Api from './utils/api';

function App() {
    const { news, newsLenta } = useSelector((s) => s.news);
    const [token, setToken] = useState(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBjNGYzODRlZTQxOTk3NWZiZDMwMWUiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4NTI4MzI3LCJleHAiOjE3MTAwNjQzMjd9.hFwIhkSYXini5j5J0pyysePPmwOSy0SsvtxB-B6ocCQ'
    );
    const [userId, setUserId] = useState(localStorage.getItem('user-id'));
    const [api, setApi] = useState(new Api(token));
    const dispatch = useDispatch();

    useEffect(() => {
        setApi(new Api(token));
    }, [token]);

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            if (!news.length) {
                dispatch(getAllNews());
            }
            if (!newsLenta?.length) {
                dispatch(getAllNewsLenta());
            }
        }

        if (process.env.NODE_ENV === 'production') {
            dispatch(getStaticNews(staticNews));
            dispatch(getStaticNewsLenta(staticNewsLenta));
        }
    }, [dispatch, news, newsLenta]);

    return (
        <>
            <Layout>
                <ul className='menu'>
                    <li>
                        <NavLink to={'/'}>Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/products'}>Каталог</NavLink>
                        <ul>
                            <li>
                                <NavLink to={'/products/category/delicious'}>Лакомства</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/products/category/toys'}>Игрушки</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/products/favorites'}>Любимые товары</NavLink>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <NavLink to={'/product/ball'}>Мячик для собак</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/product/add'}>Добавить товар</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/basket'}>Корзина </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/profile'}>Профиль</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/auth'}>Войти</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/delivery'}>Доставка</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/about'}>О нас</NavLink>
                    </li>
                </ul>
            </Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/category/:name' element={<Products isCat={true} />} />
                <Route path='/products/favorites' element={<Products isFav={true} />} />
                <Route path='/product/:id' element={<SingleProduct />} />
                <Route path='/product/add' element={<AddProduct />} />
                <Route path='/basket' element={<Basket />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/provider/:id' element={<Author />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/delivery' element={<Delivery />} />
                <Route path='/about' element={<About />} />
                <Route path='/faq' element={<FAQ />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
