import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import SignUp from '../SignUp/SignUp';
import {MemoryRouter} from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

describe('Create Component', () => {
    test('renders registration form', () => {
        render(
            <MemoryRouter> {}
                <SignUp/>
            </MemoryRouter>
        );
        const firstNameInput = screen.getByPlaceholderText('Enter your first name');
        const lastNameInput = screen.getByPlaceholderText('Enter your last name');
        const usernameInput = screen.getByPlaceholderText('Enter your username');
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
        const registerButton = screen.getByRole('button', {name: 'Register'});

        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });

    test('submits registration form with valid data', async () => {
        render(
            <MemoryRouter> {}
                <SignUp/>
            </MemoryRouter>
        );
        const firstNameInput = screen.getByPlaceholderText('Enter your first name');
        const lastNameInput = screen.getByPlaceholderText('Enter your last name');
        const usernameInput = screen.getByPlaceholderText('Enter your username');
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
        const registerButton = screen.getByRole('button', {name: 'Register'});

        fireEvent.change(firstNameInput, {target: {value: 'John'}});
        fireEvent.change(lastNameInput, {target: {value: 'Doe'}});
        fireEvent.change(usernameInput, {target: {value: 'johndoe'}});
        fireEvent.change(emailInput, {target: {value: 'john@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'password123'}});
        fireEvent.change(confirmPasswordInput, {target: {value: 'password123'}});

        fireEvent.click(registerButton);

        // Assuming navigate function redirects the user, you may need to mock it
        await screen.findByPlaceholderText('Enter your first name');
    });
});
