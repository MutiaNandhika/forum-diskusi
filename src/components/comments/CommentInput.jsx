import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Lock } from 'lucide-react';

function CommentInput({ authUser, onAddComment }) {
  const [content, setContent] = useState('');

  if (!authUser) {
    return (
      <div
        className="card"
        style={{
          textAlign: 'center',
          padding: '24px',
          marginBottom: '24px',
          background: 'var(--bg-chip)',
          borderStyle: 'dashed',
        }}
      >
        <Lock
          size={28}
          style={{ margin: '0 auto 12px auto', color: 'var(--text-dim)' }}
        />
        <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>
          Ingin ikut berdiskusi?
        </h4>
        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            marginBottom: '16px',
          }}
        >
          Silakan masuk terlebih dahulu untuk memberikan komentar pada diskusi
          ini.
        </p>
        <Link to="/login" className="btn btn-primary btn-sm">
          Masuk Sekarang
        </Link>
      </div>
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    onAddComment(content);
    setContent('');
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{ marginBottom: '24px' }}>
      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px' }}>
        Beri Tanggapan
      </h4>
      <div className="form-group" style={{ marginBottom: '14px' }}>
        <textarea
          className="form-textarea"
          placeholder="Tulis pendapat atau tanggapan Anda di sini..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          required
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn btn-primary btn-sm">
          <Send size={15} />
          <span>Kirim Tanggapan</span>
        </button>
      </div>
    </form>
  );
}

export default CommentInput;
