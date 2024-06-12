import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { addClass, createTeacher, createaCourse } from '../../api/api'
import build from 'next/dist/build';

interface CourseState {
    isLoggedIn: boolean;
    manangerSignUpData: {
        data: any,
        loading: boolean,
        error: any
    }
    teacherSignUpData: {
        data: any,
        loading: boolean,
        error: any
    }
}
const initialState: CourseState = {
    isLoggedIn: false,
    manangerSignUpData: {
        data: {},
        loading: false,
        error: ""
    },
    teacherSignUpData: {
        data: {},
        loading: false,
        error: ""
    }
}

// Define the async thunk

export const signUpManager = createAsyncThunk(
    'courseSlice/createCourse',
    async (payload: { data: any }) => {
        try {
            const response = await createaCourse(payload.data)
            return response
        } catch (error) {
            throw error
        }
    }
)
export const signUpTeacher = createAsyncThunk(
    'courseSlice/createTeacher',
    async (payload: any) => {
        try {
            const response = await createTeacher(payload)
            return response
        } catch (error) {
            throw error
        }
    }
)

const courseSlice = createSlice({
    name: "courseSlice",
    initialState,
    reducers: {
        setLoggedIn: (state, action: any) => {
            state.isLoggedIn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpManager.pending, (state) => {
                state.manangerSignUpData.loading = true
                state.manangerSignUpData.error = null
                state.isLoggedIn = false
            })
            .addCase(signUpManager.fulfilled, (state, action: PayloadAction<any>) => {
                state.manangerSignUpData.loading = false
                state.manangerSignUpData.data = action.payload
                state.manangerSignUpData.error = null
                state.isLoggedIn = true
            })
            .addCase(signUpManager.rejected, (state, action) => {
                state.manangerSignUpData.loading = false
                state.manangerSignUpData.error = action.error
                state.isLoggedIn = false
            })
            .addCase(signUpTeacher.pending, (state) => {
                state.teacherSignUpData.loading = true
                state.teacherSignUpData.error = null
                state.isLoggedIn = false
            })
            .addCase(signUpTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.teacherSignUpData.loading = false
                state.teacherSignUpData.data = action.payload
                state.teacherSignUpData.error = null
                state.isLoggedIn = true
            })
            .addCase(signUpTeacher.rejected, (state, action) => {
                state.teacherSignUpData.loading = false
                state.teacherSignUpData.error = action.error
                state.isLoggedIn = false
            })


    }

})

export const { setLoggedIn } = courseSlice.actions
export default courseSlice.reducer
