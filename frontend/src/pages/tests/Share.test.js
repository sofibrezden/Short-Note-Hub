import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Share from './Share';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

describe('Share component', () => {
  beforeEach(() => {
    useNavigate.mockClear();
    Cookies.get.mockClear();
  });

  it('renders Share component correctly', () => {
    render(<Share />);
    expect(screen.getByText('Send Note to friend')).toBeInTheDocument();
  });
});
it('renders form elements correctly', () => {
    render(<Share />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Content')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('User')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('updates form state when inputs change', () => {
    render(<Share />);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Test Content' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Test Category' } });
    fireEvent.change(screen.getByLabelText('User'), { target: { value: 'Test User' } });

    expect(screen.getByLabelText('Title')).toHaveValue('Test Title');
    expect(screen.getByLabelText('Content')).toHaveValue('Test Content');
    expect(screen.getByLabelText('Category')).toHaveValue('Test Category');
    expect(screen.getByLabelText('User')).toHaveValue('Test User');
  });

