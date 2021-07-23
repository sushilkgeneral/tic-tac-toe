import { createSlice, configureStore } from "@reduxjs/toolkit";

const defaultValues = new Array(9).fill(null);

const initialState = {
    isPlayerX: true,
    values: defaultValues,
};

const slice = createSlice({
    name: 'board',
    initialState: initialState,
    reducers: {
        handleClick(state, action) {
            const index = action.payload;
            if (state.values[index] === null) {
                state.values[index] = state.isPlayerX ? "X" : "O";
            }
        }
    }
});

const store = configureStore({
    reducer: slice.reducer
});

export const actions = slice.actions;
export const reducer = slice.reducer;

export default store;