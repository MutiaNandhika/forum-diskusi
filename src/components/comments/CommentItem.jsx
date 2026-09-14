import { Clock } from 'lucide-react';
import VoteButtons from '../votes/VoteButtons';
import { postedAt } from '../../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner = {},
  upVotesBy = [],
  downVotesBy = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  const authorName = owner?.name || 'Pengguna Forum';
  const authorAvatar =
    owner?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      authorName
    )}&background=6366f1&color=fff`;

  return (
    <div className="comment-item">
      <div className="thread-item-header" style={{ marginBottom: '8px' }}>
        <div className="thread-item-author">
          <img
            src={authorAvatar}
            alt={authorName}
            className="author-avatar author-avatar-sm"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                authorName
              )}&background=6366f1&color=fff`;
            }}
          />
          <div>
            <h5 className="author-name" style={{ fontSize: '0.9rem' }}>
              {authorName}
            </h5>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.78rem',
                color: 'var(--text-dim)',
              }}
            >
              <Clock size={11} />
              <span>{postedAt(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="comment-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <VoteButtons
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
        />
      </div>
    </div>
  );
}

export default CommentItem;
