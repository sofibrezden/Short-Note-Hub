import React from 'react';
import { render, waitFor } from '@testing-library/react';
import List from './Notes';

// Mocking fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [{ fields: { title: 'Test Title', content: 'Test Content' } }] }),
  })
);

describe('List Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders without crashing', () => {
    render(<List />);
  });

  it('fetches data from the server on mount', async () => {
    render(<List />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
});
