/**
 * Skenario Pengujian threads thunks:
 *
 * - asyncReceiveThreads thunk
 *   - should dispatch action correctly when thread fetching succeeds
 *   - should dispatch action and call alert correctly when thread fetching fails
 *
 * - asyncAddThread thunk
 *   - should dispatch action correctly and return success true when thread creation succeeds
 *   - should dispatch action, call alert, and return success false when thread creation fails
 *
 * - asyncToggleUpVoteThread thunk
 *   - should dispatch upVote action and call api correctly when user has not upvoted
 *   - should dispatch neutralVote action and call api correctly when user already upvoted
 *   - should revert vote action and call alert when api call fails
 *
 * - asyncToggleDownVoteThread thunk
 *   - should dispatch downVote action and call api correctly when user has not downvoted
 *   - should dispatch neutralVote action and call api correctly when user already downvoted
 *   - should revert vote action and call alert when api call fails
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncReceiveThreads,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
} from './action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread 1',
    body: 'Konten 1',
    category: 'General',
    createdAt: '2023-05-29T07:55:52.266Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeNewThreadResponse = {
  id: 'thread-2',
  title: 'Thread 2',
  body: 'Konten 2',
  category: 'React',
  createdAt: '2023-05-29T07:55:52.266Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Gagal memproses data');

describe('threads thunks', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._createThread = api.createThread;
    api._upVoteThread = api.upVoteThread;
    api._downVoteThread = api.downVoteThread;
    api._neutralVoteThread = api.neutralVoteThread;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.createThread = api._createThread;
    api.upVoteThread = api._upVoteThread;
    api.downVoteThread = api._downVoteThread;
    api.neutralVoteThread = api._neutralVoteThread;

    delete api._getAllThreads;
    delete api._createThread;
    delete api._upVoteThread;
    delete api._downVoteThread;
    delete api._neutralVoteThread;
  });

  describe('asyncReceiveThreads thunk', () => {
    it('should dispatch action correctly when thread fetching succeeds', async () => {
      // arrange
      api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
      const dispatch = vi.fn();

      // action
      await asyncReceiveThreads()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        receiveThreadsActionCreator(fakeThreadsResponse)
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when thread fetching fails', async () => {
      // arrange
      api.getAllThreads = () => Promise.reject(fakeErrorResponse);
      window.alert = vi.fn();
      const dispatch = vi.fn();

      // action
      await asyncReceiveThreads()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncAddThread thunk', () => {
    it('should dispatch action correctly and return success true when thread creation succeeds', async () => {
      // arrange
      api.createThread = () => Promise.resolve(fakeNewThreadResponse);
      const dispatch = vi.fn();

      // action
      const result = await asyncAddThread({
        title: 'Thread 2',
        body: 'Konten 2',
        category: 'React',
      })(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        addThreadActionCreator(fakeNewThreadResponse)
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toEqual({ success: true, thread: fakeNewThreadResponse });
    });

    it('should dispatch action, call alert, and return success false when thread creation fails', async () => {
      // arrange
      api.createThread = () => Promise.reject(fakeErrorResponse);
      window.alert = vi.fn();
      const dispatch = vi.fn();

      // action
      const result = await asyncAddThread({
        title: 'Thread 2',
        body: 'Konten 2',
      })(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toEqual({
        success: false,
        message: fakeErrorResponse.message,
      });
    });
  });

  describe('asyncToggleUpVoteThread thunk', () => {
    it('should dispatch upVote action and call api correctly when user has not upvoted', async () => {
      // arrange
      api.upVoteThread = vi.fn().mockResolvedValue({});
      const dispatch = vi.fn();
      const getState = () => ({
        authUser: { id: 'user-1' },
        threads: [
          {
            id: 'thread-1',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      });

      // action
      await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(
        upVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
      );
      expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
    });

    it('should dispatch neutralVote action and call api correctly when user already upvoted', async () => {
      // arrange
      api.neutralVoteThread = vi.fn().mockResolvedValue({});
      const dispatch = vi.fn();
      const getState = () => ({
        authUser: { id: 'user-1' },
        threads: [
          {
            id: 'thread-1',
            upVotesBy: ['user-1'],
            downVotesBy: [],
          },
        ],
      });

      // action
      await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
      );
      expect(api.neutralVoteThread).toHaveBeenCalledWith('thread-1');
    });

    it('should revert vote action and call alert when api call fails', async () => {
      // arrange
      api.upVoteThread = vi.fn().mockRejectedValue(fakeErrorResponse);
      window.alert = vi.fn();
      const dispatch = vi.fn();
      const getState = () => ({
        authUser: { id: 'user-1' },
        threads: [
          {
            id: 'thread-1',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      });

      // action
      await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

      // assert
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
      );
    });
  });

  describe('asyncToggleDownVoteThread thunk', () => {
    it('should dispatch downVote action and call api correctly when user has not downvoted', async () => {
      // arrange
      api.downVoteThread = vi.fn().mockResolvedValue({});
      const dispatch = vi.fn();
      const getState = () => ({
        authUser: { id: 'user-1' },
        threads: [
          {
            id: 'thread-1',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      });

      // action
      await asyncToggleDownVoteThread('thread-1')(dispatch, getState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(
        downVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
      );
      expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
    });

    it('should dispatch neutralVote action and call api correctly when user already downvoted', async () => {
      // arrange
      api.neutralVoteThread = vi.fn().mockResolvedValue({});
      const dispatch = vi.fn();
      const getState = () => ({
        authUser: { id: 'user-1' },
        threads: [
          {
            id: 'thread-1',
            upVotesBy: [],
            downVotesBy: ['user-1'],
          },
        ],
      });

      // action
      await asyncToggleDownVoteThread('thread-1')(dispatch, getState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
      );
      expect(api.neutralVoteThread).toHaveBeenCalledWith('thread-1');
    });

    it('should revert vote action and call alert when api call fails', async () => {
      // arrange
      api.downVoteThread = vi.fn().mockRejectedValue(fakeErrorResponse);
      window.alert = vi.fn();
      const dispatch = vi.fn();
      const getState = () => ({
        authUser: { id: 'user-1' },
        threads: [
          {
            id: 'thread-1',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      });

      // action
      await asyncToggleDownVoteThread('thread-1')(dispatch, getState);

      // assert
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
      );
    });
  });
});
