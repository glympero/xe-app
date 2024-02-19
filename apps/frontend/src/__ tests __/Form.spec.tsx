import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PropertyForm from '../components/Form/PropertyForm';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { usePropertiesServices } from '../hooks/usePropertiesServices';
import { Property, PropertyType } from '../interfaces';

jest.mock('../hooks/usePropertiesServices', () => ({
  usePropertiesServices: jest.fn().mockReturnValue({
    isValidating: false,
    handleAsyncSubmit: jest.fn().mockResolvedValue({ res: true }),
    handleAsyncEdit: jest.fn().mockResolvedValue({ res: true }),
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PropertyForm Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const usePropertiesServicesModule = usePropertiesServices as jest.Mock;
    usePropertiesServicesModule.mockReturnValue({
      isValidating: false,
      handleAsyncSubmit: jest.fn().mockResolvedValue({ res: true }),
      handleAsyncEdit: jest.fn().mockResolvedValue({ res: true }),
    }) as jest.Mock;
  });

  it('renders all form fields', () => {
    render(
      <MemoryRouter>
        <PropertyForm />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Area/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price in Euros/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    // Add checks for other fields as necessary
  });

  it('validates required fields and shows error messages', async () => {
    render(
      <MemoryRouter>
        <PropertyForm />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Type is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Area is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Price is required/i)).toBeInTheDocument();
    });
  });

  it('navigates to the home page on successful submission', async () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => navigateMock);

    const property: Property = {
      id: 1,
      title: 'Test Property',
      type: PropertyType.Rent,
      area: {
        placeId: 'ChIJW-T',
        mainText: 'Berlin',
        secondaryText: 'Berlin, Germany',
      },
      price: '100000',
      description: 'Test Description',
    };
    render(
      <MemoryRouter>
        <PropertyForm property={property} />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });
});
