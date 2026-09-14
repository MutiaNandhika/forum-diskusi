/**
 * Skenario Pengujian VoteButtons component:
 *
 * - VoteButtons component
 *   - should render vote counts correctly
 *   - should call onUpVote and onDownVote callback when clicked
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButtons from './VoteButtons';

describe('VoteButtons component', () => {
  it('should render vote counts correctly', () => {
    // arrange
    render(
      <VoteButtons
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        authUserId="user-1"
        onUpVote={() => {}}
        onDownVote={() => {}}
      />
    );

    // assert
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should call onUpVote and onDownVote callback when clicked', async () => {
    // arrange
    const mockOnUpVote = vi.fn();
    const mockOnDownVote = vi.fn();

    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={mockOnUpVote}
        onDownVote={mockOnDownVote}
      />
    );

    const upVoteBtn = screen.getByRole('button', { name: /upvote/i });
    const downVoteBtn = screen.getByRole('button', { name: /downvote/i });

    // action
    await userEvent.click(upVoteBtn);
    await userEvent.click(downVoteBtn);

    // assert
    expect(mockOnUpVote).toHaveBeenCalledTimes(1);
    expect(mockOnDownVote).toHaveBeenCalledTimes(1);
  });
});
