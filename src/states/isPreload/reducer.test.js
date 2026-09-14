/**
 * Skenario Pengujian isPreloadReducer:
 *
 * - isPreloadReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the isPreload status when given SET_IS_PRELOAD action
 */

import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer function', () => {
  it('should return the initial state (true) when given an unknown action', () => {
    // arrange
    const initialState = true;
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toBe(true);
  });

  it('should return false when given SET_IS_PRELOAD action with false payload', () => {
    // arrange
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toBe(false);
  });
});
