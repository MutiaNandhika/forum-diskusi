import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';

function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        className="brand-icon-box"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '20px',
        }}
      >
        <HelpCircle size={36} />
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>
        Halaman Tidak Ditemukan
      </h2>
      <p
        style={{
          color: 'var(--text-muted)',
          maxWidth: '460px',
          marginBottom: '28px',
        }}
      >
        Maaf, halaman yang Anda tuju tidak ditemukan atau mungkin telah
        dipindahkan.
      </p>
      <Link to="/" className="btn btn-primary">
        <Home size={18} />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  );
}

export default NotFoundPage;
