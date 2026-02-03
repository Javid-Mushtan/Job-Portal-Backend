import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById } from '../api/jobs.js';
import { applyForJob } from '../api/applications.js';
import { useAsync } from '../hooks/useAsync.js';
import { formatCurrency, formatDate, jobTypeLabel } from '../utils/format.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isJobSeeker } = useAuth();
  const [coverLetter, setCoverLetter] = useState('');
  const { data: job, loading, error } = useAsync(() => getJobById(id), [id], { initialValue: null });
  const [applyState, setApplyState] = useState({ submitting: false, message: null, error: null });

  const salaryRange = useMemo(() => {
    if (!job) return '—';
    if (!job.salaryMin && !job.salaryMax) return 'Salary undisclosed';
    return `${formatCurrency(job.salaryMin)} - ${formatCurrency(job.salaryMax)}`;
  }, [job]);

  const handleApply = async () => {
    if (!token) {
      navigate('/auth/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    setApplyState({ submitting: true, message: null, error: null });
    try {
      const response = await applyForJob({ jobId: Number(id), coverLetter });
      setApplyState({ submitting: false, message: 'Application submitted!', error: null });
      return response;
    } catch (err) {
      setApplyState({ submitting: false, message: null, error: err.message });
      return null;
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="skeleton" style={{ height: '320px' }} />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container">
        <div className="card error">
          <p>{error?.message || 'Unable to load job'}</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/jobs')}>
            Back to jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container job-detail">
      <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <header className="job-detail-header card">
        <div>
          <p className="badge">{job.company?.name}</p>
          <h1>{job.title}</h1>
          <p className="muted">{job.company?.description}</p>
        </div>

        <div className="job-detail-grid">
          <div>
            <p className="meta-label">Location</p>
            <p>{job.location || [job.city, job.country].filter(Boolean).join(', ') || 'Global'}</p>
          </div>
          <div>
            <p className="meta-label">Type</p>
            <p>{jobTypeLabel(job.type)}</p>
          </div>
          <div>
            <p className="meta-label">Level</p>
            <p>{jobTypeLabel(job.level)}</p>
          </div>
          <div>
            <p className="meta-label">Applicants</p>
            <p>{job.applicationCount ?? '—'}</p>
          </div>
          <div>
            <p className="meta-label">Salary range</p>
            <p>{salaryRange}</p>
          </div>
          <div>
            <p className="meta-label">Deadline</p>
            <p>{formatDate(job.applicationDeadline)}</p>
          </div>
        </div>
      </header>

      <section className="job-detail-content card">
        <article>
          <h3>About the role</h3>
          <p>{job.description}</p>
        </article>

        {job.requirements && (
          <article>
            <h3>Requirements</h3>
            <p>{job.requirements}</p>
          </article>
        )}

        {job.responsibilities && (
          <article>
            <h3>Responsibilities</h3>
            <p>{job.responsibilities}</p>
          </article>
        )}
      </section>

      {isJobSeeker && (
        <section className="job-apply card">
          <h3>Submit your application</h3>
          <textarea
            placeholder="Customize a short note or cover letter"
            value={coverLetter}
            onChange={(event) => setCoverLetter(event.target.value)}
          />
          {applyState.error && <p className="error-text">{applyState.error}</p>}
          {applyState.message && <p className="success-text">{applyState.message}</p>}
          <button type="button" className="btn btn-primary" disabled={applyState.submitting} onClick={handleApply}>
            {applyState.submitting ? 'Sending...' : 'Apply now'}
          </button>
        </section>
      )}
    </div>
  );
};

export default JobDetail;
