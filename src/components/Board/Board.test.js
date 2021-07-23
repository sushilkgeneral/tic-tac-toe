import {cleanup, fireEvent, screen} from "@testing-library/react";
import { customRender } from "../../test-utils";
import Board from './Board';

afterEach(cleanup);

describe('Board component', () => {
    test('renders with the correct elements', () => {
        customRender(<Board />);

        const mainElement = screen.queryByTestId("board");
        expect(mainElement).toBeInTheDocument();

        const headingElement = screen.queryByText("Tic Tac Toe");
        expect(headingElement).toBeInTheDocument();

        const squares = screen.queryAllByTestId('square');
        expect(squares.length).toBe(9);

        const resetButton = screen.queryByText("Reset");
        expect(resetButton).toBeInTheDocument();

        const rewindButton = screen.queryByText("Rewind");
        expect(rewindButton).toBeInTheDocument();
    });

    test('clicking on an empty square updates the value & switches player', () => {
        customRender(<Board />);
        const squares = screen.queryAllByTestId('square');
        expect(screen.queryAllByText('X').length).toBe(0);
        expect(screen.queryAllByText('O').length).toBe(0);
        fireEvent.click(squares[0]);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(0);
        fireEvent.click(squares[1]);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(1);
    })

    test('clicking on a non-empty square does not update values & does not switch player', () => {
        customRender(<Board />);
        const squares = screen.queryAllByTestId('square');
        expect(screen.queryAllByText('X').length).toBe(0);
        expect(screen.queryAllByText('O').length).toBe(0);
        fireEvent.click(squares[3]);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(0);
        fireEvent.click(squares[3]);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(0);
    })

    test('clicking reset removes all values from the squares & sets player to X', () => {
        customRender(<Board />);
        const squares = screen.queryAllByTestId('square');
        expect(screen.queryAllByText('X').length).toBe(0);
        expect(screen.queryAllByText('O').length).toBe(0);
        fireEvent.click(squares[0]);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(0);
        fireEvent.click(squares[1]);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(1);

        const resetButton = screen.queryByText("Reset");
        fireEvent.click(resetButton);
        expect(screen.queryAllByText('X').length).toBe(0);
        expect(screen.queryAllByText('O').length).toBe(0);
        fireEvent.click(squares[0]);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(0);
    });

    test('clicking rewind will undo the last play', () => {
        customRender(<Board />);
        const squares = screen.queryAllByTestId('square');
        expect(screen.queryAllByText('X').length).toBe(0);
        expect(screen.queryAllByText('O').length).toBe(0);
        fireEvent.click(squares[0]);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(0);
        fireEvent.click(squares[1]);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(1);

        const rewindButton = screen.queryByText("Rewind");
        fireEvent.click(rewindButton);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(0);
        fireEvent.click(rewindButton);
        expect(screen.queryAllByText('X').length).toBe(0);
        expect(screen.queryAllByText('O').length).toBe(0);

        fireEvent.click(squares[0]);
        expect(screen.queryAllByText('X').length).toBe(1);
        expect(screen.queryAllByText('O').length).toBe(0);
    });

    test('displays X as the winner when X wins', () => {
        customRender(<Board />);
        const squares = screen.queryAllByTestId('square');
        fireEvent.click(squares[0]);
        fireEvent.click(squares[1]);
        fireEvent.click(squares[2]);
        fireEvent.click(squares[3]);
        fireEvent.click(squares[4]);
        fireEvent.click(squares[5]);
        fireEvent.click(squares[6]);
        fireEvent.click(squares[7]);
        fireEvent.click(squares[8]);

        const element = screen.queryByText("X wins!");
        expect(element).toBeInTheDocument();
    });

    test('displays O as the winner when O wins', () => {
        customRender(<Board />);
        const squares = screen.queryAllByTestId('square');

        fireEvent.click(squares[0]);
        fireEvent.click(squares[4]);
        fireEvent.click(squares[5]);
        fireEvent.click(squares[2]);
        fireEvent.click(squares[1]);
        fireEvent.click(squares[6]);

        const element = screen.queryByText("O wins!");
        expect(element).toBeInTheDocument();
    });

    test('displays that it is a tie when there is no winner', () => {
        customRender(<Board />);
        const squares = screen.queryAllByTestId('square');

        fireEvent.click(squares[0]);
        fireEvent.click(squares[4]);
        fireEvent.click(squares[5]);
        fireEvent.click(squares[2]);
        fireEvent.click(squares[1]);
        fireEvent.click(squares[3]);
        fireEvent.click(squares[6]);
        fireEvent.click(squares[7]);
        fireEvent.click(squares[8]);

        const element = screen.queryByText("Its a tie");
        expect(element).toBeInTheDocument();
    });
});