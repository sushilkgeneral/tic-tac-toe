import { createSlice, configureStore } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'board',
    initialState: {},
    reducers: {}
});

const store = configureStore({
    reducer: slice.reducer
});

export const actions = slice.actions;
export const reducer = slice.reducer;

export default store;