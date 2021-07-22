import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the root App component', () => {
  render(<App />);
  const element = screen.queryByTestId('tic-tac-toe-app')
  expect(element).toBeInTheDocument();
});
