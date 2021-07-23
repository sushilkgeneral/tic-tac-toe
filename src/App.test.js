import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import App from "./App";

describe('App Component', () => {
  test("renders the element with 'tic-tac-toe-app' as test Id", () => {
    render(<App />);
    const element = screen.queryByTestId("tic-tac-toe-app");
    expect(element).toBeInTheDocument();
  });
});

