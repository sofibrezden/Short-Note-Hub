import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Statistics from '../Statistics/Statistics';

// Mocking Cookies
jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

// Mocking useState
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Statistics Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders note groups correctly', () => {
    const mockNotes = [
      { title: 'Note 1', content: 'Content 1', created_at: '2024-05-20T12:00:00Z' },
      { title: 'Note 2', content: 'Content 2', created_at: '2024-05-20T14:00:00Z' },
      { title: 'Note 3', content: 'Content 3', created_at: '2024-05-21T10:00:00Z' },
    ];

    // Мокуємо значення, яке повертає useState
    useState.mockReturnValueOnce([mockNotes, jest.fn()]);

    // Мокуємо значення, яке повертає Cookies.get
    Cookies.get.mockReturnValueOnce('1');

    render(<Statistics />);

    // Перевіряємо, що групи нотаток відображаються правильно
    expect(screen.getByText('May 20, 2024')).toBeInTheDocument();
    expect(screen.getByText('May 21, 2024')).toBeInTheDocument();

    // Перевіряємо, що нотатки в кожній групі відображаються правильно
    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.getByText('Note 3')).toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();
  });

  test('handles null or undefined note values', () => {
    const mockNotes = [
      { title: null, content: 'Content 1', created_at: '2024-05-20T12:00:00Z' },
      { title: 'Note 2', content: null, created_at: '2024-05-20T14:00:00Z' },
      { title: 'Note 3', content: 'Content 3', created_at: '2024-05-21T10:00:00Z' },
    ];

    useState.mockReturnValueOnce([mockNotes, jest.fn()]);
    Cookies.get.mockReturnValueOnce('1');

    render(<Statistics />);

    // Перевіряємо, що нотатки з нульовим або невизначеним заголовком або вмістом не відображаються
    expect(screen.queryByText('Note 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });
});
