import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { loginAsManager, loginAsTeacher } from "../../api/api";

interface LoginResponse {
  [key: string]: any;
}

interface LoginState {
  loading: boolean;
  error: string | null;
  data: LoginResponse | null;
}

interface AuthState {
  number: number;
  teacherData: LoginState;
  managerData: LoginState;
  isLoggedIn: boolean;
  whoLoggedIn: "" | "manager" | "teacher";
  loggedTeacher: LoginResponse | null;
}

const createInitialLoginState = (): LoginState => ({
  loading: false,
  error: null,
  data: null,
});

const initialState: AuthState = {
  number: 10,
  teacherData: createInitialLoginState(),
  managerData: createInitialLoginState(),
  isLoggedIn: false,
  whoLoggedIn: "",
  loggedTeacher: null,
};

export const loginTeacher = createAsyncThunk<
  LoginResponse,
  any,
  { rejectValue: string }
>("authSlice/loginTeacher", async (payload, { rejectWithValue }) => {
  try {
    return await loginAsTeacher(payload);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || error?.message || "Teacher login failed"
    );
  }
});

export const loginManager = createAsyncThunk<
  LoginResponse,
  any,
  { rejectValue: string }
>("authSlice/loginManager", async (payload, { rejectWithValue }) => {
  try {
    return await loginAsManager(payload);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || error?.message || "Manager login failed"
    );
  }
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setManagerData: (state, action: PayloadAction<any>) => {
      state.managerData.data = action.payload;
    },

    setTeacherData: (state, action: PayloadAction<any>) => {
      state.loggedTeacher = action.payload;
    },

    increment: (state) => {
      state.number += 1;
    },

    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },

    setWhoIsLoggedIn: (
      state,
      action: PayloadAction<"" | "manager" | "teacher">
    ) => {
      state.whoLoggedIn = action.payload;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.whoLoggedIn = "";
      state.loggedTeacher = null;
      state.teacherData = createInitialLoginState();
      state.managerData = createInitialLoginState();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginTeacher.pending, (state) => {
        state.teacherData.loading = true;
        state.teacherData.error = null;
      })
      .addCase(loginTeacher.fulfilled, (state, action) => {
        state.teacherData.loading = false;
        state.teacherData.error = null;
        state.teacherData.data = action.payload;
        state.loggedTeacher = action.payload;
        state.isLoggedIn = true;
        state.whoLoggedIn = "teacher";
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.teacherData.loading = false;
        state.teacherData.error =
          action.payload || action.error.message || "Teacher login failed";
      })
      .addCase(loginManager.pending, (state) => {
        state.managerData.loading = true;
        state.managerData.error = null;
      })
      .addCase(loginManager.fulfilled, (state, action) => {
        state.managerData.loading = false;
        state.managerData.error = null;
        state.managerData.data = action.payload;
        state.isLoggedIn = true;
        state.whoLoggedIn = "manager";
      })
      .addCase(loginManager.rejected, (state, action) => {
        state.managerData.loading = false;
        state.managerData.error =
          action.payload || action.error.message || "Manager login failed";
      });
  },
});

export const {
  increment,
  setIsLoggedIn,
  setWhoIsLoggedIn,
  setManagerData,
  setTeacherData,
  logout,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.authSlice;

export default authSlice.reducer;