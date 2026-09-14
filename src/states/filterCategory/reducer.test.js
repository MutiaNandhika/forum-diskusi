/**
 * Skenario Pengujian filterCategoryReducer:
 *
 * - filterCategoryReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the category when given SET_FILTER_CATEGORY action
 *   - should return empty string when given CLEAR_FILTER_CATEGORY action
 */

import { describe, it, expect } from 'vitest';
import filterCategoryReducer from './reducer';
import { ActionType } from './action';

describe('filterCategoryReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = '';
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = filterCategoryReducer(initialState, action);

    // assert
    expect(nextState).toBe(initialState);
  });

  it('should return the category string when given SET_FILTER_CATEGORY action', () => {
    // arrange
    const initialState = '';
    const action = {
      type: ActionType.SET_FILTER_CATEGORY,
      payload: {
        category: 'react',
      },
    };

    // action
    const nextState = filterCategoryReducer(initialState, action);

    // assert
    expect(nextState).toBe('react');
  });

  it('should return empty string when given CLEAR_FILTER_CATEGORY action', () => {
    // arrange
    const initialState = 'react';
    const action = {
      type: ActionType.CLEAR_FILTER_CATEGORY,
    };

    // action
    const nextState = filterCategoryReducer(initialState, action);

    // assert
    expect(nextState).toBe('');
  });
});
