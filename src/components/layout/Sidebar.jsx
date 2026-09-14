import { Link } from 'react-router-dom';
import { Trophy, Hash, Sparkles, ArrowRight } from 'lucide-react';

function Sidebar({
  categories = [],
  selectedCategory = '',
  onSelectCategory,
  leaderboards = [],
}) {
  const topLeaderboards = leaderboards.slice(0, 5);

  return (
    <aside className="sidebar">
      {/* Category Widget */}
      <div className="widget-card">
        <div className="widget-title">
          <Hash size={18} color="var(--color-primary)" />
          <span>Kategori Populer</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            type="button"
            className={`chip-item ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => onSelectCategory('')}
            style={{ fontSize: '0.82rem', padding: '5px 12px' }}
          >
            #semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip-item ${
                selectedCategory === cat ? 'active' : ''
              }`}
              onClick={() => onSelectCategory(cat)}
              style={{ fontSize: '0.82rem', padding: '5px 12px' }}
            >
              #{cat}
            </button>
          ))}
        </div>
      </div>

      {/* Top 5 Leaderboard Widget */}
      <div className="widget-card">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <div className="widget-title" style={{ marginBottom: 0 }}>
            <Trophy size={18} color="#fbbf24" />
            <span>Top Kontributor</span>
          </div>
          <Link
            to="/leaderboards"
            style={{
              fontSize: '0.82rem',
              color: 'var(--color-primary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span>Semua</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div>
          {topLeaderboards.map((item, index) => {
            const rank = index + 1;
            const badgeClass =
              rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';

            return (
              <div key={item.user.id} className="leaderboard-mini-item">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span className={`leaderboard-rank-badge ${badgeClass}`}>
                    {rank}
                  </span>
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="author-avatar author-avatar-sm"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        item.user.name
                      )}&background=6366f1&color=fff`;
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.user.name}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                  }}
                >
                  {item.score} <small style={{ color: 'var(--text-dim)', fontWeight: 400 }}>pts</small>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div
        className="widget-card"
        style={{
          background:
            'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
          borderColor: 'rgba(99, 102, 241, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={18} color="var(--color-primary)" />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Dicoding Forum App</h4>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Platform diskusi terbuka untuk para pengembang web React di Indonesia. Bagikan wawasan dan ajukan pertanyaan!
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
