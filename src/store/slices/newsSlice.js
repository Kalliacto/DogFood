import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { getNews, getNewsLenta } from '../../utils/api';

const news = localStorage.getItem('dogs-news') ? JSON.parse(localStorage.getItem('dogs-news')) : [];
const newsLenta = localStorage.getItem('dogs-newsLenta')
    ? JSON.parse(localStorage.getItem('dogs-newsLenta'))
    : [];

const initialState = {
    news,
    newsLenta,
    isLoading: false,
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
            state.isLoading = false;
            state.news = action.payload;
        },
        getStaticNewsLenta: (state, action) => {
            state.isLoading = false;
            state.newsLenta = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllNews.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.news = payload.articles?.filter((el) => el.source.name === 'Techinsider.ru');
            localStorage.setItem('dogs-news', JSON.stringify(state.news));
        });
        builder.addCase(getAllNewsLenta.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.newsLenta = payload.articles;
            localStorage.setItem('dogs-newsLenta', JSON.stringify(state.newsLenta));
        });

        builder.addMatcher(isPending(getAllNews), (state, action) => {
            state.isLoading = true;
        });
        builder.addMatcher(isRejected(getAllNews), (state, action) => {
            state.isLoading = false;
        });
    },
});

export const { getStaticNews, getStaticNewsLenta } = newsSlice.actions;
export default newsSlice.reducer;
