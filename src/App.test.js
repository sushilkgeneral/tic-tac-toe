import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import App from "./App";

describe('App Component', () => {
  test("renders the board element", () => {
    render(<App />);
    const element = screen.queryByTestId("board");
    expect(element).toBeInTheDocument();
  });
});

