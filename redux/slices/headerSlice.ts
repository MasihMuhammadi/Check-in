import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CourseState {
    showPrompt: boolean
}

const initialState: CourseState = {
    showPrompt: false
}

const headerSlice = createSlice({
    name: "headerSlice",
    initialState,
    reducers: {
        setShowConfirmationPrompt: (state, action: PayloadAction<boolean>) => {
            state.showPrompt = action.payload
        }
    },
})

export const { setShowConfirmationPrompt } = headerSlice.actions
export default headerSlice.reducer
