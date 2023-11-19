import { createSlice } from '@reduxjs/toolkit';

const basketProducts = localStorage.getItem('basketDF')
    ? JSON.parse(localStorage.getItem('basketDF'))
    : [];

const initialState = {
    basketProducts,
    isLoading: false,
};

const basketSlice = createSlice({
    name: 'basket',
    initialState: initialState,
    reducers: {
        updateBasketProducts: (state, action) => {
            state.basketProducts = JSON.parse(action.payload);
        },
        addBasketProduct: (state, action) => {
            const checkProductInBasket = state.basketProducts.find(
                (e) => e.product._id === action.payload.product._id
            );
            if (checkProductInBasket) {
                const order = checkProductInBasket.count + action.payload.count;
                checkProductInBasket.count =
                    order <= action.payload.product.stock ? order : checkProductInBasket.count;
            } else {
                state.basketProducts.push(action.payload);
            }
            localStorage.setItem('basketDF', JSON.stringify(state.basketProducts));
        },
        removeBasketProduct: (state, action) => {
            const checkProductInBasket = state.basketProducts.find(
                (e) => e.product._id === action.payload.product._id
            );
            if (checkProductInBasket) {
                const order = checkProductInBasket.count - action.payload.count;
                checkProductInBasket.count = order <= 0 ? 0 : order;
                if (checkProductInBasket.count === 0) {
                    state.basketProducts = state.basketProducts.filter(
                        (e) => e.product._id !== action.payload.product._id
                    );
                }
            }
            localStorage.setItem('basketDF', JSON.stringify(state.basketProducts));
        },
        deleteProductFromBasket: (state, action) => {
            state.basketProducts = state.basketProducts.filter(
                (e) => e.product._id !== action.payload._id
            );
            localStorage.setItem('basketDF', JSON.stringify(state.basketProducts));
        },
        orderProducts: (state, action) => {
            state.basketProducts = [];
            localStorage.removeItem('basketDF');
        },
    },
    extraReducers: (builder) => {},
});

export const {
    addBasketProduct,
    removeBasketProduct,
    deleteProductFromBasket,
    updateBasketProducts,
    orderProducts,
} = basketSlice.actions;
export default basketSlice.reducer;
