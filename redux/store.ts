// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import classSlice from './slices/classSlice';
import courseSlice from './slices/courseSlice';
import authSlice from './slices/authSlice';
import teacherSlice from './slices/teacherSlice';
import studentSlice from './slices/studentSlice';

const store = configureStore({
    reducer: {
        classSlice: classSlice,
        courseSlice: courseSlice,
        authSlice: authSlice,
        teacherSlice: teacherSlice,
        studentSlice: studentSlice
    },
});

export default store;
