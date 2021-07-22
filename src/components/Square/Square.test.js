import {cleanup, render, screen} from "@testing-library/react";
import Square from "./Square";

afterEach(cleanup);

describe('Square Component', () => {
    test('renders a button', () => {
        render(<Square/>);
        const button = screen.queryByRole("button");
        expect(button).toBeInTheDocument();
    });

    test('renders the value passed through the props', () => {
        render(<Square value='X'/>);

        const button = screen.queryByText('X');
        expect(button).toBeInTheDocument();
    });
});