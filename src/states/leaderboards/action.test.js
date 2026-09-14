/**
 * Skenario Pengujian leaderboards thunk:
 *
 * - asyncReceiveLeaderboards thunk
 *   - should dispatch action correctly when leaderboards data fetching succeeds
 *   - should dispatch action and call alert correctly when leaderboards data fetching fails
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards,
} from './action';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    },
    score: 100,
  },
];

const fakeErrorResponse = new Error('Gagal mengambil data leaderboards');

describe('asyncReceiveLeaderboards thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;
    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when leaderboards data fetching succeeds', async () => {
    // arrange
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    const dispatch = vi.fn();

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when leaderboards data fetching fails', async () => {
    // arrange
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    window.alert = vi.fn();
    const dispatch = vi.fn();

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
