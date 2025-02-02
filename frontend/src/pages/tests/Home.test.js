import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../Home/Home';

describe('Home Component', () => {
  test('renders main sections', () => {
    render(<Home />);

    // Перевірка, що перший заголовок відображається
    expect(screen.getByText(/Capture Ideas Instantly/i)).toBeInTheDocument();

    // Перевірка, що другий заголовок відображається
    expect(screen.getByText(/Stay productive, wherever you are/i)).toBeInTheDocument();

    // Перевірка, що третій заголовок відображається
    expect(screen.getByText(/Get early access today/i)).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    render(<Home />);

    // Перевірка, що кнопка "Get Started" відображається
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();

    // Перевірка, що кнопка "See how Note Hub works" відображається
    expect(screen.getByText(/See how Note Hub works/i)).toBeInTheDocument();
  });

  test('renders footer content', () => {
    render(<Home />);

    // Перевірка, що контактний телефон відображається
    expect(screen.getByText(/Phone: \+1-878-157-123/i)).toBeInTheDocument();

    // Перевірка, що контактний email відображається
    expect(screen.getByText(/notehub@gmail.com/i)).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Home />);

    // Перевірка, що посилання на Facebook відображається
    expect(screen.getByText(/Facebook/i)).toBeInTheDocument();

    // Перевірка, що посилання на Twitter відображається
    expect(screen.getByText(/Twitter/i)).toBeInTheDocument();

    // Перевірка, що посилання на Instagram відображається
    expect(screen.getByText(/Instagram/i)).toBeInTheDocument();
  });

  test('renders founder quote section', () => {
    render(<Home />);

    // Перевірка, що цитата Стіва Джобса відображається
    expect(screen.getByText(/Note Hub has improved our team productivity/i)).toBeInTheDocument();

    // Перевірка, що ім'я Стіва Джобса відображається
    expect(screen.getByText(/Steve Jobs/i)).toBeInTheDocument();

    // Перевірка, що роль Стіва Джобса відображається
    expect(screen.getByText(/Founder & CEO, Apple/i)).toBeInTheDocument();
  });
});
