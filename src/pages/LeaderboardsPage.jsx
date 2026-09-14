import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trophy, Award } from 'lucide-react';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardList from '../components/leaderboards/LeaderboardList';

function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <section
        className="card"
        style={{
          marginBottom: '24px',
          background:
            'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)',
          borderColor: 'rgba(245, 158, 11, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #fbbf24, #d97706)',
              color: '#000',
              boxShadow: '0 8px 20px -4px rgba(245, 158, 11, 0.5)',
            }}
          >
            <Trophy size={26} />
          </div>
          <div>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '4px',
              }}
            >
              Klasemen Pengguna Aktif
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Daftar kontributor teratas dengan poin aktivitas diskusi tertinggi
              di Dicoding Forum.
            </p>
          </div>
        </div>
      </section>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          fontSize: '0.95rem',
          fontWeight: 700,
          color: 'var(--text-main)',
        }}
      >
        <Award size={18} color="var(--color-primary)" />
        <span>Peringkat Kontributor</span>
      </div>

      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
}

export default LeaderboardsPage;
