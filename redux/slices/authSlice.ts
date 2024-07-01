import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { loginAsManager, loginAsTeacher } from '../../api/api'

interface AuthState {
    number: number;
    teacherData: {
        loading: boolean;
        error: any | null;
        data: any;
    };
    managerData: {
        loading: boolean;
        error: any | null;
        data: any;
    };
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    number: 10,
    teacherData: {
        loading: false,
        error: null,
        data: {}
    },
    managerData: {
        loading: false,
        error: null,
        data: {}
    },
    isLoggedIn: false
}

export const loginTeacher: any = createAsyncThunk(
    'authSlice/loginTeacher',
    async (payload: any) => {
        try {
            const response = await loginAsTeacher(payload)
            return response
        } catch (error) {
            return error
        }
    }
)

export const loginManager: any = createAsyncThunk(
    'authSlice/loginManager',
    async (payload: any) => {
        try {
            const response = await loginAsManager(payload)
            return response
        } catch (error) {
            throw error
        }
    }
)

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        increment: (state) => {
            state.number = state.number + 1
        },
        setIsLogedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginTeacher.pending, (state) => {
                state.teacherData.loading = true
                state.teacherData.error = null
                state.isLoggedIn = false
            })
            .addCase(loginTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.teacherData.loading = false
                state.teacherData.data = action.payload
                state.teacherData.error = null
                state.isLoggedIn = true
            })
            .addCase(loginTeacher.rejected, (state, action) => {
                state.teacherData.loading = false
                state.teacherData.error = action.error
                state.isLoggedIn = false
            })
            .addCase(loginManager.pending, (state) => {
                state.managerData.loading = true
                state.managerData.error = null
                state.managerData.data = {}
                state.isLoggedIn = false
            })
            .addCase(loginManager.fulfilled, (state, action: PayloadAction<any>) => {
                state.managerData.loading = true
                state.managerData.data = action.payload
                state.managerData.error = null
                state.isLoggedIn = true
            })
            .addCase(loginManager.rejected, (state, action) => {
                state.managerData.loading = false
                state.managerData.data = {}
                state.managerData.error = action.error
                state.isLoggedIn = false
            })
    }
})

export const { increment, setIsLogedIn } = authSlice.actions
export default authSlice.reducer
