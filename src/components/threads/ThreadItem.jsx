import { Link } from 'react-router-dom';
import { MessageSquare, Clock, Hash } from 'lucide-react';
import VoteButtons from '../votes/VoteButtons';
import { postedAt, stripHtml, truncateText } from '../../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy = [],
  downVotesBy = [],
  totalComments = 0,
  user = {},
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  const authorName = user?.name || 'Pengguna Forum';
  const authorAvatar =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      authorName
    )}&background=6366f1&color=fff`;

  const previewContent = truncateText(stripHtml(body), 180);

  return (
    <article className="card card-interactive" style={{ marginBottom: '16px' }}>
      <div className="thread-item-header">
        <div className="thread-item-author">
          <img
            src={authorAvatar}
            alt={authorName}
            className="author-avatar"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                authorName
              )}&background=6366f1&color=fff`;
            }}
          />
          <div>
            <h4 className="author-name">{authorName}</h4>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                color: 'var(--text-dim)',
              }}
            >
              <Clock size={12} />
              <span>{postedAt(createdAt)}</span>
            </div>
          </div>
        </div>

        {category && (
          <span className="thread-category-badge">
            <Hash size={12} />
            {category}
          </span>
        )}
      </div>

      <Link to={`/threads/${id}`} style={{ display: 'block' }}>
        <h3 className="thread-title">{title}</h3>
        <p className="thread-preview-body">{previewContent}</p>
      </Link>

      <div className="thread-footer">
        <div className="thread-actions">
          <VoteButtons
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            authUserId={authUserId}
            onUpVote={() => onUpVote(id)}
            onDownVote={() => onDownVote(id)}
          />
        </div>

        <Link
          to={`/threads/${id}`}
          className="comment-count-badge"
          title={`${totalComments} Komentar`}
        >
          <MessageSquare size={16} />
          <span>{totalComments} Komentar</span>
        </Link>
      </div>
    </article>
  );
}

export default ThreadItem;
