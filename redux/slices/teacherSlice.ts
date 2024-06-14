import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { addClass, createTeacher, createaCourse, getSingleTeacherData } from '../../api/api'
import build from 'next/dist/build';

interface teacherState {

    aTeacherData: {
        data: any,
        loading: boolean,
        error: any
    }
}
const initialState: teacherState = {

    aTeacherData: {
        data: {},
        loading: false,
        error: ""
    }
}

// Define the async thunk

export const getTeacherData: any = createAsyncThunk(
    'teacherSlice/getTeacherData',
    async (handle, { rejectWithValue }) => {
        try {
            const response = await getSingleTeacherData(handle);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
const teacherSlice = createSlice({
    name: "teacherSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTeacherData.pending, (state) => {
                state.aTeacherData.loading = true
                state.aTeacherData.error = null

            })
            .addCase(getTeacherData.fulfilled, (state, action: PayloadAction<any>) => {
                state.aTeacherData.loading = false
                state.aTeacherData.data = action.payload
                state.aTeacherData.error = null

            })
            .addCase(getTeacherData.rejected, (state, action) => {
                state.aTeacherData.loading = false
                state.aTeacherData.error = action.error

            })



    }

})

export const { } = teacherSlice.actions
export default teacherSlice.reducer
