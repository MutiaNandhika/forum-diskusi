import { Trophy } from 'lucide-react';

function LeaderboardItem({ user, score, rank }) {
  const getRankBadgeClass = (r) => {
    if (r === 1) return 'rank-1';
    if (r === 2) return 'rank-2';
    if (r === 3) return 'rank-3';
    return 'rank-other';
  };

  const userAvatar =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || 'User'
    )}&background=6366f1&color=fff`;

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        marginBottom: '12px',
        transition: 'var(--transition-fast)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span className={`leaderboard-rank-badge ${getRankBadgeClass(rank)}`}>
          {rank}
        </span>

        <img
          src={userAvatar}
          alt={user?.name}
          className="author-avatar"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || 'User'
            )}&background=6366f1&color=fff`;
          }}
        />

        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{user?.name}</h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            {user?.email}
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-chip)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <Trophy size={16} color="#fbbf24" />
        <span
          style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: 'var(--text-main)',
          }}
        >
          {score}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>pts</span>
      </div>
    </div>
  );
}

export default LeaderboardItem;
