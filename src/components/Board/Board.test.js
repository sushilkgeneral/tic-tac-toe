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

    test('clicking on an non-empty square does not update values & does not switches player', () => {
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
    })
});