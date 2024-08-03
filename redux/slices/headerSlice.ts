import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { addClass, createTeacher, createaCourse } from '../../api/api'
import build from 'next/dist/build';

interface CourseState {
    showPrompt: boolean
}
const initialState: CourseState = {
    showPrompt: false
}

// Define the async thunk


const headerSlice = createSlice({
    name: "headerSlice",
    initialState,
    reducers: {
        setShowConfirmationPrompt: (state, action: any) => {
            state.showPrompt = action.payload
        }
    },


})

export const { setShowConfirmationPrompt } = headerSlice.actions
export default headerSlice.reducer
