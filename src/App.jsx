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
import { Context } from './context/context';
import Header from './components/Header/Header';

function App() {
    const { news, newsLenta } = useSelector((s) => s.news);
    const [token, setToken] = useState(localStorage.getItem('user-token'));
    const [userId, setUserId] = useState(localStorage.getItem('user-id'));
    const [api, setApi] = useState(new Api(token));
    const dispatch = useDispatch();

    useEffect(() => {
        setApi(new Api(token));
    }, [token]);

    useEffect(() => {
        setToken(localStorage.getItem('user-token'));
    }, [userId]);

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

    const value = {
        api,
        userId,
        setUserId,
    };

    return (
        <>
            <Context.Provider value={value}>
                <Header />
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
            </Context.Provider>
        </>
    );
}

export default App;
