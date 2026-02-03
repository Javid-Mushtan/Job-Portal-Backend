import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerRequest } from '../api/auth.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  role: 'ROLE_JOB_SEEKER',
  companyName: '',
  companyDescription: '',
};

const Register = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ loading: false, error: null });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: null });
    try {
      const response = await registerRequest(form);
      login(response);
      navigate('/dashboard');
    } catch (error) {
      setStatus({ loading: false, error: error.message || 'Unable to sign up' });
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-card card">
        <p className="pill">Create an account</p>
        <h2>Join TalentForge</h2>
        <p className="muted">Select your track and unlock curated job matches.</p>

        <div className="role-toggle">
          <button
            type="button"
            className={`role-pill ${form.role === 'ROLE_JOB_SEEKER' ? 'active' : ''}`}
            onClick={() => handleRoleChange('ROLE_JOB_SEEKER')}
          >
            Job seeker
          </button>
          <button
            type="button"
            className={`role-pill ${form.role === 'ROLE_EMPLOYER' ? 'active' : ''}`}
            onClick={() => handleRoleChange('ROLE_EMPLOYER')}
          >
            Employer
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              <span>First name</span>
              <input className="input" name="firstName" value={form.firstName} onChange={handleChange} required />
            </label>
            <label>
              <span>Last name</span>
              <input className="input" name="lastName" value={form.lastName} onChange={handleChange} required />
            </label>
          </div>

          <label>
            <span>Email</span>
            <input className="input" name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            <span>Password</span>
            <input
              className="input"
              name="password"
              type="password"
              minLength={6}
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Phone (optional)</span>
            <input className="input" name="phone" value={form.phone} onChange={handleChange} />
          </label>

          {form.role === 'ROLE_EMPLOYER' && (
            <div className="form-grid">
              <label>
                <span>Company name</span>
                <input className="input" name="companyName" value={form.companyName} onChange={handleChange} />
              </label>
              <label>
                <span>Company description</span>
                <input
                  className="input"
                  name="companyDescription"
                  value={form.companyDescription}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}

          {status.error && <p className="error-text">{status.error}</p>}

          <button type="submit" className="btn btn-primary" disabled={status.loading}>
            {status.loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
