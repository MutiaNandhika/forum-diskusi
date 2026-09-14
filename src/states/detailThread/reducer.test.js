/**
 * Skenario Pengujian detailThreadReducer:
 *
 * - detailThreadReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the detailThread when given RECEIVE_DETAIL_THREAD action
 *   - should return null when given CLEAR_DETAIL_THREAD action
 *   - should return detailThread with the new comment when given ADD_COMMENT action
 *   - should return detailThread with updated upVotesBy when given UP_VOTE_DETAIL_THREAD action
 *   - should return detailThread with updated downVotesBy when given DOWN_VOTE_DETAIL_THREAD action
 *   - should return detailThread with cleared votes when given NEUTRAL_VOTE_DETAIL_THREAD action
 *   - should return detailThread with upvoted comment when given UP_VOTE_COMMENT action
 *   - should return detailThread with downvoted comment when given DOWN_VOTE_COMMENT action
 *   - should return detailThread with neutral voted comment when given NEUTRAL_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import detailThreadReducer from './reducer';
import { ActionType } from './action';

describe('detailThreadReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the detailThread when given RECEIVE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = null;
    const fakeDetailThread = {
      id: 'thread-1',
      title: 'Thread Test',
      body: 'Body Test',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: {
        detailThread: fakeDetailThread,
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(fakeDetailThread);
  });

  it('should return null when given CLEAR_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Test',
    };
    const action = {
      type: ActionType.CLEAR_DETAIL_THREAD,
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return detailThread with the new comment when given ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      comments: [
        { id: 'comment-1', content: 'Komentar lama' },
      ],
    };
    const newComment = {
      id: 'comment-2',
      content: 'Komentar baru',
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments).toEqual([newComment, ...initialState.comments]);
  });

  it('should return detailThread with updated upVotesBy when given UP_VOTE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: [],
      downVotesBy: ['user-1'],
    };
    const action = {
      type: ActionType.UP_VOTE_DETAIL_THREAD,
      payload: {
        userId: 'user-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.upVotesBy).toEqual(['user-1']);
    expect(nextState.downVotesBy).toEqual([]);
  });

  it('should return detailThread with updated downVotesBy when given DOWN_VOTE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.DOWN_VOTE_DETAIL_THREAD,
      payload: {
        userId: 'user-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.downVotesBy).toEqual(['user-1']);
    expect(nextState.upVotesBy).toEqual([]);
  });

  it('should return detailThread with cleared votes when given NEUTRAL_VOTE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
      payload: {
        userId: 'user-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.upVotesBy).toEqual([]);
    expect(nextState.downVotesBy).toEqual([]);
  });

  it('should return detailThread with upvoted comment when given UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [
        {
          id: 'comment-1',
          content: 'Comment 1',
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ],
    };
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toEqual(['user-1']);
    expect(nextState.comments[0].downVotesBy).toEqual([]);
  });

  it('should return detailThread with downvoted comment when given DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [
        {
          id: 'comment-1',
          content: 'Comment 1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments[0].downVotesBy).toEqual(['user-1']);
    expect(nextState.comments[0].upVotesBy).toEqual([]);
  });

  it('should return detailThread with neutral voted comment when given NEUTRAL_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [
        {
          id: 'comment-1',
          content: 'Comment 1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toEqual([]);
    expect(nextState.comments[0].downVotesBy).toEqual([]);
  });
});
