import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Quick Test', () => {
  test('basic test', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
