/**
 * Skenario Pengujian RegisterInput component:
 *
 * - RegisterInput component
 *   - should handle input typing correctly
 *   - should show alert and not call register when passwords do not match
 *   - should call register function with correct arguments when submitted
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  it('should handle input typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('nama@email.com');
    const [passwordInput, confirmPasswordInput] =
      screen.getAllByPlaceholderText('••••••••');

    // action
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'secret123');
    await userEvent.type(confirmPasswordInput, 'secret123');

    // assert
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('secret123');
    expect(confirmPasswordInput).toHaveValue('secret123');
  });

  it('should show alert and not call register when passwords do not match', async () => {
    // arrange
    const mockRegister = vi.fn();
    window.alert = vi.fn();

    render(<RegisterInput register={mockRegister} />);
    const nameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('nama@email.com');
    const [passwordInput, confirmPasswordInput] =
      screen.getAllByPlaceholderText('••••••••');
    const submitButton = screen.getByRole('button', { name: /daftar sekarang/i });

    // action
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'secret123');
    await userEvent.type(confirmPasswordInput, 'differentsecret');
    await userEvent.click(submitButton);

    // assert
    expect(window.alert).toHaveBeenCalledWith('Konfirmasi kata sandi tidak cocok!');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should call register function with correct arguments when submitted', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('nama@email.com');
    const [passwordInput, confirmPasswordInput] =
      screen.getAllByPlaceholderText('••••••••');
    const submitButton = screen.getByRole('button', { name: /daftar sekarang/i });

    // action
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'secret123');
    await userEvent.type(confirmPasswordInput, 'secret123');
    await userEvent.click(submitButton);

    // assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secret123',
    });
  });
});
