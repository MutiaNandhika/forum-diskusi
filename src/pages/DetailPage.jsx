import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import {
  asyncReceiveDetailThread,
  asyncToggleUpVoteDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncAddComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from '../states/detailThread/action';
import ThreadDetail from '../components/threads/ThreadDetail';
import CommentInput from '../components/comments/CommentInput';
import CommentList from '../components/comments/CommentList';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { detailThread = null, authUser = null } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [id, dispatch]);

  function onUpVoteThread() {
    dispatch(asyncToggleUpVoteDetailThread());
  }

  function onDownVoteThread() {
    dispatch(asyncToggleDownVoteDetailThread());
  }

  function onAddComment(content) {
    dispatch(asyncAddComment({ threadId: id, content }));
  }

  function onUpVoteComment(commentId) {
    dispatch(asyncToggleUpVoteComment(commentId));
  }

  function onDownVoteComment(commentId) {
    dispatch(asyncToggleDownVoteComment(commentId));
  }

  if (!detailThread) {
    return null;
  }

  return (
    <div className="detail-page" style={{ maxWidth: '840px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            transition: 'var(--transition-fast)',
          }}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Daftar Diskusi</span>
        </Link>
      </div>

      <ThreadDetail
        {...detailThread}
        authUserId={authUser?.id}
        onUpVote={onUpVoteThread}
        onDownVote={onDownVoteThread}
      />

      <CommentInput authUser={authUser} onAddComment={onAddComment} />

      <CommentList
        comments={detailThread.comments}
        authUserId={authUser?.id}
        onUpVote={onUpVoteComment}
        onDownVote={onDownVoteComment}
      />
    </div>
  );
}

export default DetailPage;
