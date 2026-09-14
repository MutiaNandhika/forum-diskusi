import { ThumbsUp, ThumbsDown } from 'lucide-react';

function VoteButtons({
  upVotesBy = [],
  downVotesBy = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  const isUpvoted = authUserId ? upVotesBy.includes(authUserId) : false;
  const isDownvoted = authUserId ? downVotesBy.includes(authUserId) : false;

  return (
    <div className="vote-group">
      <button
        type="button"
        className={`vote-btn ${isUpvoted ? 'active-up' : ''}`}
        onClick={onUpVote}
        title="Upvote"
        aria-label="Upvote"
      >
        <ThumbsUp size={16} fill={isUpvoted ? 'currentColor' : 'none'} />
        <span>{upVotesBy.length}</span>
      </button>

      <button
        type="button"
        className={`vote-btn ${isDownvoted ? 'active-down' : ''}`}
        onClick={onDownVote}
        title="Downvote"
        aria-label="Downvote"
      >
        <ThumbsDown size={16} fill={isDownvoted ? 'currentColor' : 'none'} />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

export default VoteButtons;
