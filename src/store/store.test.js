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
    });

    describe('handleClick reducer function', () => {
        test('should update the state values at the index passed in the action payload with appropriate player', () => {
            const initialState1 = {
                isPlayerX: true,
                values: [null, null, null, null, null, null, null, null, null]
            }
            const expectedValues1 = [null, null, null, 'X', null, null, null, null, null];
            const newState1 = reducer(initialState1, actions.handleClick(3));
            expect(newState1.values).toStrictEqual(expectedValues1);

            const initialState2 = {
                isPlayerX: false,
                values: [null, null, null, null, null, null, null, null, null]
            }
            const expectedValues2 = [null, null, null, 'O', null, null, null, null, null];
            const newState2 = reducer(initialState2, actions.handleClick(3));
            expect(newState2.values).toStrictEqual(expectedValues2);
        });

        test('should not update the state if a value exists at the index passed in the action payload', () => {
            const initialState = {
                isPlayerX: true,
                values: [null, null, null, null, 'O', null, null, null, null]
            }
            const newState = reducer(initialState, actions.handleClick(4));
            expect(newState.values).toStrictEqual(initialState.values);
        });

        test('should switch player after updating the values', () => {
            const initialState = {
                isPlayerX: false,
                values: [null, null, null, null, 'X', null, null, null, null]
            }
            const newState = reducer(initialState, actions.handleClick(0));
            expect(newState.isPlayerX).toBeTruthy();
        });
    });

    test('handleReset reducer resets values & sets the player to X', () => {
        const initialState = {
            isPlayerX: false,
            values: [null, null, "O", null, 'X', null, null, null, null]
        }
        const newState = reducer(initialState, actions.handleReset());
        expect(newState.isPlayerX).toBeTruthy();
        expect(newState.values).toStrictEqual([null, null, null, null, null, null, null, null, null]);
    });

});


