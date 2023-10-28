import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './slices/newsSlice';
import basketSlice from './slices/basketSlice';
import viewedProductsSlice from './slices/viewed';

const store = configureStore({
    reducer: {
        news: newsSlice,
        basket: basketSlice,
        viewed: viewedProductsSlice,
    },
});

export default store;
