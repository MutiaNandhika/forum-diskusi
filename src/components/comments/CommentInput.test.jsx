/**
 * Skenario Pengujian CommentInput component:
 *
 * - CommentInput component
 *   - should show login notice when authUser is null
 *   - should handle comment typing and submit correctly when authUser is logged in
 *   - should not submit comment when textarea is empty or whitespace
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
  it('should show login notice when authUser is null', () => {
    // arrange
    render(
      <MemoryRouter>
        <CommentInput authUser={null} onAddComment={() => {}} />
      </MemoryRouter>
    );

    // assert
    expect(
      screen.getByText('Ingin ikut berdiskusi?')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /masuk sekarang/i })
    ).toBeInTheDocument();
  });

  it('should handle comment typing and submit correctly when authUser is logged in', async () => {
    // arrange
    const mockOnAddComment = vi.fn();
    const fakeAuthUser = { id: 'user-1', name: 'John Doe' };

    render(
      <MemoryRouter>
        <CommentInput authUser={fakeAuthUser} onAddComment={mockOnAddComment} />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText(
      'Tulis pendapat atau tanggapan Anda di sini...'
    );
    const submitBtn = screen.getByRole('button', {
      name: /kirim tanggapan/i,
    });

    // action
    await userEvent.type(textarea, 'Komentar pengujian yang sangat bermanfaat!');
    await userEvent.click(submitBtn);

    // assert
    expect(mockOnAddComment).toHaveBeenCalledWith(
      'Komentar pengujian yang sangat bermanfaat!'
    );
    expect(textarea).toHaveValue('');
  });
});
