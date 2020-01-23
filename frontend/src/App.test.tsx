import React from 'react';
import { render } from '@testing-library/react';
import BuilderPage from './pages/builder/BuilderPage';

test('renders learn react link', () => {
  const { getByText } = render(<BuilderPage />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
