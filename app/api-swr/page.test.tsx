import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Page from './page';

describe('Page component', () => {
  test('renders loading state initially', () => {
    render(<Page />);
    const loadingElement = screen.getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders error state if there is an error', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Fake error message'));
    
    render(<Page />);
    
    await waitFor(() => {
      const errorElement = screen.getByText(/fake error message/i);
      expect(errorElement).toBeInTheDocument();
    });
  });

  test('renders product list when data is loaded', async () => {
    const fakeData = [
      {
        id: 1,
        title: 'Fake Product 1',
        price: 10.99,
        description: 'Fake description 1',
        category: 'Fake category 1',
        image: 'fake_image_url_1.jpg',
      },
      {
        id: 2,
        title: 'Fake Product 2',
        price: 20.99,
        description: 'Fake description 2',
        category: 'Fake category 2',
        image: 'fake_image_url_2.jpg',
      },
    ];
    
    render(<Page />);
    
    await waitFor(() => {
      const productList = screen.getAllByRole('row');
      expect(productList).toHaveLength(fakeData.length + 1);
    });
  });
});
