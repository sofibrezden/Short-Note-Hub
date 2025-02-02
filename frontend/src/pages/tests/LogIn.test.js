import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better expect assertions
import LogIn from '../LogIn/Login';
import {MemoryRouter} from "react-router-dom";


describe('LogIn component', () => {
    test('renders login form', () => {
        render(
            <MemoryRouter> {}
                <LogIn/>
            </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    test('submits login form with valid data', async () => {
        render(
            <MemoryRouter>
                <LogIn/>
            </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, {target: {value: 'johndoe'}});
        fireEvent.change(passwordInput, {target: {value: 'password123'}});

        const loginButton = screen.getByRole('button', {name: 'Login'});
        fireEvent.click(loginButton);


    });

});
