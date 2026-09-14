import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

function NewThreadPage() {
  const [title, handleTitleChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');
  const [body, handleBodyChange] = useInput('');

  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert('Judul dan isi konten tidak boleh kosong!');
      return;
    }

    const result = await dispatch(
      asyncAddThread({
        title,
        body,
        category: category.trim().toLowerCase(),
      })
    );

    if (result && result.success) {
      navigate('/');
    }
  }

  if (!authUser) return null;

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
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
          }}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="card">
        <div style={{ marginBottom: '24px' }}>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '6px',
            }}
          >
            <PlusCircle size={24} color="var(--color-primary)" />
            <span>Buat Topik Diskusi Baru</span>
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Mulai diskusi baru atau tanyakan pertanyaan teknis kepada komunitas.
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title-input">
              Judul Diskusi
            </label>
            <input
              id="title-input"
              type="text"
              className="form-input"
              placeholder="Contoh: Bagaimana cara optimasi rendering di React?"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category-input">
              Kategori / Tag (Opsional)
            </label>
            <input
              id="category-input"
              type="text"
              className="form-input"
              placeholder="Contoh: react, redux, javascript, web-dev"
              value={category}
              onChange={handleCategoryChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="body-input">
              Isi Diskusi
            </label>
            <textarea
              id="body-input"
              className="form-textarea"
              placeholder="Jelaskan pertanyaan atau topik diskusi Anda secara rinci..."
              value={body}
              onChange={handleBodyChange}
              rows={8}
              required
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Publikasikan Diskusi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewThreadPage;
