// myProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const myProfileSlice = createSlice({
    name: 'myProfile',
    initialState: {
        dragonsBooked: [],
        missionsBooked: [],
    },
    reducers: {
        bookDragon: (state, action) => {
            state.dragonsBooked.push(action.payload);
        },
        cancelDragonBooking: (state, action) => {
            state.dragonsBooked = state.dragonsBooked.filter((dragonId) => dragonId !== action.payload);
        },
        bookMission: (state, action) => {
            state.missionsBooked.push(action.payload);
        },
        cancelMissionBooking: (state, action) => {
            state.missionsBooked = state.missionsBooked.filter(
                (missionId) => missionId !== action.payload
            );
        },
    },
});

export const {
    bookDragon,
    cancelDragonBooking,
    bookMission,
    cancelMissionBooking,
} = myProfileSlice.actions;

export default myProfileSlice.reducer;
