import { reducer, actions } from './store';

describe('Redux Store', () => {
    test('should return the initial state', () => {
        const defaultValues = new Array(9).fill(null);
        expect(reducer(undefined, {})).toEqual(
            {
                values: defaultValues,
            }
        )
    });
});


