import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NewProperty from '../pages/NewProperty';
import { MemoryRouter } from 'react-router-dom';

jest.mock('ky', () => {
  return {
    post: jest.fn(),
    patch: jest.fn(),
  };
});

describe('NewProperty Page Tests', () => {
  it('displays the heading', async () => {
    render(
      <MemoryRouter>
        <NewProperty />
      </MemoryRouter>
    );
    expect(screen.getByText('New Listing')).toBeInTheDocument();
  });

  it('renders the PropertyForm component', async () => {
    render(
      <MemoryRouter>
        <NewProperty />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
