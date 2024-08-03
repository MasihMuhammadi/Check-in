// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import classReducer from './slices/classSlice';
import courseReducer from './slices/courseSlice'
import authSlice from './slices/authSlice';
import teacherSlice from './slices/teacherSlice';
import studentSlice from './slices/studentSlice';
import headerSlice from './slices/headerSlice';

const rootReducer = combineReducers({
    class: classReducer,
    course: courseReducer,
    auth: authSlice,
    teacher: teacherSlice,
    student: studentSlice,
    header: headerSlice
    // other reducers can be added here
});

export default rootReducer;
