// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import classReducer from './slices/classSlice';
import courseReducer from './slices/courseSlice'
import authSlice from './slices/authSlice';

const rootReducer = combineReducers({
    class: classReducer,
    course: courseReducer,
    auth: authSlice
    // other reducers can be added here
});

export default rootReducer;
