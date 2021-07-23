import { createSlice, configureStore } from "@reduxjs/toolkit";

const defaultValues = new Array(9).fill(null);

const initialState = {
    isPlayerX: true,
    values: defaultValues,
    history: [defaultValues],
    winner: null
};

const slice = createSlice({
    name: 'board',
    initialState: initialState,
    reducers: {
        handleClick(state, action) {
            const index = action.payload;
            if (state.values[index] === null) {
                state.values[index] = state.isPlayerX ? "X" : "O";
                state.history.push(state.values);
                state.isPlayerX = !state.isPlayerX;
            }
        },
        handleRewind(state) {
            if (state.history.length > 1) {
                state.history.pop();
                state.values = state.history[state.history.length - 1];
                state.isPlayerX = !state.isPlayerX;
            }
        },
        handleReset(state) {
            state.values = defaultValues;
            state.history = [defaultValues];
            state.isPlayerX = true;
            state.winner = null;
        }
    }
});

const store = configureStore({
    reducer: slice.reducer
});

export const actions = slice.actions;
export const reducer = slice.reducer;

export default store;