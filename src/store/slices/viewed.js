import { createSlice } from '@reduxjs/toolkit';

const productsInLocal = sessionStorage.getItem('productsInLocal')
    ? JSON.parse(sessionStorage.getItem('productsInLocal'))
    : [];

const initialState = {
    productsInLocal,
    isLoading: false,
};

const viewedProductsSlice = createSlice({
    name: 'productsInLocal',
    initialState,
    reducers: {
        addProductsInLocal(state, action) {
            if (state.productsInLocal.length === 0) {
                state.productsInLocal.push(action.payload);
            } else {
                if (!state.productsInLocal.find((el) => el._id === action.payload._id)) {
                    if (state.productsInLocal.length < 4) {
                        state.productsInLocal.push(action.payload);
                    } else {
                        state.productsInLocal.shift();
                        state.productsInLocal.push(action.payload);
                    }
                }
            }
            sessionStorage.setItem('productsInLocal', JSON.stringify(state.productsInLocal));
        },
        updateProductsInLocalLike(state, action) {
            state.productsInLocal = state.productsInLocal.map((el) =>
                el._id === action.payload._id ? action.payload : el
            );
        },
    },
    extraReducers: (builder) => {},
});

export const { updateProductsInLocalLike, addProductsInLocal } = viewedProductsSlice.actions;
export default viewedProductsSlice.reducer;
