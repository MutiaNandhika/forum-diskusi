/**
 * Skenario Pengujian threadsReducer:
 *
 * - threadsReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the threads when given RECEIVE_THREADS action
 *   - should return the threads with the new thread when given ADD_THREAD action
 *   - should return the threads with the upvoted thread when given UP_VOTE_THREAD action
 *   - should return the threads with the downvoted thread when given DOWN_VOTE_THREAD action
 *   - should return the threads with the neutral voted thread when given NEUTRAL_VOTE_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const fakeThreads = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Konten thread pertama',
        category: 'General',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Konten thread kedua',
        category: 'React',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'user-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 1,
      },
    ];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: fakeThreads,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(fakeThreads);
  });

  it('should return the threads with the new thread when given ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Lama',
        body: 'Konten lama',
        category: 'General',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const newThread = {
      id: 'thread-2',
      title: 'Thread Baru',
      body: 'Konten baru',
      category: 'Redux',
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('should return the threads with the upvoted thread when given UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        upVotesBy: [],
        downVotesBy: ['user-1'],
      },
    ];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread 1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ]);
  });

  it('should return the threads with the downvoted thread when given DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread 1',
        upVotesBy: [],
        downVotesBy: ['user-1'],
      },
    ]);
  });

  it('should return the threads with the neutral voted thread when given NEUTRAL_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread 1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});
