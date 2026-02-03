import { useAsync } from '../../hooks/useAsync.js';
import { getMyApplications } from '../../api/applications.js';
import StateCard from '../../components/common/StateCard.jsx';
import { formatDateTime } from '../../utils/format.js';

const statusAccent = {
  PENDING: 'badge',
  REVIEWED: 'pill',
  SHORTLISTED: 'pill',
  REJECTED: 'error-text',
  INTERVIEW_SCHEDULED: 'pill',
  INTERVIEWED: 'badge',
  OFFERED: 'pill',
  ACCEPTED: 'pill',
  DECLINED: 'error-text',
};

const Applications = () => {
  const { data: applications = [], loading, error, execute } = useAsync(getMyApplications, [], { initialValue: [] });

  if (loading) {
    return <div className="skeleton" style={{ minHeight: '200px' }} />;
  }

  if (error) {
    return <StateCard icon="⚠️" title="Unable to load" description={error.message} action={<button type="button" className="btn btn-primary" onClick={execute}>Retry</button>} />;
  }

  if (!applications.length) {
    return <StateCard icon="✉️" title="No applications yet" description="Find a role you love and apply directly to the hiring team." action={<a className="btn btn-primary" href="/jobs">Browse jobs</a>} />;
  }

  return (
    <div className="applications-list">
      {applications.map((application) => (
        <article key={application.id} className="card application-card">
          <div>
            <p className="badge">{application.job?.company?.name}</p>
            <h3>{application.job?.title}</h3>
            <p className="muted">Applied {formatDateTime(application.appliedDate)}</p>
          </div>

          <div className="application-meta">
            <div>
              <p className="meta-label">Status</p>
              <p className={statusAccent[application.status] || 'pill'}>{application.status}</p>
            </div>
            <div>
              <p className="meta-label">Interview</p>
              <p>{formatDateTime(application.interviewDate)}</p>
            </div>
            <div>
              <p className="meta-label">Resume</p>
              {application.resumeUrl ? (
                <a href={application.resumeUrl} target="_blank" rel="noreferrer">
                  View resume
                </a>
              ) : (
                <span>—</span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Applications;
