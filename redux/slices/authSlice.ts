import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { loginAsManager, loginAsTeacher } from '../../api/api'
import { Staatliches } from 'next/font/google';

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
    whoLoggedIn: any;
    loggedTeacher: {
    };
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
    isLoggedIn: false,
    whoLoggedIn: "",
    loggedTeacher: {}
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
        setManagerData: (state, action) => {
            state.managerData = action.payload
        },
        setTeacherData: (state, action) => {
            state.loggedTeacher = action.payload
        },
        increment: (state) => {
            state.number = state.number + 1
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setWhoIsLoggedIn: (state, action) => {
            state.whoLoggedIn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginTeacher.pending, (state) => {
                state.teacherData.loading = true
                state.teacherData.error = null
            })
            .addCase(loginTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.teacherData.loading = false
                state.teacherData.data = action.payload
                state.teacherData.error = null

            })
            .addCase(loginTeacher.rejected, (state, action) => {
                state.teacherData.loading = false
                state.teacherData.error = action.error

            })
            .addCase(loginManager.pending, (state) => {
                state.managerData.loading = true
                state.managerData.error = null
                state.managerData.data = {}

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

export const { increment, setIsLoggedIn, setWhoIsLoggedIn, setManagerData, setTeacherData } = authSlice.actions
export default authSlice.reducer
