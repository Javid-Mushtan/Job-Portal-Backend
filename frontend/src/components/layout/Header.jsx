import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/jobs', label: 'Jobs' },
];

const Header = () => {
  const { token, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span>Talent</span>
            <span className="brand-accent">Forge</span>
          </Link>

          <nav className="nav-links">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-cta">
            {token ? (
              <>
                <button type="button" className="btn btn-ghost" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </button>
                <button type="button" className="btn btn-primary" onClick={handleLogout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate('/auth/login', { state: { from: location } })}
                >
                  Sign in
                </button>
                <button type="button" className="btn btn-primary" onClick={() => navigate('/auth/register')}>
                  Join as talent
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
