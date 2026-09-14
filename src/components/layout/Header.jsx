import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MessageSquareCode, Trophy, LogIn, LogOut, UserPlus, Flame } from 'lucide-react';
import { asyncUnsetAuthUser } from '../../states/authUser/action';

function Header() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  function onLogout() {
    dispatch(asyncUnsetAuthUser());
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand-logo">
          <div className="brand-icon-box">
            <MessageSquareCode size={22} />
          </div>
          <span>DicodingForum</span>
        </Link>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link-btn ${isActive ? 'active' : ''}`
            }
          >
            <Flame size={18} />
            <span>Threads</span>
          </NavLink>

          <NavLink
            to="/leaderboards"
            className={({ isActive }) =>
              `nav-link-btn ${isActive ? 'active' : ''}`
            }
          >
            <Trophy size={18} />
            <span>Leaderboards</span>
          </NavLink>

          {authUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="nav-user-pill">
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className="author-avatar author-avatar-sm"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      authUser.name
                    )}&background=6366f1&color=fff`;
                  }}
                />
                <span>{authUser.name}</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onLogout}
                title="Keluar"
              >
                <LogOut size={16} />
                <span>Keluar</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                <LogIn size={16} />
                <span>Masuk</span>
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <UserPlus size={16} />
                <span>Daftar</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
