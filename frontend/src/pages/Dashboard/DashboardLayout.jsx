import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const navigation = [
  { to: '/dashboard/overview', label: 'Overview', roles: [] },
  { to: '/dashboard/profile', label: 'Profile', roles: [] },
  { to: '/dashboard/applications', label: 'Applications', roles: ['ROLE_JOB_SEEKER'] },
  { to: '/dashboard/jobs', label: 'Jobs', roles: ['ROLE_EMPLOYER', 'ROLE_ADMIN'] },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const userRoles = user?.roles ?? [];

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <p className="pill">Dashboard</p>
          <h2>
            Hi, {user?.firstName} {user?.lastName}
          </h2>
          <p className="muted">{user?.email}</p>
        </div>

        <nav className="dashboard-nav">
          {navigation
            .filter((nav) => nav.roles.length === 0 || nav.roles.some((role) => userRoles.includes(role)))
            .map((nav) => (
              <NavLink key={nav.to} to={nav.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {nav.label}
              </NavLink>
            ))}
        </nav>

        <button type="button" className="btn btn-ghost" onClick={logout}>
          Sign out
        </button>
      </aside>

      <section className="dashboard-content">
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
