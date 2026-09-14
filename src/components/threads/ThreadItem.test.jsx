/**
 * Skenario Pengujian ThreadItem component:
 *
 * - ThreadItem component
 *   - should render thread title, category badge, and author name correctly
 *   - should call onUpVote and onDownVote when vote buttons are clicked
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from './ThreadItem';

const mockThread = {
  id: 'thread-1',
  title: 'Tutorial Belajar React',
  body: 'Ini adalah panduan komprehensif belajar React bagi pemula sampai mahir.',
  category: 'react',
  createdAt: '2023-05-29T07:55:52.266Z',
  upVotesBy: ['user-1'],
  downVotesBy: [],
  totalComments: 3,
  user: {
    id: 'user-1',
    name: 'Jane Doe',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe',
  },
  authUserId: 'user-1',
};

describe('ThreadItem component', () => {
  it('should render thread title, category badge, and author name correctly', () => {
    // arrange
    render(
      <MemoryRouter>
        <ThreadItem {...mockThread} onUpVote={() => {}} onDownVote={() => {}} />
      </MemoryRouter>
    );

    // assert
    expect(screen.getByText('Tutorial Belajar React')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText(/3 Komentar/i)).toBeInTheDocument();
  });

  it('should call onUpVote and onDownVote when vote buttons are clicked', async () => {
    // arrange
    const mockOnUpVote = vi.fn();
    const mockOnDownVote = vi.fn();

    render(
      <MemoryRouter>
        <ThreadItem
          {...mockThread}
          onUpVote={mockOnUpVote}
          onDownVote={mockOnDownVote}
        />
      </MemoryRouter>
    );

    const upVoteBtn = screen.getByRole('button', { name: /upvote/i });
    const downVoteBtn = screen.getByRole('button', { name: /downvote/i });

    // action
    await userEvent.click(upVoteBtn);
    await userEvent.click(downVoteBtn);

    // assert
    expect(mockOnUpVote).toHaveBeenCalledWith('thread-1');
    expect(mockOnDownVote).toHaveBeenCalledWith('thread-1');
  });
});
