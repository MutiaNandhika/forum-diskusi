import { Clock, Hash } from 'lucide-react';
import VoteButtons from '../votes/VoteButtons';
import { postedAt } from '../../utils';

function ThreadDetail({
  title,
  body,
  category,
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
    <article className="card" style={{ marginBottom: '24px' }}>
      <div className="thread-item-header">
        <div className="thread-item-author">
          <img
            src={authorAvatar}
            alt={authorName}
            className="author-avatar author-avatar-lg"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                authorName
              )}&background=6366f1&color=fff`;
            }}
          />
          <div>
            <h3 className="author-name" style={{ fontSize: '1.05rem' }}>
              {authorName}
            </h3>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.84rem',
                color: 'var(--text-dim)',
              }}
            >
              <Clock size={13} />
              <span>Dibuat {postedAt(createdAt)}</span>
            </div>
          </div>
        </div>

        {category && (
          <span className="thread-category-badge">
            <Hash size={13} />
            {category}
          </span>
        )}
      </div>

      <h1
        style={{
          fontSize: '1.6rem',
          fontWeight: 800,
          marginTop: '16px',
          marginBottom: '16px',
          letterSpacing: '-0.02em',
          lineHeight: 1.35,
        }}
      >
        {title}
      </h1>

      <div
        className="detail-thread-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <div className="thread-footer">
        <div className="thread-actions">
          <VoteButtons
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            authUserId={authUserId}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </div>
      </div>
    </article>
  );
}

export default ThreadDetail;
