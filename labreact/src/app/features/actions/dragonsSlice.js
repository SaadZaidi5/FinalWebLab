// dragonsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDragons = createAsyncThunk('dragons/fetchDragons', async () => {
    const response = await fetch('https://api.spacexdata.com/v4/dragons');
    const data = await response.json();
    return data;
});

export const bookDragon = createAsyncThunk('dragons/bookDragon', async (dragonId) => {
    return dragonId;
});

export const cancelBooking = createAsyncThunk('dragons/cancelBooking', async (dragonId) => {
    return dragonId;
});

const dragonsSlice = createSlice({
    name: 'dragons',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDragons.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDragons.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.map((dragon) => ({ ...dragon, isBooked: false }));
            })
            .addCase(fetchDragons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(bookDragon.fulfilled, (state, action) => {
                const dragonId = action.payload;
                state.data = state.data.map((dragon) =>
                    dragon.id === dragonId ? { ...dragon, isBooked: true } : dragon
                );
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                const dragonId = action.payload;
                state.data = state.data.map((dragon) =>
                    dragon.id === dragonId ? { ...dragon, isBooked: false } : dragon
                );
            });
    },
});

export default dragonsSlice.reducer;
