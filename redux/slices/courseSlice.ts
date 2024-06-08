import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { addClass } from '../../api/api'

interface CourseState {
    isLoggedIn: boolean;
}
const initialState: CourseState = {
    isLoggedIn: false,
}

// Define the async thunk

const courseSlice = createSlice({
    name: "courseSlice",
    initialState,
    reducers: {
        setLoggedIn: (state, action: any) => {
            state.isLoggedIn = action.payload
        }
    },
})

export const { setLoggedIn } = courseSlice.actions
export default courseSlice.reducer
