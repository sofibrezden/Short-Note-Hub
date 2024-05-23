import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cookies from 'js-cookie';
import Create from './Create';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mocking Cookies
jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

describe('Create Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements', () => {
    render(<Create />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
  });

  test('handles form submission failure', async () => {
    Cookies.get.mockReturnValue('1');

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Error Message' }),
      })
    );

    global.alert = jest.fn();

    render(<Create />);

    fireEvent.click(screen.getByRole('button', { name: /Create/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/create_note/', expect.any(Object));
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(alert).toHaveBeenCalledWith('Error Message');
    });
  });

  test('handles fetch error', async () => {
    Cookies.get.mockReturnValue('1');

    global.fetch = jest.fn(() => Promise.reject('Fetch Error'));

    global.alert = jest.fn();

    render(<Create />);

    fireEvent.click(screen.getByRole('button', { name: /Create/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/create_note/', expect.any(Object));
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(alert).toHaveBeenCalledWith('Something went wrong');
    });
  });
});
