import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { addClass } from '../../api/api'

const initialState: any = {
    number: 10,
    classData: {
        loading: false,
        error: "",
        data: {},
    },
    pageWillShow: "classes",
    isEditable: false
}

// Define the async thunk
export const fetchData: any = createAsyncThunk(
    'classSlice/fetchData',
    async (payload: any) => {
        try {
            const response = await addClass(payload)

            return response
        } catch (error) {
            console.log(error)
        }
    }
)

const classSlice = createSlice({
    name: "classSlice",
    initialState,
    reducers: {
        increment: (state) => {
            state.number = state.number + 1
        },
        setPageWillShow: (state, action) => {
            state.pageWillShow = action.payload
        },
        setIsEditable: (state, action) => {
            state.isEditable = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state, action) => {
                state.classData.loading = true
                state.classData.error = action.error
            })
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
                state.classData.loading = false
                state.classData.data = action.payload

                state.classData.error = ""
                // console.log(action.payload, '.........................')
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.classData.loading = true
                state.classData.error = 'an error occured'

            })
    }
})

export const { increment, setPageWillShow, setIsEditable } = classSlice.actions
export default classSlice.reducer
