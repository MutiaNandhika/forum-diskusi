import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MessageSquareCode } from 'lucide-react';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/auth/LoginInput';

function LoginPage() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  async function onLogin({ email, password }) {
    const result = await dispatch(asyncSetAuthUser({ email, password }));
    if (result && result.success) {
      navigate('/');
    }
  }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div
            className="brand-icon-box"
            style={{ width: '48px', height: '48px', margin: '0 auto 16px auto' }}
          >
            <MessageSquareCode size={26} />
          </div>
          <h1 className="auth-title">Selamat Datang Kembali</h1>
          <p className="auth-subtitle">
            Masuk ke akun Anda untuk mulai berdiskusi dan berbagi solusi.
          </p>
        </div>

        <LoginInput login={onLogin} />

        <div className="auth-footer">
          Belum memiliki akun? <Link to="/register">Daftar sekarang</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

