import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  RECEIVE_DETAIL_THREAD: 'detailThread/receive',
  CLEAR_DETAIL_THREAD: 'detailThread/clear',
  ADD_COMMENT: 'detailThread/addComment',
  UP_VOTE_DETAIL_THREAD: 'detailThread/upVote',
  DOWN_VOTE_DETAIL_THREAD: 'detailThread/downVote',
  NEUTRAL_VOTE_DETAIL_THREAD: 'detailThread/neutralVote',
  UP_VOTE_COMMENT: 'detailThread/upVoteComment',
  DOWN_VOTE_COMMENT: 'detailThread/downVoteComment',
  NEUTRAL_VOTE_COMMENT: 'detailThread/neutralVoteComment',
};

export function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

export function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

export function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

export function upVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

export function downVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

export function neutralVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

export function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

export function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

export function neutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

export function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearDetailThreadActionCreator());
    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
      return { success: true, comment };
    } catch (error) {
      alert(error.message);
      return { success: false, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncToggleUpVoteDetailThread() {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote!');
      return;
    }
    if (!detailThread) return;

    const isUpvoted = detailThread.upVotesBy.includes(authUser.id);
    const isDownvoted = detailThread.downVotesBy.includes(authUser.id);

    // Optimistic dispatch
    if (isUpvoted) {
      dispatch(neutralVoteDetailThreadActionCreator(authUser.id));
    } else {
      dispatch(upVoteDetailThreadActionCreator(authUser.id));
    }

    try {
      if (isUpvoted) {
        await api.neutralVoteThread(detailThread.id);
      } else {
        await api.upVoteThread(detailThread.id);
      }
    } catch (error) {
      alert(error.message);
      // Revert optimistic update
      if (isUpvoted) {
        dispatch(upVoteDetailThreadActionCreator(authUser.id));
      } else if (isDownvoted) {
        dispatch(downVoteDetailThreadActionCreator(authUser.id));
      } else {
        dispatch(neutralVoteDetailThreadActionCreator(authUser.id));
      }
    }
  };
}

export function asyncToggleDownVoteDetailThread() {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote!');
      return;
    }
    if (!detailThread) return;

    const isUpvoted = detailThread.upVotesBy.includes(authUser.id);
    const isDownvoted = detailThread.downVotesBy.includes(authUser.id);

    // Optimistic dispatch
    if (isDownvoted) {
      dispatch(neutralVoteDetailThreadActionCreator(authUser.id));
    } else {
      dispatch(downVoteDetailThreadActionCreator(authUser.id));
    }

    try {
      if (isDownvoted) {
        await api.neutralVoteThread(detailThread.id);
      } else {
        await api.downVoteThread(detailThread.id);
      }
    } catch (error) {
      alert(error.message);
      // Revert optimistic update
      if (isDownvoted) {
        dispatch(downVoteDetailThreadActionCreator(authUser.id));
      } else if (isUpvoted) {
        dispatch(upVoteDetailThreadActionCreator(authUser.id));
      } else {
        dispatch(neutralVoteDetailThreadActionCreator(authUser.id));
      }
    }
  };
}

export function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote!');
      return;
    }
    if (!detailThread) return;

    const comment = detailThread.comments.find((c) => c.id === commentId);
    if (!comment) return;

    const isUpvoted = comment.upVotesBy.includes(authUser.id);
    const isDownvoted = comment.downVotesBy.includes(authUser.id);

    // Optimistic dispatch
    if (isUpvoted) {
      dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    } else {
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    try {
      if (isUpvoted) {
        await api.neutralVoteComment({ threadId: detailThread.id, commentId });
      } else {
        await api.upVoteComment({ threadId: detailThread.id, commentId });
      }
    } catch (error) {
      alert(error.message);
      // Revert optimistic update
      if (isUpvoted) {
        dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
      } else if (isDownvoted) {
        dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
      } else {
        dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    }
  };
}

export function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote!');
      return;
    }
    if (!detailThread) return;

    const comment = detailThread.comments.find((c) => c.id === commentId);
    if (!comment) return;

    const isUpvoted = comment.upVotesBy.includes(authUser.id);
    const isDownvoted = comment.downVotesBy.includes(authUser.id);

    // Optimistic dispatch
    if (isDownvoted) {
      dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    } else {
      dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    try {
      if (isDownvoted) {
        await api.neutralVoteComment({ threadId: detailThread.id, commentId });
      } else {
        await api.downVoteComment({ threadId: detailThread.id, commentId });
      }
    } catch (error) {
      alert(error.message);
      // Revert optimistic update
      if (isDownvoted) {
        dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
      } else if (isUpvoted) {
        dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
      } else {
        dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    }
  };
}
