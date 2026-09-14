import { Trophy } from 'lucide-react';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ leaderboards = [] }) {
  if (leaderboards.length === 0) {
    return (
      <div className="card empty-state">
        <Trophy size={48} className="empty-state-icon" />
        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
          Belum ada data klasemen
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Klasemen kontributor teratas akan tampil di sini.
        </p>
      </div>
    );
  }

  return (
    <div className="leaderboards-list">
      {leaderboards.map((item, index) => (
        <LeaderboardItem
          key={item.user.id}
          user={item.user}
          score={item.score}
          rank={index + 1}
        />
      ))}
    </div>
  );
}

export default LeaderboardList;
