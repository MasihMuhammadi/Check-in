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
    pageWillShow: "students",
    isEditable: false,
    singleStudent: {},
    showFullModal: false,
}

// Define the async thunk
export const fetchData: any = createAsyncThunk(
    'studentSlice/fetchData',
    async (payload: any) => {
        try {
            const response = await addClass(payload)
            return response
        } catch (error) {
            console.log(error)
        }
    }
)

const studentSlice = createSlice({
    name: "studentSlice",
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
        },
        setSingleStudent: (state, action) => {
            state.singleStudent = action.payload
        },
        setShowFullModal: (state, action) => {
            state.showFullModal = action.payload
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
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.classData.loading = true
                state.classData.error = 'an error occured'

            })
    }
})

export const { increment, setPageWillShow, setIsEditable, setSingleStudent, setShowFullModal } = studentSlice.actions
export default studentSlice.reducer
