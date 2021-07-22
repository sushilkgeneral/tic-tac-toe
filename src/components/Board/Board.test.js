import {render, screen} from "@testing-library/react";
import Board from './Board';

describe('Board component', () => {
    test('renders a component with test id "board"', () => {
        render(<Board />);
        const element = screen.queryByTestId("board");
        expect(element).toBeInTheDocument();
    });
});