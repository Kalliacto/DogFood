import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './slices/newsSlice';
import basketSlice from './slices/basketSlice';

const store = configureStore({
    reducer: {
        news: newsSlice,
        basket: basketSlice,
    },
});

export default store;
