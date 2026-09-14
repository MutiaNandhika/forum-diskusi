import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MessageSquareCode } from 'lucide-react';
import { asyncRegisterUser } from '../states/authUser/action';
import RegisterInput from '../components/auth/RegisterInput';

function RegisterPage() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  async function onRegister({ name, email, password }) {
    const result = await dispatch(
      asyncRegisterUser({
        name,
        email,
        password,
      })
    );

    if (result && result.success) {
      alert('Pendaftaran berhasil! Silakan masuk dengan akun Anda.');
      navigate('/login');
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
          <h1 className="auth-title">Buat Akun Baru</h1>
          <p className="auth-subtitle">
            Bergabunglah dengan komunitas developer di Dicoding Forum.
          </p>
        </div>

        <RegisterInput register={onRegister} />

        <div className="auth-footer">
          Sudah memiliki akun? <Link to="/login">Masuk ke akun</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

