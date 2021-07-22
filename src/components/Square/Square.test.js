import {render, screen} from "@testing-library/react";
import Square from "./Square";

describe('Square Component', () => {
    test('', () => {
        render(<Square/>);

        const button = screen.queryByRole("button");
        expect(button).toBeInTheDocument();
    });
});