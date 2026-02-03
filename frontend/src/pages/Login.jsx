import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login as loginRequest } from '../api/auth.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ loading: false, error: null });
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: null });
    try {
      const response = await loginRequest(form);
      login(response);
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setStatus({ loading: false, error: error.message || 'Unable to sign in' });
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-card card">
        <p className="pill">Welcome back</p>
        <h2>Sign in to TalentForge</h2>
        <p className="muted">Access personalized recommendations, track applications, and more.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              className="input"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              className="input"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          {status.error && <p className="error-text">{status.error}</p>}

          <button type="submit" className="btn btn-primary" disabled={status.loading}>
            {status.loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p>
          New here? <Link to="/auth/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
