import { Mail, Lock, LogIn } from 'lucide-react';
import useInput from '../../hooks/useInput';

function LoginInput({ login }) {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  function onSubmit(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <form onSubmit={onSubmit} className="login-input-form">
      <div className="form-group">
        <label className="form-label" htmlFor="email-input">
          Alamat Email
        </label>
        <div style={{ position: 'relative' }}>
          <Mail
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '14px',
              color: 'var(--text-dim)',
            }}
          />
          <input
            id="email-input"
            type="email"
            className="form-input"
            style={{ paddingLeft: '42px' }}
            placeholder="nama@email.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password-input">
          Kata Sandi
        </label>
        <div style={{ position: 'relative' }}>
          <Lock
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '14px',
              color: 'var(--text-dim)',
            }}
          />
          <input
            id="password-input"
            type="password"
            className="form-input"
            style={{ paddingLeft: '42px' }}
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
            required
            minLength={6}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '8px', padding: '12px' }}
      >
        <LogIn size={18} />
        <span>Masuk ke Akun</span>
      </button>
    </form>
  );
}

export default LoginInput;
