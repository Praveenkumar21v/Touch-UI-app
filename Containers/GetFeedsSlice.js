import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async (payload, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }
        const response = await axios.post('https://touchapp.in/api/getFeeds', payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
});

const getFeedsSlice = createSlice({
    name: 'feed',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeeds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeeds.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchFeeds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default getFeedsSlice.reducer;
