import {render} from "../../test-utils";
import Button from "./Button";
import {cleanup, fireEvent, screen} from "@testing-library/react";

afterEach(cleanup);

describe('Button Component', () => {
    test('renders a button', () => {
        render(<Button/>);
        const button = screen.queryByRole("button");
        expect(button).toBeInTheDocument();
    });

    test('renders the value passed through the props', () => {
        render(<Button text='reset'/>);

        const button = screen.queryByText('reset');
        expect(button).toBeInTheDocument();
    });

    test('when button is clicked - calls the onClick function passed via props', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}/>);

        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1)
    });
});