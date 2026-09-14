/**
 * Skenario Pengujian LeaderboardItem component:
 *
 * - LeaderboardItem component
 *   - should render rank, user name, email, and score correctly
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeaderboardItem from './LeaderboardItem';

const mockUser = {
  id: 'users-1',
  name: 'Dimas Maulana',
  email: 'dimas@dicoding.com',
  avatar: 'https://ui-avatars.com/api/?name=Dimas+Maulana',
};

describe('LeaderboardItem component', () => {
  it('should render rank, user name, email, and score correctly', () => {
    // arrange
    render(<LeaderboardItem user={mockUser} score={250} rank={1} />);

    // assert
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Dimas Maulana')).toBeInTheDocument();
    expect(screen.getByText('dimas@dicoding.com')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
    expect(screen.getByText('pts')).toBeInTheDocument();
  });
});
