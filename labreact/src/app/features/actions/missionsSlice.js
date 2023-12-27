// missionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
    const response = await fetch('https://api.spacexdata.com/v3/missions');
    const data = await response.json();
    return data;
});

export const bookMission = createAsyncThunk('missions/bookMission', async (missionId) => {
    return missionId;
});

export const cancelBooking = createAsyncThunk('missions/cancelBooking', async (missionId) => {
    return missionId;
});

const missionsSlice = createSlice({
    name: 'missions',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMissions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMissions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.map((mission) => ({ ...mission, isBooked: false }));
            })
            .addCase(fetchMissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(bookMission.fulfilled, (state, action) => {
                const missionId = action.payload;
                state.data = state.data.map((mission) =>
                    mission.mission_id === missionId ? { ...mission, isBooked: true } : mission
                );
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                const missionId = action.payload;
                state.data = state.data.map((mission) =>
                    mission.mission_id === missionId ? { ...mission, isBooked: false } : mission
                );
            });
    },
});

export default missionsSlice.reducer;
