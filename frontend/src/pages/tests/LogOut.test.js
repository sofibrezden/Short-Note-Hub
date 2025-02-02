import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LogOut from '../LogOut/Logout';
import '@testing-library/jest-dom/extend-expect';

describe('LogOut component', () => {
  it('renders the logged out message', () => {
    const { getByText } = render(<LogOut />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Logged Out')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('You have been successfully logged out of your account.')).toBeInTheDocument();
  });


  it('handles errors during the logout process', async () => {
    // Mock the fetch function to simulate an error
    global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch')));

    // Mock console.error
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { getByText } = render(<LogOut />);

    // Simulate click on the login again link
      // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText('Log in again'));

    // Ensure that the error message is logged to the console
    await waitFor(() =>
      expect(consoleErrorMock).toHaveBeenCalledWith('Error during logout request:', expect.any(Error))
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });
});
