import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { addClass } from '../../api/api'

const initialState: any = {
    number: 10,
    loading: false,
    error: null,
    data: null
}

// Define the async thunk
export const fetchData = createAsyncThunk(
    'classSlice/fetchData',
    async (payload: any) => {
        try {
            const response = await addClass(payload)
            return response.data
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { increment } = classSlice.actions
export default classSlice.reducer
