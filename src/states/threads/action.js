import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'threads/add',
  UP_VOTE_THREAD: 'threads/upVote',
  DOWN_VOTE_THREAD: 'threads/downVote',
  NEUTRAL_VOTE_THREAD: 'threads/neutralVote',
};

export function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

export function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

export function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function neutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function asyncReceiveThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return { success: true, thread };
    } catch (error) {
      alert(error.message);
      return { success: false, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote!');
      return;
    }

    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const isUpvoted = thread.upVotesBy.includes(authUser.id);
    const isDownvoted = thread.downVotesBy.includes(authUser.id);

    // Optimistic dispatch
    if (isUpvoted) {
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    } else {
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      if (isUpvoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      // Revert optimistic update
      if (isUpvoted) {
        dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
      } else if (isDownvoted) {
        dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
      } else {
        dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
  };
}

export function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote!');
      return;
    }

    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const isUpvoted = thread.upVotesBy.includes(authUser.id);
    const isDownvoted = thread.downVotesBy.includes(authUser.id);

    // Optimistic dispatch
    if (isDownvoted) {
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    } else {
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      if (isDownvoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      // Revert optimistic update
      if (isDownvoted) {
        dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
      } else if (isUpvoted) {
        dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
      } else {
        dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
  };
}
