import { ActionType } from './action';

export default function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_DETAIL_THREAD:
    return action.payload.detailThread;
  case ActionType.CLEAR_DETAIL_THREAD:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...detailThread,
      comments: [action.payload.comment, ...(detailThread?.comments || [])],
    };
  case ActionType.UP_VOTE_DETAIL_THREAD:
    return {
      ...detailThread,
      upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
        ? detailThread.upVotesBy
        : detailThread.upVotesBy.concat([action.payload.userId]),
      downVotesBy: detailThread.downVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
    };
  case ActionType.DOWN_VOTE_DETAIL_THREAD:
    return {
      ...detailThread,
      downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
        ? detailThread.downVotesBy
        : detailThread.downVotesBy.concat([action.payload.userId]),
      upVotesBy: detailThread.upVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
    };
  case ActionType.NEUTRAL_VOTE_DETAIL_THREAD:
    return {
      ...detailThread,
      upVotesBy: detailThread.upVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
      downVotesBy: detailThread.downVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
    };
  case ActionType.UP_VOTE_COMMENT:
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy
              : comment.upVotesBy.concat([action.payload.userId]),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return comment;
      }),
    };
  case ActionType.DOWN_VOTE_COMMENT:
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy
              : comment.downVotesBy.concat([action.payload.userId]),
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return comment;
      }),
    };
  case ActionType.NEUTRAL_VOTE_COMMENT:
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return comment;
      }),
    };
  default:
    return detailThread;
  }
}
