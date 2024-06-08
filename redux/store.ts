// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import classSlice from './slices/classSlice';
import courseSlice from './slices/courseSlice';

const store = configureStore({
    reducer: {
        classSlice: classSlice,
        courseSlice: courseSlice
    },
});

export default store;
