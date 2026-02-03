import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, getJobById, updateJob } from '../../api/jobs.js';
import { getMyCompany } from '../../api/companies.js';
import { useAsync } from '../../hooks/useAsync.js';
import StateCard from '../../components/common/StateCard.jsx';

const jobTypes = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE'];
const jobLevels = ['ENTRY', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'MANAGER', 'DIRECTOR', 'EXECUTIVE'];

const defaultForm = {
  title: '',
  description: '',
  requirements: '',
  responsibilities: '',
  type: 'FULL_TIME',
  level: 'MID',
  salaryMin: '',
  salaryMax: '',
  location: '',
  city: '',
  state: '',
  country: '',
  remoteAvailable: false,
  applicationDeadline: '',
};

const JobForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const isEdit = mode === 'edit' && jobId;
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState({ saving: false, message: null, error: null });

  const { data: company, loading: companyLoading, error: companyError } = useAsync(getMyCompany, [], { initialValue: null });
  const {
    data: job,
    loading: jobLoading,
    error: jobError,
  } = useAsync(
    () => (isEdit ? getJobById(jobId) : Promise.resolve(null)),
    [isEdit, jobId],
    { initialValue: null, immediate: Boolean(isEdit) },
  );

  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || '',
        description: job.description || '',
        requirements: job.requirements || '',
        responsibilities: job.responsibilities || '',
        type: job.type || 'FULL_TIME',
        level: job.level || 'MID',
        salaryMin: job.salaryMin ?? '',
        salaryMax: job.salaryMax ?? '',
        location: job.location || '',
        city: job.city || '',
        state: job.state || '',
        country: job.country || '',
        remoteAvailable: Boolean(job.remoteAvailable),
        applicationDeadline: job.applicationDeadline ? job.applicationDeadline.slice(0, 16) : '',
      });
    }
  }, [job]);

  const companyId = useMemo(() => job?.company?.id ?? company?.id, [job, company]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!companyId) {
      setStatus({ saving: false, message: null, error: 'Company not found. Complete your company profile first.' });
      return;
    }

    const payload = {
      ...form,
      companyId,
      salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
      salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
      applicationDeadline: form.applicationDeadline ? new Date(form.applicationDeadline).toISOString() : null,
    };

    setStatus({ saving: true, message: null, error: null });
    try {
      if (isEdit) {
        await updateJob(jobId, payload);
        setStatus({ saving: false, message: 'Job updated successfully', error: null });
      } else {
        await createJob(payload);
        setStatus({ saving: false, message: 'Job posted successfully', error: null });
      }
      navigate('/dashboard/jobs');
    } catch (err) {
      setStatus({ saving: false, message: null, error: err.message || 'Unable to save job' });
    }
  };

  if (companyLoading || (isEdit && jobLoading)) {
    return <div className="skeleton" style={{ minHeight: '320px' }} />;
  }

  if (companyError) {
    return <StateCard icon="⚠️" title="Company required" description={companyError.message} />;
  }

  if (jobError) {
    return <StateCard icon="⚠️" title="Unable to load job" description={jobError.message} />;
  }

  return (
    <div className="card job-form">
      <header>
        <p className="pill">{isEdit ? 'Update role' : 'Create new role'}</p>
        <h2>{isEdit ? form.title || 'Edit job' : 'Post a new opportunity'}</h2>
        <p className="muted">Share clear expectations, salary transparency, and standout responsibilities.</p>
      </header>

      <form className="grid" onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input className="input" name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          <span>Description</span>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>

        <label>
          <span>Requirements</span>
          <textarea name="requirements" value={form.requirements} onChange={handleChange} />
        </label>

        <label>
          <span>Responsibilities</span>
          <textarea name="responsibilities" value={form.responsibilities} onChange={handleChange} />
        </label>

        <div className="form-grid">
          <label>
            <span>Type</span>
            <select name="type" value={form.type} onChange={handleChange}>
              {jobTypes.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption.replace('_', ' ')}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Level</span>
            <select name="level" value={form.level} onChange={handleChange}>
              {jobLevels.map((levelOption) => (
                <option key={levelOption} value={levelOption}>
                  {levelOption.replace('_', ' ')}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-grid">
          <label>
            <span>Salary min</span>
            <input className="input" name="salaryMin" type="number" value={form.salaryMin} onChange={handleChange} />
          </label>
          <label>
            <span>Salary max</span>
            <input className="input" name="salaryMax" type="number" value={form.salaryMax} onChange={handleChange} />
          </label>
        </div>

        <div className="form-grid">
          <label>
            <span>Location</span>
            <input className="input" name="location" value={form.location} onChange={handleChange} />
          </label>
          <label>
            <span>City</span>
            <input className="input" name="city" value={form.city} onChange={handleChange} />
          </label>
        </div>

        <div className="form-grid">
          <label>
            <span>State</span>
            <input className="input" name="state" value={form.state} onChange={handleChange} />
          </label>
          <label>
            <span>Country</span>
            <input className="input" name="country" value={form.country} onChange={handleChange} />
          </label>
        </div>

        <label className="checkbox-row">
          <input type="checkbox" name="remoteAvailable" checked={form.remoteAvailable} onChange={handleChange} />
          <span>Remote friendly</span>
        </label>

        <label>
          <span>Application deadline</span>
          <input
            className="input"
            type="datetime-local"
            name="applicationDeadline"
            value={form.applicationDeadline}
            onChange={handleChange}
          />
        </label>

        {status.error && <p className="error-text">{status.error}</p>}
        {status.message && <p className="success-text">{status.message}</p>}

        <button type="submit" className="btn btn-primary" disabled={status.saving}>
          {status.saving ? 'Saving...' : isEdit ? 'Update job' : 'Publish job'}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
