import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from './page'; 
import useSWR from "swr";

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(() => ({ data: null, error: null, isLoading: true })),
}));

describe('Page Component', () => {
  it('renders loading state', () => {
    render(<Page />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('renders user data', async () => {
    const mockData = {
      results: [
        {
          name: { first: 'John', last: 'Doe' },
          picture: { large: 'https://example.com/image.jpg' },
          email: 'john.doe@example.com',
        },
      ],
    };

    (useSWR as jest.Mock).mockReturnValueOnce({
      data: mockData,
      error: null,
      isLoading: false,
    });

    render(<Page />);

    await screen.findByText('John Doe');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
  });
});
