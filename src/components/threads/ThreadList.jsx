import { MessageSquareDashed } from 'lucide-react';
import ThreadItem from './ThreadItem';

function ThreadList({
  threads = [],
  users = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  if (threads.length === 0) {
    return (
      <div className="card empty-state">
        <MessageSquareDashed size={48} className="empty-state-icon" />
        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-main)' }}>
          Belum ada diskusi di sini
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Jadilah yang pertama memulai topik diskusi baru!
        </p>
      </div>
    );
  }

  return (
    <div className="threads-list">
      {threads.map((thread) => {
        const user = users.find((u) => u.id === thread.ownerId) || {
          name: 'Pengguna Forum',
          avatar: '',
        };

        return (
          <ThreadItem
            key={thread.id}
            {...thread}
            user={user}
            authUserId={authUserId}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        );
      })}
    </div>
  );
}

export default ThreadList;
