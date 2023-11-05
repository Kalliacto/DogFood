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
    Favorites,
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
import blackList from './assets/data/blackList.json';
import Api from './utils/api';
import { Context } from './context/context';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Utils, { initialValue as utilsValue } from './context/utils';
import { findFavorite } from './utils/utils';

function App() {
    const { news, newsLenta } = useSelector((s) => s.news);
    const [token, setToken] = useState(localStorage.getItem('user-token'));
    const [userId, setUserId] = useState(localStorage.getItem('user-id'));
    const [api, setApi] = useState(new Api(token));
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        setApi(new Api(token));
    }, [token]);

    useEffect(() => {
        if (token) {
            api.getProducts().then((data) => {
                // setProducts(filterCards(data.products, userId)); старая фильтрация по 2м авторам
                let arr = [...data.products];
                let changes = blackList.changeTags;
                let changesNames = Object.keys(changes);
                arr = arr.map((el) => {
                    let hasTag = changesNames.filter((name) => el.tags.includes(name));
                    hasTag.forEach((name) => {
                        el.tags = el.tags.reduce((acc, tg) => {
                            if (tg === name && !acc.includes(changes[name])) {
                                acc.push(changes[name]);
                            } else if (tg !== name) {
                                acc.push(tg);
                            }
                            return acc;
                        }, []);
                    });
                    return el;
                });

                blackList.authors.forEach((el) => {
                    arr = utilsValue.filterProducts(arr).byAuthor(el, false).data;
                });
                arr = utilsValue.filterProducts(arr).byTag(blackList.tags, false).data;
                arr = utilsValue.filterProducts(arr).byId(blackList.goods, false).data;

                setProducts(arr);
                setFavorite(arr.filter((item) => findFavorite(item, userId)));
            });
        } else {
            setProducts([]);
            setFavorite([]);
        }
    }, [api]);

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
        products,
        setProducts,
        favorite,
        setFavorite,
    };

    return (
        <>
            <Context.Provider value={value}>
                <Utils.Provider value={utilsValue}>
                    <Header />
                    <main>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/products' element={<Products />} />
                            <Route
                                path='/products/category/:name'
                                element={<Products isCat={true} />}
                            />
                            <Route path='/products/favorites' element={<Favorites />} />
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
                    </main>
                    <Footer />
                </Utils.Provider>
            </Context.Provider>
        </>
    );
}

export default App;
