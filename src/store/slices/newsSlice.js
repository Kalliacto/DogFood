import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNews, getNewsLenta } from '../../utils/api';

// const news = localStorage.getItem('news') ? JSON.parse(localStorage.getItem('news')) : [];
// const newsLenta = localStorage.getItem('newsLenta')
//     ? JSON.parse(localStorage.getItem('newsLenta'))
//     : [];

const initialState = {
    news: [],
    newsLenta: [],
    staticNews: [],
    staticNewsLenta: [],
};

export const getAllNews = createAsyncThunk(
    'news/getNews',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const news = await getNews();
            return fulfillWithValue(news);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAllNewsLenta = createAsyncThunk(
    'news/getNewsLenta',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const news = await getNewsLenta();
            return fulfillWithValue(news);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        getStaticNews: (state, action) => {
            state.staticNews = action.payload;
        },
        getStaticNewsLenta: (state, action) => {
            state.staticNewsLenta = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllNews.fulfilled, (state, { payload }) => {
            state.news = payload.articles.filter((el) => el.source.name === 'Techinsider.ru');
            // localStorage.setItem('news', JSON.stringify(state.news));
        });
        builder.addCase(getAllNewsLenta.fulfilled, (state, { payload }) => {
            state.newsLenta = payload.articles;
            // localStorage.setItem('newsLenta', JSON.stringify(state.newsLenta));
        });

        // builder.addMatcher(isPending(getAllNews), (state, action) => {

        // });
        // builder.addMatcher(isRejected(getAllNews), (state, action) => {

        // });
    },
});

export const { getStaticNews, getStaticNewsLenta } = newsSlice.actions;
export default newsSlice.reducer;
