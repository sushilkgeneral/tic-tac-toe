import { reducer, actions } from './store';

describe('Redux Store', () => {
    test('should return the initial state', () => {
        const initialState = reducer(undefined, {});
        expect(initialState.values.length).toBe(9);
        initialState.values.forEach(value => expect(value).toBeNull());
        expect(initialState.isPlayerX).toBeTruthy();

        const history = initialState.history;
        expect(history.length).toBe(1);
        expect(history[0]).toStrictEqual([null, null, null, null, null, null, null, null, null]);

        expect(initialState.winner).toBeNull();
    });

    describe('handleClick reducer function', () => {
        test('should update the state values at the index passed in the action payload with appropriate player', () => {
            const initialState1 = {
                isPlayerX: true,
                values: [null, null, null, null, null, null, null, null, null],
                history: [
                    [null, null, null, null, null, null, null, null, null]
                ]
            }
            const expectedValues1 = [null, null, null, 'X', null, null, null, null, null];
            const newState1 = reducer(initialState1, actions.handleClick(3));
            expect(newState1.values).toStrictEqual(expectedValues1);

            const initialState2 = {
                isPlayerX: false,
                values: [null, null, null, null, null, null, null, null, null],
                history: [
                    [null, null, null, null, null, null, null, null, null]
                ]
            }
            const expectedValues2 = [null, null, null, 'O', null, null, null, null, null];
            const newState2 = reducer(initialState2, actions.handleClick(3));
            expect(newState2.values).toStrictEqual(expectedValues2);
        });

        test('should not update the state if a value exists at the index passed in the action payload', () => {
            const initialState = {
                isPlayerX: true,
                values: [null, null, null, null, 'O', null, null, null, null],
                history: [
                    [null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, 'O', null, null, null, null]
                ]
            }
            const newState = reducer(initialState, actions.handleClick(4));
            expect(newState.values).toStrictEqual(initialState.values);
        });

        test('should switch player after updating the values', () => {
            const initialState = {
                isPlayerX: false,
                values: [null, null, null, null, 'X', null, null, null, null],
                history: [
                    [null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, 'X', null, null, null, null]
                ]
            }
            const newState = reducer(initialState, actions.handleClick(0));
            expect(newState.isPlayerX).toBeTruthy();
        });

        test('should push the current state values to history', () => {
            const initialState = {
                isPlayerX: true,
                values: [null, null, null, null, null, null, null, null, null],
                history: [
                    [null, null, null, null, null, null, null, null, null]
                ]
            }
            const newState = reducer(initialState, actions.handleClick(0));
            expect(newState.history.length).toBe(2);
            expect(newState.history[1][0]).toBe('X');
        });
    });

    test('handleReset reducer resets values, sets the player to X, resets history and resets winner', () => {
        const initialState = {
            isPlayerX: false,
            values: [null, null, "O", null, 'X', null, null, null, null],
            history: [
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, 'X', null, null, null, null],
                [null, null, "O", null, 'X', null, null, null, null]
            ]
        }
        const newState = reducer(initialState, actions.handleReset());
        expect(newState.isPlayerX).toBeTruthy();
        expect(newState.values).toStrictEqual([null, null, null, null, null, null, null, null, null]);
        expect(newState.history.length).toBe(1);
        expect(newState.winner).toBeNull();
    });

    test('handleRewind reducer removes last entry from history, switches player and sets values to the second last entry in history', () => {
        const initialState = {
            isPlayerX: true,
            values: [null, null, "O", null, 'X', null, null, null, null],
            history: [
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, 'X', null, null, null, null],
                [null, null, "O", null, 'X', null, null, null, null]
            ]
        }
        const newState = reducer(initialState, actions.handleRewind());
        expect(newState.isPlayerX).toBeFalsy();
        expect(newState.values).toStrictEqual([null, null, null, null, 'X', null, null, null, null]);
        expect(newState.history.length).toBe(2);
    });

    describe('calculateWinner reducer', () => {
        test('results in a winner if same values are at indices - 0, 1, 2', () => {
            const initialState = {
               winner: null
            }

            const newState = reducer(initialState, actions.calculateWinner(['X', 'X', 'X', null, null, null, null, null, null]));
            expect(newState.winner).not.toBeNull();
        });
        test('results in a winner if same values are at indices - 3, 4, 5', () => {
            const initialState = {
                winner: null
            }

            const newState = reducer(initialState, actions.calculateWinner([null, null, null, 'X', 'X', 'X', null, null, null]));
            expect(newState.winner).not.toBeNull();
        });
        test('results in a winner if same values are at indices - 6, 7, 8', () => {
            const initialState = {
                winner: null
            }

            const newState = reducer(initialState, actions.calculateWinner([null, null, null, null, null, null, 'X', 'X', 'X']));
            expect(newState.winner).not.toBeNull();
        });
        test('results in a winner if same values are at indices - 0, 3, 6', () => {
            const initialState = {
                winner: null
            }

            const newState = reducer(initialState, actions.calculateWinner(['X', null, null, 'X', null, null, 'X', null, null]));
            expect(newState.winner).not.toBeNull();
        });
        test('results in a winner if same values are at indices - 1, 4, 7', () => {
            const initialState = {
                winner: null
            }

            const newState = reducer(initialState, actions.calculateWinner([null, 'X', null, null, 'X', null, null, 'X', null]));
            expect(newState.winner).not.toBeNull();
        });
        test('results in a winner if same values are at indices - 2, 5, 8', () => {
            const initialState = {
                winner: null
            }

            const newState = reducer(initialState, actions.calculateWinner([null, null, 'X', null, null, 'X', null, null, 'X']));
            expect(newState.winner).not.toBeNull();
        });
        test('results in a winner if same values are at indices - 0, 4, 8', () => {
            const initialState = {
                winner: null
            }

            const newState = reducer(initialState, actions.calculateWinner(['X', null, null, null, 'X', null, null, null, 'X']));
            expect(newState.winner).not.toBeNull();
        });
        test('results in a winner if same values are at indices - 2, 4, 6', () => {
            const initialState = {
                winner: null
            }

            const newState = reducer(initialState, actions.calculateWinner([null, null, 'X', null, 'X', null, 'X', null, null]));
            expect(newState.winner).not.toBeNull();
        });
    });
});


