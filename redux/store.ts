// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import classSlice from './slices/classSlice';

const store = configureStore({
    reducer: {
        classSlice: classSlice
    },
});

export default store;
