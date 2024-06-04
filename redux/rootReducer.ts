// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import classReducer from './slices/classSlice';

const rootReducer = combineReducers({
    class: classReducer,
    // other reducers can be added here
});

export default rootReducer;
