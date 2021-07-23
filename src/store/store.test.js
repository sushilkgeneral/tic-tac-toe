import { reducer, actions } from './store';

describe('Redux Store', () => {
    test('should return the initial state', () => {
        const initialState = reducer(undefined, {});
        expect(initialState.values.length).toBe(9);
        initialState.values.forEach(value => expect(value).toBeNull());
        expect(initialState.isPlayerX).toBeTruthy();
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
    });

});


