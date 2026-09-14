import { MessageSquare } from 'lucide-react';
import CommentItem from './CommentItem';

function CommentList({
  comments = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  return (
    <div className="comments-section">
      <div className="comment-section-header">
        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <MessageSquare size={20} />
          <span>Tanggapan ({comments.length})</span>
        </h3>
      </div>

      {comments.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '32px',
            color: 'var(--text-dim)',
            background: 'var(--bg-chip)',
          }}
        >
          <p>Belum ada tanggapan untuk diskusi ini.</p>
        </div>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              {...comment}
              authUserId={authUserId}
              onUpVote={onUpVote}
              onDownVote={onDownVote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentList;
