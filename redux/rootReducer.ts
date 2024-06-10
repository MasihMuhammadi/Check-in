// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import classReducer from './slices/classSlice';
import courseReducer from './slices/courseSlice'

const rootReducer = combineReducers({
    class: classReducer,
    course: courseReducer,
    // other reducers can be added here
});

export default rootReducer;
