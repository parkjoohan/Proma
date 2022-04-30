import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export type LoginState = {
    loginList: any;
};

const initialState: LoginState = {
    loginList: [],
};

export const getLoginList = createAsyncThunk(
    "GET/LOGIN",
    async (_, { rejectWithValue }) => {
        return await axios
        .get(`${BACKEND_URL}/login`, {
            headers: {
            // JWT: `Bearer ${token}`,
            },
        })
        .then((res) => res.data)
        .catch((err) => rejectWithValue(err.response.data));
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLoginList.fulfilled, (state, { payload }) => {
        state.loginList = payload.loginList;
        });
    },
});

export default loginSlice.reducer;