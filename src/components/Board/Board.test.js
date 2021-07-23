import { screen} from "@testing-library/react";
import { customRender } from "../../test-utils";
import Board from './Board';

describe('Board component', () => {
    test('renders with the correct elements', () => {
        customRender(<Board />);

        const mainElement = screen.queryByTestId("board");
        expect(mainElement).toBeInTheDocument();

        const headingElement = screen.queryByText("Tic Tac Toe");
        expect(headingElement).toBeInTheDocument();

        const squares = screen.queryAllByTestId('square');
        expect(squares.length).toBe(9);
    });
});