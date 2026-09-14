import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MessageSquareCode, Heart } from 'lucide-react';
import LoadingBar from './components/common/LoadingBar';
import { asyncPreloadProcess } from './states/isPreload/action';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import NewThreadPage from './pages/NewThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="preload-container">
        <div className="brand-icon-box" style={{ width: '56px', height: '56px' }}>
          <MessageSquareCode size={32} />
        </div>
        <div className="preload-spinner" />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Memuat aplikasi...
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <LoadingBar />

      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/new" element={<NewThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '28px 20px',
          textAlign: 'center',
          fontSize: '0.86rem',
          color: 'var(--text-dim)',
          background: 'var(--bg-surface)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Dibuat dengan</span>
            <Heart size={14} color="#f43f5e" fill="#f43f5e" />
            <span>untuk Proyek Submission Dicoding React Web Developer Expert</span>
          </div>
          <p>
            Dicoding Forum API &bull;{' '}
            <Link to="/" style={{ color: 'var(--text-muted)' }}>
              Beranda
            </Link>{' '}
            &bull;{' '}
            <Link to="/leaderboards" style={{ color: 'var(--text-muted)' }}>
              Klasemen
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
