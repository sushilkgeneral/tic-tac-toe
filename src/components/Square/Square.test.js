import {cleanup, fireEvent, render, screen} from "@testing-library/react";
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

    test('when button is clicked - calls the onClick function passed via props', () => {
        const handleClick = jest.fn()
        render(<Square onClick={handleClick}/>);

        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1)
    });
});