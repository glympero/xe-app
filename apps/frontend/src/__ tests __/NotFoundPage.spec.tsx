import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import { BrowserRouter } from 'react-router-dom';

test('Not found Page Tests', () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  expect(screen.getByRole('heading')).toHaveTextContent(/404: Not Found/);
});
