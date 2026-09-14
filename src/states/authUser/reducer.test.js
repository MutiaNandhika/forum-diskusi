/**
 * Skenario Pengujian authUserReducer:
 *
 * - authUserReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the authUser when given SET_AUTH_USER action
 *   - should return null when given UNSET_AUTH_USER action
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const fakeAuthUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: fakeAuthUser,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(fakeAuthUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: {
        authUser: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });
});
