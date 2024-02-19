import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import { BrowserRouter } from 'react-router-dom';

describe('Not found Page Tests', () => {
  it('displays the heading', async () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading')).toHaveTextContent(/404: Not Found/);
  });
});
