import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync.js';
import { getMyCompany } from '../../api/companies.js';
import { deleteJob, getCompanyJobs } from '../../api/jobs.js';
import JobCard from '../../components/jobs/JobCard.jsx';
import StateCard from '../../components/common/StateCard.jsx';

const EmployerJobs = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const { data: company, loading: companyLoading, error: companyError } = useAsync(getMyCompany, [], { initialValue: null });

  const {
    data: jobs = [],
    loading: jobsLoading,
    error: jobsError,
    execute: refreshJobs,
  } = useAsync(
    () => (company?.id ? getCompanyJobs(company.id) : Promise.resolve([])),
    [company?.id],
    { initialValue: [], immediate: Boolean(company?.id) },
  );

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm('Delete this job? This cannot be undone.');
    if (!confirmed) return;
    try {
      await deleteJob(jobId);
      setFeedback('Job deleted');
      refreshJobs();
    } catch (error) {
      setFeedback(error.message || 'Failed to delete job');
    }
  };

  if (companyLoading) {
    return <div className="skeleton" style={{ minHeight: '240px' }} />;
  }

  if (companyError) {
    return <StateCard icon="⚠️" title="Unable to load company" description={companyError.message} />;
  }

  return (
    <div className="employer-jobs">
      <div className="section-heading">
        <div>
          <p className="pill">{company?.name || 'Your company'}</p>
          <h2>Manage job postings</h2>
          <p className="muted">{company?.description}</p>
        </div>
        <div className="gap-sm">
          <button type="button" className="btn btn-ghost" onClick={() => refreshJobs()}>
            Refresh
          </button>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/dashboard/jobs/new')}>
            Post a job
          </button>
        </div>
      </div>

      {feedback && <p className="muted">{feedback}</p>}
      {jobsLoading && <div className="skeleton" style={{ minHeight: '160px' }} />}
      {jobsError && <StateCard icon="⚠️" title="Unable to load jobs" description={jobsError.message} action={<button type="button" className="btn btn-primary" onClick={refreshJobs}>Retry</button>} />}

      {!jobsLoading && !jobsError && (
        <div className="grid">
          {jobs.length ? (
            jobs.map((job) => (
              <div key={job.id} className="card job-admin-card">
                <JobCard job={job} compact />
                <div className="job-admin-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => navigate(`/dashboard/jobs/${job.id}/edit`)}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-ghost danger" onClick={() => handleDelete(job.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <StateCard
              icon="🌀"
              title="No roles published"
              description="Share your first opening to attract applicants."
              action={<button type="button" className="btn btn-primary" onClick={() => navigate('/dashboard/jobs/new')}>Create job</button>}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EmployerJobs;
