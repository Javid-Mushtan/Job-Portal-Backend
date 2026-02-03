import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container not-found">
    <div className="card">
      <p className="pill">404</p>
      <h1>Lost in the talent grid</h1>
      <p className="muted">The page you are looking for has moved or no longer exists.</p>
      <div className="not-found-actions">
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link to="/jobs" className="btn btn-ghost">
          Browse jobs
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
