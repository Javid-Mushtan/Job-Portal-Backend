import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, jobTypeLabel } from '../../utils/format.js';

const JobCard = ({ job, compact = false }) => {
  if (!job) return null;
  const {
    id,
    title,
    company,
    location,
    city,
    country,
    salaryMin,
    salaryMax,
    applicationCount,
    type,
    level,
    remoteAvailable,
    applicationDeadline,
  } = job;

  const displayLocation = location || [city, country].filter(Boolean).join(', ');
  const salaryRange = salaryMin || salaryMax ? `${formatCurrency(salaryMin)} - ${formatCurrency(salaryMax)}` : 'Salary undisclosed';

  return (
    <article className={`job-card card ${compact ? 'compact' : ''}`}>
      <div className="job-card-header">
        <div>
          <p className="badge">{company?.name ?? 'Unknown company'}</p>
          <h3>{title}</h3>
        </div>
        {remoteAvailable && <span className="pill">Remote</span>}
      </div>

      <div className="job-card-meta">
        <div>
          <p className="meta-label">Location</p>
          <p>{displayLocation || 'Global'}</p>
        </div>
        <div>
          <p className="meta-label">Type</p>
          <p>{jobTypeLabel(type)}</p>
        </div>
        <div>
          <p className="meta-label">Level</p>
          <p>{jobTypeLabel(level)}</p>
        </div>
        <div>
          <p className="meta-label">Applicants</p>
          <p>{applicationCount ?? '—'}</p>
        </div>
      </div>

      <div className="job-card-footer">
        <div>
          <p className="meta-label">Salary range</p>
          <p className="salary">{salaryRange}</p>
        </div>
        <div>
          <p className="meta-label">Deadline</p>
          <p>{formatDate(applicationDeadline)}</p>
        </div>
        <Link to={`/jobs/${id}`} className="btn btn-primary">
          View role
        </Link>
      </div>
    </article>
  );
};

export default JobCard;
