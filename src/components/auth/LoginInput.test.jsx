/**
 * Skenario Pengujian LoginInput component:
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function with email and password when submit button is clicked
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByPlaceholderText('nama@email.com');

    // action
    await userEvent.type(emailInput, 'user@example.com');

    // assert
    expect(emailInput).toHaveValue('user@example.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('••••••••');

    // action
    await userEvent.type(passwordInput, 'secretpassword');

    // assert
    expect(passwordInput).toHaveValue('secretpassword');
  });

  it('should call login function with email and password when submit button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByPlaceholderText('nama@email.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByRole('button', { name: /masuk ke akun/i });

    // action
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'secretpassword');
    await userEvent.click(submitButton);

    // assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secretpassword',
    });
  });
});
