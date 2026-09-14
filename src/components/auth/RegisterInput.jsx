import { Mail, Lock, User, UserPlus } from 'lucide-react';
import useInput from '../../hooks/useInput';

function RegisterInput({ register }) {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [confirmPassword, handleConfirmPasswordChange] = useInput('');

  function onSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Konfirmasi kata sandi tidak cocok!');
      return;
    }

    register({ name, email, password });
  }

  return (
    <form onSubmit={onSubmit} className="register-input-form">
      <div className="form-group">
        <label className="form-label" htmlFor="name-input">
          Nama Lengkap
        </label>
        <div style={{ position: 'relative' }}>
          <User
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '14px',
              color: 'var(--text-dim)',
            }}
          />
          <input
            id="name-input"
            type="text"
            className="form-input"
            style={{ paddingLeft: '42px' }}
            placeholder="John Doe"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
      </div>

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
          Kata Sandi (Min. 6 Karakter)
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

      <div className="form-group">
        <label className="form-label" htmlFor="confirm-password-input">
          Konfirmasi Kata Sandi
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
            id="confirm-password-input"
            type="password"
            className="form-input"
            style={{ paddingLeft: '42px' }}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
        <UserPlus size={18} />
        <span>Daftar Sekarang</span>
      </button>
    </form>
  );
}

export default RegisterInput;
