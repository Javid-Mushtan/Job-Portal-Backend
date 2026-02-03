import { useState } from 'react';
import JobCard from '../components/jobs/JobCard.jsx';
import JobFilters from '../components/jobs/JobFilters.jsx';
import { getAllJobs, searchJobs } from '../api/jobs.js';
import { useAsync } from '../hooks/useAsync.js';

const Jobs = () => {
  const [activeFilters, setActiveFilters] = useState(null);
  const { data: jobs = [], loading, error, execute, setData } = useAsync(getAllJobs, [], { initialValue: [] });

  const handleApplyFilters = async (filters) => {
    setActiveFilters(filters);
    const hasFilters = Object.values(filters).some((value) => value !== '' && value !== null && value !== undefined);
    if (hasFilters) {
      const results = await searchJobs(filters);
      setData(results);
    } else {
      execute();
    }
  };

  const activeFilterEntries = activeFilters
    ? Object.entries(activeFilters).filter(([, value]) => value !== '' && value !== null && value !== undefined)
    : [];

  return (
    <div className="container jobs-page">
      <header className="section-heading">
        <div>
          <p className="pill">Open opportunities</p>
          <h1>Find your next role</h1>
          {activeFilterEntries.length > 0 && (
            <p className="muted">
              Active filters:{' '}
              {activeFilterEntries.map(([key, value]) => (
                <span key={key} className="filter-chip">
                  {key}: <strong>{value}</strong>
                </span>
              ))}
            </p>
          )}
        </div>
        {!loading && !error && <p className="muted">{jobs.length} roles found</p>}
      </header>

      <JobFilters onApply={handleApplyFilters} />

      {loading && <div className="skeleton" style={{ height: '160px' }} />}
      {error && <div className="card error">{error.message}</div>}

      {!loading && !error && (
        <div className="grid">
          {jobs.length ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="card empty-state">No jobs match your filters right now.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
