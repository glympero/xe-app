import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as useFetchModule from '../hooks/useFetch';
import Home from '../pages/Home';
import { PropertyType } from '../interfaces';

jest.mock('../hooks/useFetch');

describe('Home Page Tests', () => {
  beforeEach(() => {
    const mockUseFetch = useFetchModule.useFetch as jest.Mock;

    mockUseFetch.mockReturnValue({
      isValidating: false,
      data: [],
      error: null,
      mutate: jest.fn(),
    });
  });

  it('shows loading spinner when data is fetching', async () => {
    const mockUseFetch = useFetchModule.useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ isValidating: true });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('displays error message on fetch error', async () => {
    const mockUseFetch = useFetchModule.useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ error: true, mutate: jest.fn() });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Cannot load properties/i)).toBeInTheDocument();
  });

  it('shows no properties component when data is empty', async () => {
    const mockUseFetch = useFetchModule.useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: [] });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/No properties found/i)).toBeInTheDocument();
  });

  it('displays properties when data is fetched', async () => {
    const mockUseFetch = useFetchModule.useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({
      data: [
        {
          id: '1',
          title: 'Property 1',
          area: {
            placeId: 'placeId 1',
            mainText: 'mainText 1',
            secondaryText: 'secondaryText 1',
          },
          price: 100,
          type: PropertyType.Buy,
        },
        {
          id: '2',
          title: 'Property 2',
          area: {
            placeId: 'placeId 2',
            mainText: 'mainText 2',
            secondaryText: 'secondaryText 2',
          },
          price: 200,
          type: PropertyType.Donation,
        },
      ],
    });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Property 1')).toBeInTheDocument();
      expect(screen.getByText('Property 2')).toBeInTheDocument();
      expect(screen.getByText('100 €')).toBeInTheDocument();
      expect(screen.getByText('200 €')).toBeInTheDocument();
      expect(
        screen.getByText('mainText 1 - secondaryText 1')
      ).toBeInTheDocument();
      expect(
        screen.getByText('mainText 2 - secondaryText 2')
      ).toBeInTheDocument();
      expect(screen.getByText('Buy')).toBeInTheDocument();
      expect(screen.getByText('Donation')).toBeInTheDocument();
    });
  });
});
