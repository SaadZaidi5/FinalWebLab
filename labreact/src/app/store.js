// store.js
import { configureStore } from '@reduxjs/toolkit';
import dragonsReducer from './features/actions/dragonsSlice';
import missionsReducer from './features/actions/missionsSlice';

const store = configureStore({
    reducer: {
        dragons: dragonsReducer,
        missions: missionsReducer,

    },
});

export default store;
