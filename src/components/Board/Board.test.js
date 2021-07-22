import {render, screen} from "@testing-library/react";
import Board from './Board';

describe('Board component', () => {
    test('renders a component with the right elements', () => {
        render(<Board />);

        const mainElement = screen.queryByTestId("board");
        expect(mainElement).toBeInTheDocument();

        const headingElement = screen.queryByText("Tic Tac Toe")
        expect(headingElement).toBeInTheDocument();
    });
});