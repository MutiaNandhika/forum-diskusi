/**
 * Skenario Pengujian leaderboardsReducer:
 *
 * - leaderboardsReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the leaderboards when given RECEIVE_LEADERBOARDS action
 */

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards when given RECEIVE_LEADERBOARDS action', () => {
    // arrange
    const initialState = [];
    const fakeLeaderboards = [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe',
        },
        score: 100,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Doe',
        },
        score: 80,
      },
    ];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: fakeLeaderboards,
      },
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(fakeLeaderboards);
  });
});
