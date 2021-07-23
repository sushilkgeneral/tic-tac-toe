import { createSlice, configureStore } from "@reduxjs/toolkit";

const defaultValues = new Array(9).fill(null);

const initialState = {
    isPlayerX: true,
    values: defaultValues,
};

const slice = createSlice({
    name: 'board',
    initialState: initialState,
    reducers: {}
});

const store = configureStore({
    reducer: slice.reducer
});

export const actions = slice.actions;
export const reducer = slice.reducer;

export default store;