import { createSlice, configureStore } from "@reduxjs/toolkit";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

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
        },
        calculateWinner(state, action) {
            const values = action.payload;
            for (let i = 0; i < winningCombinations.length; i++) {
                const [a, b, c] = winningCombinations[i];
                if (values[a] && values[a] === values[b] && values[a] === values[c]) {
                    state.winner = values[a];
                    break;
                } else if (i === 7) {
                    state.winner = null;
                }
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