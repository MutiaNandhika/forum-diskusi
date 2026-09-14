/**
 * Skenario Pengujian usersReducer:
 *
 * - usersReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the users when given RECEIVE_USERS action
 */

import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the users when given RECEIVE_USERS action', () => {
    // arrange
    const initialState = [];
    const fakeUsers = [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      },
      {
        id: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Doe',
      },
    ];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: fakeUsers,
      },
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(fakeUsers);
  });
});
